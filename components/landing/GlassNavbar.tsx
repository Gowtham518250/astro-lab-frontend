"use client";

import { motion } from "framer-motion";
import { Search, ChevronRight, Menu, Atom } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function GlassNavbar() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[var(--color-background)]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-[var(--color-primary)]/40">
            <Atom className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Astro<span className="text-[var(--color-primary)]">Lab</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/courses" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Explore</Link>
          <Link href="/categories" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Categories</Link>
          <Link href="/business" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">For Business</Link>
          <Link href="/universities" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">For Universities</Link>
        </div>

        {/* Auth Buttons & Search */}
        <div className="hidden md:flex items-center gap-4">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const query = formData.get("search");
              if (query) {
                window.location.href = `/courses?search=${encodeURIComponent(query.toString())}`;
              }
            }}
            className="relative group"
          >
            <input 
              type="text" 
              name="search"
              placeholder="Search courses..."
              className="w-8 focus:w-48 transition-all duration-300 bg-transparent border-none outline-none text-sm text-white placeholder-transparent focus:placeholder-gray-500 pl-8 py-1 rounded-full focus:bg-white/10"
            />
            <button type="submit" className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[var(--color-primary)] transition-colors p-1 pointer-events-none">
              <Search className="w-4 h-4" />
            </button>
          </form>
          
          <div className="h-4 w-px bg-white/20 mx-2" />

          {user ? (
            <Link 
              href="/dashboard"
              className="px-5 py-2 text-sm font-bold bg-white text-black rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              My Learning <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-sm font-bold text-gray-300 hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link 
                href="/register" 
                className="px-5 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white text-sm font-semibold rounded-full transition-all shadow-[0_0_15px_rgba(124,92,255,0.4)] hover:shadow-[0_0_25px_rgba(76,201,240,0.6)]"
              >
                Sign Up Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}
