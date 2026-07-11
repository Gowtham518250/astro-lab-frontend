import { NextRequest, NextResponse } from 'next/server'
import { createPayment, getPaymentHistory, getAllPayments, validateCoupon, calculatePrice } from '@/services/payment.service'
import { paymentSchema } from '@/lib/validations'
import { getUserFromToken } from '@/services/auth.service'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

// ─── GET /api/payment ─────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('astro_session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)

    // Admin: all payments
    if (user.role === 'ADMIN') {
      const page = parseInt(searchParams.get('page') ?? '1', 10)
      const result = await getAllPayments(page)
      return NextResponse.json(result)
    }

    // Student: own payment history
    const payments = await getPaymentHistory(user.id)
    return NextResponse.json({ payments })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ─── POST /api/payment ────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('astro_session')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()

    // Action: validate coupon
    if (body.action === 'validateCoupon') {
      const result = validateCoupon(body.code ?? '')
      return NextResponse.json(result)
    }

    // Action: preview price
    if (body.action === 'previewPrice') {
      const course = await prisma.course.findUnique({ where: { id: body.courseId } })
      if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 })
      const pricing = calculatePrice(course.price, course.discount, body.couponCode)
      return NextResponse.json(pricing)
    }

    // Main: process payment + enroll
    const parsed = paymentSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
    }

    const result = await createPayment(user.id, parsed.data)
    return NextResponse.json(result, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
