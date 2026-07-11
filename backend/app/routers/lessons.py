from fastapi import APIRouter, Depends, HTTPException, Request, Query
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from ..database import get_db
from ..models import Lesson, Course
from .auth import get_current_user_from_cookie

router = APIRouter(prefix="/lessons", tags=["lessons"])

class LessonCreate(BaseModel):
    title: str
    description: str
    videoUrl: str
    duration: int
    position: int
    isFree: bool = False
    courseId: str

class LessonUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    videoUrl: Optional[str] = None
    duration: Optional[int] = None
    position: Optional[int] = None
    isFree: Optional[bool] = None


def require_admin(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user or user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")
    return user


@router.get("")
def list_lessons(
    courseId: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query = db.query(Lesson)
    if courseId:
        query = query.filter(Lesson.courseId == courseId)
    total = query.count()
    lessons = query.order_by(Lesson.position).offset((page - 1) * limit).limit(limit).all()
    return {"lessons": [l.__dict__ for l in lessons], "total": total, "page": page, "limit": limit}


@router.get("/{lesson_id}")
def get_lesson(lesson_id: str, db: Session = Depends(get_db)):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson


@router.get("/course/{course_id}")
def get_lessons_by_course(course_id: str, db: Session = Depends(get_db)):
    lessons = db.query(Lesson).filter(Lesson.courseId == course_id).order_by(Lesson.position).all()
    return {"lessons": lessons}


@router.post("")
def create_lesson(payload: LessonCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    course = db.query(Course).filter(Course.id == payload.courseId).first()
    if not course:
        raise HTTPException(status_code=404, detail="Parent course not found")
    lesson = Lesson(**payload.model_dump())
    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson


@router.put("/{lesson_id}")
def update_lesson(lesson_id: str, payload: LessonUpdate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    for key, value in payload.model_dump(exclude_none=True).items():
        setattr(lesson, key, value)
    db.commit()
    db.refresh(lesson)
    return lesson


@router.delete("/{lesson_id}")
def delete_lesson(lesson_id: str, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    db.delete(lesson)
    db.commit()
    return {"success": True}


class LessonMovePayload(BaseModel):
    position: int


@router.post("/{lesson_id}/move")
def move_lesson(lesson_id: str, payload: LessonMovePayload, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    lesson.position = payload.position
    db.commit()
    db.refresh(lesson)
    return lesson
