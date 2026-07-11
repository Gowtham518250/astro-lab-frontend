from fastapi import APIRouter, Depends, HTTPException, Request, Query
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from ..database import get_db
from ..models import Review, User, Course
from .auth import get_current_user_from_cookie

router = APIRouter(prefix="/reviews", tags=["reviews"])

class ReviewCreate(BaseModel):
    courseId: str
    rating: int
    title: str
    comment: str

class ReviewUpdate(BaseModel):
    rating: Optional[int] = None
    title: Optional[str] = None
    comment: Optional[str] = None


def require_admin(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user or user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")
    return user


def require_user(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return user


@router.get("/courses/{course_id}")
def get_course_reviews(course_id: str, page: int = Query(1, ge=1), limit: int = Query(20, ge=1, le=100), db: Session = Depends(get_db)):
    query = db.query(Review).filter(Review.courseId == course_id).order_by(Review.createdAt.desc())
    total = query.count()
    reviews = query.offset((page - 1) * limit).limit(limit).all()
    return {"reviews": reviews, "total": total, "page": page, "limit": limit}


@router.get("/users/{user_id}")
def get_user_reviews(user_id: str, db: Session = Depends(get_db)):
    reviews = db.query(Review).filter(Review.userId == user_id).order_by(Review.createdAt.desc()).all()
    return {"reviews": reviews}


@router.post("")
def create_review(payload: ReviewCreate, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    course = db.query(Course).filter(Course.id == payload.courseId).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    if not 1 <= payload.rating <= 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
    review = Review(userId=user.id, **payload.model_dump())
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


@router.put("/{review_id}")
def update_review(review_id: str, payload: ReviewUpdate, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    if review.userId != user.id and user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Forbidden")
    for key, value in payload.model_dump(exclude_none=True).items():
        setattr(review, key, value)
    db.commit()
    db.refresh(review)
    return review


@router.delete("/{review_id}")
def delete_review(review_id: str, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    if review.userId != user.id and user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Forbidden")
    db.delete(review)
    db.commit()
    return {"success": True}


@router.get("/courses/{course_id}/summary")
def review_summary(course_id: str, db: Session = Depends(get_db)):
    all_reviews = db.query(Review).filter(Review.courseId == course_id).all()
    if not all_reviews:
        return {"averageRating": 0.0, "totalReviews": 0, "ratings": {}}
    total_reviews = len(all_reviews)
    average_rating = sum(review.rating for review in all_reviews) / total_reviews
    ratings = {str(star): len([review for review in all_reviews if review.rating == star]) for star in range(1, 6)}
    return {"averageRating": round(average_rating, 2), "totalReviews": total_reviews, "ratings": ratings}
