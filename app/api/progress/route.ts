import { NextRequest, NextResponse } from 'next/server'
import { getEnrolledCourses } from '@/services/course.service'
import { updateLessonProgress } from '@/services/lesson.service'
import { progressSchema } from '@/lib/validations'
import { getUserFromToken } from '@/services/auth.service'
import { cookies } from 'next/headers'

// ─── GET /api/progress ────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('astro_session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const enrollments = await getEnrolledCourses(user.id)
    return NextResponse.json({ enrollments })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ─── POST /api/progress ───────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('astro_session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const parsed = progressSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const result = await updateLessonProgress(
      user.id,
      parsed.data.lessonId,
      parsed.data.courseId,
      parsed.data.completed,
      parsed.data.watchedSecs
    )

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
