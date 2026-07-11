import { prisma } from '@/lib/prisma'
import type { CreateLessonInput } from '@/lib/validations'
import { issueCertificateIfComplete } from './certificate.service'

// ─── Get lessons for a course ─────────────────────────────────────
export async function getLessons(courseId: string, userId?: string) {
  const lessons = await prisma.lesson.findMany({
    where: { courseId },
    orderBy: { position: 'asc' },
  })

  if (!userId) return lessons

  // Fetch user progress for each lesson
  const progressRecords = await prisma.lessonProgress.findMany({
    where: { userId, lessonId: { in: lessons.map(l => l.id) } },
  })

  const progressMap = new Map(progressRecords.map(p => [p.lessonId, p]))

  return lessons.map(lesson => ({
    ...lesson,
    progress: progressMap.get(lesson.id) ?? null,
  }))
}

// ─── Create lesson (admin) ────────────────────────────────────────
export async function createLesson(data: CreateLessonInput) {
  return prisma.lesson.create({ data })
}

// ─── Update lesson (admin) ────────────────────────────────────────
export async function updateLesson(lessonId: string, data: Partial<CreateLessonInput>) {
  return prisma.lesson.update({ where: { id: lessonId }, data })
}

// ─── Delete lesson (admin) ────────────────────────────────────────
export async function deleteLesson(lessonId: string) {
  return prisma.lesson.delete({ where: { id: lessonId } })
}

// ─── Update lesson progress ───────────────────────────────────────
export async function updateLessonProgress(
  userId: string,
  lessonId: string,
  courseId: string,
  completed: boolean,
  watchedSecs: number
) {
  // Upsert progress record
  await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: { completed, watchedSecs },
    create: { userId, lessonId, completed, watchedSecs },
  })

  if (completed) {
    // Recalculate course progress
    const [totalLessons, completedLessons] = await Promise.all([
      prisma.lesson.count({ where: { courseId } }),
      prisma.lessonProgress.count({
        where: {
          userId,
          completed: true,
          lesson: { courseId },
        },
      }),
    ])

    const progressPct = totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0

    const isComplete = progressPct === 100

    await prisma.enrollment.update({
      where: { userId_courseId: { userId, courseId } },
      data: {
        progress: progressPct,
        completed: isComplete,
        ...(isComplete ? { completedAt: new Date() } : {}),
      },
    })

    // XP for completing lesson
    await prisma.user.update({
      where: { id: userId },
      data: { totalXP: { increment: 25 } },
    })

    // If course complete, issue certificate
    if (isComplete) {
      await issueCertificateIfComplete(userId, courseId)
    }

    return { progress: progressPct, completed: isComplete }
  }

  return { progress: null, completed: false }
}

// ─── Get single lesson ────────────────────────────────────────────
export async function getLessonById(lessonId: string) {
  return prisma.lesson.findUnique({ where: { id: lessonId } })
}
