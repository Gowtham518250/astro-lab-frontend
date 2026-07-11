'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ChevronLeft, Play, Pause, Maximize, Volume2, 
  Settings, MessageSquare, Download, FileText, 
  Bookmark, CheckCircle2, ChevronRight, List,
  Trophy, Clock, RotateCcw, Medal
} from 'lucide-react'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useCourse } from '@/hooks/useCourse'
import { useAuth } from '@/hooks/useAuth'

const tabs = [
  { id: 'notes', label: 'Lesson Notes', icon: FileText },
  { id: 'resources', label: 'Resources', icon: Download },
  { id: 'discussion', label: 'Discussion', icon: MessageSquare },
  { id: 'quiz', label: 'Knowledge Check', icon: Trophy },
]

export default function LessonPlayerPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const { data: course, isLoading } = useCourse(courseId)
  const { user } = useAuth()

  const [activeTab, setActiveTab] = useState('notes')
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-50">
        Course not found
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-slate-50 overflow-hidden">
      {/* 1. TOP NAVBAR */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-slate-950 px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="hidden sm:block h-6 w-px bg-white/10" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{course.title}</p>
            <h1 className="text-sm font-semibold text-white">4. {course.lessons?.[0]?.title || 'Introduction'}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Saved
          </div>
          <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition">
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Curriculum</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 2. MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
            
            {/* Video Player */}
            <div className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-2xl aspect-video w-full">
              <img src={course.thumbnail} alt="Video frame" className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700", isPlaying ? "opacity-30" : "opacity-100")} />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 backdrop-blur-md transition hover:scale-110 hover:bg-cyan-500/30"
                >
                  {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current ml-2" />}
                </button>
              </div>

              {/* Player Controls (Hover) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="mb-4 h-1.5 w-full cursor-pointer rounded-full bg-white/20">
                  <div className="h-full w-1/3 rounded-full bg-cyan-400 relative">
                    <div className="absolute -right-2 -top-1.5 h-4 w-4 rounded-full bg-white shadow" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-white">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-cyan-400"><Play className="h-5 w-5 fill-current" /></button>
                    <button className="hover:text-cyan-400"><Volume2 className="h-5 w-5" /></button>
                    <span>04:12 / 18:45</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="hover:text-cyan-400"><Settings className="h-5 w-5" /></button>
                    <button className="hover:text-cyan-400"><Maximize className="h-5 w-5" /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-between">
              <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition">
                <ChevronLeft className="h-4 w-4" /> Previous Lesson
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                Next Lesson <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-10 border-b border-white/10">
              <div className="flex gap-6 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "relative flex items-center gap-2 pb-4 text-sm font-medium transition-colors whitespace-nowrap",
                        isActive ? "text-cyan-400" : "text-slate-400 hover:text-slate-200"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                      {isActive && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="py-8">
              <AnimatePresence mode="wait">
                {activeTab === 'notes' && (
                  <motion.div key="notes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="prose prose-invert max-w-none">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl">
                      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                        <h3 className="text-xl font-semibold text-white m-0">Superposition Principle</h3>
                        <button className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10"><Bookmark className="h-3.5 w-3.5" /> Bookmark</button>
                      </div>
                      <p className="text-slate-300">
                        The principle of quantum superposition states that if a physical system may be in one of many configurations—arrangements of particles or fields—then the most general state is a combination of all of these possibilities.
                      </p>
                      <p className="text-slate-300">
                        A fundamental concept in quantum mechanics, superposition is the basis for quantum computing&apos;s parallel processing capabilities.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'quiz' && (
                  <motion.div key="quiz" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    {!quizStarted ? (
                      <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-10 text-center backdrop-blur-xl">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 mb-6">
                          <Trophy className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Knowledge Check</h2>
                        <p className="text-slate-400 max-w-md mx-auto mb-8">Test your understanding of superposition. You need 80% to earn the &quot;Quantum Observer&quot; badge.</p>
                        
                        <div className="flex justify-center gap-8 mb-8 text-sm text-slate-300">
                          <span className="flex items-center gap-2"><List className="h-4 w-4 text-cyan-400" /> 5 Questions</span>
                          <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-cyan-400" /> 10 Mins</span>
                        </div>
                        
                        <button onClick={() => setQuizStarted(true)} className="rounded-full bg-cyan-500 px-8 py-3 font-semibold text-slate-950 hover:bg-cyan-400 transition shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                          Start Quiz
                        </button>
                      </div>
                    ) : (
                      <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-sm">1</span>
                            <span className="text-slate-400 text-sm">of 5</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm text-amber-400">
                            <Clock className="h-4 w-4" /> 09:42
                          </div>
                        </div>

                        <h3 className="text-xl font-medium text-white mb-6">
                          In the context of the double-slit experiment, what does observing the electron do to its superposition state?
                        </h3>

                        <div className="space-y-3 mb-8">
                          {[
                            "It duplicates the electron",
                            "It forces the electron into a definite state (collapses the wave function)",
                            "It reverses the electron's spin",
                            "It has absolutely no effect on the electron"
                          ].map((answer, index) => (
                            <button
                              key={index}
                              onClick={() => !quizSubmitted && setSelectedAnswer(index)}
                              disabled={quizSubmitted}
                              className={cn(
                                "w-full rounded-2xl border px-5 py-4 text-left text-sm transition-all flex items-center justify-between",
                                selectedAnswer === index && !quizSubmitted
                                  ? "border-cyan-400 bg-cyan-400/10 text-white" 
                                  : quizSubmitted && index === 1 
                                    ? "border-emerald-500 bg-emerald-500/20 text-white" 
                                    : quizSubmitted && selectedAnswer === index && index !== 1
                                      ? "border-rose-500 bg-rose-500/20 text-white"
                                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                              )}
                            >
                              {answer}
                              {quizSubmitted && index === 1 && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                            </button>
                          ))}
                        </div>

                        {!quizSubmitted ? (
                          <div className="flex justify-end">
                            <button 
                              onClick={() => setQuizSubmitted(true)}
                              disabled={selectedAnswer === null}
                              className="rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Submit Answer
                            </button>
                          </div>
                        ) : (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5 flex items-start gap-4">
                            <Medal className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-emerald-400 font-semibold mb-1">Correct! You earned +50 XP</h4>
                              <p className="text-sm text-slate-300">Observation forces the quantum system to &quot;choose&quot; a single state, destroying the interference pattern.</p>
                              <div className="mt-4 flex gap-3">
                                <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 hover:bg-emerald-400">Next Question</button>
                                <button onClick={() => { setQuizSubmitted(false); setSelectedAnswer(null); setQuizStarted(false); }} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-2"><RotateCcw className="h-4 w-4"/> Retry Quiz</button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
