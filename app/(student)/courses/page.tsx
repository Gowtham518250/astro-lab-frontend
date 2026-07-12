'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Search, SlidersHorizontal, LayoutGrid, List, PlayCircle, Star, 
  Users, Clock, BookOpen, ShieldCheck, Heart, ArrowRight, Atom, ChevronRight, Sparkles
} from "lucide-react"

import { PublicNavbar } from "@/components/navbar/PublicNavbar"
import { PublicFooter } from "@/components/footer/PublicFooter"
import { cn } from "@/lib/utils"
import { useCourses } from "@/hooks/useCourse"
import { useFavorites } from "@/hooks/useFavorites"

const CATEGORIES = ["All", "Physics", "Chemistry", "Biology", "Astronomy", "Robotics", "Mathematics", "AI"]

const FEATURED_COURSES = [
  {
    id: "c1",
    title: "Quantum Mechanics: The Grand Tour",
    instructor: "Dr. Elena Rostova",
    rating: 4.9,
    students: "12.4k",
    duration: "18h 30m",
    lessons: 42,
    difficulty: "Advanced",
    price: 199,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80",
    tags: ["Trending", "Bestseller"],
    color: "from-cyan-400 to-sky-500"
  },
  {
    id: "c2",
    title: "Astrobiology Foundations",
    instructor: "Prof. Marcus Chen",
    rating: 4.8,
    students: "8.2k",
    duration: "12h 15m",
    lessons: 28,
    difficulty: "Beginner",
    price: 149,
    image: "https://images.unsplash.com/photo-1462332420958-a05d1e002413?auto=format&fit=crop&w=900&q=80",
    tags: ["New"],
    color: "from-fuchsia-400 to-violet-500"
  },
  {
    id: "c3",
    title: "Deep Learning for Natural Sciences",
    instructor: "Dr. Sarah Jenkins",
    rating: 4.9,
    students: "15.1k",
    duration: "24h 45m",
    lessons: 56,
    difficulty: "Intermediate",
    price: 249,
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=900&q=80",
    tags: ["Popular"],
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: "c4",
    title: "Relativity & Cosmology",
    instructor: "Prof. Alan Turing",
    rating: 4.7,
    students: "6.5k",
    duration: "15h 20m",
    lessons: 34,
    difficulty: "Advanced",
    price: 179,
    image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=900&q=80",
    tags: [],
    color: "from-indigo-400 to-purple-500"
  }
]

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const { data, isLoading } = useCourses({
    category: activeCategory,
    search: searchQuery,
  })

  const courses = data?.courses || []

  return (
    <div className="min-h-screen bg-slate-950">
      <PublicNavbar />

      {/* 1. HERO SEARCH SECTION */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.15),_transparent_50%)]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            What will you discover today?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-400"
          >
            Browse masterclasses designed to propel your scientific knowledge to the frontier.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="mt-10 max-w-3xl mx-auto flex items-center gap-3 bg-slate-900/60 border border-white/10 rounded-2xl p-2 backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,0.1)] focus-within:border-cyan-400/50 focus-within:shadow-[0_0_50px_rgba(34,211,238,0.25)] transition-all"
          >
            <div className="pl-4 text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input 
              type="text"
              placeholder="Search by topic, instructor, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder:text-slate-500 py-3"
            />
            <button className="hidden sm:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm transition-colors">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
            <button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              Search
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORIES FILTER */}
      <section className="border-b border-white/5 bg-slate-900/40 sticky top-[72px] z-40 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === cat 
                    ? "bg-white text-slate-950 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-slate-950/50 p-1 rounded-xl border border-white/10">
            <button 
              onClick={() => setViewMode("grid")}
              className={cn("p-2 rounded-lg transition-colors", viewMode === "grid" ? "bg-white/15 text-white" : "text-slate-400 hover:text-white")}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={cn("p-2 rounded-lg transition-colors", viewMode === "list" ? "bg-white/15 text-white" : "text-slate-400 hover:text-white")}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. COURSES GRID */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              Trending Courses
            </h2>
          </div>
          
          <div className={cn("grid gap-8", viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 max-w-5xl mx-auto")}>
            {isLoading ? (
              <div className="col-span-full py-20 flex justify-center">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
              </div>
            ) : courses.length === 0 ? (
              <div className="col-span-full py-20 text-center text-slate-400">
                No courses found matching your criteria.
              </div>
            ) : (
              courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100, damping: 15 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className={cn(
                  "group relative rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-cyan-400/40 hover:shadow-[0_15px_40px_rgba(34,211,238,0.15)] transition-all duration-300",
                  viewMode === "list" ? "flex flex-col sm:flex-row gap-0 sm:gap-6" : "flex flex-col"
                )}
              >
                {/* Thumbnail */}
                <div className={cn("relative overflow-hidden shrink-0", viewMode === "grid" ? "aspect-video w-full" : "w-full sm:w-[320px] aspect-video sm:rounded-l-[24px]")}>
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {course.isFeatured && (
                      <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                    <button className="flex items-center gap-2 bg-white text-slate-950 px-4 py-2 rounded-full font-semibold shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-105 transition-transform">
                      <PlayCircle className="h-5 w-5 fill-slate-950 text-white" /> Preview
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className={cn("flex flex-col flex-1", viewMode === "list" ? "p-6 sm:pl-0" : "p-5")}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">{course.instructor}</span>
                    <FavoriteButton courseId={course.id} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 mb-2 group-hover:text-cyan-300 transition-colors">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-3 text-sm text-slate-300 mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="h-4 w-4 fill-amber-400" />
                      <span className="font-semibold text-white">4.9</span>
                    </div>
                    <span>({course._count?.enrollments || 0})</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span className={cn(
                      course.level === "ADVANCED" ? "text-rose-400" : course.level === "INTERMEDIATE" ? "text-amber-400" : "text-emerald-400"
                    )}>{course.level}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-6">
                    <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {Math.floor(course.duration / 60)}h {course.duration % 60}m</div>
                    <div className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> {course._count?.lessons || 0} lessons</div>
                    <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md"><ShieldCheck className="h-3.5 w-3.5" /> Lifetime Access</div>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">₹{course.price}</span>
                    </div>
                    <Link href={`/courses/${course.id}`} className="flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-cyan-400 hover:text-slate-950 transition-colors">
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )))}
          </div>

          <div className="mt-16 flex justify-center">
            <button className="rounded-full border border-white/20 bg-white/5 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10 hover:border-cyan-400/50">
              Load More Courses
            </button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}

function FavoriteButton({ courseId }: { courseId: string }) {
  const { toggle, isFavorited } = useFavorites()
  const active = isFavorited(courseId)
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle.mutate(courseId)
  }

  return (
    <button 
      onClick={handleClick}
      className={cn(
        "text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-white/5",
        active && "text-rose-500 hover:text-rose-600"
      )}
    >
      <Heart className={cn("h-5 w-5", active && "fill-current")} />
    </button>
  )
}
