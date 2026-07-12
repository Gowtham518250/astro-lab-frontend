'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Heart, Flame, Sparkles, Smile, X, Maximize, Settings, Users, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ChatMessage {
  id: string
  user: string
  avatar: string
  text: string
  isSelf: boolean
}

interface Reaction {
  id: number
  icon: React.ReactNode
  x: number
}

export default function LiveClassPage({ params }: { params: { classId: string } }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'Alex', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', text: 'This is mind-blowing!', isSelf: false },
    { id: '2', user: 'Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', text: 'Can you explain the superposition principle again?', isSelf: false },
  ])
  const [inputMsg, setInputMsg] = useState('')
  const [reactions, setReactions] = useState<Reaction[]>([])
  const [chatOpen, setChatOpen] = useState(true)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMsg.trim()) return
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      user: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      text: inputMsg,
      isSelf: true
    }])
    setInputMsg('')
  }

  const handleReaction = (icon: React.ReactNode) => {
    const newReaction = {
      id: Date.now(),
      icon,
      x: Math.random() * 40 - 20 // Random horizontal offset between -20 and 20
    }
    setReactions(prev => [...prev, newReaction])
    
    // Remove reaction after animation completes
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id))
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-black text-slate-50 overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* Top Navbar Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-30 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <Link href="/dashboard" className="pointer-events-auto flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <ChevronLeft className="h-4 w-4" /> Exit Live
        </Link>
        <div className="flex items-center gap-4">
          <div className="pointer-events-auto flex items-center gap-2 bg-rose-500/20 text-rose-500 border border-rose-500/30 px-3 py-1.5 rounded-full backdrop-blur-md font-bold text-xs uppercase tracking-wider animate-pulse">
            <div className="h-2 w-2 rounded-full bg-rose-500" /> Live
          </div>
          <div className="pointer-events-auto flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs font-bold text-white">
            <Users className="h-3 w-3" /> 1,248
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div className={cn("relative flex-1 flex items-center justify-center transition-all duration-500", chatOpen ? "pr-80 md:pr-96" : "")}>
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-violet-900/30 blur-[120px] pointer-events-none mix-blend-screen" />
        
        {/* Video Player Mock */}
        <div className="relative w-full h-full max-h-screen">
          <video 
            src="https://www.w3schools.com/html/mov_bbb.mp4" 
            autoPlay 
            loop 
            muted 
            className="w-full h-full object-contain"
          />
          {/* Glowing Border overlay */}
          <div className="absolute inset-0 border-4 border-violet-500/20 mix-blend-overlay pointer-events-none transition-colors duration-1000" />
        </div>

        {/* Floating Reactions Area */}
        <div className="absolute bottom-24 right-8 w-16 h-64 pointer-events-none overflow-hidden z-20">
          <AnimatePresence>
            {reactions.map(reaction => (
              <motion.div
                key={reaction.id}
                initial={{ opacity: 0, y: 100, scale: 0.5, x: reaction.x }}
                animate={{ opacity: [0, 1, 0.8, 0], y: -200, scale: 1.5, x: reaction.x + (Math.random() * 20 - 10) }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute bottom-0 text-2xl drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              >
                {reaction.icon}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Reaction Buttons */}
        <div className="absolute bottom-8 right-8 flex gap-3 z-30">
          <button onClick={() => handleReaction(<Heart className="text-rose-500 fill-rose-500" />)} className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all shadow-xl">
            <Heart className="h-6 w-6 text-rose-500" />
          </button>
          <button onClick={() => handleReaction(<Flame className="text-orange-500 fill-orange-500" />)} className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all shadow-xl">
            <Flame className="h-6 w-6 text-orange-500" />
          </button>
          <button onClick={() => handleReaction(<Sparkles className="text-amber-300 fill-amber-300" />)} className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all shadow-xl">
            <Sparkles className="h-6 w-6 text-amber-300" />
          </button>
        </div>
      </div>

      {/* Floating Translucent Chat Sidebar */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-4 right-4 bottom-4 w-80 md:w-96 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl flex flex-col z-40 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <h3 className="font-bold text-white flex items-center gap-2">
                Live Chat <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              </h3>
              <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={cn("flex gap-3 max-w-[90%]", msg.isSelf ? "ml-auto flex-row-reverse" : "")}
                  >
                    <img src={msg.avatar} alt={msg.user} className="h-8 w-8 rounded-full bg-white/10 border border-white/5" />
                    <div className={cn(
                      "rounded-2xl px-4 py-2 text-sm",
                      msg.isSelf ? "bg-violet-600 text-white rounded-tr-sm" : "bg-white/10 text-slate-200 rounded-tl-sm backdrop-blur-md border border-white/5"
                    )}>
                      {!msg.isSelf && <p className="text-xs font-bold text-violet-400 mb-0.5">{msg.user}</p>}
                      <p>{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <form onSubmit={handleSend} className="relative">
                <input 
                  type="text" 
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Chat here..."
                  className="w-full bg-black/50 border border-white/20 rounded-full px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all pr-12"
                />
                <button type="submit" disabled={!inputMsg.trim()} className="absolute right-1.5 top-1.5 bottom-1.5 bg-violet-600 hover:bg-violet-500 disabled:bg-white/10 disabled:text-slate-500 text-white rounded-full w-10 flex items-center justify-center transition-colors">
                  <Send className="h-4 w-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!chatOpen && (
        <button 
          onClick={() => setChatOpen(true)}
          className="absolute top-6 right-6 h-12 px-6 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 text-white font-bold text-sm shadow-xl hover:bg-white/10 transition-colors z-30 flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" /> Show Chat
        </button>
      )}

    </div>
  )
}
