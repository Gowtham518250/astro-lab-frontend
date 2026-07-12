'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Award, Download, Share2, Linkedin, CheckCircle, ShieldCheck, ChevronRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { PublicNavbar } from '@/components/navbar/PublicNavbar'
import { PublicFooter } from '@/components/footer/PublicFooter'
import { useAuth } from '@/hooks/useAuth'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
}

function CertificateCard({ cert, user, downloadPDF, isDownloading }: { cert: any, user: any, downloadPDF: (cert: any) => void, isDownloading: boolean }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left - width / 2)
    mouseY.set(clientY - top - height / 2)
  }

  return (
    <motion.div 
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
      style={{
        rotateX: useMotionTemplate`${mouseY}deg` as any,
        rotateY: useMotionTemplate`${mouseX}deg` as any,
        transformPerspective: 1000
      }}
      className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/50 backdrop-blur-xl transition-all hover:border-emerald-500/50 hover:shadow-[0_20px_60px_-15px_rgba(52,211,153,0.2)]"
    >
      {/* Certificate Preview Image (Target for PDF) */}
      <div id={`certificate-canvas-${cert.id}`} className="relative aspect-[1.414/1] w-full overflow-hidden bg-slate-950 p-8 flex flex-col items-center justify-center border-b border-white/10">
        <img src={cert.course?.thumbnail || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
        
        {/* Shimmering effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
        
        {/* Certificate Design */}
        <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center shadow-2xl">
          <div className="mx-auto w-12 h-12 mb-4 text-emerald-400">
            <ShieldCheck className="w-full h-full" />
          </div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Certificate of Completion</h3>
          <h2 className="text-2xl font-extrabold text-white mb-6 leading-tight">{cert.courseName}</h2>
          <div className="flex justify-between items-end border-t border-white/10 pt-4">
            <div className="text-left">
              <p className="text-[10px] text-slate-400 uppercase">Awarded to</p>
              <p className="text-sm font-bold text-white">{user?.name || "Student"}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase">Date</p>
              <p className="text-sm font-bold text-white">{new Date(cert.issuedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Actions */}
      <div className="p-8 cert-actions bg-slate-900/50">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-white">{cert.courseName}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-emerald-400" /> Grade: {cert.grade || '100%'}</span>
              <span className="flex items-center gap-1.5 text-slate-500">ID: {cert.id.split('-')[0]}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:flex items-center gap-4">
          <button 
            onClick={() => downloadPDF(cert)}
            disabled={isDownloading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-slate-900 shadow-md hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download PDF
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-[#0077b5] px-6 py-3 font-bold text-white shadow-md hover:bg-[#006097] transition-colors shadow-[#0077b5]/20">
            <Linkedin className="h-4 w-4" /> Add to Profile
          </button>
          <button className="col-span-2 sm:col-span-1 flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white hover:bg-white/10 transition-colors">
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function CertificatesPage() {
  const { user } = useAuth()
  const [certificates, setCertificates] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem('astro_lab_token')
        const res = await fetch('/api/certificates', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setCertificates(data.certificates || [])
        }
      } catch (err) {
        console.error("Failed to fetch certificates", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCertificates()
  }, [])

  const downloadPDF = async (cert: any) => {
    setIsDownloading(cert.id)
    try {
      const element = document.getElementById(`certificate-canvas-${cert.id}`)
      if (!element) return

      // Hide actions temporarily for a clean capture
      const actions = element.querySelector('.cert-actions')
      if (actions) (actions as HTMLElement).style.display = 'none'

      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#020617' })
      const imgData = canvas.toDataURL('image/jpeg', 1.0)
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      })
      
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height)
      pdf.save(`${cert.courseName.replace(/\s+/g, '_')}_Certificate.pdf`)

      if (actions) (actions as HTMLElement).style.display = ''
    } catch (err) {
      console.error("PDF generation failed", err)
    } finally {
      setIsDownloading(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      <PublicNavbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/10 bg-slate-900 pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-slate-900 pointer-events-none" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                <Award className="h-8 w-8 text-emerald-400" />
              </div>
              Your Achievements
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              View, download, and share your cryptographically verified certificates with the world.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-12 lg:grid-cols-2"
        >
          {isLoading ? (
            <div className="col-span-1 lg:col-span-2 flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
            </div>
          ) : certificates.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} user={user} downloadPDF={downloadPDF} isDownloading={isDownloading === cert.id} />
          ))}
        </motion.div>
        
        {!isLoading && certificates.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-[32px] border border-white/5 bg-slate-900/20 p-24 text-center backdrop-blur-sm">
            <Award className="mb-6 h-16 w-16 text-slate-600" />
            <h3 className="mb-3 text-2xl font-bold text-white">No certificates yet</h3>
            <p className="max-w-md text-slate-400 text-lg mb-8">Complete courses to earn verifiable certificates that you can share with your professional network.</p>
            <Link href="/dashboard" className="flex items-center gap-2 rounded-xl bg-cyan-600 px-8 py-3 font-bold text-white shadow-lg hover:bg-cyan-500 transition-colors">
              Continue Learning <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </main>
      
      <PublicFooter />
    </div>
  )
}
