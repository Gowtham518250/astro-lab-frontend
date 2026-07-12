"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function GlassNavbar() {
  const { user, logout } = useAuth();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between rounded-2xl px-6 py-4 ${
          isScrolled ? "glass-panel" : "bg-transparent"
        } transition-all duration-300`}>
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[var(--color-primary)]/20 p-2 rounded-xl group-hover:bg-[var(--color-primary)]/40 transition-colors">
              <Rocket className="text-[var(--color-secondary)] w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-wider text-white">
              ASTRO<span className="text-[var(--color-primary)]">LAB</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {["Home", "Missions", "Technology", "Gallery", "About", "Contact"].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-secondary)] transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link 
                  href="/dashboard"
                  className="text-sm font-medium text-white hover:text-[var(--color-secondary)] transition-colors"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => logout()}
                  className="px-5 py-2.5 rounded-full bg-white/10 text-white font-semibold text-sm hover:scale-105 transition-transform"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login"
                  className="text-sm font-medium text-white hover:text-[var(--color-secondary)] transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register"
                  className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(124,92,255,0.4)] hover:shadow-[0_0_30px_rgba(76,201,240,0.6)]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
