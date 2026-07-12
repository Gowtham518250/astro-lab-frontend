"use client";

import { motion } from "framer-motion";
import { Atom, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FooterContact() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[var(--color-background-alt)] border-t border-white/10 relative overflow-hidden">
      {/* Top Section - Get Started */}
      <div className="py-24 bg-[var(--color-background)] border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[200%] bg-[var(--color-primary)]/10 rotate-12 blur-3xl rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Start Learning Today</h2>
              <p className="text-gray-400 text-lg max-w-md mb-8">
                Take the next step in your career. Join millions of learners and get access to world-class education.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  required
                />
                <button type="submit" className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(124,92,255,0.4)] flex items-center justify-center gap-2">
                  Get Started <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
            
            <div className="hidden md:flex justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/20 to-transparent rounded-3xl transform rotate-3" />
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop" 
                  alt="Students learning" 
                  className="rounded-3xl w-full max-w-md object-cover shadow-[0_0_40px_rgba(124,92,255,0.2)] relative z-10 opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2 pr-8">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/30">
                <Atom className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Astro<span className="text-[var(--color-primary)]">Lab</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Providing universal access to the world's best education. Learn from top universities and industry leaders.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Astro Lab</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[var(--color-primary)] transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[var(--color-primary)] transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[var(--color-primary)] transition-colors">Catalog</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[var(--color-primary)] transition-colors">Degrees</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Community</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[var(--color-primary)] transition-colors">Learners</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[var(--color-primary)] transition-colors">Partners</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[var(--color-primary)] transition-colors">Developers</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[var(--color-primary)] transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">More</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[var(--color-primary)] transition-colors">Terms</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[var(--color-primary)] transition-colors">Privacy</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[var(--color-primary)] transition-colors">Help</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[var(--color-primary)] transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 Astro Lab Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors" />
            <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors" />
            <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
