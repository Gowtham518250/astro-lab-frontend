'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Lock, CheckCircle2, Star, Zap, Shield, BookOpen, Crown } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PublicNavbar } from '@/components/navbar/PublicNavbar'
import { PublicFooter } from '@/components/footer/PublicFooter'
import { useAuth } from '@/hooks/useAuth'

export default function SkillTreePage() {
  const { user } = useAuth()
  
  // Mock data for skill tree progression
  const tracks = [
    {
      id: "track-1",
      title: "Quantum Path",
      description: "Master the fundamentals of the universe.",
      icon: Zap,
      color: "from-cyan-500 to-blue-600",
      progress: 66,
      nodes: [
        { id: "n1", title: "Quantum Physics 101", status: "completed", type: "foundation" },
        { id: "n2", title: "Superposition Principle", status: "in-progress", type: "core" },
        { id: "n3", title: "Quantum Entanglement", status: "locked", type: "advanced" },
        { id: "n4", title: "Quantum Master", status: "locked", type: "mastery", icon: Crown },
      ]
    },
    {
      id: "track-2",
      title: "Astrobiology Path",
      description: "Discover life beyond Earth.",
      icon: Star,
      color: "from-emerald-400 to-teal-600",
      progress: 0,
      nodes: [
        { id: "n5", title: "Origins of Life", status: "locked", type: "foundation" },
        { id: "n6", title: "Exoplanetary Atmospheres", status: "locked", type: "core" },
        { id: "n7", title: "Alien Ecosystems", status: "locked", type: "advanced" },
        { id: "n8", title: "Astrobiology Master", status: "locked", type: "mastery", icon: Crown },
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-emerald-500 shadow-[0_0_20px_rgba(52,211,153,0.5)] border-emerald-400 text-emerald-950'
      case 'in-progress': return 'bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)] border-cyan-400 text-cyan-950'
      default: return 'bg-slate-900 border-slate-700 text-slate-500 opacity-60'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="h-6 w-6" />
      case 'in-progress': return <BookOpen className="h-6 w-6" />
      default: return <Lock className="h-6 w-6" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      <PublicNavbar />
      
      {/* Header */}
      <div className="relative overflow-hidden bg-slate-900 pt-32 pb-12 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        
        <div className="mx-auto max-w-7xl px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Shield className="h-10 w-10 text-violet-400" />
              Skill Tree
            </h1>
            <p className="mt-4 text-lg text-slate-400 max-w-xl">
              Track your journey from Novice to Master. Unlock nodes by completing courses to earn exclusive titles and badges.
            </p>
          </div>
          
          <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl w-full md:w-auto min-w-[280px]">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-sm font-semibold text-slate-400 uppercase">Global Rank</p>
                <p className="text-3xl font-bold text-white flex items-center gap-2">
                  Level {Math.floor((user?.totalXP || 0) / 1000) + 1}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-500 uppercase">Total XP</p>
                <p className="text-xl font-bold text-violet-400">{(user?.totalXP || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${((user?.totalXP || 0) % 1000) / 10}%` }} 
                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" 
              />
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-16 space-y-24">
        {tracks.map((track, trackIndex) => (
          <div key={track.id} className="relative">
            {/* Track Header */}
            <div className="mb-12 flex items-center gap-6">
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${track.color} shadow-lg`}>
                <track.icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{track.title}</h2>
                <p className="text-slate-400 mt-1">{track.description}</p>
              </div>
              <div className="ml-auto hidden md:block w-48">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>Progress</span>
                  <span className="text-white">{track.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${track.color}`} style={{ width: `${track.progress}%` }} />
                </div>
              </div>
            </div>

            {/* Tree Nodes */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 py-8 px-4 md:px-12 bg-slate-900/30 border border-white/5 rounded-[40px] overflow-hidden">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-24 right-24 h-2 -translate-y-1/2 bg-slate-800 rounded-full z-0 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${track.color}`} style={{ width: `${track.progress}%` }} />
              </div>
              
              {/* Connecting Line (Mobile) */}
              <div className="md:hidden absolute left-1/2 top-12 bottom-12 w-2 -translate-x-1/2 bg-slate-800 rounded-full z-0" />

              {track.nodes.map((node, i) => (
                <div key={node.id} className="relative z-10 flex flex-col items-center text-center w-full md:w-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: trackIndex * 0.2 + i * 0.1, type: "spring", stiffness: 200 }}
                    className={cn(
                      "flex h-20 w-20 items-center justify-center rounded-2xl border-2 transition-all hover:scale-110 cursor-pointer",
                      getStatusColor(node.status)
                    )}
                  >
                    {node.icon ? <node.icon className="h-8 w-8" /> : getStatusIcon(node.status)}
                  </motion.div>
                  
                  <div className="mt-6 md:w-32">
                    <p className={cn(
                      "text-xs font-bold uppercase tracking-wider mb-1",
                      node.status === 'completed' ? "text-emerald-400" : node.status === 'in-progress' ? "text-cyan-400" : "text-slate-500"
                    )}>
                      {node.status}
                    </p>
                    <h3 className={cn(
                      "text-sm font-bold leading-tight",
                      node.status === 'locked' ? "text-slate-400" : "text-white"
                    )}>
                      {node.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      
      <PublicFooter />
    </div>
  )
}
