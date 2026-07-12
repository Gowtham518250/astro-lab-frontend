"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Globe, BookOpen, Library, Medal } from "lucide-react";

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-32 pb-24 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[var(--color-secondary)]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary)]/10 blur-[150px] rounded-full pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-sm font-semibold mb-6">
              <GraduationCap className="w-4 h-4" /> Higher Education Partners
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Your Campus into a <span className="text-gradient">Digital Campus</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Integrate world-class industry curriculum directly into your degree programs. Give your students the practical, highly sought-after skills they need to succeed post-graduation.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[var(--color-secondary)] hover:bg-cyan-600 text-black rounded-full font-bold transition-all shadow-[0_0_20px_rgba(76,201,240,0.4)] hover:shadow-[0_0_30px_rgba(76,201,240,0.6)]">
                Partner With Us
              </button>
              <button className="px-8 py-4 glass-panel border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
                Download Brochure
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-[0_0_50px_rgba(124,92,255,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/50 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
                alt="University Students" 
                className="w-full h-full object-cover filter contrast-125 opacity-80"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="glass-panel rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-2">Bridge the Skills Gap</h3>
                  <p className="text-sm text-gray-400">92% of our university partners reported higher graduate employment rates within the first 6 months of adoption.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Value Props Grid */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Empower Your Students & Faculty</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-16">
            We offer flexible integration options for universities of all sizes.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { icon: Library, title: "Blended Learning", desc: "Augment your existing syllabus with our interactive coding environments and labs." },
              { icon: Globe, title: "Global Reach", desc: "Attract international students by offering dual-certification programs powered by AstroLab." },
              { icon: Medal, title: "Industry Credentials", desc: "Students graduate with both a degree and recognized professional certificates." },
            ].map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-[var(--color-secondary)]/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-background-alt)] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:border-[var(--color-primary)] shadow-inner">
                  <feature.icon className="w-7 h-7 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
