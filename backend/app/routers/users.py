from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import Optional
from ..database import get_db
from ..models import User, Course, Enrollment, Payment
from .auth import get_current_user_from_cookie

router = APIRouter(prefix="/users", tags=["users"])

@router.get("")
def list_users(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user or user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")

    users = db.query(User).order_by(User.createdAt.desc()).all()

    result = []
    for u in users:
        enrolled_count = db.query(Enrollment).filter(Enrollment.userId == u.id).count()
        result.append({
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role,
            "totalXP": u.totalXP,
            "streak": u.streak,
            "image": u.image,
            "createdAt": u.createdAt,
            "_count": {"enrollments": enrolled_count}
        })

    return {"users": result, "total": len(result)}

@router.get("/me")
def get_me(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "totalXP": user.totalXP,
        "streak": user.streak,
        "image": user.image,
        "createdAt": user.createdAt,
        "updatedAt": user.updatedAt
    }

@router.get("/stats")
def get_stats(request: Request, db: Session = Depends(get_db)):
    """Admin-only: platform-wide stats for analytics dashboard"""
    user = get_current_user_from_cookie(request, db)
    if not user or user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")

    total_users = db.query(User).count()
    total_courses = db.query(Course).filter(Course.isPublished == True).count()
    total_enrollments = db.query(Enrollment).count()
    total_revenue = db.query(Payment).filter(Payment.status == "COMPLETED").all()
    revenue = sum(p.amount for p in total_revenue)
    completed_courses = db.query(Enrollment).filter(Enrollment.completed == True).count()

    return {
        "totalUsers": total_users,
        "totalCourses": total_courses,
        "totalEnrollments": total_enrollments,
        "totalRevenue": round(revenue, 2),
        "completedCourses": completed_courses,
    }

@router.get("/leaderboard")
def get_leaderboard(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")

    # Get top 5 users by totalXP
    top_users = db.query(User).order_by(User.totalXP.desc()).limit(5).all()

    # Calculate absolute rank for current user
    # Count how many users have higher XP than current user, then add 1
    higher_xp_count = db.query(User).filter(User.totalXP > user.totalXP).count()
    user_rank = higher_xp_count + 1

    leaderboard_data = []
    current_user_included = False

    for idx, u in enumerate(top_users):
        is_current = u.id == user.id
        if is_current:
            current_user_included = True
        leaderboard_data.append({
            "rank": idx + 1,
            "name": u.name,
            "xp": u.totalXP,
            "current": is_current
        })

    # If the current user is not in the top 5, append them at the end with their actual rank
    if not current_user_included:
        leaderboard_data.append({
            "rank": user_rank,
            "name": user.name,
            "xp": user.totalXP,
            "current": True
        })

    return {"leaderboard": leaderboard_data}

class ProfileUpdatePayload(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None

from pydantic import BaseModel

@router.put("/profile")
def update_profile(payload: ProfileUpdatePayload, request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")

    if payload.name:
        user.name = payload.name
    if payload.email:
        # Check duplicate
        if payload.email != user.email:
            exists = db.query(User).filter(User.email == payload.email).first()
            if exists:
                raise HTTPException(status_code=400, detail="Email already in use")
            user.email = payload.email

    db.commit()
    db.refresh(user)

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "totalXP": user.totalXP,
        "streak": user.streak,
        "image": user.image
    }
