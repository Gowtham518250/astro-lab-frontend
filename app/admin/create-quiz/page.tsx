'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, GripVertical, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function CreateQuizPage() {
  const [questions, setQuestions] = useState([
    { id: 1, text: '', options: ['', ''], correct: 0 }
  ])

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), text: '', options: ['', ''], correct: 0 }])
  }

  const addOption = (qIndex: number) => {
    const newQ = [...questions]
    newQ[qIndex].options.push('')
    setQuestions(newQ)
  }

  const updateOption = (qIndex: number, oIndex: number, text: string) => {
    const newQ = [...questions]
    newQ[qIndex].options[oIndex] = text
    setQuestions(newQ)
  }

  const removeQuestion = (qIndex: number) => {
    if (questions.length === 1) return
    setQuestions(questions.filter((_, i) => i !== qIndex))
  }

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans dark:bg-slate-950 dark:text-slate-50">
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-white/10 dark:bg-slate-950">
        <Link href="/admin" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <button 
          onClick={handleSave}
          disabled={saving || saved}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved!</> : saving ? 'Saving...' : 'Publish Quiz'}
        </button>
      </header>

      <main className="mx-auto max-w-4xl p-6 sm:p-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create Quiz</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Build interactive multiple-choice assessments for your students.</p>
          </div>

          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/50">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Quiz Title</label>
                <input type="text" placeholder="e.g. Mid-term Assessment" className="w-full rounded-lg border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Passing Score (%)</label>
                <input type="number" defaultValue="80" className="w-full rounded-lg border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-white/10" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <motion.div 
                key={q.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/50"
              >
                <div className="absolute left-3 top-6 cursor-grab text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400">
                  <GripVertical className="h-5 w-5" />
                </div>
                
                <div className="pl-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question {qIndex + 1}</label>
                      <input 
                        type="text" 
                        placeholder="What is the central concept of..." 
                        value={q.text}
                        onChange={(e) => {
                          const newQ = [...questions]
                          newQ[qIndex].text = e.target.value
                          setQuestions(newQ)
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-white/10 dark:bg-slate-950" 
                      />
                    </div>
                    {questions.length > 1 && (
                      <button onClick={() => removeQuestion(qIndex)} className="mt-7 p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition dark:hover:bg-rose-500/10">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  <div className="mt-6 space-y-3">
                    {q.options.map((opt, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            const newQ = [...questions]
                            newQ[qIndex].correct = oIndex
                            setQuestions(newQ)
                          }}
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                            q.correct === oIndex 
                              ? "border-emerald-500 bg-emerald-500 text-white" 
                              : "border-slate-300 bg-transparent hover:border-emerald-500 dark:border-white/20"
                          )}
                        >
                          {q.correct === oIndex && <CheckCircle2 className="h-4 w-4" />}
                        </button>
                        <input 
                          type="text" 
                          placeholder={`Option ${oIndex + 1}`}
                          value={opt}
                          onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                          className={cn(
                            "w-full rounded-lg border bg-transparent px-4 py-2 text-sm outline-none transition-colors focus:border-indigo-500",
                            q.correct === oIndex ? "border-emerald-500/50 bg-emerald-50/50 dark:border-emerald-500/30 dark:bg-emerald-500/5" : "border-slate-200 dark:border-white/10"
                          )} 
                        />
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => addOption(qIndex)}
                    className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                  >
                    <Plus className="h-4 w-4" /> Add Option
                  </button>
                </div>
              </motion.div>
            ))}

            <button 
              onClick={addQuestion}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 py-6 text-sm font-medium text-slate-600 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 transition dark:border-white/20 dark:text-slate-400 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-300"
            >
              <Plus className="h-5 w-5" /> Add New Question
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
