# 🚀 Astro Lab — Advanced Science E-Learning Platform

A full-stack, production-ready science education platform built with **Next.js 15** (frontend) and **FastAPI** (backend), connected to **PostgreSQL**.

---

## 🏗️ Project Architecture

```
astro-lab/
├── backend/               ← FastAPI REST API
│   ├── app/
│   │   ├── routers/       ← HTTP controllers (thin)
│   │   ├── services/      ← Business logic layer
│   │   ├── models.py      ← SQLAlchemy ORM
│   │   ├── schemas.py     ← Pydantic validation
│   │   ├── security.py    ← JWT + bcrypt
│   │   ├── database.py    ← DB session (PostgreSQL / SQLite fallback)
│   │   └── main.py        ← App entry, CORS, seeder
│   ├── Dockerfile
│   └── requirements.txt
│
├── app/                   ← Next.js 15 App Router pages
├── components/            ← Shared UI components
├── hooks/                 ← React Query data hooks
├── providers/             ← Context providers
├── public/                ← Static assets
├── docker-compose.yml     ← Full-stack local dev
├── Dockerfile.frontend    ← Next.js Docker image
└── next.config.ts         ← Rewrites /api/* → FastAPI:8000
```

---

## ✨ Features

- 🔐 **JWT Authentication** — Login, register, HTTP-only cookie sessions
- 📚 **Course Catalog** — Filter by category, level, search; enrollment tracking
- 🎥 **Video Lesson Player** — Progress tracking, per-lesson completion
- 💳 **Checkout & Enrollment** — Simulated payment → automatic enrollment
- 🏆 **Certificates** — Auto-issued on 100% course completion
- ⭐ **Favorites** — Save courses, toggle bookmark
- 📊 **Admin Dashboard** — Users, revenue, analytics stats
- 🔔 **Notifications** — Admin-created, mark-as-read
- 🌙 **Dark Mode** — Premium glassmorphism UI
- 🐳 **Docker Ready** — One command to spin up everything

---

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Copy env and start everything
cp .env.example .env
docker-compose up --build
```

Open http://localhost:3000

### Option 2: Manual Development

**1. Start the database**
```bash
# Make sure PostgreSQL is running on port 5432
# Or let the backend fall back to SQLite automatically
```

**2. Start the FastAPI backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
source venv/bin/activate       # Mac/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**3. Start the Next.js frontend**
```bash
# In project root
npm install
npm run dev
```

Open http://localhost:3000

---

## 🔑 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@astrolab.com | admin123 |
| Student | student@astrolab.com | student123 |

---

## 🌍 Deploy Separately

### Backend → Railway / Render / Fly.io
```bash
# Set these environment variables in your platform:
DATABASE_URL=postgresql://...
JWT_SECRET_KEY=your_secure_secret
# Start command:
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Frontend → Vercel
```bash
# Add environment variable:
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
# Update next.config.ts rewrites destination to your deployed backend URL
```

---

## 🔌 API Reference

See [backend/README.md](./backend/README.md) for the full API documentation.

---

## 🧪 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React, Tailwind CSS, Framer Motion |
| Backend | FastAPI, SQLAlchemy, Pydantic |
| Database | PostgreSQL (SQLite fallback for dev) |
| Auth | JWT, bcrypt, HTTP-only cookies |
| State | React Query (TanStack Query) |
| CI/CD | GitHub Actions |
| Deploy | Docker, Railway, Vercel |
