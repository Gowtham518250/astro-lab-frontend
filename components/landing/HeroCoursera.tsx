"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Play, CheckCircle, GraduationCap, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroCoursera() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; width: string; height: string; top: string; left: string; animationDuration: string; animationDelay: string; opacity: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    // Generate random particles
    setParticles(Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      width: Math.random() * 4 + 2 + 'px',
      height: Math.random() * 4 + 2 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      animationDuration: (Math.random() * 8 + 7) + 's',
      animationDelay: (Math.random() * 5) + 's',
      opacity: Math.random() * 0.4 + 0.1
    })));

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative flex flex-col justify-center overflow-hidden py-24 bg-black border-t border-white/5">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Glow */}
        <motion.div 
          animate={{ 
            x: mousePosition.x * -30, 
            y: mousePosition.y * -30,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
          className="absolute -top-[10%] right-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-tight text-white">
              Learn Without <br/>
              <span className="text-gradient">Limits</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0">
              Gain in-demand skills from top universities and companies — anytime, anywhere.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto lg:mx-0">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-32 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] text-white placeholder-gray-400 text-lg transition-all"
              placeholder="What do you want to learn?"
            />
            <button className="absolute inset-y-2 right-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-6 rounded-full font-medium transition-colors shadow-md shadow-[var(--color-primary)]/20">
              Search
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
            <Link 
              href="/register" 
              className="group relative px-8 py-3.5 bg-white text-black hover:bg-gray-200 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Join for Free</span>
            </Link>
            <Link 
              href="/courses" 
              className="px-8 py-3.5 glass-panel text-white rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Explore Courses
            </Link>
          </div>
        </motion.div>

        {/* Right Side - Mockup Scene */}
        <div className="hidden lg:block relative h-[600px] w-full perspective-1000">
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              rotateY: mousePosition.x * 15,
              rotateX: mousePosition.y * -15,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 20, delay: 0.2 }}
            className="absolute top-1/2 right-0 -translate-y-1/2 w-[90%] glass-panel rounded-3xl border border-[var(--color-primary)]/20 overflow-hidden shadow-[0_0_50px_rgba(124,92,255,0.2)]"
          >
            {/* Mockup Top Bar */}
            <div className="bg-black/40 border-b border-white/10 px-4 py-3 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* Mockup Video Player */}
            <div onClick={() => setIsVideoModalOpen(true)} className="relative aspect-video bg-gray-900 group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" alt="Course Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 cursor-pointer group-hover:scale-110 group-hover:bg-white/20 transition-all">
                  <Play className="w-6 h-6 text-white ml-1 fill-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-secondary)] w-1/3 rounded-full shadow-[0_0_10px_rgba(76,201,240,0.8)]" />
              </div>
            </div>
            {/* Mockup Details */}
            <div className="p-6 bg-black/20">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-secondary)] mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>DATA SCIENCE SPECILIZATION</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Machine Learning with Python</h3>
              <p className="text-sm text-gray-400">Instructor: Andrew Ng</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe 
                src="https://www.youtube-nocookie.com/embed/jGwO_UgTS7I?autoplay=1" 
                title="Machine Learning Course Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full object-cover bg-gray-900 border-none"
              >
              </iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
