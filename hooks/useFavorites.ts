'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export interface FavoriteCourse {
  id: string
  courseId: string
  createdAt: string
  course: {
    id: string
    title: string
    slug: string
    thumbnail: string
    category: string
    instructor: string
    level: string
    duration: number
    price: number
    discount: number
    isPremium: boolean
  }
}

export function useFavorites() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await fetch('/api/favorites')
      if (!res.ok) throw new Error('Failed to fetch favorites')
      const data = await res.json()
      return data.favorites as FavoriteCourse[]
    },
  })

  const toggle = useMutation({
    mutationFn: async (courseId: string) => {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      })
      if (!res.ok) throw new Error('Failed to update favorite')
      return res.json() as Promise<{ favorited: boolean }>
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      toast.success(data.favorited ? 'Added to favorites' : 'Removed from favorites')
    },
    onError: () => {
      toast.error('Please log in to save favorites')
    },
  })

  const isFavorited = (courseId: string) =>
    (query.data ?? []).some((f) => f.courseId === courseId)

  return {
    favorites: query.data ?? [],
    isLoading: query.isLoading,
    toggle,
    isFavorited,
  }
}

export default useFavorites
