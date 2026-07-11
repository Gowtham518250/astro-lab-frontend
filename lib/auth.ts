import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '@/lib/prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 6,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,      // refresh daily
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // cache session for 5 minutes
    },
  },

  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'STUDENT',
        input: false, // don't allow user to set their own role
      },
      totalXP: {
        type: 'number',
        required: false,
        defaultValue: 0,
        input: false,
      },
      streak: {
        type: 'number',
        required: false,
        defaultValue: 0,
        input: false,
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session
