from fastapi import APIRouter, Depends, HTTPException, Request, Query
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from ..database import get_db
from ..models import Instructor, Course
from .auth import get_current_user_from_cookie

router = APIRouter(prefix="/instructors", tags=["instructors"])

class InstructorCreate(BaseModel):
    name: str
    bio: Optional[str] = None
    image: Optional[str] = None
    website: Optional[str] = None
    featured: bool = False

class InstructorUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    image: Optional[str] = None
    website: Optional[str] = None
    featured: Optional[bool] = None


def require_admin(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user or user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")
    return user


@router.get("")
def list_instructors(featured: Optional[bool] = Query(None), db: Session = Depends(get_db)):
    query = db.query(Instructor)
    if featured is not None:
        query = query.filter(Instructor.featured == featured)
    instructors = query.order_by(Instructor.name).all()
    return {"instructors": instructors}


@router.get("/featured")
def featured_instructors(db: Session = Depends(get_db)):
    instructors = db.query(Instructor).filter(Instructor.featured == True).order_by(Instructor.name).all()
    return {"instructors": instructors}


@router.get("/{instructor_id}")
def get_instructor(instructor_id: str, db: Session = Depends(get_db)):
    instructor = db.query(Instructor).filter(Instructor.id == instructor_id).first()
    if not instructor:
        raise HTTPException(status_code=404, detail="Instructor not found")
    return instructor


@router.post("")
def create_instructor(payload: InstructorCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    instructor = Instructor(**payload.model_dump())
    db.add(instructor)
    db.commit()
    db.refresh(instructor)
    return instructor


@router.put("/{instructor_id}")
def update_instructor(instructor_id: str, payload: InstructorUpdate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    instructor = db.query(Instructor).filter(Instructor.id == instructor_id).first()
    if not instructor:
        raise HTTPException(status_code=404, detail="Instructor not found")
    for key, value in payload.model_dump(exclude_none=True).items():
        setattr(instructor, key, value)
    db.commit()
    db.refresh(instructor)
    return instructor


@router.delete("/{instructor_id}")
def delete_instructor(instructor_id: str, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    instructor = db.query(Instructor).filter(Instructor.id == instructor_id).first()
    if not instructor:
        raise HTTPException(status_code=404, detail="Instructor not found")
    db.delete(instructor)
    db.commit()
    return {"success": True}
