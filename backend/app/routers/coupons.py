from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from ..database import get_db
from ..models import Coupon, Course
from .auth import get_current_user_from_cookie

router = APIRouter(prefix="/coupons", tags=["coupons"])

class CouponCreate(BaseModel):
    code: str
    discountPercent: float
    active: bool = True
    expiresAt: Optional[datetime] = None
    usageLimit: Optional[int] = None
    minOrderAmount: Optional[float] = 0.0

class CouponUpdate(BaseModel):
    discountPercent: Optional[float] = None
    active: Optional[bool] = None
    expiresAt: Optional[datetime] = None
    usageLimit: Optional[int] = None
    minOrderAmount: Optional[float] = None

class CouponApplyPayload(BaseModel):
    code: str
    amount: float


def require_admin(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user or user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")
    return user


@router.get("")
def list_coupons(db: Session = Depends(get_db)):
    coupons = db.query(Coupon).order_by(Coupon.createdAt.desc()).all()
    return {"coupons": coupons}


@router.get("/validate/{code}")
def validate_coupon(code: str, db: Session = Depends(get_db)):
    coupon = db.query(Coupon).filter(Coupon.code == code).first()
    if not coupon or not coupon.active:
        raise HTTPException(status_code=404, detail="Coupon not found or inactive")
    now = datetime.utcnow()
    if coupon.expiresAt and coupon.expiresAt < now:
        raise HTTPException(status_code=400, detail="Coupon has expired")
    if coupon.usageLimit and coupon.usedCount >= coupon.usageLimit:
        raise HTTPException(status_code=400, detail="Coupon usage limit reached")
    return {
        "code": coupon.code,
        "discountPercent": coupon.discountPercent,
        "minOrderAmount": coupon.minOrderAmount,
        "active": coupon.active,
        "expiresAt": coupon.expiresAt,
        "usageLimit": coupon.usageLimit,
        "usedCount": coupon.usedCount,
    }


@router.post("")
def create_coupon(payload: CouponCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    existing = db.query(Coupon).filter(Coupon.code == payload.code).first()
    if existing:
        raise HTTPException(status_code=400, detail="Coupon code already exists")
    coupon = Coupon(**payload.model_dump())
    coupon.usedCount = 0
    db.add(coupon)
    db.commit()
    db.refresh(coupon)
    return coupon


@router.put("/{coupon_id}")
def update_coupon(coupon_id: str, payload: CouponUpdate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    coupon = db.query(Coupon).filter(Coupon.id == coupon_id).first()
    if not coupon:
        raise HTTPException(status_code=404, detail="Coupon not found")
    for key, value in payload.model_dump(exclude_none=True).items():
        setattr(coupon, key, value)
    db.commit()
    db.refresh(coupon)
    return coupon


@router.delete("/{coupon_id}")
def delete_coupon(coupon_id: str, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    coupon = db.query(Coupon).filter(Coupon.id == coupon_id).first()
    if not coupon:
        raise HTTPException(status_code=404, detail="Coupon not found")
    db.delete(coupon)
    db.commit()
    return {"success": True}


@router.post("/apply")
def apply_coupon(payload: CouponApplyPayload, db: Session = Depends(get_db)):
    coupon = db.query(Coupon).filter(Coupon.code == payload.code, Coupon.active == True).first()
    if not coupon:
        raise HTTPException(status_code=404, detail="Invalid coupon code")
    now = datetime.utcnow()
    if coupon.expiresAt and coupon.expiresAt < now:
        raise HTTPException(status_code=400, detail="Coupon expired")
    if coupon.usageLimit and coupon.usedCount >= coupon.usageLimit:
        raise HTTPException(status_code=400, detail="Coupon usage limit reached")
    if payload.amount < coupon.minOrderAmount:
        raise HTTPException(status_code=400, detail="Order does not meet minimum coupon requirement")
    discount_amount = round(payload.amount * coupon.discountPercent / 100.0, 2)
    coupon.usedCount += 1
    db.commit()
    return {"code": coupon.code, "discountAmount": discount_amount, "finalAmount": round(payload.amount - discount_amount, 2)}
