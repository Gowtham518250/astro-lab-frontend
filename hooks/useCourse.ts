'use client'

import { useQuery } from '@tanstack/react-query'

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string
  category: string
  instructor: string
  level: string
  duration: number
  price: number
  discount: number
  isPremium: boolean
  isFeatured: boolean
  isPublished: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    enrollments: number
    lessons: number
  }
}

interface CoursesResponse {
  courses: Course[]
  total: number
  pages: number
}

export function useCourses(options?: {
  category?: string
  level?: string
  search?: string
  featured?: boolean
  page?: number
  limit?: number
}) {
  return useQuery({
    queryKey: ['courses', options],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (options?.category && options.category !== 'All') params.set('category', options.category)
      if (options?.level) params.set('level', options.level)
      if (options?.search) params.set('search', options.search)
      if (options?.featured) params.set('featured', 'true')
      if (options?.page) params.set('page', options.page.toString())
      if (options?.limit) params.set('limit', options.limit.toString())

      const res = await fetch(`/api/courses?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch courses')
      return res.json() as Promise<CoursesResponse>
    },
  })
}

export function useCourse(courseIdOrSlug: string, isSlug = false) {
  return useQuery({
    queryKey: ['course', courseIdOrSlug],
    queryFn: async () => {
      // For simplicity, we assume we fetch by ID. 
      // The backend route handles ID. If we want slug, we should adjust API.
      // Wait, our API app/api/courses/[courseId]/route.ts is meant for ID.
      // Let's stick to ID for now, or use a separate endpoint for slug.
      const res = await fetch(`/api/courses/${courseIdOrSlug}`)
      if (!res.ok) throw new Error('Failed to fetch course')
      return res.json()
    },
    enabled: !!courseIdOrSlug,
  })
}
