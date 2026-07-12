"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Atom, ArrowRight, User, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center"><div className="w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div></div>}>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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

    const res = await register({
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      password: form.password,
    });

    if (res.ok) {
      toast.success("Account created! Welcome to Astro Lab.");
      if (res.user?.role === 'ADMIN') {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } else {
      setIsSubmitting(false);
      setErrorMessage(res.error || "Registration failed. Please try again.");
      toast.error(res.error || "Registration failed.");
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex relative overflow-hidden">
      
      {/* Global Interactive Cursor Glow */}
      <motion.div 
        className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          x: springX,
          y: springY
        }}
      />

      {/* Left Column: Visual (Animations Left) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#050816] items-center justify-center overflow-hidden border-r border-white/5 z-10">
        {/* Animated Background Ambience */}
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[var(--color-primary)]/15 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/15 blur-[150px] rounded-full pointer-events-none" />
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
            y: [20, -20, 20],
            rotateX: [0, -5, 5, 0],
            rotateY: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 max-w-2xl w-full px-12 h-[600px] flex items-center justify-center scale-110 lg:scale-125"
          style={{ perspective: 1000 }}
        >
          {/* Advanced Animated 3D Solar System / Data Node */}
          <div className="relative w-96 h-96 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            
            {/* Center Sun / Core */}
            <motion.div 
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-28 h-28 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-full blur-[2px] shadow-[0_0_120px_rgba(249,115,22,0.9)] z-20 flex items-center justify-center"
            >
               <div className="w-20 h-20 bg-white/20 rounded-full blur-[2px]" />
            </motion.div>

            {/* Planet Orbit 1 */}
            <motion.div 
              animate={{ rotateZ: 360, rotateX: 60, rotateY: 10 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute w-56 h-56 border-[1.5px] border-white/20 rounded-full flex items-start justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
               <motion.div 
                 animate={{ rotateX: -60, rotateY: -10 }} 
                 className="w-5 h-5 bg-cyan-400 rounded-full shadow-[0_0_25px_rgba(34,211,238,0.9)] -mt-2.5"
               />
            </motion.div>

            {/* Planet Orbit 2 */}
            <motion.div 
              animate={{ rotateZ: -360, rotateX: 75, rotateY: 45 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72 border-[1.5px] border-[var(--color-primary)]/30 rounded-full flex items-center justify-end"
              style={{ transformStyle: 'preserve-3d' }}
            >
               <motion.div 
                 animate={{ rotateX: -75, rotateY: -45 }} 
                 className="w-8 h-8 bg-[var(--color-primary)] rounded-full shadow-[0_0_35px_rgba(124,92,255,0.9)] -mr-4 flex items-center justify-center"
               >
                 {/* Moon of Planet 2 */}
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute w-14 h-14 border border-white/30 rounded-full"
                 >
                   <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_white]" />
                 </motion.div>
               </motion.div>
            </motion.div>

            {/* Planet Orbit 3 (Large) */}
            <motion.div 
              animate={{ rotateZ: 360, rotateX: 45, rotateY: -20 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[400px] h-[400px] border-[1.5px] border-[var(--color-secondary)]/30 rounded-full flex items-end justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
               <motion.div 
                 animate={{ rotateX: -45, rotateY: 20 }} 
                 className="w-10 h-10 bg-[var(--color-secondary)] rounded-full shadow-[0_0_40px_rgba(76,201,240,0.9)] -mb-5 flex items-center justify-center relative"
               >
                 {/* Saturn-like Ring */}
                 <div className="absolute w-20 h-20 border-[3px] border-white/50 rounded-full scale-y-50 shadow-[0_0_15px_white]" />
               </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating UI Badges - Moved outside scaled container to prevent clipping */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="absolute right-8 xl:right-16 top-16 glass-panel px-6 py-4 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-4 hover:scale-105 transition-transform cursor-default z-50"
        >
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Certification</p>
            <p className="text-white font-bold">Verified Skills</p>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Form */}
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
            <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)] flex items-center justify-center shadow-[0_0_20px_rgba(76,201,240,0.4)]">
              <Atom className="w-7 h-7 text-white animate-[spin_12s_linear_infinite_reverse]" />
            </div>
            <span className="font-bold text-3xl tracking-tight text-white">
              Join <span className="text-[var(--color-secondary)]">AstroLab</span>
            </span>
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
          <p className="text-gray-400 mb-8">Begin your journey into advanced technologies today.</p>

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

            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500 group-focus-within:text-[var(--color-secondary)] transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all shadow-inner hover:bg-white/10"
                    placeholder="Alan"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all shadow-inner hover:bg-white/10"
                    placeholder="Turing"
                    required
                  />
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-[var(--color-secondary)] transition-colors" />
                </div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all shadow-inner hover:bg-white/10"
                  placeholder="alan@example.com"
                  required
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[var(--color-secondary)] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all shadow-inner hover:bg-white/10"
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
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] hover:opacity-90 text-white rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(76,201,240,0.4)] hover:shadow-[0_0_30px_rgba(124,92,255,0.6)] flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Launch Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Social Logins */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[var(--color-background)] text-gray-500">Or sign up with</span>
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
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-white hover:text-[var(--color-primary)] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[var(--color-primary)] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

    </main>
  );
}
