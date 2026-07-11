'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { 
  Atom, BookOpen, BrainCircuit, ChevronRight, Compass, Dna, 
  FlaskConical, Globe2, GraduationCap, Microscope, Rocket, 
  Search, Sparkles, Star, Telescope, Users, Zap, CheckCircle2 
} from "lucide-react"

import { PublicNavbar } from "@/components/navbar/PublicNavbar"
import { PublicFooter } from "@/components/footer/PublicFooter"
import { cn } from "@/lib/utils"

const scienceCategories = [
  { name: "Physics", icon: Atom, color: "from-blue-400 to-indigo-500", count: "24 Courses" },
  { name: "Chemistry", icon: FlaskConical, color: "from-fuchsia-400 to-pink-500", count: "18 Courses" },
  { name: "Biology", icon: Dna, color: "from-emerald-400 to-teal-500", count: "32 Courses" },
  { name: "Astronomy", icon: Telescope, color: "from-indigo-400 to-purple-500", count: "15 Courses" },
  { name: "Robotics", icon: BrainCircuit, color: "from-cyan-400 to-blue-500", count: "21 Courses" },
  { name: "Earth Science", icon: Globe2, color: "from-green-400 to-emerald-500", count: "12 Courses" },
]

const stats = [
  { label: "Active Students", value: "50,000+" },
  { label: "Expert Mentors", value: "120+" },
  { label: "Science Courses", value: "300+" },
  { label: "Countries Reached", value: "140+" },
]

const trustedBy = [
  "MIT", "Stanford", "Harvard", "Oxford", "NASA JPL", "CERN", "Caltech"
]

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div className="relative min-h-screen bg-slate-950 selection:bg-cyan-500/30">
      <PublicNavbar />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,211,238,0.1),_transparent_60%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.15),_transparent_50%)]" />
          
          {/* Constellations / Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* Floating Planets & Atoms */}
          <motion.div style={{ y }} className="absolute inset-0">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
              <div className="absolute left-[15%] top-[25%] h-32 w-32 rounded-full border border-cyan-400/20 bg-cyan-400/5 backdrop-blur-3xl" />
              <div className="absolute right-[20%] top-[15%] h-48 w-48 rounded-full border border-violet-400/20 bg-violet-400/5 backdrop-blur-3xl" />
              <div className="absolute bottom-[20%] left-[25%] h-64 w-64 rounded-full border border-fuchsia-400/10 bg-fuchsia-400/5 backdrop-blur-3xl" />
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Content */}
        <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              <span>The Next Generation of Science Learning</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.1, type: "spring", bounce: 0.3 }}
            className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            Explore the Universe <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 bg-clip-text text-transparent">
              of Science
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl"
          >
            Master Physics, Chemistry, Biology, Astronomy, Robotics, Artificial Intelligence, Mathematics, Earth Science and Space Science through beautifully designed expert-led learning experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/register"
              className="group relative flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 font-semibold text-slate-950 transition-all hover:scale-105 hover:bg-slate-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              <span>Join Astro Lab</span>
              <Rocket className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <Link
              href="/courses"
              className="flex h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              <Search className="h-5 w-5" />
              <span>Browse Courses</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex h-12 w-7 flex-col items-center justify-start rounded-full border-2 border-white/20 p-1">
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-2 rounded-full bg-cyan-400"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. TRUSTED BY & STATS */}
      <section className="border-y border-white/5 bg-slate-950/50 py-16 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
            Trusted by students & researchers from
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 grayscale transition-all hover:grayscale-0">
            {trustedBy.map((brand) => (
              <span key={brand} className="text-xl font-bold text-white sm:text-2xl">{brand}</span>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-4xl font-bold text-white sm:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section id="categories" className="relative py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Universe of Knowledge</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Dive deep into specific domains of science. No subscriptions, just lifetime access to pure knowledge.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {scienceCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative cursor-pointer overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-8 transition-all hover:border-cyan-400/30 hover:bg-white/10"
                >
                  <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${category.color} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`} />
                  <div className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${category.color} p-3 text-white shadow-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                  <p className="mt-2 text-slate-400">{category.count}</p>
                  
                  <div className="mt-8 flex items-center text-sm font-semibold text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
                    Explore Domain <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. WHY ASTRO LAB (Learning Journey) */}
      <section className="relative overflow-hidden py-32 bg-slate-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(139,92,246,0.1),_transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm font-medium text-violet-300">
                <Compass className="h-4 w-4" />
                <span>The Astro Lab Advantage</span>
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Engineered for <br/> Lifelong Curiosity.
              </h2>
              <p className="mt-6 text-lg text-slate-400">
                We believe science education should be immersive, visually stunning, and highly engaging. Astro Lab replaces boring lectures with interactive journeys.
              </p>
              
              <dl className="mt-10 max-w-xl space-y-8">
                {[
                  { name: "Pay Once, Learn Forever", description: "No recurring subscriptions. Buy a course once, and it’s yours for a lifetime. Access updates forever.", icon: CheckCircle2 },
                  { name: "Interactive Labs & Quizzes", description: "Test your knowledge instantly with embedded micro-assessments, beautifully crafted UI, and progress tracking.", icon: BrainCircuit },
                  { name: "Verifiable Certificates", description: "Earn beautifully designed certificates upon completion to showcase your mastery on LinkedIn and your resume.", icon: GraduationCap },
                ].map((feature) => (
                  <div key={feature.name} className="relative pl-12">
                    <dt className="text-lg font-semibold text-white">
                      <feature.icon className="absolute left-0 top-1 h-6 w-6 text-cyan-400" />
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-slate-400">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
            
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotateX: 10, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                whileHover={{ y: -10, transition: { duration: 0.4 } }}
                className="relative rounded-[32px] border border-white/10 bg-slate-950/80 p-4 shadow-[0_30px_100px_rgba(34,211,238,0.15)] backdrop-blur-2xl"
              >
                {/* Mockup UI of Dashboard */}
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="mx-auto rounded-md bg-white/5 px-12 py-1 text-xs text-slate-400">astrolab.com/dashboard</div>
                </div>
                <div className="mt-4 grid gap-4 grid-cols-2">
                  <div className="h-32 rounded-2xl border border-white/5 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 p-4">
                    <div className="h-8 w-8 rounded-full bg-cyan-400/20 mb-4" />
                    <div className="h-4 w-24 rounded bg-white/20 mb-2" />
                    <div className="h-8 w-16 rounded bg-white/20" />
                  </div>
                  <div className="h-32 rounded-2xl border border-white/5 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 p-4">
                    <div className="h-8 w-8 rounded-full bg-violet-400/20 mb-4" />
                    <div className="h-4 w-24 rounded bg-white/20 mb-2" />
                    <div className="h-8 w-16 rounded bg-white/20" />
                  </div>
                </div>
                <div className="mt-4 h-48 rounded-2xl border border-white/5 bg-white/5 p-4 relative overflow-hidden">
                   <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-500/20 to-transparent" />
                   <svg viewBox="0 0 100 40" className="w-full h-full stroke-cyan-400 fill-none" strokeWidth="2">
                     <path d="M0,40 Q20,30 40,35 T80,15 T100,20" />
                   </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80" />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[40px] border border-cyan-400/20 bg-cyan-400/5 p-10 backdrop-blur-2xl sm:p-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to decode the universe?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              Join thousands of learners mastering the complexities of science through Astro Lab&apos;s premium ecosystem.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="group relative flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 font-semibold text-slate-950 transition-all hover:scale-105 hover:bg-slate-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              >
                <span>Create Free Account</span>
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}