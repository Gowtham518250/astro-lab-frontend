'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  BarChart3, Users, BookOpen, CreditCard, Settings, 
  Search, Bell, Plus, TrendingUp, DollarSign, 
  GraduationCap, PlaySquare, FileVideo, Award, LayoutDashboard, QrCode, UploadCloud, CheckCircle2
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarNav = [
  { name: 'Overview', icon: LayoutDashboard, active: true },
  { name: 'Analytics', icon: BarChart3, active: false },
  { name: 'Revenue & Payments', icon: DollarSign, active: false },
  { name: 'Students', icon: Users, active: false },
  { name: 'Course Builder', icon: BookOpen, active: false },
  { name: 'Media Upload', icon: FileVideo, active: false },
  { name: 'Certificates', icon: Award, active: false },
  { name: 'Settings', icon: Settings, active: false },
]

export default function AdminDashboardPage() {
  const [activeItem, setActiveItem] = useState('Overview')
  const [customQr, setCustomQr] = useState<string | null>(null)
  const [uploadingQr, setUploadingQr] = useState(false)

  // Load existing QR on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      const savedQr = localStorage.getItem('astro_custom_qr')
      if (savedQr) setCustomQr(savedQr)
    }
  })

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingQr(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      setTimeout(() => {
        const base64 = event.target?.result as string
        localStorage.setItem('astro_custom_qr', base64)
        setCustomQr(base64)
        setUploadingQr(false)
      }, 800) // Simulated slight network delay
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans dark:bg-slate-950 dark:text-slate-50">
      
      {/* 1. SIDEBAR (Stripe-inspired) */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 bg-white px-4 py-6 dark:border-white/10 dark:bg-slate-950">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Astro Lab</span>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider dark:bg-white/10 dark:text-slate-300">Admin</span>
        </div>

        <nav className="flex-1 space-y-1">
          {sidebarNav.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                activeItem === item.name 
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </button>
          ))}
        </nav>
        
        <div className="mt-auto border-t border-slate-200 pt-4 dark:border-white/10">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold dark:bg-indigo-900 dark:text-indigo-200">
              JS
            </div>
            <div>
              <p className="text-sm font-medium">Jane Smith</p>
              <p className="text-xs text-slate-500">Superadmin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-white/10 dark:bg-slate-950">
          <div className="flex w-full max-w-md items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 dark:border-white/10 dark:bg-slate-900">
            <Search className="h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search students, courses, or transactions..." 
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-white"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white mr-2">
              <LayoutDashboard className="h-5 w-5" />
            </button>
            <button className="relative text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">3</span>
            </button>
            <Link href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">View live site</Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 sm:p-8 dark:bg-slate-900">
          <div className="mx-auto max-w-6xl">
            
            {activeItem === 'Overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Overview</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <button className="hidden sm:flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900">
                      Export Report
                    </button>
                    <button className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition">
                      <Plus className="h-4 w-4" /> New Course
                    </button>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { title: 'Gross Revenue', value: '$124,500.00', trend: '+14.5%', label: 'vs last month' },
                    { title: 'Active Students', value: '12,482', trend: '+8.2%', label: 'vs last month' },
                    { title: 'Course Enrollments', value: '45,893', trend: '+22.4%', label: 'vs last month' },
                    { title: 'Completion Rate', value: '68.4%', trend: '+4.1%', label: 'vs last month' },
                  ].map((metric) => (
                    <div key={metric.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-950">
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{metric.title}</p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-0.5 font-medium text-emerald-600 dark:text-emerald-400">
                          <TrendingUp className="h-3 w-3" /> {metric.trend}
                        </span>
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Chart Mockup */}
                  <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-950">
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-base font-bold text-slate-900 dark:text-white">Revenue Growth</h2>
                      <select className="rounded-md border-slate-200 text-sm dark:border-white/10 dark:bg-slate-900 dark:text-white">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Year to date</option>
                      </select>
                    </div>
                    
                    <div className="flex h-64 items-end gap-2">
                      {[20, 35, 25, 45, 30, 60, 50, 75, 65, 80, 70, 95].map((height, i) => (
                        <div key={i} className="group relative flex flex-1 flex-col items-center gap-2">
                          <div className="relative w-full rounded-t-sm bg-indigo-100 transition-all hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40" style={{ height: '100%' }}>
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ duration: 1, delay: i * 0.05 }}
                              className="absolute bottom-0 w-full rounded-t-sm bg-indigo-600 dark:bg-indigo-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between text-xs text-slate-400">
                      <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                      <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                  </div>

                  {/* Recent Transactions */}
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-950">
                    <h2 className="mb-6 text-base font-bold text-slate-900 dark:text-white">Recent Payments</h2>
                    <div className="space-y-4">
                      {[
                        { name: 'Alex Johnson', course: 'Quantum Mechanics', amount: '$89.00', status: 'Succeeded' },
                        { name: 'Sarah Chen', course: 'Astrobiology', amount: '$59.00', status: 'Succeeded' },
                        { name: 'Mike Ross', course: 'Deep Learning AI', amount: '$149.00', status: 'Succeeded' },
                        { name: 'Emily Davis', course: 'Robotics 101', amount: '$79.00', status: 'Succeeded' },
                        { name: 'John Doe', course: 'Earth Sciences', amount: '$49.00', status: 'Failed' },
                      ].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0 dark:border-white/5">
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{tx.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{tx.course}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{tx.amount}</p>
                            <p className={cn("text-[10px] font-bold uppercase", tx.status === 'Succeeded' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
                              {tx.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-6 w-full rounded-md border border-slate-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-slate-900">
                      View all transactions
                    </button>
                  </div>
                </div>

                {/* Quick Actions / Course Builder preview */}
                <div className="grid gap-6 sm:grid-cols-3">
                  {[
                    { title: 'Upload Lesson Video', desc: 'Add new video resources to AWS bucket.', icon: FileVideo, href: '/admin/upload-video' },
                    { title: 'Create Quiz', desc: 'Build interactive MCQs and assignments.', icon: PlaySquare, href: '/admin/create-quiz' },
                    { title: 'Course Builder', desc: 'Drag-and-drop curriculum editor.', icon: BookOpen, href: '/admin/course-builder' },
                  ].map((action) => (
                    <Link href={action.href} key={action.title} className="group flex flex-col items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm hover:border-indigo-500 hover:bg-indigo-50 dark:border-white/20 dark:bg-slate-950 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-900/20 transition">
                      <div className="rounded-full bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                        <action.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{action.title}</h3>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{action.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {activeItem === 'Revenue & Payments' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Revenue & Payments</h1>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">Manage payment gateways, QR codes, and view recent transaction history.</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-950">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="rounded-full bg-indigo-100 p-2.5 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                        <QrCode className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Payment QR Code</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Display this QR at student checkout.</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                      <div className="relative flex aspect-square w-full max-w-[240px] items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 dark:border-white/20 dark:bg-slate-900">
                        {customQr ? (
                          <img src={customQr} alt="Uploaded QR" className="h-full w-full object-cover p-2" />
                        ) : (
                          <QrCode className="h-16 w-16 text-slate-300 dark:text-slate-600" />
                        )}
                        {uploadingQr && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                          </div>
                        )}
                      </div>

                      <div className="w-full">
                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 shadow-sm">
                          <UploadCloud className="h-5 w-5" />
                          {customQr ? 'Upload New QR Code' : 'Upload QR Code Image'}
                          <input type="file" accept="image/*" className="hidden" onChange={handleQrUpload} />
                        </label>
                        {customQr && (
                          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-4 w-4" /> Synced to Student Checkout
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-950">
                     <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Payment Methods</h2>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-slate-100 p-2 dark:bg-white/10"><CreditCard className="h-5 w-5" /></div>
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white">Razorpay Integration</p>
                              <p className="text-xs text-slate-500">Credit cards, UPI, Netbanking</p>
                            </div>
                          </div>
                          <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:bg-slate-50 dark:border-white/10 dark:hover:bg-slate-900">Connect</button>
                        </div>
                     </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}
