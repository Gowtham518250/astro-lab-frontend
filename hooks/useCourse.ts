'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchApi } from '@/lib/api'

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
  previewVideo?: string
  mainVideo?: string
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

      const res = await fetchApi(`/api/courses?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch courses')
      return res.json() as Promise<CoursesResponse>
    },
  })
}

export function useCourse(courseIdOrSlug: string, isSlug = false) {
  return useQuery({
    queryKey: ['course', courseIdOrSlug],
    queryFn: async () => {
      const res = await fetchApi(`/api/courses/${courseIdOrSlug}`)
      if (!res.ok) throw new Error('Failed to fetch course')
      return res.json()
    },
    enabled: !!courseIdOrSlug,
  })
}
