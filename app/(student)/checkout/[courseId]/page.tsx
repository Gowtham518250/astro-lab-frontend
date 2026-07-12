'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, CheckCircle2, ShieldCheck, Lock, QrCode, Sparkles, ChevronRight, Check } from 'lucide-react'
import { useCourse } from '@/hooks/useCourse'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const { data: course, isLoading } = useCourse(courseId)

  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'verifying' | 'success'>('pending')
  const [customQr, setCustomQr] = useState<string | null>(null)

  useEffect(() => {
    const savedQr = localStorage.getItem('astro_custom_qr')
    if (savedQr) setCustomQr(savedQr)
  }, [])

  const handleVerifyPayment = async () => {
    setPaymentStatus('verifying')
    
    // Simulate a network verification delay
    setTimeout(async () => {
      try {
        const res = await fetch('/api/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId }),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Payment verification failed')
        }
        
        setPaymentStatus('success')
        setTimeout(() => {
          window.location.href = `/course/${course?.slug}`
        }, 2000)
      } catch (error: any) {
        toast.error(error.message)
        setPaymentStatus('pending')
      }
    }, 2500)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-50">
        Course not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30 flex flex-col relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.1),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.1),_transparent_40%)] pointer-events-none" />

      <header className="relative z-10 flex h-20 items-center justify-between border-b border-white/10 bg-slate-900/80 px-6 backdrop-blur-xl">
        <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition">
          <ArrowLeft className="h-4 w-4" />
          Cancel & Return
        </Link>
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
          <Lock className="h-4 w-4" />
          Secure Checkout
        </div>
      </header>

      <main className="relative z-10 flex-1 mx-auto w-full max-w-6xl p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {paymentStatus === 'success' ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="flex flex-col items-center justify-center pt-10 text-center max-w-lg mx-auto"
            >
              <div className="relative mb-8">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl" 
                />
                <motion.div
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <CheckCircle2 className="relative h-32 w-32 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                </motion.div>
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="text-4xl font-extrabold tracking-tight mb-4"
              >
                Payment Verified!
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="text-lg text-slate-400 max-w-md mx-auto mb-10"
              >
                Welcome to <strong className="text-white">{course.title}</strong>. Your lab environment is being provisioned.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                className="flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Entering Course...
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="checkout"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid gap-12 lg:grid-cols-2 items-center"
            >
              
              {/* Left: Order Summary */}
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-200 mb-6">
                    <Sparkles className="h-4 w-4" />
                    <span>Instant Access</span>
                  </div>
                  <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-white">Unlock Your Future</h1>
                  <p className="text-lg text-slate-400">Scan the Owner QR code to instantly enroll and begin your journey.</p>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="rounded-[32px] border border-white/10 bg-slate-900/50 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-start gap-5 mb-6 relative z-10">
                    <div className="h-28 w-40 shrink-0 overflow-hidden rounded-2xl shadow-lg border border-white/10">
                      <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center h-28">
                      <h3 className="font-bold text-xl line-clamp-2 text-white">{course.title}</h3>
                      <p className="text-sm text-cyan-400 mt-2 font-medium">By {course.instructor}</p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6 pb-2 space-y-4 relative z-10">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Original Price</span>
                      <span className="text-slate-300 line-through">₹{(course.price * (1 + course.discount / 100)).toFixed(2)}</span>
                    </div>
                    {course.discount > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-medium">Special Discount</span>
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-sm font-bold">-{course.discount}%</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-6 mt-4 flex justify-between items-end relative z-10">
                    <span className="font-semibold text-xl text-slate-300">Total Fixed Amount</span>
                    <span className="font-extrabold text-5xl text-white tracking-tight">₹{course.price}</span>
                  </div>
                </motion.div>

                <div className="flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <ShieldCheck className="h-10 w-10 text-emerald-400 shrink-0" />
                  <p className="text-sm text-emerald-200/80 leading-relaxed">
                    <strong className="text-emerald-400 block mb-1">30-Day Money-Back Guarantee.</strong> 
                    Not satisfied? Get a full refund within 30 days, absolutely no questions asked.
                  </p>
                </div>
              </div>

              {/* Right: Advanced Payment QR */}
              <div className="flex flex-col items-center justify-center">
                <motion.div 
                  initial={{ y: 20 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full max-w-md rounded-[40px] border border-white/10 bg-slate-900/80 p-10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-center relative overflow-hidden"
                >
                  {/* Glowing Top Edge */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500" />
                  
                  <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                      <QrCode className="h-8 w-8 text-indigo-400" />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-3 text-white tracking-tight">Scan to Pay</h2>
                  <p className="text-sm text-slate-400 mb-10 max-w-xs mx-auto">
                    Use any supported UPI or Banking app to scan the Owner QR code below.
                  </p>
                  
                  {/* QR Code Container with Scanning Animation */}
                  <div className="mx-auto aspect-square w-full max-w-[280px] rounded-3xl bg-white p-6 shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center relative overflow-hidden group">
                    {customQr ? (
                      <img src={customQr} alt="Payment QR" className="h-full w-full object-contain relative z-0" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <QrCode className="h-20 w-20 mb-4 opacity-50" />
                        <p className="text-sm font-bold uppercase tracking-wider text-center">Owner QR Not Set</p>
                      </div>
                    )}
                    
                    {/* Animated Scanning Laser */}
                    {customQr && paymentStatus !== 'verifying' && (
                      <motion.div 
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="absolute left-0 right-0 h-2 bg-gradient-to-b from-cyan-400/0 via-cyan-400 to-cyan-400/0 shadow-[0_0_20px_rgba(34,211,238,0.9)] opacity-80 z-10"
                      />
                    )}
                    
                    {/* Verifying Overlay */}
                    <AnimatePresence>
                      {paymentStatus === 'verifying' && (
                        <motion.div 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center"
                        >
                          <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                          <span className="text-indigo-600 font-bold">Verifying Payment...</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-8 mb-8 flex items-center justify-center gap-3">
                    <span className="text-lg font-bold text-slate-300">Amount to send:</span>
                    <span className="text-2xl font-extrabold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">₹{course.price}</span>
                  </div>

                  {/* Payment Confirmation Button */}
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleVerifyPayment}
                    disabled={paymentStatus === 'verifying' || !customQr}
                    className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-4 text-base font-bold text-white shadow-[0_10px_30px_rgba(79,70,229,0.3)] transition-all hover:shadow-[0_10px_40px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {paymentStatus === 'verifying' ? (
                      'Processing...'
                    ) : !customQr ? (
                      'QR Unavailable'
                    ) : (
                      <>I have paid ₹{course.price} <Check className="h-5 w-5" /></>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
