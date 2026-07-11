import { prisma } from '@/lib/prisma'
import type { PaymentInput } from '@/lib/validations'
import { enrollStudent } from './course.service'
import { issueCertificateIfComplete } from './certificate.service'

const COUPONS: Record<string, number> = {
  ASTRO20: 20,
  SCIENCE10: 10,
  LAUNCH50: 50,
  FIRSTCOURSE: 30,
}

// ─── Calculate final price ───────────────────────────────────────
export function calculatePrice(basePrice: number, courseDiscount: number, couponCode?: string) {
  let discountPct = courseDiscount
  const couponDiscount = couponCode ? (COUPONS[couponCode.toUpperCase()] ?? 0) : 0
  discountPct = Math.min(100, discountPct + couponDiscount)

  const discountAmount = (basePrice * discountPct) / 100
  const tax = (basePrice - discountAmount) * 0.08 // 8% tax
  const total = basePrice - discountAmount + tax

  return {
    subtotal: basePrice,
    discountPct,
    discountAmount: Math.round(discountAmount * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
    couponValid: !!couponCode && couponDiscount > 0,
    couponDiscount,
  }
}

// ─── Validate coupon ─────────────────────────────────────────────
export function validateCoupon(code: string) {
  const discount = COUPONS[code.toUpperCase()]
  if (!discount) return { valid: false, discount: 0 }
  return { valid: true, discount }
}

// ─── Create payment record + enroll student ───────────────────────
export async function createPayment(userId: string, input: PaymentInput) {
  const course = await prisma.course.findUnique({ where: { id: input.courseId } })
  if (!course) throw new Error('Course not found.')

  // Check if already enrolled
  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId: input.courseId } },
  })
  if (existing) throw new Error('You are already enrolled in this course.')

  const pricing = calculatePrice(course.price, course.discount, input.couponCode)

  // Create payment record
  const payment = await prisma.payment.create({
    data: {
      userId,
      courseId: input.courseId,
      amount: pricing.total,
      method: input.method,
      couponCode: input.couponCode,
      discount: pricing.discountAmount,
      status: 'COMPLETED', // In real app: PENDING until payment gateway confirms
      transactionId: `AST-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    },
  })

  // Enroll student
  await enrollStudent(userId, input.courseId)

  // Add XP to student
  await prisma.user.update({
    where: { id: userId },
    data: { totalXP: { increment: 100 } },
  })

  // Send notification
  await prisma.notification.create({
    data: {
      userId,
      title: `Enrolled in ${course.title}! 🎉`,
      message: `Welcome to ${course.title}. Start learning and track your progress on your dashboard.`,
      type: 'success',
    },
  })

  return { payment, course, pricing }
}

// ─── Get payment history for user ────────────────────────────────
export async function getPaymentHistory(userId: string) {
  return prisma.payment.findMany({
    where: { userId },
    include: {
      course: { select: { title: true, thumbnail: true, slug: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}

// ─── Get all payments (admin) ────────────────────────────────────
export async function getAllPayments(page = 1, limit = 20) {
  const skip = (page - 1) * limit

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        course: { select: { title: true } },
      },
    }),
    prisma.payment.count(),
  ])

  return { payments, total, pages: Math.ceil(total / limit) }
}
