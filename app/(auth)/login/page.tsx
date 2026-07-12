"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Atom, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div></div>}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Advanced Mouse Tracking Glow Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const res = await login(email.trim(), password);

    if (res.ok) {
      toast.success("Authentication successful! Commencing launch...");
      const params = new URLSearchParams(window.location.search);
      let redirect = params.get('redirect');
      
      if (!redirect) {
        if (res.user?.role === 'ADMIN') {
          redirect = '/admin';
        } else {
          redirect = '/dashboard';
        }
      }
      
      window.location.href = redirect;
    } else {
      setIsSubmitting(false);
      setErrorMessage(res.error || "Authentication failed. Check credentials.");
      toast.error(res.error || "Authentication failed.");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex relative overflow-hidden">
      
      {/* Global Interactive Cursor Glow */}
      <motion.div 
        className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          x: springX,
          y: springY
        }}
      />

      {/* Left Column: Visual (Swapped from Right) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#050816] items-center justify-center overflow-hidden border-r border-white/5 z-10">
        {/* Animated Background Ambience */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-primary)]/15 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/15 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />
        
        {/* Perspective Grid Background */}
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", transform: "perspective(500px) rotateX(60deg) scale(2) translateY(100px)", transformOrigin: "bottom center" }} />

        <div className="absolute top-8 left-8 sm:left-16 z-50">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
        </div>

        {/* Floating Abstract Element */}
        <motion.div 
          animate={{ 
            y: [-20, 20, -20],
            rotateX: [0, 5, -5, 0],
            rotateY: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 max-w-2xl w-full px-12 h-[600px] flex items-center justify-center scale-110 lg:scale-125"
          style={{ perspective: 1000 }}
        >
          {/* Advanced Animated 3D Core */}
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Outer Rings */}
            <motion.div 
              animate={{ rotate: 360, rotateX: 45, rotateY: 45 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[2px] border-[var(--color-primary)]/40 rounded-full shadow-[0_0_50px_rgba(124,92,255,0.3)]"
            />
            <motion.div 
              animate={{ rotate: -360, rotateX: 60, rotateY: 20 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 border-[2px] border-[var(--color-secondary)]/50 rounded-full shadow-[0_0_50px_rgba(76,201,240,0.4)]"
            />
            <motion.div 
              animate={{ rotate: 360, rotateX: 20, rotateY: 80 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 border border-white/30 rounded-full"
            />
            
            {/* Inner Glowing Core */}
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-32 h-32 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full blur-xl shadow-[0_0_100px_rgba(124,92,255,1)]"
            />
            <div className="absolute w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-full border border-white/40 flex items-center justify-center shadow-inner">
              <Atom className="w-12 h-12 text-white animate-[spin_8s_linear_infinite]" />
            </div>
            
            {/* Orbiting Particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
              >
                <div className={`absolute top-0 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full ${i % 2 === 0 ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-secondary)]'} shadow-[0_0_20px_currentColor]`} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating UI Badges - Moved outside scaled container to prevent clipping */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute left-8 xl:left-16 top-16 glass-panel px-6 py-4 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-4 hover:scale-105 transition-transform cursor-default z-50"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">System Status</p>
            <p className="text-white font-bold">Online & Ready</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, type: "spring" }}
          className="absolute right-8 xl:right-16 bottom-16 glass-panel px-6 py-4 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-4 hover:scale-105 transition-transform cursor-default z-50"
        >
          <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
            <Atom className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">New Courses</p>
            <p className="text-white font-bold">+12 Added Today</p>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Form (Swapped from Left) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24 relative z-10 backdrop-blur-sm">
        
        {/* Mobile Navigation */}
        <div className="lg:hidden absolute top-8 left-8 sm:left-16 z-50">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="max-w-md w-full mx-auto mt-16 lg:mt-0"
        >
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 mb-8 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)] flex items-center justify-center shadow-[0_0_20px_rgba(124,92,255,0.4)]">
              <Atom className="w-7 h-7 text-white animate-[spin_10s_linear_infinite]" />
            </div>
            <span className="font-bold text-3xl tracking-tight text-white">
              Astro<span className="text-[var(--color-primary)]">Lab</span>
            </span>
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-gray-400 mb-8">Sign in to continue your learning journey.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm"
              >
                {errorMessage}
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-[var(--color-primary)] transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all shadow-inner hover:bg-white/10"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <Link href="#" className="text-sm font-medium text-[var(--color-secondary)] hover:text-white transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[var(--color-primary)] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all shadow-inner hover:bg-white/10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:opacity-90 text-white rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(124,92,255,0.4)] hover:shadow-[0_0_30px_rgba(76,201,240,0.6)] flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Social Logins */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[var(--color-background)] text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" className="flex items-center justify-center py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" className="flex items-center justify-center py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5 h-5 invert opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all" alt="GitHub" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" className="flex items-center justify-center py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                  <img src="https://www.svgrepo.com/show/511330/apple-173.svg" className="w-5 h-5 invert opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all" alt="Apple" />
                </motion.button>
              </div>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="font-bold text-white hover:text-[var(--color-secondary)] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[var(--color-secondary)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                Create one now
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

    </main>
  );
}
