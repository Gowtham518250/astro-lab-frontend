'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Trophy, Flame, Clock, Target, PlayCircle, Star, 
  ChevronRight, Calendar, ArrowUpRight, BookOpen, 
  Award, Sparkles, TrendingUp, Rocket
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PublicNavbar } from "@/components/navbar/PublicNavbar"
import { PublicFooter } from "@/components/footer/PublicFooter"
import { useAuth } from "@/hooks/useAuth"
import { useProgress } from "@/hooks/useProgress"

const recentActivity = [
  { id: 1, title: "Earned 'Fast Learner' Badge", type: "achievement", time: "1 day ago" },
  { id: 2, title: "Completed 'The Standard Model' Quiz", type: "quiz", score: "92%", time: "2 days ago" },
]

export default function StudentDashboardPage() {
  const { user } = useAuth()
  const { enrollments, isLoading } = useProgress()

  const stats = [
    { label: "Learning Hours", value: "12h", increase: "+2h this week", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Current Streak", value: `${user?.streak || 0} Days`, increase: "Keep it up!", icon: Flame, color: "text-orange-400", bg: "bg-orange-400/10" },
    { label: "Total XP", value: (user?.totalXP || 0).toLocaleString(), increase: "Level Scholar", icon: Trophy, color: "text-amber-400", bg: "bg-amber-400/10" },
    { label: "Courses Completed", value: enrollments.filter(e => e.completed).length.toString(), increase: "Top 15% of learners", icon: Target, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  ]

  const firstActiveCourse = enrollments.find(e => !e.completed)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <PublicNavbar />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 pb-12">
          {/* 1. WELCOME & DAILY MOTIVATION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/50 p-8 shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,_rgba(34,211,238,0.15),_transparent_40%),radial-gradient(circle_at_0%_100%,_rgba(168,85,247,0.1),_transparent_40%)]" />
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
              <Sparkles className="h-4 w-4" />
              <span>Level 12 Scholar</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome back, {user?.name?.split(' ')[0] || 'Explorer'}.
            </h1>
            <p className="max-w-2xl text-slate-300">
              &quot;The universe is under no obligation to make sense to you.&quot; — Neil deGrasse Tyson. 
              <br/> Ready to decode it today?
            </p>
          </div>
          
          <div className="flex shrink-0 items-center gap-4">
            <div className="relative h-24 w-24">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" className="fill-transparent stroke-slate-800" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" className="fill-transparent stroke-cyan-400" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="80.38" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-white">68%</span>
                <span className="text-[10px] uppercase text-cyan-200">Weekly</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. STATS WIDGETS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-[24px] border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className={cn("rounded-xl p-2.5", stat.bg, stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-slate-400">{stat.label}</p>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                <TrendingUp className="h-3 w-3 text-emerald-400" />
                {stat.increase}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          {/* 3. CONTINUE LEARNING (Netflix Style) */}
          <section className="rounded-[32px] border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Continue Learning</h2>
              <Link href="/courses" className="text-sm font-medium text-cyan-400 hover:text-cyan-300">View All</Link>
            </div>
            
            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
              </div>
            ) : firstActiveCourse ? (
              <div className="group relative flex flex-col gap-6 rounded-[24px] border border-white/10 bg-slate-950/60 p-4 transition-all hover:border-cyan-400/30 sm:flex-row sm:items-center">
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-[16px] sm:h-32 sm:w-56">
                  <img src={firstActiveCourse.course.thumbnail} alt={firstActiveCourse.course.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <div className="flex flex-1 flex-col justify-center">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-slate-300">{firstActiveCourse.course.level}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{firstActiveCourse.course.title}</h3>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{firstActiveCourse.progress}% completed</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${firstActiveCourse.progress}%` }} />
                    </div>
                  </div>
                </div>
                
                <div className="shrink-0 sm:ml-4">
                  <Link href={`/course/${firstActiveCourse.course.slug}`} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-slate-950 transition-all hover:bg-slate-200 sm:w-auto">
                    <PlayCircle className="h-5 w-5 fill-slate-950 text-white" />
                    Resume
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-[24px] border border-white/10 bg-slate-950/60 p-8 text-center">
                <Rocket className="mb-3 h-10 w-10 text-cyan-400" />
                <h3 className="mb-2 text-lg font-bold text-white">No active courses</h3>
                <p className="mb-6 max-w-sm text-sm text-slate-400">You haven&apos;t enrolled in any courses yet. Discover our catalog and start learning today!</p>
                <Link href="/courses" className="rounded-xl bg-cyan-500 px-6 py-2.5 font-semibold text-white hover:bg-cyan-400">
                  Browse Catalog
                </Link>
              </div>
            )}
          </section>

          {/* 4. LEARNING ACTIVITY CHART (Mocked) */}
          <section className="rounded-[32px] border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Learning Analytics</h2>
              <select className="rounded-lg border border-white/10 bg-slate-950 px-3 py-1.5 text-sm text-slate-300 outline-none">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            
            <div className="flex h-64 items-end gap-2 pb-4 pt-8">
              {[35, 60, 45, 80, 55, 90, 70].map((height, i) => (
                <div key={i} className="group relative flex flex-1 flex-col items-center gap-2">
                  <div className="relative w-full rounded-t-md bg-white/5 transition-all hover:bg-white/10" style={{ height: '100%' }}>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="absolute bottom-0 w-full rounded-t-md bg-gradient-to-t from-cyan-500/80 to-violet-500/80"
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* 5. RECENT ACTIVITY WIDGET */}
          <section className="rounded-[32px] border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl sm:p-8">
            <h2 className="mb-6 text-xl font-bold text-white">Recent Activity</h2>
            <div className="relative space-y-6 border-l border-white/10 pl-6 before:absolute before:left-[-1px] before:top-2 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-cyan-500 before:via-violet-500 before:to-transparent">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="relative">
                  <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-slate-950 bg-cyan-400" />
                  <p className="text-sm font-semibold text-white">{activity.title}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {activity.type === 'quiz' ? `Score: ${activity.score} • ` : null}
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. LEADERBOARD WIDGET */}
          <section className="rounded-[32px] border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Global Rank</h2>
              <Trophy className="h-5 w-5 text-amber-400" />
            </div>
            
            <div className="space-y-4">
              {[
                { rank: 1, name: "Alex R.", xp: "12,450", current: false },
                { rank: 2, name: "Sarah K.", xp: "10,200", current: false },
                { rank: 14, name: user?.name || "Explorer", xp: (user?.totalXP || 0).toLocaleString(), current: true },
              ].map((u, i) => (
                <div key={u.name} className={cn(
                  "flex items-center justify-between rounded-2xl p-3",
                  u.current ? "bg-cyan-400/10 border border-cyan-400/20" : "bg-white/5 border border-transparent"
                )}>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                      i === 0 ? "bg-amber-400 text-amber-950" : i === 1 ? "bg-slate-300 text-slate-900" : "bg-white/10 text-white"
                    )}>
                      {u.rank}
                    </span>
                    <span className={cn("text-sm font-medium", u.current ? "text-cyan-300" : "text-slate-300")}>
                      {u.current ? "You" : u.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-100">{u.xp} XP</span>
                </div>
              ))}
            </div>
            
            <button className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
              View Full Leaderboard
            </button>
          </section>
        </div>
      </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  )
}
