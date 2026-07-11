import { NextRequest, NextResponse } from 'next/server'
import { getAllUsers, getUserById } from '@/services/auth.service'
import { getUserFromToken } from '@/services/auth.service'
import { cookies } from 'next/headers'

// ─── GET /api/users ───────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('astro_session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const currentUser = await getUserFromToken(token)
    if (!currentUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)

    // /api/users?me=true → return current user profile
    if (searchParams.get('me') === 'true') {
      const user = await getUserById(currentUser.id)
      return NextResponse.json({ user })
    }

    // Admin only: list all users
    if (currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const page = parseInt(searchParams.get('page') ?? '1', 10)
    const limit = parseInt(searchParams.get('limit') ?? '20', 10)
    const result = await getAllUsers(page, limit)
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ─── POST /api/users — (Placeholder for admin user creation) ──────
export async function POST(req: NextRequest) {
  return NextResponse.json({ error: 'Use /api/auth to register' }, { status: 400 })
}
