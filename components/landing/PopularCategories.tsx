"use client";

import { motion } from "framer-motion";
import { 
  Calculator, Terminal, Database, Briefcase, Server, 
  BrainCircuit, Paintbrush, PenTool, Globe, HeartPulse, 
  TrendingUp, Megaphone, DollarSign, BookOpen, Users, 
  Cloud, ShieldAlert, Camera, Music, ArrowRight
} from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Computer Science", courses: "1,450", icon: Terminal, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Data Science", courses: "890", icon: Database, color: "text-purple-600", bg: "bg-purple-50" },
  { name: "Business", courses: "2,100", icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "AI & ML", courses: "420", icon: BrainCircuit, color: "text-rose-600", bg: "bg-rose-50" },
  { name: "Design", courses: "650", icon: Paintbrush, color: "text-orange-600", bg: "bg-orange-50" },
  { name: "Engineering", courses: "320", icon: PenTool, color: "text-cyan-600", bg: "bg-cyan-50" },
  { name: "Mathematics", courses: "540", icon: Calculator, color: "text-indigo-600", bg: "bg-indigo-50" },
  { name: "Cloud Computing", courses: "280", icon: Cloud, color: "text-sky-600", bg: "bg-sky-50" },
  { name: "Health & Medicine", courses: "980", icon: HeartPulse, color: "text-red-600", bg: "bg-red-50" },
  { name: "Language Learning", courses: "1,200", icon: Globe, color: "text-teal-600", bg: "bg-teal-50" },
  { name: "Finance", courses: "760", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
  { name: "Cybersecurity", courses: "310", icon: ShieldAlert, color: "text-slate-600", bg: "bg-slate-50" }
];

export default function PopularCategories() {
  return (
    <section id="categories" className="py-24 bg-[var(--color-background)] border-y border-white/10 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-secondary)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore Top Categories</h2>
            <p className="text-gray-400 max-w-2xl text-lg">
              Discover thousands of courses from top universities and industry leaders.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/categories" className="inline-flex items-center gap-2 text-[var(--color-secondary)] font-semibold hover:text-white transition-colors group">
              View All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <Link href={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`} className="group block h-full">
                <div className="glass-panel rounded-3xl p-6 h-full flex flex-col items-center text-center hover:bg-white/5 transition-all duration-300 group-hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(124,92,255,0.2)]">
                  <div className={`w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner`}>
                    <cat.icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <h3 className="font-bold text-white mb-1 leading-tight group-hover:text-[var(--color-secondary)] transition-colors">{cat.name}</h3>
                  <p className="text-xs text-gray-400 font-medium">{cat.courses} courses</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
