import { prisma } from '@/lib/prisma'
import type { CreateCourseInput, UpdateCourseInput } from '@/lib/validations'

// ─── Get all published courses (with optional filters) ────────────
export async function getAllCourses(options?: {
  category?: string
  level?: string
  search?: string
  featured?: boolean
  page?: number
  limit?: number
}) {
  const { category, level, search, featured, page = 1, limit = 12 } = options ?? {}
  const skip = (page - 1) * limit

  const where = {
    isPublished: true,
    ...(category && category !== 'All' ? { category } : {}),
    ...(level ? { level: level as any } : {}),
    ...(featured ? { isFeatured: true } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
            { instructor: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  }

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { enrollments: true, lessons: true },
        },
      },
    }),
    prisma.course.count({ where }),
  ])

  return { courses, total, pages: Math.ceil(total / limit) }
}

// ─── Get course by ID with full details ──────────────────────────
export async function getCourseById(courseId: string, userId?: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      lessons: {
        orderBy: { position: 'asc' },
      },
      _count: {
        select: { enrollments: true },
      },
    },
  })

  if (!course) return null

  // Check if user is enrolled
  let isEnrolled = false
  let enrollment = null
  if (userId) {
    enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    })
    isEnrolled = !!enrollment
  }

  return { ...course, isEnrolled, enrollment }
}

// ─── Get course by slug ──────────────────────────────────────────
export async function getCourseBySlug(slug: string, userId?: string) {
  const course = await prisma.course.findUnique({ where: { slug } })
  if (!course) return null
  return getCourseById(course.id, userId)
}

// ─── Create course (admin) ───────────────────────────────────────
export async function createCourse(data: CreateCourseInput) {
  const exists = await prisma.course.findUnique({ where: { slug: data.slug } })
  if (exists) throw new Error('A course with this slug already exists.')

  return prisma.course.create({ data })
}

// ─── Update course (admin) ───────────────────────────────────────
export async function updateCourse(courseId: string, data: UpdateCourseInput) {
  return prisma.course.update({
    where: { id: courseId },
    data,
  })
}

// ─── Delete course (admin) ───────────────────────────────────────
export async function deleteCourse(courseId: string) {
  return prisma.course.delete({ where: { id: courseId } })
}

// ─── Toggle publish status ───────────────────────────────────────
export async function togglePublish(courseId: string) {
  const course = await prisma.course.findUnique({ where: { id: courseId } })
  if (!course) throw new Error('Course not found')

  return prisma.course.update({
    where: { id: courseId },
    data: { isPublished: !course.isPublished },
  })
}

// ─── Enroll student in course ────────────────────────────────────
export async function enrollStudent(userId: string, courseId: string) {
  const existing = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } },
  })

  if (existing) return existing

  return prisma.enrollment.create({
    data: { userId, courseId },
  })
}

// ─── Get enrolled courses for user ───────────────────────────────
export async function getEnrolledCourses(userId: string) {
  return prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          lessons: { orderBy: { position: 'asc' }, take: 1 },
          _count: { select: { lessons: true } },
        },
      },
    },
    orderBy: { enrolledAt: 'desc' },
  })
}

// ─── Get admin analytics ─────────────────────────────────────────
export async function getAdminStats() {
  const [
    totalUsers,
    totalStudents,
    totalCourses,
    totalEnrollments,
    totalRevenue,
    recentPayments,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.course.count({ where: { isPublished: true } }),
    prisma.enrollment.count(),
    prisma.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
    }),
    prisma.payment.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      where: { status: 'COMPLETED' },
      include: {
        user: { select: { name: true } },
        course: { select: { title: true } },
      },
    }),
  ])

  const completionRate = totalEnrollments > 0
    ? await prisma.enrollment.count({ where: { completed: true } })
    : 0

  return {
    totalUsers,
    totalStudents,
    totalCourses,
    totalEnrollments,
    grossRevenue: totalRevenue._sum.amount ?? 0,
    completionRate: totalEnrollments > 0
      ? Math.round((completionRate / totalEnrollments) * 100)
      : 0,
    recentPayments,
  }
}
