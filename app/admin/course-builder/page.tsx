'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, GripVertical, CheckCircle2, ChevronDown, Video, FileText, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type Lesson = { id: string; title: string; type: 'video' | 'reading' | 'quiz' }
type Module = { id: string; title: string; lessons: Lesson[] }

export default function CourseBuilderPage() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'm1',
      title: 'Module 1: Foundations',
      lessons: [
        { id: 'l1', title: 'Introduction to the Course', type: 'video' },
        { id: 'l2', title: 'Core Concepts Reading', type: 'reading' },
      ]
    }
  ])

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 500)
  }

  const addModule = () => {
    setModules([...modules, { id: Date.now().toString(), title: 'New Module', lessons: [] }])
  }

  const addLesson = (moduleId: string, type: 'video' | 'reading' | 'quiz') => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, lessons: [...m.lessons, { id: Date.now().toString(), title: `New ${type}`, type }] }
      }
      return m
    }))
  }

  const removeModule = (id: string) => {
    setModules(modules.filter(m => m.id !== id))
  }

  const removeLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) }
      }
      return m
    }))
  }

  const updateModuleTitle = (id: string, title: string) => {
    setModules(modules.map(m => m.id === id ? { ...m, title } : m))
  }

  const updateLessonTitle = (moduleId: string, lessonId: string, title: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return { ...m, lessons: m.lessons.map(l => l.id === lessonId ? { ...l, title } : l) }
      }
      return m
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans dark:bg-slate-950 dark:text-slate-50">
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-white/10 dark:bg-slate-950">
        <Link href="/admin" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Draft</span>
          <button 
            onClick={handleSave}
            disabled={saving || saved}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved!</> : saving ? 'Saving...' : 'Publish Course'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-6 sm:p-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Course Builder</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Drag and drop modules and lessons to structure your curriculum.</p>
          </div>

          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/50">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Course Title</label>
              <input type="text" placeholder="e.g. Advanced Quantum Mechanics" className="w-full text-lg font-bold rounded-lg border border-slate-200 bg-transparent px-4 py-3 outline-none focus:border-indigo-500 dark:border-white/10" />
            </div>
          </div>

          <div className="space-y-6">
            {modules.map((module, mIndex) => (
              <motion.div 
                key={module.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/50 overflow-hidden"
              >
                {/* Module Header */}
                <div className="flex items-center gap-4 bg-slate-50 border-b border-slate-200 p-4 dark:bg-slate-950/50 dark:border-white/10">
                  <div className="cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <input 
                    type="text" 
                    value={module.title}
                    onChange={(e) => updateModuleTitle(module.id, e.target.value)}
                    className="flex-1 bg-transparent font-semibold outline-none focus:text-indigo-600 dark:focus:text-indigo-400"
                  />
                  <button onClick={() => removeModule(module.id)} className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition dark:hover:bg-rose-500/10">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                </div>

                {/* Lessons List */}
                <div className="p-4 space-y-3">
                  {module.lessons.map((lesson, lIndex) => (
                    <div key={lesson.id} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-slate-900">
                      <div className="cursor-grab text-slate-300 hover:text-slate-500">
                        <GripVertical className="h-4 w-4" />
                      </div>
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg text-white",
                        lesson.type === 'video' ? "bg-blue-500" : lesson.type === 'quiz' ? "bg-amber-500" : "bg-emerald-500"
                      )}>
                        {lesson.type === 'video' ? <Video className="h-4 w-4" /> : lesson.type === 'quiz' ? <HelpCircle className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                      </div>
                      <input 
                        type="text" 
                        value={lesson.title}
                        onChange={(e) => updateLessonTitle(module.id, lesson.id, e.target.value)}
                        className="flex-1 text-sm bg-transparent outline-none"
                      />
                      <button onClick={() => removeLesson(module.id, lesson.id)} className="p-1.5 text-slate-400 hover:text-rose-500 transition">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {/* Add Lesson Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button onClick={() => addLesson(module.id, 'video')} className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                      <Video className="h-3.5 w-3.5" /> + Video
                    </button>
                    <button onClick={() => addLesson(module.id, 'reading')} className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                      <FileText className="h-3.5 w-3.5" /> + Reading
                    </button>
                    <button onClick={() => addLesson(module.id, 'quiz')} className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition dark:border-white/10 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                      <HelpCircle className="h-3.5 w-3.5" /> + Quiz
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            <button 
              onClick={addModule}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 py-6 text-sm font-medium text-slate-600 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 transition dark:border-white/20 dark:text-slate-400 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-300"
            >
              <Plus className="h-5 w-5" /> Add New Module
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
