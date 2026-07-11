import { NextRequest, NextResponse } from 'next/server'
import { registerUser, validateCredentials, createSession, deleteSession, getUserFromToken } from '@/services/auth.service'
import { loginSchema, registerSchema } from '@/lib/validations'
import { cookies } from 'next/headers'

const SESSION_COOKIE = 'astro_session'

// ─── Helper: get session from cookie ─────────────────────────────
async function getSessionUser(req: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  return getUserFromToken(token)
}

// ─── GET /api/auth — Get current user ────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser(req)
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 })
    }
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, totalXP: user.totalXP, streak: user.streak, image: user.image } })
  } catch {
    return NextResponse.json({ user: null }, { status: 200 })
  }
}

// ─── POST /api/auth — Login / Register / Logout ──────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action } = body

    // ── LOGOUT ──────────────────────────────────────────────────
    if (action === 'logout') {
      const cookieStore = await cookies()
      const token = cookieStore.get(SESSION_COOKIE)?.value
      if (token) await deleteSession(token)

      const response = NextResponse.json({ ok: true })
      response.cookies.delete(SESSION_COOKIE)
      return response
    }

    // ── REGISTER ─────────────────────────────────────────────────
    if (action === 'register') {
      const parsed = registerSchema.safeParse(body)
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.errors[0].message },
          { status: 400 }
        )
      }

      const user = await registerUser(parsed.data)
      const session = await createSession(
        user.id,
        req.headers.get('user-agent') ?? undefined,
        req.headers.get('x-forwarded-for') ?? undefined
      )

      const response = NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
      response.cookies.set(SESSION_COOKIE, session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: session.expiresAt,
        path: '/',
      })
      return response
    }

    // ── LOGIN ────────────────────────────────────────────────────
    if (action === 'login') {
      const parsed = loginSchema.safeParse(body)
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.errors[0].message },
          { status: 400 }
        )
      }

      const user = await validateCredentials(parsed.data.email, parsed.data.password)
      const session = await createSession(
        user.id,
        req.headers.get('user-agent') ?? undefined,
        req.headers.get('x-forwarded-for') ?? undefined
      )

      const response = NextResponse.json({
        ok: true,
        user: { id: user.id, name: user.name, email: user.email, role: user.role, totalXP: user.totalXP, streak: user.streak },
      })
      response.cookies.set(SESSION_COOKIE, session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: session.expiresAt,
        path: '/',
      })
      return response
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Authentication failed' }, { status: 401 })
  }
}
