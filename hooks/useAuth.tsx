'use client'

import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'STUDENT' | 'ADMIN'
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
      const res = await fetch('/api/auth', { cache: 'no-store' })
      const data = await res.json()
      setUser(data.user ?? null)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      })
      const data = await res.json()
      if (!res.ok) return { ok: false, error: data.error }
      setUser(data.user)
      return { ok: true }
    } catch {
      return { ok: false, error: 'Network error. Please try again.' }
    }
  }, [])

  const register = useCallback(async (formData: any) => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', ...formData }),
      })
      const data = await res.json()
      if (!res.ok) return { ok: false, error: data.error }
      setUser(data.user)
      return { ok: true }
    } catch {
      return { ok: false, error: 'Network error. Please try again.' }
    }
  }, [])

  const logout = useCallback(async () => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    })
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
