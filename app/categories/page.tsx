"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { 
  Calculator, Terminal, Database, Briefcase, Server, 
  BrainCircuit, Paintbrush, PenTool, Globe, HeartPulse, 
  TrendingUp, Megaphone, DollarSign, BookOpen, Users, 
  Cloud, ShieldAlert, ArrowLeft, Search, ArrowRight,
  Code, Atom, Cpu, Rocket
} from "lucide-react";

// Expanded list of categories for the dedicated page
const allCategories = [
  { name: "Computer Science", courses: "1,450", icon: Terminal, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { name: "Data Science", courses: "890", icon: Database, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { name: "Business", courses: "2,100", icon: Briefcase, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { name: "AI & ML", courses: "420", icon: BrainCircuit, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  { name: "Design", courses: "650", icon: Paintbrush, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { name: "Engineering", courses: "320", icon: PenTool, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { name: "Mathematics", courses: "540", icon: Calculator, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  { name: "Cloud Computing", courses: "280", icon: Cloud, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  { name: "Health & Medicine", courses: "980", icon: HeartPulse, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
  { name: "Language Learning", courses: "1,200", icon: Globe, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
  { name: "Finance", courses: "760", icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  { name: "Cybersecurity", courses: "310", icon: ShieldAlert, color: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/20" },
  { name: "Web Development", courses: "1,150", icon: Code, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { name: "Physics", courses: "220", icon: Atom, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20" },
  { name: "Hardware", courses: "180", icon: Cpu, color: "text-zinc-400", bg: "bg-zinc-500/10", border: "border-zinc-500/20" },
  { name: "Space Tech", courses: "95", icon: Rocket, color: "text-[var(--color-primary)]", bg: "bg-[var(--color-primary)]/10", border: "border-[var(--color-primary)]/20" },
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = allCategories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-32 pb-24 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-primary)]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Explore Our <br />
              <span className="text-gradient">Knowledge Universe</span>
            </h1>
            <p className="text-xl text-gray-400">
              Browse through dozens of specialized domains and find the perfect path to launch your next career.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-96 relative"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all shadow-inner"
            />
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link href={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`} className="group block h-full">
                  <div className={`glass-panel rounded-[2rem] p-8 h-full flex flex-col items-start hover:bg-white/5 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_rgba(124,92,255,0.15)] relative overflow-hidden border border-white/5 group-hover:border-[var(--color-primary)]/30`}>
                    
                    {/* Background Graphic on Hover */}
                    <div className="absolute -right-8 -bottom-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                      <cat.icon className="w-40 h-40" />
                    </div>

                    <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.border} border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                      <cat.icon className={`w-7 h-7 ${cat.color}`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-secondary)] transition-colors">{cat.name}</h3>
                    
                    <div className="mt-auto pt-6 flex items-center justify-between w-full">
                      <span className="text-sm text-gray-400 font-medium">{cat.courses} courses</span>
                      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No categories found</h3>
              <p className="text-gray-400">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
