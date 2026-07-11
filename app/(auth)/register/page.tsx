'use client'

import Link from "next/link"
import { useMemo, useState, Suspense } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import toast from "react-hot-toast"
import {
  ArrowRight,
  Atom,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Compass,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Orbit,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Telescope,
  User,
  Users,
} from "lucide-react"
import { FaApple, FaMicrosoft } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"

import { cn } from "@/lib/utils"

const benefits = [
  "Lifetime Access",
  "Certificates",
  "Projects",
  "Progress Tracking",
  "Interactive Learning",
  "Achievements",
]

const socialProviders = [
  { name: "Google", icon: FcGoogle },
  { name: "Microsoft", icon: FaMicrosoft },
  { name: "Apple", icon: FaApple },
]

const confettiPieces = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 7) % 100}%`,
  delay: `${index * 0.05}s`,
  color: index % 2 === 0 ? "from-cyan-400 to-sky-500" : "from-fuchsia-400 to-violet-500",
}))

const passwordChecks = [
  { label: "At least 8 characters", test: (value: string) => value.length >= 8 },
  { label: "Contains a number", test: (value: string) => /\d/.test(value) },
  { label: "Contains a symbol", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
]

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  )
}

function RegisterForm() {
  const router = useRouter()
  const { register } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "",
    education: "",
    interest: "",
    acceptedTerms: false,
  })

  const passwordStrength = useMemo(() => {
    const score = passwordChecks.reduce((total, check) => total + (check.test(form.password) ? 1 : 0), 0)
    if (!form.password) return { label: "Start typing", width: 0, color: "bg-slate-600" }
    if (score <= 1) return { label: "Weak", width: "25%", color: "bg-red-400" }
    if (score === 2) return { label: "Solid", width: "60%", color: "bg-amber-400" }
    return { label: "Strong", width: "100%", color: "bg-emerald-400" }
  }, [form.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setIsSubmitting(true)
    setIsSuccess(false)

    const res = await register(form)

    if (res.ok) {
      setIsSubmitting(false)
      setIsSuccess(true)
      toast.success("Account created successfully!")
      window.setTimeout(() => router.push("/dashboard"), 2000)
    } else {
      setIsSubmitting(false)
      toast.error(res.error || "Registration failed")
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_24%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] px-4 py-6 text-slate-50 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/40 shadow-[0_25px_120px_rgba(2,6,23,0.65)] backdrop-blur-xl">
        <section className="relative hidden flex-1 overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,_rgba(34,211,238,0.2),_transparent_20%),radial-gradient(circle_at_85%_20%,_rgba(129,140,248,0.2),_transparent_22%),linear-gradient(135deg,_rgba(15,23,42,0.2),_rgba(2,6,23,0.35))]" />

          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 70, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="absolute left-[10%] top-[12%] h-48 w-48 rounded-full border border-cyan-400/20" />
            <div className="absolute right-[8%] top-[18%] h-64 w-64 rounded-full border border-fuchsia-400/20" />
            <div className="absolute bottom-[10%] left-[16%] h-80 w-80 rounded-full border border-violet-400/20" />
          </motion.div>

          <motion.div
            className="absolute left-[12%] top-[18%] h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400/90 to-sky-600/80 shadow-[0_0_70px_rgba(34,211,238,0.35)]"
            animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[16%] top-[24%] h-16 w-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl"
            animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute left-[26%] top-[55%] h-40 w-40 rounded-full border border-cyan-300/20"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[18%] bottom-[14%] h-36 w-36 rounded-full border border-fuchsia-300/20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute left-[44%] top-[34%] h-28 w-28 rounded-full bg-white/10 shadow-[0_0_80px_rgba(34,211,238,0.16)] backdrop-blur-xl"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <div className="absolute left-[42%] top-[32%] z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.7)]" />
          <div className="absolute left-[48%] top-[40%] z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-300 shadow-[0_0_30px_rgba(232,121,249,0.55)]" />
          <div className="absolute left-[36%] top-[40%] z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_30px_rgba(167,139,250,0.55)]" />

          <motion.div
            className="absolute bottom-[12%] left-[7%] rounded-[24px] border border-white/10 bg-white/10 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.35)] backdrop-blur-xl"
            animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-400/20 p-2 text-cyan-300">
                <Rocket className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Launch</p>
                <p className="text-sm font-semibold text-slate-100">Your learning rocket</p>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-[16%] right-[8%] flex max-w-[280px] flex-col gap-3 rounded-[24px] border border-white/10 bg-slate-900/55 p-5 shadow-[0_20px_70px_rgba(3,7,18,0.4)] backdrop-blur-xl">
            <div className="flex items-center gap-2 text-sm text-cyan-200">
              <Star className="h-4 w-4" />
              Join the next generation of scientists
            </div>
            <p className="text-sm leading-7 text-slate-300">
              Experience immersive lessons, hands-on projects, and a community that learns like a frontier lab.
            </p>
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 text-white shadow-[0_10px_30px_rgba(34,211,238,0.3)]">
                <Atom className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight text-white">Astro Lab</p>
                <p className="text-sm text-slate-400">The future of science education</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="max-w-xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
                  <Sparkles className="h-4 w-4" />
                  Designed for ambitious learners
                </div>
                <h1 className="text-4xl font-semibold tracking-tight text-white xl:text-5xl">
                  Step into your next scientific breakthrough.
                </h1>
                <p className="max-w-lg text-lg leading-8 text-slate-300">
                  Join a beautifully guided learning journey with projects, mentors, and a premium experience built for momentum.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.4 }}
                    className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
                  >
                    <div className="rounded-2xl bg-white/10 p-2 text-cyan-300">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-100">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-400">
              <div className="h-px flex-1 bg-gradient-to-r from-white/15 via-white/40 to-transparent" />
              <span>Made for curious minds</span>
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
                  <p className="text-xl font-semibold text-white">Create your account</p>
                  <p className="text-sm text-slate-400">Unlock the universe of discovery</p>
                </div>
              </div>
              <div className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                Premium access
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Launch into Astro Lab</h2>
              <p className="text-sm leading-7 text-slate-300 sm:text-[15px]">
                Start your science journey with a beautifully guided, deeply personal onboarding experience.
              </p>
            </div>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-200">First Name</span>
                  <div className="group flex items-center gap-3 rounded-[18px] border border-white/10 bg-slate-900/70 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/70 focus-within:bg-slate-900/90 focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]">
                    <User className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-cyan-300" />
                    <input
                      value={form.firstName}
                      onChange={(event) => setForm((prev) => ({ ...prev, firstName: event.target.value }))}
                      className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                      placeholder="Mina"
                      required
                    />
                  </div>
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-200">Last Name</span>
                  <div className="group flex items-center gap-3 rounded-[18px] border border-white/10 bg-slate-900/70 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/70 focus-within:bg-slate-900/90 focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]">
                    <User className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-cyan-300" />
                    <input
                      value={form.lastName}
                      onChange={(event) => setForm((prev) => ({ ...prev, lastName: event.target.value }))}
                      className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                      placeholder="Chen"
                      required
                    />
                  </div>
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Email</span>
                <div className="group flex items-center gap-3 rounded-[18px] border border-white/10 bg-slate-900/70 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/70 focus-within:bg-slate-900/90 focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]">
                  <Mail className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-cyan-300" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="you@astro-lab.com"
                    required
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Phone</span>
                <div className="group flex items-center gap-3 rounded-[18px] border border-white/10 bg-slate-900/70 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/70 focus-within:bg-slate-900/90 focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]">
                  <Telescope className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-cyan-300" />
                  <input
                    value={form.phone}
                    onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                    className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="+1 555 123 4567"
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Password</span>
                <div className="group flex items-center gap-3 rounded-[18px] border border-white/10 bg-slate-900/70 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/70 focus-within:bg-slate-900/90 focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]">
                  <Lock className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-cyan-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                    className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="Create a secure password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>

              <div className="space-y-2">
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className={cn("h-full rounded-full transition-all duration-300", passwordStrength.color)} style={{ width: passwordStrength.width }} />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Password strength: {passwordStrength.label}</span>
                  <span>Secure by design</span>
                </div>
                <div className="grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
                  {passwordChecks.map((check) => {
                    const passed = check.test(form.password)
                    return (
                      <div key={check.label} className={cn("rounded-full px-2 py-1", passed ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-800/70") }>
                        {check.label}
                      </div>
                    )
                  })}
                </div>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Confirm Password</span>
                <div className="group flex items-center gap-3 rounded-[18px] border border-white/10 bg-slate-900/70 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/70 focus-within:bg-slate-900/90 focus-within:shadow-[0_0_0_3px_rgba(34,211,238,0.18)]">
                  <Lock className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-cyan-300" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(event) => setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
                    className="w-full border-none bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-200">Country</span>
                  <div className="rounded-[18px] border border-white/10 bg-slate-900/70 px-4 py-3">
                    <select
                      value={form.country}
                      onChange={(event) => setForm((prev) => ({ ...prev, country: event.target.value }))}
                      className="w-full border-none bg-transparent text-sm text-white outline-none"
                      required
                    >
                      <option value="" className="bg-slate-900">Select country</option>
                      <option value="US" className="bg-slate-900">United States</option>
                      <option value="CA" className="bg-slate-900">Canada</option>
                      <option value="UK" className="bg-slate-900">United Kingdom</option>
                      <option value="AU" className="bg-slate-900">Australia</option>
                    </select>
                  </div>
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-200">Education Level</span>
                  <div className="rounded-[18px] border border-white/10 bg-slate-900/70 px-4 py-3">
                    <select
                      value={form.education}
                      onChange={(event) => setForm((prev) => ({ ...prev, education: event.target.value }))}
                      className="w-full border-none bg-transparent text-sm text-white outline-none"
                      required
                    >
                      <option value="" className="bg-slate-900">Select level</option>
                      <option value="highschool" className="bg-slate-900">High School</option>
                      <option value="undergrad" className="bg-slate-900">Undergraduate</option>
                      <option value="graduate" className="bg-slate-900">Graduate</option>
                      <option value="professional" className="bg-slate-900">Professional</option>
                    </select>
                  </div>
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Interest</span>
                <div className="rounded-[18px] border border-white/10 bg-slate-900/70 px-4 py-3">
                  <select
                    value={form.interest}
                    onChange={(event) => setForm((prev) => ({ ...prev, interest: event.target.value }))}
                    className="w-full border-none bg-transparent text-sm text-white outline-none"
                    required
                  >
                    <option value="" className="bg-slate-900">Pick a focus area</option>
                    <option value="biology" className="bg-slate-900">Biology</option>
                    <option value="physics" className="bg-slate-900">Physics</option>
                    <option value="chemistry" className="bg-slate-900">Chemistry</option>
                    <option value="astronomy" className="bg-slate-900">Astronomy</option>
                  </select>
                </div>
              </label>

              <label className="flex items-start gap-3 rounded-[18px] border border-white/10 bg-slate-900/60 p-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.acceptedTerms}
                  onChange={() => setForm((prev) => ({ ...prev, acceptedTerms: !prev.acceptedTerms }))}
                  className="mt-0.5 h-4 w-4 rounded border-white/20 bg-slate-900 text-cyan-400"
                  required
                />
                <span>
                  I agree to the Astro Lab community guidelines and personalized learning terms.
                </span>
              </label>

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
                      Preparing your launchpad...
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
                      Account created — welcome aboard
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      className="flex items-center gap-2"
                    >
                      Create Account
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            <div className="my-6 flex items-center gap-3 text-sm text-slate-400">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span>or continue with</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
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

            <div className="mt-7 rounded-[22px] border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-slate-200">
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative mb-4 overflow-hidden rounded-[18px] border border-emerald-400/20 bg-emerald-400/10 p-3"
                  >
                    <div className="absolute inset-0">
                      {confettiPieces.map((piece) => (
                        <motion.span
                          key={piece.id}
                          className={cn("absolute top-0 h-2.5 w-2.5 rounded-full bg-gradient-to-r", piece.color)}
                          initial={{ y: -10, opacity: 0, x: 0 }}
                          animate={{ y: 140, opacity: [0, 1, 0], x: [0, 12, -12] }}
                          transition={{ duration: 1.2, delay: Number(piece.delay), ease: "easeOut" }}
                          style={{ left: piece.left }}
                        />
                      ))}
                    </div>
                    <div className="relative flex items-center gap-2 text-emerald-200">
                      <Sparkles className="h-4 w-4" />
                      Your account is ready. Welcome to the future of science learning.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mb-3 flex items-center gap-2 font-semibold text-white">
                <Award className="h-4 w-4 text-cyan-300" />
                Why join Astro Lab?
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { title: "Lifetime Access", detail: "Retain every lesson and project forever." },
                  { title: "Certificates", detail: "Earn recognitions that look premium on your profile." },
                  { title: "Projects", detail: "Build hands-on work you can showcase with pride." },
                  { title: "Progress Tracking", detail: "Measure every milestone across your journey." },
                ].map((item) => (
                  <div key={item.title} className="rounded-[16px] border border-white/10 bg-slate-950/40 p-3">
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-xs leading-6 text-slate-400">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
              <Link href="/privacy" className="transition hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="transition hover:text-white">
                Terms
              </Link>
              <Link href="/support" className="transition hover:text-white">
                Support
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}
