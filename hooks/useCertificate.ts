'use client'

import { useQuery } from '@tanstack/react-query'

export interface Certificate {
  id: string
  userId: string
  courseId: string
  certificateUrl: string
  issuedAt: string
  course: {
    title: string
    instructor: string
    thumbnail: string
  }
}

export function useCertificates() {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const res = await fetch('/api/certificates')
      if (!res.ok) throw new Error('Failed to fetch certificates')
      const data = await res.json()
      return data.certificates as Certificate[]
    },
  })
}

export default useCertificates
