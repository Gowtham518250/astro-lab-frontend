'use client'

import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { fetchApi } from '@/lib/api'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'USER' | 'STUDENT' | 'ADMIN'
  totalXP: number
  streak: number
  image?: string | null
}

interface AuthState {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  register: (data: any) => Promise<{ ok: boolean; error?: string }>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

// ─── Auth Context ─────────────────────────────────────────────────
export const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  login: async () => ({ ok: false }),
  register: async () => ({ ok: false }),
  logout: async () => {},
  refresh: async () => {},
})

// ─── Auth Provider ────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const refresh = useCallback(async () => {
    try {
      const res = await fetchApi('/api/users/me')
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetchApi('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) return { ok: false, error: data.detail || 'Login failed' }
      
      // Store the Bearer token in localStorage
      if (data.access_token) {
        localStorage.setItem('astro_lab_token', data.access_token)
      }
      
      setUser(data.user)
      return { ok: true }
    } catch {
      return { ok: false, error: 'Network error. Please try again.' }
    }
  }, [])

  const register = useCallback(async (formData: any) => {
    try {
      const res = await fetchApi('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
           name: formData.name, 
           email: formData.email, 
           password: formData.password,
           role: formData.role || 'USER'
        }),
      })
      const data = await res.json()
      if (!res.ok) return { ok: false, error: data.detail || 'Registration failed' }
      
      if (data.access_token) {
        localStorage.setItem('astro_lab_token', data.access_token)
      }
      
      setUser(data.user)
      return { ok: true }
    } catch {
      return { ok: false, error: 'Network error. Please try again.' }
    }
  }, [])

  const logout = useCallback(async () => {
    localStorage.removeItem('astro_lab_token')
    
    // Attempt backend logout to clear any HttpOnly cookies just in case
    try {
      await fetchApi('/api/auth/logout', { method: 'POST' })
    } catch {}
    
    setUser(null)
    router.push('/')
  }, [router])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────
export function useAuth() {
  return useContext(AuthContext)
}

export default useAuth
