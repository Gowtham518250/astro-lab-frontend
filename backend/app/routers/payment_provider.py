from fastapi import APIRouter, Depends, HTTPException, Request, Query
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from ..database import get_db
from ..models import PaymentProvider
from .auth import get_current_user_from_cookie

router = APIRouter(prefix="/payment-provider", tags=["payment-provider"])

class PaymentProviderCreate(BaseModel):
    ownerName: str
    razorpayKeyId: Optional[str] = None
    razorpayKeySecret: Optional[str] = None
    razorpayAccountId: Optional[str] = None
    upiId: Optional[str] = None
    qrCodeUrl: Optional[str] = None
    terms: Optional[str] = None
    isActive: Optional[bool] = True




def require_admin(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user or user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")
    return user


@router.get("")
def list_payment_providers(active: Optional[bool] = Query(None), db: Session = Depends(get_db)):
    query = db.query(PaymentProvider)
    if active is not None:
        query = query.filter(PaymentProvider.isActive == active)
    providers = query.order_by(PaymentProvider.ownerName).all()
    return {"providers": providers}


@router.get("/{provider_id}")
def get_payment_provider(provider_id: str, db: Session = Depends(get_db)):
    provider = db.query(PaymentProvider).filter(PaymentProvider.id == provider_id).first()
    if not provider:
        raise HTTPException(status_code=404, detail="Payment provider not found")
    return provider


@router.post("")
def create_payment_provider(payload: PaymentProviderCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    provider = PaymentProvider(**payload.model_dump())
    db.add(provider)
    db.commit()
    db.refresh(provider)
    return provider


@router.put("/{provider_id}")
def update_payment_provider(provider_id: str, payload: PaymentProviderUpdate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    provider = db.query(PaymentProvider).filter(PaymentProvider.id == provider_id).first()
    if not provider:
        raise HTTPException(status_code=404, detail="Payment provider not found")
    for key, value in payload.model_dump(exclude_none=True).items():
        setattr(provider, key, value)
    db.commit()
    db.refresh(provider)
    return provider


@router.delete("/{provider_id}")
def delete_payment_provider(provider_id: str, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    provider = db.query(PaymentProvider).filter(PaymentProvider.id == provider_id).first()
    if not provider:
        raise HTTPException(status_code=404, detail="Payment provider not found")
    db.delete(provider)
    db.commit()
    return {"success": True}


@router.get("/active")
def get_active_provider(db: Session = Depends(get_db)):
    provider = db.query(PaymentProvider).filter(PaymentProvider.isActive == True).first()
    if not provider:
        raise HTTPException(status_code=404, detail="No active payment provider configured")
    return provider


@router.get("/qr")
def get_payment_qr(courseId: Optional[str] = Query(None), db: Session = Depends(get_db)):
    provider = db.query(PaymentProvider).filter(PaymentProvider.isActive == True).first()
    if not provider:
        raise HTTPException(status_code=404, detail="No payment provider configured")
    return {
        "ownerName": provider.ownerName,
        "razorpayAccountId": provider.razorpayAccountId,
        "upiId": provider.upiId,
        "qrCodeUrl": provider.qrCodeUrl,
        "terms": provider.terms,
        "courseId": courseId,
    }
