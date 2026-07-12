import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/services/auth.service'
import { cookies } from 'next/headers'

// ─── GET /api/notifications ───────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('astro_session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const unreadOnly = searchParams.get('unread') === 'true'

    const notifications = await prisma.notification.findMany({
      where: {
        userId: user.id,
        ...(unreadOnly ? { isRead: false } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    const unreadCount = await prisma.notification.count({
      where: { userId: user.id, isRead: false },
    })

    return NextResponse.json({ notifications, unreadCount })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ─── POST /api/notifications — Mark read / create ─────────────────
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('astro_session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()

    // Mark all as read
    if (body.action === 'markAllRead') {
      await prisma.notification.updateMany({
        where: { userId: user.id },
        data: { isRead: true },
      })
      return NextResponse.json({ ok: true })
    }

    // Mark single as read
    if (body.action === 'markRead' && body.id) {
      await prisma.notification.update({
        where: { id: body.id },
        data: { isRead: true },
      })
      return NextResponse.json({ ok: true })
    }

    // Admin: create notification for a user
    if (body.action === 'create' && user.role === 'ADMIN') {
      const notification = await prisma.notification.create({
        data: {
          userId: body.userId,
          title: body.title,
          message: body.message,
          type: body.type ?? 'info',
        },
      })
      return NextResponse.json(notification, { status: 201 })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
