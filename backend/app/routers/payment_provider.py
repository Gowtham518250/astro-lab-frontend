from fastapi import APIRouter, Depends, HTTPException, Request, File, UploadFile
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from ..database import get_db
from ..models import PaymentProvider
from .auth import get_current_user_from_cookie
import os
from uuid import uuid4

router = APIRouter(prefix="/payment-provider", tags=["payment-provider"])

# Configure upload directory
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class PaymentProviderCreate(BaseModel):
    ownerName: str
    razorpayKeyId: Optional[str] = None
    razorpayKeySecret: Optional[str] = None
    razorpayAccountId: Optional[str] = None
    upiId: Optional[str] = None
    qrCodeUrl: Optional[str] = None
    terms: Optional[str] = None
    isActive: Optional[bool] = True

class PaymentProviderUpdate(BaseModel):
    ownerName: Optional[str] = None
    razorpayKeyId: Optional[str] = None
    razorpayKeySecret: Optional[str] = None
    razorpayAccountId: Optional[str] = None
    upiId: Optional[str] = None
    qrCodeUrl: Optional[str] = None
    terms: Optional[str] = None
    isActive: Optional[bool] = None

def require_admin(request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user or user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")
    return user

@router.get("")
def list_payment_providers(active: Optional[bool] = None, db: Session = Depends(get_db)):
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

@router.post("/{provider_id}/upload-qr")
async def upload_qr_code(provider_id: str, request: Request, file: UploadFile = File(...), db: Session = Depends(get_db)):
    require_admin(request, db)
    provider = db.query(PaymentProvider).filter(PaymentProvider.id == provider_id).first()
    if not provider:
        raise HTTPException(status_code=404, detail="Payment provider not found")
    
    # Validate file type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"qr_{uuid4().hex}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    # Save file
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    
    # Update provider with QR code URL
    # In production, you'd use a full URL (like S3), but for now we'll use a relative path
    provider.qrCodeUrl = f"/uploads/{unique_filename}"
    db.commit()
    db.refresh(provider)
    
    return {"success": True, "qrCodeUrl": provider.qrCodeUrl, "provider": provider}

@router.delete("/{provider_id}")
def delete_payment_provider(provider_id: str, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    provider = db.query(PaymentProvider).filter(PaymentProvider.id == provider_id).first()
    if not provider:
        raise HTTPException(status_code=404, detail="Payment provider not found")
    
    # Delete QR file if exists
    if provider.qrCodeUrl and provider.qrCodeUrl.startswith("/uploads/"):
        filename = provider.qrCodeUrl.split("/")[-1]
        file_path = os.path.join(UPLOAD_DIR, filename)
        if os.path.exists(file_path):
            os.remove(file_path)
    
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
def get_payment_qr(courseId: Optional[str] = None, db: Session = Depends(get_db)):
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
