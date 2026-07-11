'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, UploadCloud, Film, CheckCircle2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function UploadVideoPage() {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploaded, setUploaded] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const simulateUpload = () => {
    if (!file) return
    setUploading(true)
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 15
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => {
          setUploading(false)
          setUploaded(true)
        }, 500)
      }
      setProgress(p)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans dark:bg-slate-950 dark:text-slate-50">
      <header className="flex h-16 items-center border-b border-slate-200 bg-white px-6 dark:border-white/10 dark:bg-slate-950">
        <Link href="/admin" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </header>

      <main className="mx-auto max-w-3xl p-6 sm:p-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Upload Lesson Video</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Add a new high-quality video lesson to your curriculum.</p>
          </div>

          <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/50">
            {/* Form Fields */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Video Title</label>
                <input type="text" placeholder="e.g. Introduction to Quantum States" className="w-full rounded-lg border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Assign to Module</label>
                <select className="w-full rounded-lg border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-white/10 [&>option]:bg-slate-900">
                  <option>Module 1: Foundations</option>
                  <option>Module 2: Advanced Theories</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
              <textarea rows={3} placeholder="Brief summary of what this video covers..." className="w-full rounded-lg border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-white/10 resize-none" />
            </div>

            {/* Drag & Drop Area */}
            {!file ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 transition-colors",
                  dragActive ? "border-indigo-500 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-900/20" : "border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-white/20 dark:bg-slate-900 dark:hover:bg-slate-800/50"
                )}
              >
                <UploadCloud className="mb-4 h-10 w-10 text-indigo-500" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Drag and drop your video file here</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">MP4, WebM, or MOV up to 2GB</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-slate-200 dark:bg-white/10" />
                  <span className="text-xs text-slate-400 uppercase font-semibold">OR</span>
                  <div className="h-[1px] w-12 bg-slate-200 dark:bg-white/10" />
                </div>
                <label className="mt-6 cursor-pointer rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 shadow-sm">
                  Browse Files
                  <input type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                </label>
              </div>
            ) : (
              <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                      <Film className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{file.name}</p>
                      <p className="text-xs text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  {!uploading && !uploaded && (
                    <button onClick={() => setFile(null)} className="p-2 text-slate-400 hover:text-rose-500 transition">
                      <X className="h-5 w-5" />
                    </button>
                  )}
                  {uploaded && (
                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  )}
                </div>

                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                      <span>Uploading...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div className="h-full bg-indigo-600 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Submit Button */}
            <div className="flex justify-end border-t border-slate-200 pt-6 dark:border-white/10">
              <button 
                onClick={simulateUpload}
                disabled={!file || uploading || uploaded}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {uploaded ? 'Video Published' : uploading ? 'Uploading...' : 'Upload Video'}
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
