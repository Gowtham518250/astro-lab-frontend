import { prisma } from '@/lib/prisma'

// ─── Issue certificate when course is 100% complete ──────────────
export async function issueCertificateIfComplete(userId: string, courseId: string) {
  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
    include: { course: true },
  })

  if (!enrollment || !enrollment.completed) return null

  // Check if certificate already exists
  const existing = await prisma.certificate.findFirst({
    where: { userId, courseId },
  })
  if (existing) return existing

  // Issue certificate
  const certificate = await prisma.certificate.create({
    data: {
      userId,
      courseId,
      courseName: enrollment.course.title,
      grade: enrollment.progress >= 95 ? 'Distinction' : 'Pass',
    },
  })

  // XP reward
  await prisma.user.update({
    where: { id: userId },
    data: { totalXP: { increment: 500 } },
  })

  // Notification
  await prisma.notification.create({
    data: {
      userId,
      title: '🎓 Certificate Earned!',
      message: `Congratulations! You've completed "${enrollment.course.title}" and earned your certificate.`,
      type: 'success',
    },
  })

  return certificate
}

// ─── Get all certificates for a user ─────────────────────────────
export async function getUserCertificates(userId: string) {
  return prisma.certificate.findMany({
    where: { userId },
    orderBy: { issuedAt: 'desc' },
  })
}

// ─── Get certificate by ID ────────────────────────────────────────
export async function getCertificateById(id: string) {
  return prisma.certificate.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
    },
  })
}

// ─── Admin: Get all certificates ─────────────────────────────────
export async function getAllCertificates(page = 1, limit = 20) {
  const skip = (page - 1) * limit
  const [certs, total] = await Promise.all([
    prisma.certificate.findMany({
      skip,
      take: limit,
      orderBy: { issuedAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
      },
    }),
    prisma.certificate.count(),
  ])
  return { certs, total, pages: Math.ceil(total / limit) }
}
