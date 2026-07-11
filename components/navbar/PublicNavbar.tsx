'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Atom, Menu, X, ChevronRight, LogOut, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Courses", href: "/courses" },
  { name: "Categories", href: "#categories" },
  { name: "Instructors", href: "#instructors" },
  { name: "Testimonials", href: "#testimonials" },
]

export function PublicNavbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<{ role: string, email: string } | null>(null)

  useEffect(() => {
    const authData = localStorage.getItem("astro-auth")
    if (authData) {
      try {
        setUser(JSON.parse(authData))
      } catch (e) {}
    }
    
    const handleStorageChange = () => {
      const updatedAuth = localStorage.getItem("astro-auth")
      if (updatedAuth) {
        setUser(JSON.parse(updatedAuth))
      } else {
        setUser(null)
      }
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-white/10 bg-slate-950/70 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 shadow-[0_4px_20px_rgba(34,211,238,0.4)]">
              <Atom className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Astro Lab</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            {user ? (
              <>
                <Link
                  href={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <User className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("astro-auth")
                    setUser(null)
                    window.location.href = "/"
                  }}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  <span>Join Now</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-white/10 bg-slate-950 px-6 py-6 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500">
                    <Atom className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white">Astro Lab</span>
                </Link>
                <button
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-lg font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8">
                {user ? (
                  <>
                    <Link
                      href={user.role === 'admin' ? '/admin' : '/dashboard'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-lg font-medium text-white transition-colors hover:bg-white/10"
                    >
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("astro-auth")
                        setUser(null)
                        setMobileMenuOpen(false)
                        window.location.href = "/"
                      }}
                      className="rounded-xl bg-rose-500/10 px-4 py-3 text-center text-lg font-medium text-rose-400 transition-colors hover:bg-rose-500/20"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-center text-lg font-medium text-white transition-colors hover:bg-white/5"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl bg-white px-4 py-3 text-center text-lg font-medium text-slate-950 transition-colors hover:bg-slate-200"
                    >
                      Join Astro Lab
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
