from fastapi import APIRouter, Depends, HTTPException, Request, Query
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from ..database import get_db
from ..models import Announcement, WishlistItem, SupportTicket, PlatformSetting, HelpArticle, ActivityLog, Course, User
from .auth import get_current_user_from_cookie

router = APIRouter(prefix="/platform", tags=["platform"])

class AnnouncementCreate(BaseModel):
    title: str
    content: str
    type: str = "info"
    isPublished: bool = True
    startsAt: Optional[str] = None
    endsAt: Optional[str] = None

class WishlistCreate(BaseModel):
    courseId: str

class TicketCreate(BaseModel):
    subject: str
    message: str
    category: str = "general"
    priority: str = "medium"

class SettingCreate(BaseModel):
    key: str
    value: str
    description: Optional[str] = None

class HelpArticleCreate(BaseModel):
    slug: str
    title: str
    content: str
    category: str = "general"
    isPublished: bool = True


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


@router.get("/announcements")
def list_announcements(db: Session = Depends(get_db)):
    announcements = db.query(Announcement).filter(Announcement.isPublished == True).order_by(Announcement.createdAt.desc()).all()
    return {"announcements": announcements}


@router.post("/announcements")
def create_announcement(payload: AnnouncementCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    announcement = Announcement(**payload.model_dump())
    db.add(announcement)
    db.commit()
    db.refresh(announcement)
    return announcement


@router.get("/wishlist")
def list_wishlist(request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    items = db.query(WishlistItem).filter(WishlistItem.userId == user.id).order_by(WishlistItem.createdAt.desc()).all()
    return {"wishlist": items}


@router.post("/wishlist")
def add_wishlist(payload: WishlistCreate, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    course = db.query(Course).filter(Course.id == payload.courseId).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    existing = db.query(WishlistItem).filter(WishlistItem.userId == user.id, WishlistItem.courseId == payload.courseId).first()
    if existing:
        return {"added": False, "message": "Already in wishlist"}
    item = WishlistItem(userId=user.id, courseId=payload.courseId)
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"added": True, "wishlistItem": item}


@router.delete("/wishlist/{item_id}")
def remove_wishlist(item_id: str, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    item = db.query(WishlistItem).filter(WishlistItem.id == item_id, WishlistItem.userId == user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Wishlist item not found")
    db.delete(item)
    db.commit()
    return {"success": True}


@router.get("/support-tickets")
def list_tickets(request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    if user.role == "ADMIN":
        tickets = db.query(SupportTicket).order_by(SupportTicket.createdAt.desc()).all()
    else:
        tickets = db.query(SupportTicket).filter(SupportTicket.userId == user.id).order_by(SupportTicket.createdAt.desc()).all()
    return {"tickets": tickets}


@router.post("/support-tickets")
def create_ticket(payload: TicketCreate, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    ticket = SupportTicket(userId=user.id, **payload.model_dump())
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return ticket


@router.put("/support-tickets/{ticket_id}")
def update_ticket(ticket_id: str, payload: TicketCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    ticket = db.query(SupportTicket).filter(SupportTicket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    for key, value in payload.model_dump().items():
        setattr(ticket, key, value)
    db.commit()
    db.refresh(ticket)
    return ticket


@router.get("/settings")
def list_settings(db: Session = Depends(get_db)):
    settings = db.query(PlatformSetting).order_by(PlatformSetting.key).all()
    return {"settings": settings}


@router.post("/settings")
def create_setting(payload: SettingCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    setting = PlatformSetting(**payload.model_dump())
    db.add(setting)
    db.commit()
    db.refresh(setting)
    return setting


@router.get("/help-center")
def list_help_articles(db: Session = Depends(get_db)):
    articles = db.query(HelpArticle).filter(HelpArticle.isPublished == True).order_by(HelpArticle.createdAt.desc()).all()
    return {"articles": articles}


@router.post("/help-center")
def create_help_article(payload: HelpArticleCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    article = HelpArticle(**payload.model_dump())
    db.add(article)
    db.commit()
    db.refresh(article)
    return article


@router.get("/activity-logs")
def list_activity_logs(request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    logs = db.query(ActivityLog).order_by(ActivityLog.createdAt.desc()).limit(100).all()
    return {"logs": logs}


@router.post("/activity-logs")
def create_activity_log(payload: dict, request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    log = ActivityLog(userId=user.id if user else None, **payload)
    db.add(log)
    db.commit()
    db.refresh(log)
    return log
