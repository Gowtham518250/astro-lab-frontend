'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-50">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-white">Profile</h1>
        
        {user && (
          <div className="mt-6 space-y-4">
            <div className="rounded-[18px] border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Name</p>
              <p className="text-lg font-medium text-white">{user.name}</p>
            </div>
            <div className="rounded-[18px] border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Email</p>
              <p className="text-lg font-medium text-white">{user.email}</p>
            </div>
            <div className="rounded-[18px] border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Total XP</p>
              <p className="text-lg font-medium text-amber-400">{user.totalXP?.toLocaleString() || 0} XP</p>
            </div>
            <div className="rounded-[18px] border border-white/10 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Current Streak</p>
              <p className="text-lg font-medium text-orange-400">{user.streak || 0} Days</p>
            </div>
          </div>
        )}

        <Link href="/dashboard" className="mt-8 inline-flex text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          Back to dashboard
        </Link>
      </div>
    </main>
  )
}
