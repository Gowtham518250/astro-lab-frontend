import { NextRequest, NextResponse } from 'next/server'
import { getAllCourses, createCourse } from '@/services/course.service'
import { createCourseSchema } from '@/lib/validations'
import { getUserFromToken } from '@/services/auth.service'
import { cookies } from 'next/headers'

// ─── GET /api/courses ─────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') ?? undefined
    const level    = searchParams.get('level') ?? undefined
    const search   = searchParams.get('search') ?? undefined
    const featured = searchParams.get('featured') === 'true'
    const page     = parseInt(searchParams.get('page') ?? '1', 10)
    const limit    = parseInt(searchParams.get('limit') ?? '12', 10)

    const result = await getAllCourses({ category, level, search, featured, page, limit })
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ─── POST /api/courses — Create course (admin only) ───────────────
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('astro_session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await getUserFromToken(token)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Admins only' }, { status: 403 })
    }

    const body = await req.json()
    const parsed = createCourseSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const course = await createCourse(parsed.data)
    return NextResponse.json(course, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
