'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  progress: number
  completed: boolean
  enrolledAt: string
  completedAt: string | null
  course: {
    id: string
    title: string
    slug: string
    thumbnail: string
    level: string
    duration: number
    lessons: { id: string }[]
    _count: { lessons: number }
  }
}

export function useProgress() {
  const queryClient = useQueryClient()

  const enrollmentsQuery = useQuery({
    queryKey: ['progress'],
    queryFn: async () => {
      const res = await fetch('/api/progress')
      if (!res.ok) throw new Error('Failed to fetch progress')
      const data = await res.json()
      return data.enrollments as Enrollment[]
    },
  })

  const updateProgress = useMutation({
    mutationFn: async (data: { lessonId: string; courseId: string; completed: boolean; watchedSecs: number }) => {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update progress')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] })
      queryClient.invalidateQueries({ queryKey: ['auth'] }) // refresh XP
    },
  })

  return {
    enrollments: enrollmentsQuery.data ?? [],
    isLoading: enrollmentsQuery.isLoading,
    error: enrollmentsQuery.error,
    updateProgress,
  }
}

export default useProgress
