from fastapi import APIRouter, Depends, HTTPException, Request, Query
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from ..database import get_db
from ..models import Organization, University, Department, CourseModule, CourseSection, CourseDocument, Assignment, CodingAssignment, PeerReview, Exam, ForumThread, ForumPost, LiveClass, ScheduleItem, CalendarEvent, Message, Subscription, Scholarship, RefundRequest, Invoice, ReportItem, ModerationItem, LocalizationSetting
from .auth import get_current_user_from_cookie

router = APIRouter(prefix="/enterprise", tags=["enterprise"])

class OrganizationCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    website: Optional[str] = None
    type: str = "company"

class UniversityCreate(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    country: Optional[str] = None

class DepartmentCreate(BaseModel):
    universityId: str
    name: str
    slug: str
    description: Optional[str] = None

class ModuleCreate(BaseModel):
    courseId: str
    title: str
    description: Optional[str] = None
    position: int = 1

class SectionCreate(BaseModel):
    courseId: str
    moduleId: Optional[str] = None
    title: str
    description: Optional[str] = None
    position: int = 1

class DocumentCreate(BaseModel):
    courseId: str
    title: str
    url: str
    fileType: Optional[str] = None

class AssignmentCreate(BaseModel):
    courseId: str
    title: str
    description: str
    dueDate: Optional[str] = None
    maxScore: int = 100

class CodingAssignmentCreate(BaseModel):
    courseId: str
    title: str
    description: str
    difficulty: str = "easy"
    starterCode: Optional[str] = None

class ExamCreate(BaseModel):
    courseId: str
    title: str
    description: Optional[str] = None
    duration: int = 60
    passingScore: int = 70

class ThreadCreate(BaseModel):
    courseId: str
    title: str
    content: str

class PostCreate(BaseModel):
    threadId: str
    content: str

class LiveClassCreate(BaseModel):
    courseId: str
    title: str
    startAt: str
    durationMinutes: int = 60
    meetingUrl: Optional[str] = None

class ScheduleCreate(BaseModel):
    courseId: str
    title: str
    startAt: str
    endAt: str
    type: str = "lesson"

class EventCreate(BaseModel):
    title: str
    startAt: str
    endAt: str
    description: Optional[str] = None

class MessageCreate(BaseModel):
    receiverId: str
    conversationId: str
    content: str

class SubscriptionCreate(BaseModel):
    planName: str
    status: str = "active"
    endAt: Optional[str] = None
    amount: float = 0.0

class ScholarshipCreate(BaseModel):
    courseId: str
    amount: float = 0.0
    reason: Optional[str] = None

class RefundCreate(BaseModel):
    paymentId: str
    amount: float = 0.0
    reason: Optional[str] = None

class InvoiceCreate(BaseModel):
    amount: float
    currency: str = "INR"
    dueDate: Optional[str] = None

class ReportCreate(BaseModel):
    type: str
    title: str
    description: Optional[str] = None

class ModerationCreate(BaseModel):
    entityType: str
    entityId: str
    reason: str

class LocalizationCreate(BaseModel):
    locale: str
    key: str
    value: str


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


@router.get("/organizations")
def list_organizations(db: Session = Depends(get_db)):
    return {"organizations": db.query(Organization).order_by(Organization.name).all()}


@router.post("/organizations")
def create_organization(payload: OrganizationCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    org = Organization(**payload.model_dump())
    db.add(org)
    db.commit()
    db.refresh(org)
    return org


@router.get("/universities")
def list_universities(db: Session = Depends(get_db)):
    return {"universities": db.query(University).order_by(University.name).all()}


@router.post("/universities")
def create_university(payload: UniversityCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    university = University(**payload.model_dump())
    db.add(university)
    db.commit()
    db.refresh(university)
    return university


@router.get("/departments")
def list_departments(db: Session = Depends(get_db)):
    return {"departments": db.query(Department).order_by(Department.name).all()}


@router.post("/departments")
def create_department(payload: DepartmentCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    department = Department(**payload.model_dump())
    db.add(department)
    db.commit()
    db.refresh(department)
    return department


@router.get("/modules")
def list_modules(db: Session = Depends(get_db)):
    return {"modules": db.query(CourseModule).order_by(CourseModule.position).all()}


@router.post("/modules")
def create_module(payload: ModuleCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    module = CourseModule(**payload.model_dump())
    db.add(module)
    db.commit()
    db.refresh(module)
    return module


@router.get("/sections")
def list_sections(db: Session = Depends(get_db)):
    return {"sections": db.query(CourseSection).order_by(CourseSection.position).all()}


@router.post("/sections")
def create_section(payload: SectionCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    section = CourseSection(**payload.model_dump())
    db.add(section)
    db.commit()
    db.refresh(section)
    return section


@router.get("/documents")
def list_documents(db: Session = Depends(get_db)):
    return {"documents": db.query(CourseDocument).order_by(CourseDocument.createdAt.desc()).all()}


@router.post("/documents")
def create_document(payload: DocumentCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    document = CourseDocument(**payload.model_dump())
    db.add(document)
    db.commit()
    db.refresh(document)
    return document


@router.get("/assignments")
def list_assignments(db: Session = Depends(get_db)):
    return {"assignments": db.query(Assignment).order_by(Assignment.createdAt.desc()).all()}


@router.post("/assignments")
def create_assignment(payload: AssignmentCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    assignment = Assignment(**payload.model_dump())
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment


@router.get("/coding-assignments")
def list_coding_assignments(db: Session = Depends(get_db)):
    return {"codingAssignments": db.query(CodingAssignment).order_by(CodingAssignment.createdAt.desc()).all()}


@router.post("/coding-assignments")
def create_coding_assignment(payload: CodingAssignmentCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    assignment = CodingAssignment(**payload.model_dump())
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment


@router.get("/exams")
def list_exams(db: Session = Depends(get_db)):
    return {"exams": db.query(Exam).order_by(Exam.createdAt.desc()).all()}


@router.post("/exams")
def create_exam(payload: ExamCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    exam = Exam(**payload.model_dump())
    db.add(exam)
    db.commit()
    db.refresh(exam)
    return exam


@router.get("/forums")
def list_forums(db: Session = Depends(get_db)):
    return {"threads": db.query(ForumThread).order_by(ForumThread.createdAt.desc()).all()}


@router.post("/forums")
def create_forum_thread(payload: ThreadCreate, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    thread = ForumThread(userId=user.id, **payload.model_dump())
    db.add(thread)
    db.commit()
    db.refresh(thread)
    return thread


@router.post("/forums/posts")
def create_forum_post(payload: PostCreate, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    post = ForumPost(userId=user.id, **payload.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.get("/live-classes")
def list_live_classes(db: Session = Depends(get_db)):
    return {"liveClasses": db.query(LiveClass).order_by(LiveClass.startAt).all()}


@router.post("/live-classes")
def create_live_class(payload: LiveClassCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    live_class = LiveClass(**payload.model_dump())
    db.add(live_class)
    db.commit()
    db.refresh(live_class)
    return live_class


@router.get("/schedules")
def list_schedules(db: Session = Depends(get_db)):
    return {"schedules": db.query(ScheduleItem).order_by(ScheduleItem.startAt).all()}


@router.post("/schedules")
def create_schedule(payload: ScheduleCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    schedule = ScheduleItem(**payload.model_dump())
    db.add(schedule)
    db.commit()
    db.refresh(schedule)
    return schedule


@router.get("/calendar")
def list_calendar_events(db: Session = Depends(get_db)):
    return {"events": db.query(CalendarEvent).order_by(CalendarEvent.startAt).all()}


@router.post("/calendar")
def create_calendar_event(payload: EventCreate, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    event = CalendarEvent(userId=user.id, **payload.model_dump())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


@router.get("/messages")
def list_messages(db: Session = Depends(get_db)):
    return {"messages": db.query(Message).order_by(Message.createdAt.desc()).all()}


@router.post("/messages")
def create_message(payload: MessageCreate, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    message = Message(senderId=user.id, **payload.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


@router.get("/subscriptions")
def list_subscriptions(db: Session = Depends(get_db)):
    return {"subscriptions": db.query(Subscription).order_by(Subscription.createdAt.desc()).all()}


@router.post("/subscriptions")
def create_subscription(payload: SubscriptionCreate, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    subscription = Subscription(userId=user.id, **payload.model_dump())
    db.add(subscription)
    db.commit()
    db.refresh(subscription)
    return subscription


@router.get("/scholarships")
def list_scholarships(db: Session = Depends(get_db)):
    return {"scholarships": db.query(Scholarship).order_by(Scholarship.createdAt.desc()).all()}


@router.post("/scholarships")
def create_scholarship(payload: ScholarshipCreate, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    scholarship = Scholarship(userId=user.id, **payload.model_dump())
    db.add(scholarship)
    db.commit()
    db.refresh(scholarship)
    return scholarship


@router.get("/refunds")
def list_refunds(db: Session = Depends(get_db)):
    return {"refunds": db.query(RefundRequest).order_by(RefundRequest.createdAt.desc()).all()}


@router.post("/refunds")
def create_refund(payload: RefundCreate, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    refund = RefundRequest(userId=user.id, **payload.model_dump())
    db.add(refund)
    db.commit()
    db.refresh(refund)
    return refund


@router.get("/invoices")
def list_invoices(db: Session = Depends(get_db)):
    return {"invoices": db.query(Invoice).order_by(Invoice.createdAt.desc()).all()}


@router.post("/invoices")
def create_invoice(payload: InvoiceCreate, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    invoice = Invoice(userId=user.id, **payload.model_dump())
    db.add(invoice)
    db.commit()
    db.refresh(invoice)
    return invoice


@router.get("/reports")
def list_reports(db: Session = Depends(get_db)):
    return {"reports": db.query(ReportItem).order_by(ReportItem.createdAt.desc()).all()}


@router.post("/reports")
def create_report(payload: ReportCreate, request: Request, db: Session = Depends(get_db)):
    user = require_user(request, db)
    report = ReportItem(userId=user.id, **payload.model_dump())
    db.add(report)
    db.commit()
    db.refresh(report)
    return report


@router.get("/moderation")
def list_moderation_items(db: Session = Depends(get_db)):
    return {"moderationItems": db.query(ModerationItem).order_by(ModerationItem.createdAt.desc()).all()}


@router.post("/moderation")
def create_moderation_item(payload: ModerationCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    item = ModerationItem(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.get("/localization")
def list_localization_settings(db: Session = Depends(get_db)):
    return {"localization": db.query(LocalizationSetting).order_by(LocalizationSetting.locale).all()}


@router.post("/localization")
def create_localization_setting(payload: LocalizationCreate, request: Request, db: Session = Depends(get_db)):
    require_admin(request, db)
    setting = LocalizationSetting(**payload.model_dump())
    db.add(setting)
    db.commit()
    db.refresh(setting)
    return setting
