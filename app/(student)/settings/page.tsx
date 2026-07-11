'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Bell, Shield, Palette, Monitor, LogOut, ChevronRight, Moon, Sun, Save, Camera } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
]

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [darkMode, setDarkMode] = useState(true)
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(false)
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaving(false)
    toast.success('Settings saved successfully!')
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-white">Settings</h1>
          <p className="mt-2 text-slate-400">Manage your account, notifications, and preferences.</p>
        </motion.div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <nav className="rounded-[24px] border border-white/10 bg-slate-900/50 backdrop-blur-xl overflow-hidden">
              {TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-5 py-4 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-white/10 text-white border-l-2 border-cyan-400'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </span>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </button>
                )
              })}
              <div className="border-t border-white/10">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-5 py-4 text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="rounded-[24px] border border-white/10 bg-slate-900/50 backdrop-blur-xl p-6 sm:p-8 space-y-6">
                    <h2 className="text-xl font-bold text-white">Profile Information</h2>

                    {/* Avatar */}
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                          {user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 border border-white/20 text-white hover:bg-slate-700 transition">
                          <Camera className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div>
                        <p className="font-semibold text-white">{user?.name}</p>
                        <p className="text-sm text-slate-400">{user?.role}</p>
                        <p className="text-sm text-amber-400 mt-1">⚡ {user?.totalXP?.toLocaleString()} XP</p>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                        <input
                          type="text"
                          value={user?.role || ''}
                          disabled
                          className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-slate-500 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Learning Streak</label>
                        <input
                          type="text"
                          value={`${user?.streak || 0} Days 🔥`}
                          disabled
                          className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-orange-400 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition disabled:opacity-50"
                      >
                        {saving ? (
                          <><span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Saving...</>
                        ) : (
                          <><Save className="h-4 w-4" /> Save Changes</>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div key="notifications" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="rounded-[24px] border border-white/10 bg-slate-900/50 backdrop-blur-xl p-6 sm:p-8 space-y-6">
                    <h2 className="text-xl font-bold text-white">Notification Preferences</h2>
                    <div className="space-y-4">
                      {[
                        { label: 'Email Notifications', desc: 'Receive course updates and announcements by email', state: emailNotifs, setState: setEmailNotifs },
                        { label: 'Push Notifications', desc: 'Browser push notifications for new content', state: pushNotifs, setState: setPushNotifs },
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/5 p-5">
                          <div>
                            <p className="font-medium text-white">{item.label}</p>
                            <p className="text-sm text-slate-400 mt-0.5">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => item.setState(!item.state)}
                            className={cn(
                              'relative h-6 w-11 rounded-full transition-colors duration-300 focus:outline-none',
                              item.state ? 'bg-cyan-500' : 'bg-slate-700'
                            )}
                          >
                            <span className={cn(
                              'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300',
                              item.state ? 'translate-x-5' : 'translate-x-0'
                            )} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition">
                        <Save className="h-4 w-4" /> Save Preferences
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'appearance' && (
                <motion.div key="appearance" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="rounded-[24px] border border-white/10 bg-slate-900/50 backdrop-blur-xl p-6 sm:p-8 space-y-6">
                    <h2 className="text-xl font-bold text-white">Appearance</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Dark Mode', icon: Moon, active: darkMode },
                        { label: 'Light Mode', icon: Sun, active: !darkMode },
                      ].map(({ label, icon: Icon, active }) => (
                        <button
                          key={label}
                          onClick={() => setDarkMode(label === 'Dark Mode')}
                          className={cn(
                            'flex flex-col items-center gap-3 rounded-[18px] border p-6 transition-all',
                            active
                              ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-400'
                              : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                          )}
                        >
                          <Icon className="h-8 w-8" />
                          <span className="text-sm font-medium">{label}</span>
                          {active && <span className="text-xs text-cyan-300 border border-cyan-400/30 rounded-full px-2 py-0.5">Active</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="rounded-[24px] border border-white/10 bg-slate-900/50 backdrop-blur-xl p-6 sm:p-8 space-y-6">
                    <h2 className="text-xl font-bold text-white">Security</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-600 focus:border-cyan-400/50 focus:outline-none transition" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-600 focus:border-cyan-400/50 focus:outline-none transition" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-600 focus:border-cyan-400/50 focus:outline-none transition" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition">
                        <Shield className="h-4 w-4" /> Update Password
                      </button>
                    </div>

                    <div className="mt-6 rounded-[18px] border border-rose-500/20 bg-rose-500/10 p-5">
                      <h3 className="font-semibold text-rose-300 mb-1">Danger Zone</h3>
                      <p className="text-sm text-slate-400 mb-4">Permanently delete your account and all of your data.</p>
                      <button className="rounded-xl border border-rose-500/50 px-4 py-2 text-sm font-medium text-rose-400 hover:bg-rose-500/20 transition">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
