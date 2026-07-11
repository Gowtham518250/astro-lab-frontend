from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Dict, Optional
from ..database import get_db
from ..models import Quiz, QuizQuestion, Notification
from .auth import get_current_user_from_cookie

router = APIRouter(prefix="/quiz", tags=["quiz"])

class SubmitAnswersPayload(BaseModel):
    quizId: str
    answers: Dict[str, int] # questionId -> selectedOptionIndex

@router.get("/{course_id}")
def get_quiz_for_course(course_id: str, request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
        
    quiz = db.query(Quiz).filter(Quiz.courseId == course_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="No quiz found for this course")
        
    # Return questions without exposing correct answer indexes to client
    questions = db.query(QuizQuestion).filter(QuizQuestion.quizId == quiz.id).all()
    return {
        "quizId": quiz.id,
        "title": quiz.title,
        "questions": [
            {
                "id": q.id,
                "text": q.text,
                "options": q.options
            }
            for q in questions
        ]
    }

@router.post("/submit")
def submit_quiz(payload: SubmitAnswersPayload, request: Request, db: Session = Depends(get_db)):
    user = get_current_user_from_cookie(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
        
    quiz = db.query(Quiz).filter(Quiz.id == payload.quizId).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
        
    questions = db.query(QuizQuestion).filter(QuizQuestion.quizId == quiz.id).all()
    if not questions:
        raise HTTPException(status_code=400, detail="Quiz has no questions")
        
    correct_count = 0
    correct_answers = {}
    
    for q in questions:
        correct_answers[q.id] = q.answer
        user_answer = payload.answers.get(q.id)
        if user_answer is not None and user_answer == q.answer:
            correct_count += 1
            
    score = (correct_count / len(questions)) * 100
    passed = score >= 80.0
    
    xp_earned = 0
    if passed:
        xp_earned = 100
        user.totalXP += xp_earned
        
        # Create a notification
        notification = Notification(
            userId=user.id,
            title="Quiz Passed! 🎉",
            message=f"You passed the quiz '{quiz.title}' with {score:.0f}% and earned +{xp_earned} XP!",
            type="success"
        )
        db.add(notification)
        db.commit()
        
    return {
        "score": round(score, 1),
        "passed": passed,
        "correctCount": correct_count,
        "totalQuestions": len(questions),
        "xpEarned": xp_earned,
        "correctAnswers": correct_answers
    }
