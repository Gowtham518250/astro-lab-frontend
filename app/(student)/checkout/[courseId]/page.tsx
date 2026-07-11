'use client'

import { useState, useEffect, use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, CheckCircle2, ShieldCheck, Lock, CreditCard } from 'lucide-react'
import { useCourse } from '@/hooks/useCourse'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const { data: course, isLoading } = useCourse(courseId)

  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success'>('pending')
  const [redirecting, setRedirecting] = useState(false)
  const [customQr, setCustomQr] = useState<string | null>(null)

  useEffect(() => {
    const savedQr = localStorage.getItem('astro_custom_qr')
    if (savedQr) setCustomQr(savedQr)
  }, [])

  const simulatePaymentSuccess = async () => {
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Payment failed')
      }
      
      setPaymentStatus('success')
      setRedirecting(true)
      setTimeout(() => {
        window.location.href = `/courses/${courseId}/learn`
      }, 1000)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-900 dark:text-slate-50">
        Course not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans dark:bg-slate-950 dark:text-slate-50 flex flex-col relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.1),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.1),_transparent_40%)]" />

      <header className="relative z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
        <Link href={`/courses/${course.id}`} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition">
          <ArrowLeft className="h-4 w-4" />
          Cancel & Return
        </Link>
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
          <Lock className="h-4 w-4" />
          Secure Checkout
        </div>
      </header>

      <main className="relative z-10 flex-1 mx-auto w-full max-w-5xl p-6 sm:p-10 lg:p-16">
        {paymentStatus === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center pt-20 text-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
              <CheckCircle2 className="relative h-32 w-32 text-emerald-500" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Payment Successful!</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-10">
              Welcome to the course. We are preparing your learning lab now.
            </p>
            <div className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-full dark:bg-white dark:text-slate-900 font-medium">
              <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Redirecting to Dashboard...
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-10 lg:grid-cols-2">
            
            {/* Left: Order Summary */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Complete your purchase</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">Scan the QR code to instantly enroll in the course.</p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/50 backdrop-blur-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                    <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">By {course.instructor}</p>
                    <div className="mt-2 inline-block rounded border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-600 dark:text-cyan-300">Lifetime Access</div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 pb-2 dark:border-white/5 space-y-3">
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Original Price</span>
                    <span>${(course.price * (1 + course.discount / 100)).toFixed(2)}</span>
                  </div>
                  {course.discount > 0 && (
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span>Discount</span>
                      <span className="text-emerald-500">-{course.discount}%</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-200 pt-4 dark:border-white/10 flex justify-between items-center">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl">${course.price}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-50 p-4 dark:bg-emerald-500/10">
                <ShieldCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <p className="text-sm text-emerald-800 dark:text-emerald-200">
                  <strong>30-Day Money-Back Guarantee.</strong> Not satisfied? Get a full refund within 30 days, no questions asked.
                </p>
              </div>
            </div>

            {/* Right: Payment QR */}
            <div className="flex flex-col items-center">
              <div className="w-full max-w-sm rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-slate-900 text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500" />
                
                <h2 className="text-xl font-bold mb-2">Scan to Pay</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                  Use any supported UPI app or banking app to scan the QR code.
                </p>
                
                <div className="mx-auto aspect-square w-full max-w-[240px] rounded-2xl bg-white p-4 shadow-inner border border-slate-100 flex items-center justify-center relative group overflow-hidden">
                  {customQr ? (
                    <img src={customQr} alt="Payment QR" className="h-full w-full object-contain" />
                  ) : (
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-900">
                      <rect x="0" y="0" width="30" height="30" />
                      <rect x="5" y="5" width="20" height="20" fill="white" />
                      <rect x="10" y="10" width="10" height="10" />

                      <rect x="70" y="0" width="30" height="30" />
                      <rect x="75" y="5" width="20" height="20" fill="white" />
                      <rect x="80" y="10" width="10" height="10" />

                      <rect x="0" y="70" width="30" height="30" />
                      <rect x="5" y="75" width="20" height="20" fill="white" />
                      <rect x="10" y="80" width="10" height="10" />

                      <rect x="40" y="0" width="20" height="10" />
                      <rect x="45" y="20" width="10" height="20" />
                      <rect x="60" y="40" width="10" height="10" />
                      <rect x="80" y="40" width="20" height="20" />
                      <rect x="40" y="70" width="15" height="15" />
                      <rect x="70" y="70" width="10" height="20" />
                      <rect x="90" y="75" width="10" height="10" />
                      <rect x="15" y="40" width="20" height="15" />
                      <rect x="45" y="45" width="15" height="15" />
                      
                      <rect x="40" y="40" width="20" height="20" fill="white" />
                      <circle cx="50" cy="50" r="8" className="fill-indigo-500" />
                    </svg>
                  )}
                  
                  {/* Decorative Scan Line */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] opacity-50 z-10"
                  />
                </div>

                <div className="mt-8 flex items-center justify-center gap-3 opacity-60">
                  <CreditCard className="h-6 w-6" />
                  <span className="text-xs font-semibold uppercase tracking-widest">Powered by Stripe / UPI</span>
                </div>

                {/* Developer testing button */}
                <button 
                  onClick={simulatePaymentSuccess}
                  className="mt-8 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Simulate Payment Success
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
