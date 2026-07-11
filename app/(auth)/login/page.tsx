'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, Suspense } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useAuth } from "@/hooks/useAuth"
import toast from "react-hot-toast"
import {
  ArrowRight,
  Atom,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Orbit,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"
import { FaApple, FaMicrosoft } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"

import { cn } from "@/lib/utils"

const stats = [
  { label: "120+ Courses", icon: BookOpen },
  { label: "50,000+ Students", icon: Users },
  { label: "Expert Mentors", icon: GraduationCap },
  { label: "Lifetime Access", icon: ShieldCheck },
]

const socialProviders = [
  { name: "Google", icon: FcGoogle },
  { name: "Microsoft", icon: FaMicrosoft },
  { name: "Apple", icon: FaApple },
]

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setIsSuccess(false)
    setErrorMessage("")

    const res = await login(email.trim(), password)

    if (res.ok) {
      setIsSubmitting(false)
      setIsSuccess(true)
      toast.success("Welcome back!")
      const params = new URLSearchParams(window.location.search)
      const redirect = params.get('redirect') || '/dashboard'
      window.setTimeout(() => router.push(redirect), 600)
    } else {
      setIsSubmitting(false)
      setErrorMessage(res.error || "Invalid email or password")
      toast.error(res.error || "Invalid email or password")
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.15),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_25%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] px-4 py-6 text-slate-50 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/40 shadow-[0_25px_120px_rgba(2,6,23,0.65)] backdrop-blur-xl">
        <section className="relative hidden flex-1 overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(45,212,191,0.22),_transparent_22%),radial-gradient(circle_at_80%_15%,_rgba(129,140,248,0.23),_transparent_20%),linear-gradient(135deg,_rgba(15,23,42,0.2),_rgba(2,6,23,0.4))]" />

          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="absolute left-[8%] top-[12%] h-44 w-44 rounded-full border border-cyan-400/20" />
            <div className="absolute right-[10%] top-[18%] h-56 w-56 rounded-full border border-fuchsia-400/20" />
            <div className="absolute bottom-[14%] left-[18%] h-72 w-72 rounded-full border border-violet-400/20" />
          </motion.div>

          <motion.div
            className="absolute left-[12%] top-[20%] h-28 w-28 rounded-full bg-gradient-to-br from-cyan-400/90 to-sky-600/80 shadow-[0_0_80px_rgba(34,211,238,0.35)]"
            animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[17%] top-[25%] h-20 w-20 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl"
            animate={{ y: [0, 16, 0], x: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute left-[24%] top-[54%] h-56 w-56 rounded-full border border-cyan-300/15"
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[16%] bottom-[18%] h-40 w-40 rounded-full border border-fuchsia-300/15"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <div className="absolute left-[42%] top-[32%] h-40 w-40 -translate-x-1/2 rounded-full border border-white/10" />
          <div className="absolute left-[42%] top-[32%] h-40 w-40 -translate-x-1/2 rounded-full border border-cyan-300/20" />
          <div className="absolute left-[42%] top-[32%] h-40 w-40 -translate-x-1/2 border-t border-cyan-300/60" />

          <div className="absolute left-[42%] top-[32%] z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.7)]" />
          <div className="absolute left-[48%] top-[40%] z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-300 shadow-[0_0_30px_rgba(232,121,249,0.55)]" />
          <div className="absolute left-[36%] top-[40%] z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_30px_rgba(167,139,250,0.55)]" />

          <div className="absolute left-[37%] top-[42%] h-[200px] w-[2px] -translate-x-1/2 rotate-[18deg] bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent" />
          <div className="absolute left-[44%] top-[35%] h-[220px] w-[2px] -translate-x-1/2 rotate-[-24deg] bg-gradient-to-b from-transparent via-fuchsia-400/60 to-transparent" />

          <motion.div
            className="absolute bottom-[12%] left-[8%] rounded-[24px] border border-white/10 bg-white/10 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl"
            animate={{ y: [0, -10, 0], rotate: [0, 0.5, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-400/20 p-2 text-cyan-300">
                <Orbit className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Mission</p>
                <p className="text-sm font-semibold text-slate-100">Launch into discovery</p>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-[18%] right-[8%] flex max-w-[280px] flex-col gap-3 rounded-[24px] border border-white/10 bg-slate-900/55 p-5 shadow-[0_20px_70px_rgba(3,7,18,0.4)] backdrop-blur-xl">
            <p className="text-sm font-semibold text-slate-100">“Every discovery begins with curiosity.”</p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Science-led learning, beautifully designed
            </div>
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 text-white shadow-[0_10px_30px_rgba(34,211,238,0.3)]">
                <Atom className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight text-white">Astro Lab</p>
                <p className="text-sm text-slate-400">Learn the universe in motion</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="max-w-xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
                  <Sparkles className="h-4 w-4" />
                  Trusted by curious minds worldwide
                </div>
                <h1 className="text-4xl font-semibold tracking-tight text-white xl:text-5xl">
                  A brighter path to scientific mastery.
                </h1>
                <p className="max-w-lg text-lg leading-8 text-slate-300">
                  Explore immersive lessons, guided by top experts, and step into a learning experience engineered for momentum.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.45 }}
                      className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
                    >
                      <div className="rounded-2xl bg-white/10 p-2 text-cyan-300">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-100">{stat.label}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="h-px flex-1 bg-gradient-to-r from-white/15 via-white/40 to-transparent" />
              <span>Designed for modern learners</span>
            </div>
          </div>
        </section>

        <section className="flex w-full items-center justify-center bg-slate-950/60 p-4 sm:p-6 lg:w-[42%] lg:p-8 xl:p-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.45)] backdrop-blur-2xl sm:p-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 shadow-[0_12px_35px_rgba(34,211,238,0.25)]">
                  <Atom className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-white">Astro Lab</p>
                  <p className="text-sm text-slate-400">Science learning, reimagined</p>
                </div>
              </div>
              <div className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                Secure onboarding
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Welcome Back</h2>
              <p className="text-sm leading-7 text-slate-300 sm:text-[15px]">
                Continue exploring the universe of science with a beautifully guided experience.
              </p>
            </div>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Email</span>
                <div className="group flex items-center gap-3 rounded-[18px] border border-white/10 bg-slate-900/70 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/70 focus-within:bg-slate-900/90 focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]">
                  <Mail className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-cyan-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@astro-lab.com"
                    className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    required
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Password</span>
                <div className="group flex items-center gap-3 rounded-[18px] border border-white/10 bg-slate-900/70 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/70 focus-within:bg-slate-900/90 focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]">
                  <Lock className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-cyan-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between gap-3 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe((value) => !value)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
                  />
                  Remember me
                </label>
                <Link href="/forgot-password" className="text-cyan-300 transition hover:text-cyan-200">
                  Forgot password?
                </Link>
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -2, scale: 1.01 }}
                disabled={isSubmitting}
                className={cn(
                  "relative flex w-full items-center justify-center gap-2 rounded-[20px] bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_15px_35px_rgba(34,211,238,0.22)] transition-all duration-300",
                  isSubmitting && "cursor-wait opacity-90",
                  isSuccess && "from-emerald-400 via-emerald-500 to-cyan-500"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isSubmitting ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      className="flex items-center gap-2"
                    >
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Opening your dashboard...
                    </motion.span>
                  ) : isSuccess ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Welcome back, explorer
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      className="flex items-center gap-2"
                    >
                      Continue Learning
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {errorMessage ? (
              <div className="rounded-[16px] border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">
                {errorMessage}
              </div>
            ) : null}

            <div className="rounded-[16px] border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">
              Demo credentials: admin@astro-lab.com / admin123 or student@astro-lab.com / student123
            </div>

            <div className="my-6 flex items-center gap-3 text-sm text-slate-400">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span>or continue with</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {socialProviders.map((provider) => {
                const Icon = provider.icon
                return (
                  <button
                    key={provider.name}
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-[18px] border border-white/10 bg-slate-900/70 px-3 py-3 text-sm font-medium text-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-slate-900"
                  >
                    <Icon className="h-4 w-4" />
                    {provider.name}
                  </button>
                )
              })}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-1 text-sm text-slate-300">
              <span>Don’t have an account?</span>
              <Link href="/register" className="font-semibold text-cyan-300 transition hover:text-cyan-200">
                Create Account
                <ChevronRight className="ml-1 inline h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-white/10 pt-5 text-sm text-slate-400">
              <Link href="/privacy" className="transition hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="transition hover:text-white">
                Terms
              </Link>
              <Link href="/contact" className="transition hover:text-white">
                Support
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}
