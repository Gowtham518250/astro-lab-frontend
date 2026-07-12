'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  BarChart3, Users, BookOpen, CreditCard, Settings, 
  Search, Bell, Plus, TrendingUp, DollarSign, 
  GraduationCap, PlaySquare, FileVideo, Award, LayoutDashboard, QrCode, UploadCloud, CheckCircle2, ChevronRight
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
  const [stats, setStats] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load existing QR on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      const savedQr = localStorage.getItem('astro_custom_qr')
      if (savedQr) setCustomQr(savedQr)
    }
  })

  // Fetch admin data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('astro_lab_token')
        const headers = { 'Authorization': `Bearer ${token}` }
        
        const [statsRes, usersRes, coursesRes] = await Promise.all([
          fetch('/api/users/stats', { headers }),
          fetch('/api/users', { headers }),
          fetch('/api/courses?limit=50', { headers })
        ])
        
        if (statsRes.ok) setStats(await statsRes.json())
        if (usersRes.ok) {
          const data = await usersRes.json()
          setUsers(data.users || [])
        }
        if (coursesRes.ok) {
          const data = await coursesRes.json()
          setCourses(data.courses || [])
        }
      } catch (err) {
        console.error("Failed to fetch admin data", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

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
            <Link href="/dashboard" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">View live site</Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 sm:p-8 dark:bg-slate-950 font-sans selection:bg-indigo-500/30">
          <div className="mx-auto max-w-7xl">
            
            {activeItem === 'Overview' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Owner Dashboard</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <button 
                      onClick={() => {
                        if (!stats) return
                        const csvContent = "data:text/csv;charset=utf-8,Metric,Value\n"
                          + `Total Users,${stats.totalUsers}\n`
                          + `Total Revenue,${stats.totalRevenue}\n`
                          + `Total Enrollments,${stats.totalEnrollments}\n`
                          + `Completed Courses,${stats.completedCourses}`;
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", "admin_report.csv");
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 transition-all"
                    >
                      Export Report
                    </button>
                    <button 
                      onClick={() => setActiveItem('Course Builder')}
                      className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all"
                    >
                      <Plus className="h-4 w-4" /> New Course
                    </button>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { title: 'Gross Revenue', value: stats ? `₹${stats.totalRevenue.toLocaleString()}` : '₹0', trend: '+14.5%', label: 'vs last month', icon: DollarSign },
                    { title: 'Active Students', value: stats ? stats.totalUsers.toLocaleString() : '0', trend: '+8.2%', label: 'vs last month', icon: Users },
                    { title: 'Course Enrollments', value: stats ? stats.totalEnrollments.toLocaleString() : '0', trend: '+22.4%', label: 'vs last month', icon: BookOpen },
                    { title: 'Completion Rate', value: stats && stats.totalEnrollments ? `${Math.round((stats.completedCourses / stats.totalEnrollments) * 100)}%` : '0%', trend: '+4.1%', label: 'vs last month', icon: CheckCircle2 },
                  ].map((metric, i) => (
                    <motion.div 
                      key={metric.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, type: "spring" }}
                      whileHover={{ y: -5 }}
                      className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/50 backdrop-blur-xl overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                          <metric.icon className="h-5 w-5" />
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                          <TrendingUp className="h-3 w-3" /> {metric.trend}
                        </span>
                      </div>
                      <div className="relative z-10">
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{metric.title}</p>
                        <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{metric.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                  
                  {/* Master Course List */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900/50 backdrop-blur-xl"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Courses</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and track revenue per course.</p>
                      </div>
                      <Link href="/admin/courses" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center gap-1 transition-colors">
                        View All <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>

                    <motion.div 
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: { staggerChildren: 0.1 }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                      className="space-y-4"
                    >
                      {courses.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">No active courses yet.</div>
                      ) : courses.map(course => (
                        <motion.div 
                          key={course.id} 
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            show: { opacity: 1, y: 0 }
                          }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white/50 p-4 transition-all shadow-sm hover:shadow-md hover:border-indigo-500/30 hover:bg-white dark:border-white/10 dark:bg-slate-900/40 dark:hover:bg-slate-800/80 dark:hover:border-indigo-400/30 backdrop-blur-md cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-bold shadow-sm text-sm">
                              {course.title.substring(0,2).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{course.title}</p>
                              <p className="text-xs font-medium text-slate-500 mt-1">Price: ₹{course.price} • {course._count?.enrollments || 0} Enrollments</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">₹{((course.price || 0) * (course._count?.enrollments || 0)).toLocaleString()}</p>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-1">Total Earned</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* QR Code Upload Dropzone */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900/50 backdrop-blur-xl flex flex-col"
                  >
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <QrCode className="h-6 w-6 text-indigo-500" />
                        Payment QR Code
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Students will scan this custom UPI/Payment QR to purchase your courses.
                      </p>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="relative w-full max-w-[240px] aspect-square rounded-3xl border-2 border-dashed border-slate-300 dark:border-white/20 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center overflow-hidden group cursor-pointer">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleQrUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />
                        
                        {uploadingQr ? (
                          <div className="flex flex-col items-center gap-3">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
                            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Uploading...</span>
                          </div>
                        ) : customQr ? (
                          <>
                            <img src={customQr} alt="Owner QR" className="absolute inset-0 w-full h-full object-contain p-4 bg-white z-10 transition-transform group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col items-center justify-center text-white">
                              <UploadCloud className="h-8 w-8 mb-2" />
                              <span className="text-sm font-bold">Replace QR</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400 p-6 text-center group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            <div className="rounded-full bg-slate-200 dark:bg-white/10 p-4 mb-2 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
                              <UploadCloud className="h-8 w-8" />
                            </div>
                            <span className="text-sm font-bold">Click to upload QR Code</span>
                            <span className="text-xs">PNG, JPG up to 5MB</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
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
            
            {activeItem === 'Course Builder' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-3xl">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Course Builder</h1>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">Create a new course, set pricing, and add video content.</p>
                </div>

                <form className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-950" onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const data = {
                    title: formData.get('title'),
                    price: Number(formData.get('price')),
                    category: formData.get('category'),
                    previewVideo: formData.get('previewVideo'),
                    mainVideo: formData.get('mainVideo')
                  };
                  try {
                    const token = localStorage.getItem('astro_lab_token');
                    const res = await fetch('/api/courses', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                      body: JSON.stringify(data)
                    });
                    if(res.ok) {
                      alert("Course created successfully!");
                      form.reset();
                      // Refresh courses list in background
                      fetch('/api/courses?limit=50', { headers: { 'Authorization': `Bearer ${token}` }})
                        .then(r => r.json())
                        .then(d => setCourses(d.courses || []));
                    } else {
                      alert("Failed to create course.");
                    }
                  } catch(err) {
                    alert("Error creating course.");
                  }
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Course Title</label>
                      <input name="title" required type="text" placeholder="e.g. Advanced Quantum Mechanics" className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-white/20 dark:text-white" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price ($)</label>
                        <input name="price" required type="number" min="0" placeholder="89.99" className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-white/20 dark:text-white" />
                        <p className="mt-1 text-xs text-slate-500">This exact cost will be shown to students at checkout.</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                        <select name="category" className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-white/20 dark:text-white dark:bg-slate-900">
                          <option>Science</option>
                          <option>Technology</option>
                          <option>Engineering</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
                      <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <FileVideo className="h-5 w-5 text-indigo-500" /> Video Content
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Preview Video URL (MP4)</label>
                        <input name="previewVideo" type="url" placeholder="https://example.com/preview.mp4" className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-white/20 dark:text-white" />
                        <p className="mt-1 text-xs text-slate-500">Auto-plays silently when students hover over the course card.</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Main Course Video URL (MP4)</label>
                        <input name="mainVideo" type="url" placeholder="https://example.com/full_course.mp4" className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-white/20 dark:text-white" />
                      </div>
                    </div>

          </div>
                  
                  <div className="pt-4 flex justify-end">
                    <button type="submit" className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-colors">
                      Publish Course
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeItem === 'Analytics' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Platform Analytics</h1>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">Deep dive into your revenue and user engagement.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-white/10 dark:bg-slate-950">
                  <BarChart3 className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Charts coming soon</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">We are integrating a charting library to visualize your ${stats?.totalRevenue || 0} in revenue and {stats?.totalEnrollments || 0} enrollments.</p>
                </div>
              </motion.div>
            )}

            {activeItem === 'Students' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Student Directory</h1>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">Manage all registered users on your platform.</p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-950">
                  <table className="w-full text-left text-sm text-slate-500 dark:text-slate-400">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-700 dark:bg-white/5 dark:text-slate-300 border-b border-slate-200 dark:border-white/10">
                      <tr>
                        <th className="px-6 py-4">Student</th>
                        <th className="px-6 py-4">Total XP</th>
                        <th className="px-6 py-4">Streak</th>
                        <th className="px-6 py-4">Enrollments</th>
                        <th className="px-6 py-4">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center">No students found.</td>
                        </tr>
                      ) : users.map(u => (
                        <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold dark:bg-indigo-900 dark:text-indigo-200">
                              {u.name.substring(0,2).toUpperCase()}
                            </div>
                            <div>
                              <div>{u.name}</div>
                              <div className="text-xs text-slate-400">{u.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">{u.totalXP.toLocaleString()}</td>
                          <td className="px-6 py-4">{u.streak} days</td>
                          <td className="px-6 py-4">{u._count?.enrollments || 0}</td>
                          <td className="px-6 py-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeItem === 'Media Upload' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-3xl">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Media Upload</h1>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">Upload and manage global video assets.</p>
                </div>
                <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center dark:border-white/20 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                  <UploadCloud className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Click to browse or drag media here</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">MP4, WebM, PNG, JPG (Max 500MB)</p>
                </div>
              </motion.div>
            )}

            {activeItem === 'Certificates' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Issued Certificates</h1>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">View cryptographic proofs of completion.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-white/10 dark:bg-slate-950">
                  <Award className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">No certificates issued yet</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">When students complete courses, their certificates will appear here.</p>
                </div>
              </motion.div>
            )}

            {activeItem === 'Settings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-3xl">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Platform Settings</h1>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">Configure global platform branding and integrations.</p>
                </div>
                <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-950">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Platform Name</label>
                    <input type="text" defaultValue="Astro Lab" className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-white/20 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Support Email</label>
                    <input type="email" defaultValue="support@astrolab.com" className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-white/20 dark:text-white" />
                  </div>
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-end">
                    <button className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-colors">
                      Save Changes
                    </button>
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
