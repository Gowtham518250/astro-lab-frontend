import { z } from 'zod'

// ─── AUTH ────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  country: z.string().optional(),
  education: z.string().optional(),
  interest: z.string().optional(),
  acceptedTerms: z.boolean().refine(val => val === true, 'You must accept the terms'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/\d/, 'Password must contain a number'),
})

// ─── COURSES ─────────────────────────────────────────────────────
export const createCourseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  thumbnail: z.string().url('Must be a valid URL').or(z.string().startsWith('/')),
  category: z.string().min(1, 'Category is required'),
  instructor: z.string().min(2, 'Instructor name is required'),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  duration: z.number().int().min(1, 'Duration must be at least 1 minute'),
  price: z.number().min(0, 'Price cannot be negative'),
  discount: z.number().min(0).max(100).default(0),
  isPremium: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
})

export const updateCourseSchema = createCourseSchema.partial().omit({ slug: true })

// ─── LESSONS ─────────────────────────────────────────────────────
export const createLessonSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  videoUrl: z.string().url('Must be a valid video URL'),
  duration: z.number().int().min(0).default(0),
  position: z.number().int().min(1),
  isFree: z.boolean().default(false),
  courseId: z.string().cuid(),
})

// ─── PAYMENT ─────────────────────────────────────────────────────
export const paymentSchema = z.object({
  courseId: z.string().cuid('Invalid course ID'),
  method: z.enum(['card', 'debit', 'upi', 'google', 'bank', 'apple']),
  couponCode: z.string().optional(),
})

// ─── PROGRESS ────────────────────────────────────────────────────
export const progressSchema = z.object({
  lessonId: z.string().cuid(),
  courseId: z.string().cuid(),
  completed: z.boolean().default(false),
  watchedSecs: z.number().int().min(0).default(0),
})

// ─── NOTIFICATION ────────────────────────────────────────────────
export const createNotificationSchema = z.object({
  userId: z.string().cuid(),
  title: z.string().min(1),
  message: z.string().min(1),
  type: z.enum(['info', 'success', 'warning', 'error']).default('info'),
})

// ─── Types ───────────────────────────────────────────────────────
export type LoginInput       = z.infer<typeof loginSchema>
export type RegisterInput    = z.infer<typeof registerSchema>
export type CreateCourseInput = z.infer<typeof createCourseSchema>
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>
export type CreateLessonInput = z.infer<typeof createLessonSchema>
export type PaymentInput     = z.infer<typeof paymentSchema>
export type ProgressInput    = z.infer<typeof progressSchema>
