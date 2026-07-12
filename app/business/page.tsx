"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Briefcase, TrendingUp, ShieldCheck, Users, Zap, CheckCircle2, X } from "lucide-react";

export default function BusinessPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-32 pb-24 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-primary)]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 text-[var(--color-secondary)] text-sm font-semibold mb-6">
              <Briefcase className="w-4 h-4" /> For Enterprise
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Upskill Your Team for the <span className="text-gradient">Future</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Equip your workforce with cutting-edge skills in AI, Space Tech, and Data Science. Drive innovation and maintain a competitive edge with our enterprise-grade learning platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-4 bg-[var(--color-primary)] hover:bg-blue-600 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(124,92,255,0.4)] hover:shadow-[0_0_30px_rgba(124,92,255,0.6)]"
              >
                Get a Demo
              </button>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-4 glass-panel border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-[0_0_50px_rgba(76,201,240,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Business Team" 
                className="w-full h-full object-cover filter contrast-125 opacity-80"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="glass-panel rounded-2xl p-6 border border-white/20 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 font-medium mb-1">Team Skill Progression</p>
                    <p className="text-2xl font-bold text-white">+340%</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[var(--color-secondary)]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Top Companies Choose Us</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-16">
            We provide everything your organization needs to deploy training at scale, measure impact, and achieve your business goals.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { icon: ShieldCheck, title: "Enterprise Security", desc: "SSO integration, advanced role-based access control, and strict data compliance." },
              { icon: Zap, title: "Custom Learning Paths", desc: "Curate specific tracks of courses tailored exactly to the roles within your company." },
              { icon: Users, title: "Analytics & Reporting", desc: "Track completion rates, assessment scores, and overall ROI with detailed dashboards." },
            ].map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-[var(--color-primary)]/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-background-alt)] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:border-[var(--color-secondary)] shadow-inner">
                  <feature.icon className="w-7 h-7 text-[var(--color-secondary)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(124,92,255,0.4)] border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
              
              <video 
                src="https://www.w3schools.com/html/mov_bbb.mp4" 
                controls 
                autoPlay 
                playsInline
                preload="auto"
                className="w-full h-full object-cover bg-gray-900"
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
