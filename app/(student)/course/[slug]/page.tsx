'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  ChevronLeft, Play, Pause, Volume2, VolumeX, Maximize, 
  Menu, CheckCircle2, Circle, Trophy, Award, Lock, BookOpen, LayoutList
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCourse } from '@/hooks/useCourse'

export default function CoursePlayerPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { data: courseData, isLoading } = useCourse(params.slug, true)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<'video' | 'quiz'>('video')
  const [quizScore, setQuizScore] = useState<number | null>(null)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => console.log(err))
      } else {
        document.exitFullscreen()
      }
    }
  }

  // Handle Quiz Submission
  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setQuizScore(100) // Mock 100% score for demo
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
      </div>
    )
  }

  const course = courseData?.course || {
    title: "Quantum Mechanics Masterclass",
    description: "Explore the depths of the universe.",
    mainVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-50 overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* SIDEBAR */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0, x: -50 }}
            animate={{ width: 320, opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-full border-r border-white/10 bg-slate-900/80 backdrop-blur-2xl flex flex-col z-20 shrink-0"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors">
                <ChevronLeft className="h-4 w-4" /> Back to Dashboard
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              <h2 className="text-xl font-bold mb-6 text-white">{course.title}</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Module 1: Fundamentals</h3>
                  <button onClick={() => setActiveTab('video')} className={cn("w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left", activeTab === 'video' ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400" : "bg-white/5 border-transparent text-slate-300 hover:bg-white/10")}>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      <span className="font-semibold text-sm">1. Introduction to Quantum States</span>
                    </div>
                    <span className="text-xs">12:45</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-transparent text-slate-300 hover:bg-white/10 transition-all text-left opacity-60">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-slate-500" />
                      <span className="font-semibold text-sm">2. Superposition Principle</span>
                    </div>
                    <span className="text-xs">18:20</span>
                  </button>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Assessments</h3>
                  <button onClick={() => setActiveTab('quiz')} className={cn("w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left", activeTab === 'quiz' ? "bg-violet-500/10 border-violet-500/50 text-violet-400" : "bg-white/5 border-transparent text-slate-300 hover:bg-white/10")}>
                    <div className="flex items-center gap-3">
                      {quizScore ? <Award className="h-5 w-5 text-emerald-400" /> : <BookOpen className="h-5 w-5" />}
                      <span className="font-semibold text-sm">Module 1 Final Quiz</span>
                    </div>
                    {quizScore && <span className="text-xs font-bold text-emerald-400">{quizScore}%</span>}
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col relative h-full bg-black">
        
        {/* Top bar over player */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-30 bg-gradient-to-b from-black/80 to-transparent">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {activeTab === 'video' ? (
          <div ref={containerRef} className="relative flex-1 flex flex-col justify-center items-center group w-full h-full">
            {/* Ambient Background Glow (Theater Mode effect) */}
            <div className="absolute inset-0 bg-cyan-900/20 blur-[120px] pointer-events-none transition-opacity duration-1000" style={{ opacity: isPlaying ? 1 : 0.3 }} />
            
            <video 
              ref={videoRef}
              src={course.mainVideo || "https://www.w3schools.com/html/mov_bbb.mp4"}
              className="w-full max-h-full object-contain z-10 shadow-2xl"
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            
            {/* Custom Video Controls overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                <button onClick={togglePlay} className="text-white hover:text-cyan-400 transition-colors">
                  {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current" />}
                </button>
                
                {/* Mock Progress Bar */}
                <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                  <div className="h-full bg-cyan-500 w-1/3" />
                </div>
                
                <div className="flex items-center gap-4">
                  <button onClick={toggleMute} className="text-white hover:text-cyan-400 transition-colors">
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                  </button>
                  <button onClick={toggleFullscreen} className="text-white hover:text-cyan-400 transition-colors">
                    <Maximize className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto bg-slate-950 p-8 flex justify-center items-center relative">
            <div className="absolute inset-0 bg-violet-900/10 blur-[100px] pointer-events-none" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 relative z-10 shadow-[0_20px_60px_-15px_rgba(139,92,246,0.2)]"
            >
              {quizScore !== null ? (
                <div className="text-center space-y-6">
                  <div className="mx-auto w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 shadow-[0_0_50px_rgba(52,211,153,0.3)]">
                    <Trophy className="h-12 w-12 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold text-white">Quiz Completed!</h2>
                    <p className="text-emerald-400 mt-2 font-bold text-xl">Score: {quizScore}%</p>
                  </div>
                  <p className="text-slate-400">Excellent work! You have successfully mastered the concepts in Module 1.</p>
                  <button onClick={() => setActiveTab('video')} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors">
                    Continue to Next Module
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuizSubmit} className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Module 1 Knowledge Check</h2>
                    <p className="text-slate-400">Test your understanding of the concepts covered so far.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="font-semibold text-lg text-white">1. What is the fundamental principle of Quantum Superposition?</p>
                    <label className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-violet-500/10 hover:border-violet-500/50 cursor-pointer transition-colors group">
                      <input required type="radio" name="q1" className="text-violet-500 focus:ring-violet-500 bg-slate-900 border-white/20" />
                      <span className="group-hover:text-violet-300 transition-colors">Particles can exist in multiple states simultaneously.</span>
                    </label>
                    <label className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-violet-500/10 hover:border-violet-500/50 cursor-pointer transition-colors group">
                      <input type="radio" name="q1" className="text-violet-500 focus:ring-violet-500 bg-slate-900 border-white/20" />
                      <span className="group-hover:text-violet-300 transition-colors">Gravity bends light around massive objects.</span>
                    </label>
                    <label className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-violet-500/10 hover:border-violet-500/50 cursor-pointer transition-colors group">
                      <input type="radio" name="q1" className="text-violet-500 focus:ring-violet-500 bg-slate-900 border-white/20" />
                      <span className="group-hover:text-violet-300 transition-colors">Energy is equal to mass times the speed of light squared.</span>
                    </label>
                  </div>
                  
                  <button type="submit" className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-bold text-lg shadow-[0_10px_30px_-10px_rgba(139,92,246,0.5)] transition-all transform hover:-translate-y-1">
                    Submit Answers
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </main>
    </div>
  )
}
