'use client'

import { useState, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { 
  Trophy, Flame, Clock, Target, PlayCircle, Star, 
  ChevronRight, BookOpen, Sparkles, TrendingUp, Rocket, Lock, Award
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PublicNavbar } from "@/components/navbar/PublicNavbar"
import { PublicFooter } from "@/components/footer/PublicFooter"
import { useAuth } from "@/hooks/useAuth"
import { useProgress } from "@/hooks/useProgress"
import { useCourses } from "@/hooks/useCourse"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
}

function HoverCourseCard({ course, onClick, children }: { course: any, onClick?: () => void, children?: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/50 backdrop-blur-xl transition-all cursor-pointer",
        "hover:border-violet-500/50 hover:shadow-[0_15px_50px_-15px_rgba(139,92,246,0.3)]"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        {course.previewVideo ? (
          <>
            <img 
              src={course.thumbnail} 
              alt={course.title} 
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                isHovered ? "opacity-0" : "opacity-100"
              )} 
            />
            <video 
              src={course.previewVideo}
              autoPlay
              loop
              muted
              playsInline
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          </>
        ) : (
          <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
        
        {children}
      </div>
      <div className="flex flex-col p-6 flex-1">
        <h3 className="text-base font-bold text-white line-clamp-2 leading-tight group-hover:text-violet-300 transition-colors">{course.title}</h3>
        <p className="mt-2 text-xs text-slate-400 line-clamp-2">{course.description}</p>
        <div className="mt-auto pt-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-slate-800 overflow-hidden shadow-inner border border-white/10">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`} alt={course.instructor} />
          </div>
          <span className="text-xs text-slate-400 font-semibold">{course.instructor}</span>
        </div>
      </div>
    </motion.div>
  )
}

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const { enrollments, isLoading: isProgressLoading } = useProgress()
  const { data: coursesData, isLoading: isCoursesLoading } = useCourses({ limit: 50 })

  const initialTab = searchParams.get('tab') === 'completed' ? 'completed' : 'in-progress'
  const [activeTab, setActiveTab] = useState<'in-progress' | 'completed'>(initialTab)

  const stats = [
    { label: "Learning Hours", value: `${user?.totalXP ? Math.floor(user.totalXP / 100) : 0}h`, increase: "This week", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Current Streak", value: `${user?.streak || 0} Days`, increase: "Keep it up!", icon: Flame, color: "text-orange-400", bg: "bg-orange-400/10" },
    { label: "Total XP", value: (user?.totalXP || 0).toLocaleString(), increase: "Level Scholar", icon: Trophy, color: "text-amber-400", bg: "bg-amber-400/10" },
    { label: "Courses Completed", value: enrollments.filter(e => e.completed).length.toString(), increase: "Top 15% of learners", icon: Target, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  ]

  const activeCourses = enrollments.filter(e => !e.completed)
  const completedCourses = enrollments.filter(e => e.completed)
  const availableCourses = coursesData?.courses.filter(c => !enrollments.some(e => e.courseId === c.id)) || []

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      <PublicNavbar />
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-violet-600/10 blur-[150px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 mt-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-10 pb-12"
        >
          {/* 1. WELCOME & DAILY MOTIVATION */}
          <motion.div 
            variants={itemVariants}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/50 p-8 shadow-[0_20px_80px_rgba(2,6,23,0.6)] backdrop-blur-xl group transition-all duration-700 hover:border-cyan-400/30"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,_rgba(34,211,238,0.15),_transparent_40%),radial-gradient(circle_at_0%_100%,_rgba(168,85,247,0.1),_transparent_40%)] opacity-50 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-200 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  <Sparkles className="h-4 w-4" />
                  <span>Level Scholar</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">{user?.name?.split(' ')[0] || 'Explorer'}</span>.
                </h1>
                <p className="max-w-2xl text-base text-slate-400 font-medium">
                  &quot;The universe is under no obligation to make sense to you.&quot; — Neil deGrasse Tyson. 
                  <br/> Ready to decode it today?
                </p>
              </div>
            </div>
          </motion.div>

          {/* 2. STATS WIDGETS */}
          <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-[24px] border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md overflow-hidden group shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className={cn("rounded-2xl p-3 shadow-inner", stat.bg, stat.color)}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-extrabold text-white tracking-tight">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="space-y-12">
            
            {/* 3. MY LEARNING TABS */}
            <motion.section variants={itemVariants} className="space-y-8">
              <div className="flex items-center gap-6 border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveTab('in-progress')}
                  className={cn(
                    "relative pb-4 text-lg font-bold transition-colors",
                    activeTab === 'in-progress' ? "text-cyan-400" : "text-slate-400 hover:text-white"
                  )}
                >
                  In Progress
                  {activeTab === 'in-progress' && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-400 rounded-t-full shadow-[0_-2px_10px_rgba(34,211,238,0.5)]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={cn(
                    "relative pb-4 text-lg font-bold transition-colors flex items-center gap-2",
                    activeTab === 'completed' ? "text-emerald-400" : "text-slate-400 hover:text-white"
                  )}
                >
                  Completed
                  {activeTab === 'completed' && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-400 rounded-t-full shadow-[0_-2px_10px_rgba(52,211,153,0.5)]" />
                  )}
                </button>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {isProgressLoading ? (
                    <div className="flex h-48 items-center justify-center rounded-[32px] border border-white/5 bg-slate-900/20 shadow-inner">
                      <span className={cn("h-8 w-8 animate-spin rounded-full border-2 border-t-transparent", activeTab === 'completed' ? "border-emerald-400" : "border-cyan-400")} />
                    </div>
                  ) : activeTab === 'in-progress' ? (
                    activeCourses.length > 0 ? (
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {activeCourses.map((enrollment) => (
                          <motion.div
                            key={enrollment.id}
                            whileHover={{ scale: 1.03, y: -8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="group relative flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/50 backdrop-blur-xl transition-all hover:border-cyan-400/50 hover:shadow-[0_15px_50px_-15px_rgba(34,211,238,0.4)]"
                          >
                            <div className="relative h-48 w-full overflow-hidden">
                              <img src={enrollment.course.thumbnail} alt={enrollment.course.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/50 backdrop-blur-sm">
                                <Link href={`/course/${enrollment.course.slug}`} className="flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-2.5 font-bold text-white hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/30">
                                  <PlayCircle className="h-5 w-5 fill-white text-cyan-500" />
                                  Resume
                                </Link>
                              </div>
                            </div>
                            <div className="flex flex-col p-6">
                              <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight">{enrollment.course.title}</h3>
                              <div className="mt-6 space-y-2">
                                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                                  <span>{enrollment.progress}% Complete</span>
                                </div>
                                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800 shadow-inner">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${enrollment.progress}%` }}
                                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_15px_rgba(34,211,238,0.6)]" 
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center rounded-[32px] border border-white/5 bg-slate-900/20 p-16 text-center backdrop-blur-sm shadow-inner">
                        <Rocket className="mb-4 h-12 w-12 text-slate-600 animate-bounce" />
                        <h3 className="mb-2 text-xl font-bold text-white">No courses in progress</h3>
                        <p className="max-w-sm text-slate-400">You haven&apos;t enrolled in any courses yet. Check out the available courses below!</p>
                      </div>
                    )
                  ) : (
                    // Completed Courses Tab
                    completedCourses.length > 0 ? (
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {completedCourses.map((enrollment) => (
                          <motion.div
                            key={enrollment.id}
                            whileHover={{ scale: 1.03, y: -8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="group relative flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/50 backdrop-blur-xl transition-all hover:border-emerald-400/50 hover:shadow-[0_15px_50px_-15px_rgba(52,211,153,0.3)]"
                          >
                            <div className="relative h-48 w-full overflow-hidden grayscale-[30%]">
                              <img src={enrollment.course.thumbnail} alt={enrollment.course.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                              
                              <div className="absolute top-4 right-4 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 backdrop-blur-md border border-emerald-500/30 flex items-center gap-1">
                                <Award className="h-3 w-3" />
                                Completed
                              </div>
                              
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-slate-950/60 backdrop-blur-sm">
                                <Link href={`/course/${enrollment.course.slug}`} className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 font-bold text-white hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/30">
                                  <Award className="h-5 w-5" />
                                  View Certificate
                                </Link>
                              </div>
                            </div>
                            <div className="flex flex-col p-6">
                              <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight">{enrollment.course.title}</h3>
                              <p className="mt-3 text-sm text-slate-400 line-clamp-2">Successfully completed all modules.</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center rounded-[32px] border border-white/5 bg-slate-900/20 p-16 text-center backdrop-blur-sm shadow-inner">
                        <Award className="mb-4 h-12 w-12 text-slate-600" />
                        <h3 className="mb-2 text-xl font-bold text-white">No certificates yet</h3>
                        <p className="max-w-sm text-slate-400">Complete your in-progress courses to earn certificates.</p>
                      </div>
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.section>

            {/* 4. AVAILABLE COURSES */}
            <motion.section variants={itemVariants} className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recommended for you</h2>
                <Link href="/courses" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
                  Explore all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isCoursesLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-80 rounded-[24px] bg-slate-900/50 border border-white/5 animate-pulse" />
                  ))
                ) : availableCourses.length > 0 ? (
                  availableCourses.map(course => (
                    <HoverCourseCard 
                      key={course.id} 
                      course={course}
                      onClick={() => router.push(`/checkout/${course.id}`)}
                    >
                      <div className="absolute top-4 right-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/10 shadow-lg">
                        ₹{course.price}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-cyan-900/40 backdrop-blur-sm">
                        <span className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-bold text-slate-900 shadow-[0_10px_30px_rgba(255,255,255,0.3)] hover:bg-slate-200 transition-colors">
                          <Lock className="h-4 w-4" />
                          Enroll Now
                        </span>
                      </div>
                    </HoverCourseCard>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-slate-500 bg-slate-900/20 rounded-[32px] border border-white/5 border-dashed">
                    No new recommendations at the moment.
                  </div>
                )}
              </div>
            </motion.section>
          </div>
        </motion.div>
      </main>
      <PublicFooter />
    </div>
  )
}

export default function StudentDashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
