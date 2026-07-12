"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function HeroSection() {
  const { user } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[var(--color-background)]" />
        {/* Aurora Glows */}
        <motion.div 
          animate={{
            x: mousePosition.x * -50,
            y: mousePosition.y * -50,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[var(--color-primary)]/20 blur-[120px] rounded-full mix-blend-screen animate-aurora" 
        />
        <motion.div 
          animate={{
            x: mousePosition.x * 50,
            y: mousePosition.y * 50,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-[var(--color-secondary)]/20 blur-[120px] rounded-full mix-blend-screen animate-aurora" 
        />
        
        {/* Stars (Pure CSS particles via div box-shadow or simple divs for performance) */}
        <div className="absolute inset-0 overflow-hidden opacity-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-full animate-float"
              style={{
                width: Math.random() * 3 + 'px',
                height: Math.random() * 3 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDuration: (Math.random() * 5 + 5) + 's',
                animationDelay: (Math.random() * 5) + 's',
                opacity: Math.random() * 0.8 + 0.2
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center lg:text-left space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-[var(--color-primary)]/30 text-sm font-medium text-[var(--color-secondary)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-secondary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-secondary)]"></span>
            </span>
            Astro Lab Mission 1.0 Launched
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
            Explore Beyond <br/>
            <span className="text-gradient">Imagination</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Building the future through innovation, AI and space technology. Join the most advanced learning platform in the cosmos.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link 
              href={user ? "/courses" : "/login"} 
              className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                Launch Mission <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href="#about" 
              className="px-8 py-4 rounded-full font-bold text-lg text-white glass-panel hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Explore Universe
            </Link>
          </div>
        </motion.div>

        {/* 3D Element Simulation (Parallax floating object) */}
        <motion.div 
          animate={{
            x: mousePosition.x * -100,
            y: mousePosition.y * -100,
            rotateY: mousePosition.x * 20,
            rotateX: mousePosition.y * -20,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 30 }}
          className="hidden lg:flex justify-center items-center perspective-1000"
        >
          <div className="relative w-96 h-96 rounded-full glass-panel border-[var(--color-primary)]/20 shadow-[0_0_100px_rgba(124,92,255,0.2)] flex items-center justify-center animate-float">
            <Globe className="w-48 h-48 text-[var(--color-secondary)] opacity-80 animate-pulse" strokeWidth={1} />
            
            {/* Orbiting rings */}
            <div className="absolute inset-0 border border-[var(--color-secondary)]/30 rounded-full scale-[1.3] -rotate-45" style={{ borderStyle: 'dashed' }} />
            <div className="absolute inset-0 border border-[var(--color-primary)]/30 rounded-full scale-[1.6] rotate-12" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
