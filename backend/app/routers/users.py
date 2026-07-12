from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from ..database import get_db
from ..models import User, Course, Enrollment, Payment
from .auth import get_current_user
from ..cache import get_cache, set_cache

router = APIRouter(prefix="/users", tags=["users"])

@router.get("")
def list_users(request: Request, db: Session = Depends(get_db)):
    user = get_current_user(request, db)
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
    user = get_current_user(request, db)
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
    user = get_current_user(request, db)
    if not user or user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")
        
    cache_key = "admin:stats"
    cached_stats = get_cache(cache_key)
    if cached_stats:
        return cached_stats

    total_users = db.query(User).count()
    total_courses = db.query(Course).filter(Course.isPublished == True).count()
    total_enrollments = db.query(Enrollment).count()
    total_revenue = db.query(Payment).filter(Payment.status == "COMPLETED").all()
    revenue = sum(p.amount for p in total_revenue)
    completed_courses = db.query(Enrollment).filter(Enrollment.completed == True).count()

    stats = {
        "totalUsers": total_users,
        "totalCourses": total_courses,
        "totalEnrollments": total_enrollments,
        "totalRevenue": round(revenue, 2),
        "completedCourses": completed_courses,
    }
    
    set_cache(cache_key, stats, expire_seconds=3600)
    return stats

@router.get("/leaderboard")
def get_leaderboard(request: Request, db: Session = Depends(get_db)):
    user = get_current_user(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
        
    cache_key = "leaderboard:top5"
    cached_top = get_cache(cache_key)
    
    if cached_top:
        top_users_data = cached_top
    else:
        # Get top 5 users by totalXP
        top_users = db.query(User).order_by(User.totalXP.desc()).limit(5).all()
        top_users_data = [{"id": u.id, "name": u.name, "xp": u.totalXP} for u in top_users]
        set_cache(cache_key, top_users_data, expire_seconds=600) # Cache for 10 minutes

    leaderboard_data = []
    current_user_included = False

    for idx, u in enumerate(top_users_data):
        is_current = u["id"] == user.id
        if is_current:
            current_user_included = True
        leaderboard_data.append({
            "rank": idx + 1,
            "name": u["name"],
            "xp": u["xp"],
            "current": is_current
        })

    # If the current user is not in the top 5, compute their actual rank
    if not current_user_included:
        higher_xp_count = db.query(User).filter(User.totalXP > user.totalXP).count()
        user_rank = higher_xp_count + 1
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

@router.put("/profile")
def update_profile(payload: ProfileUpdatePayload, request: Request, db: Session = Depends(get_db)):
    user = get_current_user(request, db)
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
