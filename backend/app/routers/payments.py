from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
import razorpay
from ..database import get_db
from ..models import Payment, Enrollment, Course, User, PaymentProvider
from .auth import get_current_user_from_cookie
from ..config import settings

router = APIRouter(prefix="/payment", tags=["payments"])

class PaymentRequest(BaseModel):
    courseId: str
    couponCode: Optional[str] = None

class RazorpayVerifyRequest(BaseModel):
    razorpay_payment_id: str
    razorpay_order_id: str
    razorpay_signature: str
    paymentId: str

def get_razorpay_client(db: Session):
    provider = db.query(PaymentProvider).filter(PaymentProvider.isActive == True).first()
    if not provider or not provider.razorpayKeyId or not provider.razorpayKeySecret:
        return None
    return razorpay.Client(auth=(provider.razorpayKeyId, provider.razorpayKeySecret))

@router.post("")
def create_payment(payload: PaymentRequest, request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
        
    course = db.query(Course).filter(Course.id == payload.courseId).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
        
    # Check if already enrolled
    already_enrolled = db.query(Enrollment).filter(
        Enrollment.userId == user.id,
        Enrollment.courseId == payload.courseId
    ).first()
    
    if already_enrolled:
        raise HTTPException(status_code=400, detail="Already enrolled in this course")
    
    # Calculate final amount (apply discount if any)
    final_amount = course.price
    discount = 0.0
    if payload.couponCode:
        from ..models import Coupon
        coupon = db.query(Coupon).filter(Coupon.code == payload.couponCode, Coupon.active == True).first()
        if coupon:
            from datetime import datetime
            now = datetime.utcnow()
            if (not coupon.expiresAt or coupon.expiresAt >= now) and (not coupon.usageLimit or coupon.usedCount < coupon.usageLimit):
                if course.price >= coupon.minOrderAmount:
                    discount = round(course.price * coupon.discountPercent / 100.0)
                    final_amount = course.price - discount
                    coupon.usedCount += 1
        
    # Create Payment record first
    payment = Payment(
        userId=user.id,
        courseId=payload.courseId,
        amount=final_amount,
        discount=discount,
        currency="INR",
        method="razorpay",
        status="PENDING",
        couponCode=payload.couponCode
    )
    db.add(payment)
    db.commit()
    db.refresh(payment)
    
    # Try to use Razorpay if available
    client = get_razorpay_client(db)
    if client:
        try:
            order_amount = int(final_amount * 100)  # razorpay uses paise
            order_currency = 'INR'
            order_receipt = f"receipt_{payment.id}"
            notes = {
                "payment_id": payment.id,
                "user_id": user.id,
                "course_id": course.id,
                "course_title": course.title
            }
            razorpay_order = client.order.create(dict(amount=order_amount, currency=order_currency, receipt=order_receipt, notes=notes))
            payment.transactionId = razorpay_order['id']
            db.commit()
            return {
                "success": True,
                "paymentType": "razorpay",
                "paymentId": payment.id,
                "razorpayOrderId": razorpay_order['id'],
                "razorpayKeyId": client.auth[0],
                "amount": final_amount,
                "currency": "INR"
            }
        except Exception as e:
            # If Razorpay fails, fall back to manual payment
            payment.method = "manual"
            db.commit()
            provider = db.query(PaymentProvider).filter(PaymentProvider.isActive == True).first()
            return {
                "success": True,
                "paymentType": "manual",
                "paymentId": payment.id,
                "amount": final_amount,
                "currency": "INR",
                "paymentDetails": {
                    "upiId": provider.upiId if provider else None,
                    "qrCodeUrl": provider.qrCodeUrl if provider else None,
                    "terms": provider.terms if provider else None
                }
            }
    else:
        # Manual payment fallback
        payment.method = "manual"
        db.commit()
        provider = db.query(PaymentProvider).filter(PaymentProvider.isActive == True).first()
        return {
            "success": True,
            "paymentType": "manual",
            "paymentId": payment.id,
            "amount": final_amount,
            "currency": "INR",
            "paymentDetails": {
                "upiId": provider.upiId if provider else None,
                "qrCodeUrl": provider.qrCodeUrl if provider else None,
                "terms": provider.terms if provider else None
            }
        }

@router.post("/verify")
def verify_razorpay_payment(payload: RazorpayVerifyRequest, request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
        
    payment = db.query(Payment).filter(Payment.id == payload.paymentId, Payment.userId == user.id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
        
    client = get_razorpay_client(db)
    if not client:
        raise HTTPException(status_code=400, detail="Razorpay not configured")
    
    try:
        params_dict = {
            'razorpay_order_id': payload.razorpay_order_id,
            'razorpay_payment_id': payload.razorpay_payment_id,
            'razorpay_signature': payload.razorpay_signature
        }
        client.utility.verify_payment_signature(params_dict)
        
        payment.status = "COMPLETED"
        payment.transactionId = payload.razorpay_payment_id
        
        # Create Enrollment
        enrollment = Enrollment(
            userId=user.id,
            courseId=payment.courseId,
            progress=0.0,
            completed=False
        )
        db.add(enrollment)
        
        # Award XP
        user.totalXP += 100
        db.commit()
        
        return {"success": True, "payment": payment, "enrollment": enrollment}
    except razorpay.errors.SignatureVerificationError:
        payment.status = "FAILED"
        db.commit()
        raise HTTPException(status_code=400, detail="Invalid signature")

@router.get("/{payment_id}")
def get_payment(payment_id: str, request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
        
    payment = db.query(Payment).filter(Payment.id == payment_id, Payment.userId == user.id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
        
    return payment

@router.post("/{payment_id}/confirm")
def confirm_manual_payment(payment_id: str, request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
        
    payment = db.query(Payment).filter(Payment.id == payment_id, Payment.userId == user.id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
        
    if payment.method != "manual" or payment.status != "PENDING":
        raise HTTPException(status_code=400, detail="Payment not eligible for manual confirmation")
    
    # NOTE: In production, this should only be done by admin!
    # For now, let's require admin for this endpoint
    if user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Admin only")
        
    payment.status = "COMPLETED"
    
    # Create Enrollment
    enrollment = Enrollment(
        userId=payment.userId,
        courseId=payment.courseId,
        progress=0.0,
        completed=False
    )
    db.add(enrollment)
    
    # Award XP
    user_payer = db.query(User).filter(User.id == payment.userId).first()
    if user_payer:
        user_payer.totalXP += 100
        
    db.commit()
    
    return {"success": True, "payment": payment, "enrollment": enrollment}
