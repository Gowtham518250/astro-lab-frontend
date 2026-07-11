import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import type { RegisterInput } from '@/lib/validations'

// ─── Register a new student ──────────────────────────────────────
export async function registerUser(input: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email.toLowerCase() },
  })

  if (existingUser) {
    throw new Error('An account with this email already exists.')
  }

  const hashedPassword = await bcrypt.hash(input.password, 12)
  const name = `${input.firstName} ${input.lastName}`.trim()

  const user = await prisma.user.create({
    data: {
      name,
      email: input.email.toLowerCase(),
      emailVerified: false,
      role: 'STUDENT',
      accounts: {
        create: {
          accountId: input.email.toLowerCase(),
          providerId: 'credential',
          password: hashedPassword,
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      totalXP: true,
      streak: true,
      createdAt: true,
    },
  })

  // Welcome notification
  await prisma.notification.create({
    data: {
      userId: user.id,
      title: 'Welcome to Astro Lab! 🚀',
      message: `Hi ${input.firstName}! Your account is ready. Start exploring our science courses.`,
      type: 'success',
    },
  })

  return user
}

// ─── Validate credentials ────────────────────────────────────────
export async function validateCredentials(email: string, password: string) {
  const account = await prisma.account.findFirst({
    where: {
      providerId: 'credential',
      user: { email: email.toLowerCase() },
    },
    include: { user: true },
  })

  if (!account || !account.password) {
    throw new Error('Invalid email or password.')
  }

  const isValid = await bcrypt.compare(password, account.password)
  if (!isValid) {
    throw new Error('Invalid email or password.')
  }

  // Update last login
  await prisma.user.update({
    where: { id: account.userId },
    data: { lastLoginAt: new Date() },
  })

  return account.user
}

// ─── Get user by ID ──────────────────────────────────────────────
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      totalXP: true,
      streak: true,
      createdAt: true,
      enrollments: {
        include: { course: true },
      },
      certificates: true,
      _count: {
        select: { enrollments: true, certificates: true },
      },
    },
  })
}

// ─── Get user from session token ────────────────────────────────
export async function getUserFromToken(token: string) {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!session || session.expiresAt < new Date()) {
    return null
  }

  return session.user
}

// ─── Create session ─────────────────────────────────────────────
export async function createSession(userId: string, userAgent?: string, ipAddress?: string) {
  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  const session = await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
      userAgent,
      ipAddress,
    },
  })

  return session
}

// ─── Delete session (logout) ─────────────────────────────────────
export async function deleteSession(token: string) {
  await prisma.session.deleteMany({ where: { token } })
}

// ─── List all users (admin) ──────────────────────────────────────
export async function getAllUsers(page = 1, limit = 20) {
  const skip = (page - 1) * limit

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        totalXP: true,
        streak: true,
        createdAt: true,
        lastLoginAt: true,
        _count: {
          select: { enrollments: true, certificates: true },
        },
      },
    }),
    prisma.user.count(),
  ])

  return { users, total, pages: Math.ceil(total / limit) }
}
