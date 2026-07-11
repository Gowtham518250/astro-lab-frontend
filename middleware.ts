import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE = 'astro_session'

// Routes that require login
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/certificates', '/favorites', '/settings', '/checkout']
// Routes that require admin role
const ADMIN_ROUTES = ['/admin']
// Routes only for logged-out users (redirect to dashboard if already logged in)
const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(SESSION_COOKIE)?.value

  // Check if the path matches any protected route
  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r))
  const isAdminRoute = ADMIN_ROUTES.some(r => pathname.startsWith(r))
  const isAuthRoute = AUTH_ROUTES.some(r => pathname.startsWith(r))

  if (isProtected || isAdminRoute) {
    if (!token) {
      // Not logged in → redirect to login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // For admin routes, verify role via API
    if (isAdminRoute) {
      try {
        const apiUrl = new URL('/api/auth', request.url)
        const res = await fetch(apiUrl, {
          headers: { Cookie: `${SESSION_COOKIE}=${token}` },
        })
        const data = await res.json()
        if (!data.user || data.user.role !== 'ADMIN') {
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      } catch {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
