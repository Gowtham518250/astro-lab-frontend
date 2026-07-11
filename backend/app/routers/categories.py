from fastapi import APIRouter, Depends, HTTPException, Request, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from pydantic import BaseModel
from ..database import get_db
from ..models import Category, Course
from .auth import get_current_user_from_cookie

router = APIRouter(prefix="/categories", tags=["categories"])

class CategoryCreate(BaseModel):
    name: str
    description: Optional[str] = None
    image: Optional[str] = None

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None


def require_admin(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user or user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")
    return user


def _slugify(value: str) -> str:
    return value.strip().lower().replace(" ", "-")


@router.get("")
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(Category).order_by(Category.name).all()
    return {"categories": categories}


@router.get("/top")
def get_top_categories(db: Session = Depends(get_db)):
    category_counts = db.query(Course.category, func.count(Course.id).label("count"))
    category_counts = category_counts.group_by(Course.category).order_by(func.count(Course.id).desc()).limit(10).all()
    top = [{"name": row[0], "count": row[1]} for row in category_counts]
    return {"topCategories": top}


@router.get("/{category_id}")
def get_category(category_id: str, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.post("")
def create_category(payload: CategoryCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    slug = _slugify(payload.name)
    existing = db.query(Category).filter(Category.slug == slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category already exists")
    category = Category(name=payload.name, description=payload.description, image=payload.image, slug=slug)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


@router.put("/{category_id}")
def update_category(category_id: str, payload: CategoryUpdate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    update_data = payload.model_dump(exclude_none=True)
    if update_data.get("name"):
        category.name = update_data["name"]
        category.slug = _slugify(update_data["name"])
    if update_data.get("description") is not None:
        category.description = update_data["description"]
    if update_data.get("image") is not None:
        category.image = update_data["image"]
    db.commit()
    db.refresh(category)
    return category


@router.delete("/{category_id}")
def delete_category(category_id: str, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(category)
    db.commit()
    return {"success": True}
