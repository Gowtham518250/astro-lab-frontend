import { NextRequest, NextResponse } from 'next/server'
import { getCourseById, updateCourse, deleteCourse, togglePublish } from '@/services/course.service'
import { updateCourseSchema } from '@/lib/validations'
import { getUserFromToken } from '@/services/auth.service'
import { cookies } from 'next/headers'

type Params = { params: Promise<{ courseId: string }> }

// ─── GET /api/courses/[courseId] ──────────────────────────────────
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { courseId } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('astro_session')?.value
    const user = token ? await getUserFromToken(token) : null

    const course = await getCourseById(courseId, user?.id)
    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 })

    return NextResponse.json(course)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ─── PATCH /api/courses/[courseId] — Update (admin) ──────────────
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('astro_session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await getUserFromToken(token)
    if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { courseId } = await params
    const body = await req.json()

    // Special action: toggle publish
    if (body.action === 'togglePublish') {
      const course = await togglePublish(courseId)
      return NextResponse.json(course)
    }

    const parsed = updateCourseSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const course = await updateCourse(courseId, parsed.data)
    return NextResponse.json(course)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ─── DELETE /api/courses/[courseId] — Delete (admin) ─────────────
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('astro_session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await getUserFromToken(token)
    if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { courseId } = await params
    await deleteCourse(courseId)
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
