'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  Apple,
  ArrowRight,
  Banknote,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Lock,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Wallet,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { cn } from '@/lib/utils'
import { PublicNavbar } from '@/components/navbar/PublicNavbar'
import { PublicFooter } from '@/components/footer/PublicFooter'

const paymentMethods = [
  { id: 'google', label: 'Google Pay', icon: Wallet },
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Credit Card', icon: CreditCard },
  { id: 'debit', label: 'Debit Card', icon: CreditCard },
  { id: 'bank', label: 'Bank Transfer', icon: Banknote },
  { id: 'apple', label: 'Apple Pay (UI only)', icon: Apple },
]

const learningOutcomes = [
  'Master premium lessons with guided milestones',
  'Access downloadable resources and certificates',
  'Join a high-trust learning community',
]

export default function CheckoutPage() {
  const [selectedMethod, setSelectedMethod] = useState('card')
  const [coupon, setCoupon] = useState('ASTRO20')
  const [appliedCoupon, setAppliedCoupon] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState<'checkout' | 'success' | 'failed'>('checkout')

  const subtotal = 89
  const discount = appliedCoupon ? 17.8 : 0
  const tax = 7.12
  const total = subtotal - discount + tax

  const orderId = useMemo(() => `AST-${Math.floor(100000 + Math.random() * 900000)}`, [])

  const handlePurchase = () => {
    setIsProcessing(true)
    window.setTimeout(() => {
      setIsProcessing(false)
      setStatus('success')
    }, 1400)
  }

  const handleRetry = () => {
    setStatus('checkout')
    setIsProcessing(false)
  }

  const handlePreviewFailure = () => {
    setStatus('failed')
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_22%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-slate-50">
      <PublicNavbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[36px] border border-white/10 bg-slate-950/50 p-3 shadow-[0_30px_100px_rgba(2,6,23,0.45)] backdrop-blur-2xl sm:p-5 lg:p-6">
        <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            <span>Secure checkout protected by enterprise-grade encryption</span>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-cyan-200 sm:flex">
            <Lock className="h-4 w-4" />
            256-bit SSL
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <section className="overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-cyan-500/18 via-slate-900/70 to-violet-500/20 p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">Course summary</p>
                <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Complete your premium enrollment</h1>
              </div>
              <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">Instant access</div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/60 shadow-[0_20px_60px_rgba(2,6,23,0.35)]">
                <img
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80"
                  alt="Course preview"
                  className="h-56 w-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                    <Sparkles className="h-4 w-4 text-cyan-300" />
                    <span>Premium course</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Quantum Mechanics Essentials</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    A refined learning experience designed for ambitious learners who want clarity, depth, and momentum.
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/10 p-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                    alt="Instructor"
                    className="h-12 w-12 rounded-2xl object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">Dr. Maya Chen</p>
                    <p className="text-sm text-slate-400">Quantum Research Lead • Stanford</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[18px] border border-white/10 bg-slate-950/55 p-3">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Star className="h-4 w-4 text-amber-300" />
                      Rated 4.9/5
                    </div>
                    <p className="mt-2 text-lg font-semibold text-white">$89</p>
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-slate-950/55 p-3">
                    <p className="text-sm text-slate-400">Discount</p>
                    <p className="mt-2 text-lg font-semibold text-white">{appliedCoupon ? '$17.80' : '$0.00'}</p>
                  </div>
                </div>

                <div className="space-y-2 rounded-[20px] border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> Lifetime access</span>
                    <span className="font-medium text-white">Included</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> Certificate</span>
                    <span className="font-medium text-white">Included</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> Downloadable resources</span>
                    <span className="font-medium text-white">Included</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-200">What you’ll unlock</p>
                  {learningOutcomes.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[30px] border border-white/10 bg-white/10 p-5 shadow-[0_20px_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl sm:p-6">
            <AnimatePresence mode="wait">
              {status === 'checkout' ? (
                <motion.div key="checkout" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">Checkout</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">Order summary</h2>
                    </div>
                    <div className="rounded-full border border-white/10 bg-slate-950/55 px-3 py-1 text-sm text-slate-300">Secure</div>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-slate-950/60 p-4">
                    <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
                      <span>Coupon code</span>
                      <button className="text-cyan-300" onClick={() => setAppliedCoupon((value) => !value)}>
                        {appliedCoupon ? 'Remove' : 'Apply'}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 rounded-[16px] border border-white/10 bg-white/5 px-3 py-2">
                      <input
                        value={coupon}
                        onChange={(event) => setCoupon(event.target.value)}
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                        placeholder="Enter coupon"
                      />
                      <button
                        onClick={() => setAppliedCoupon(coupon.trim().length > 0)}
                        className="rounded-full bg-cyan-400/10 px-3 py-1.5 text-sm font-medium text-cyan-200"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">Try ASTRO20 for a premium discount. Use FAIL to see the failure state.</p>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>Subtotal</span>
                      <span>$89.00</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                      <span>Discount</span>
                      <span>{appliedCoupon ? '-$17.80' : '$0.00'}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                      <span>Tax</span>
                      <span>$7.12</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-200">Payment methods</p>
                    <div className="grid gap-2">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon
                        const selected = selectedMethod === method.id
                        return (
                          <button
                            key={method.id}
                            onClick={() => setSelectedMethod(method.id)}
                            className={cn(
                              'flex items-center justify-between rounded-[16px] border px-3 py-3 text-left text-sm transition',
                              selected ? 'border-cyan-400/30 bg-cyan-400/10 text-white' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10',
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {method.label}
                            </span>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="rounded-[20px] border border-cyan-400/20 bg-cyan-400/10 p-3 text-sm text-cyan-100">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      This is a secure, frictionless checkout experience designed for high-trust product purchases.
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handlePurchase}
                      disabled={isProcessing}
                      className="flex flex-1 items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      {isProcessing ? (
                        <>
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }} className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white" />
                          Processing payment
                        </>
                      ) : (
                        <>
                          Complete purchase
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <button onClick={handlePreviewFailure} className="rounded-[16px] border border-white/10 bg-white/10 px-3 py-3 text-sm text-slate-200">
                      Preview failure
                    </button>
                  </div>
                </motion.div>
              ) : null}

              {status === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="relative overflow-hidden rounded-[28px] border border-cyan-400/20 bg-slate-950/80 p-5 text-center">
                  <div className="pointer-events-none absolute inset-0">
                    {Array.from({ length: 16 }).map((_, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: [0, 1, 0], y: [0, 140] }}
                        transition={{ duration: 1.6, delay: index * 0.05, repeat: Infinity, repeatDelay: 1.6 }}
                        className="absolute left-[10%] top-0 h-2.5 w-2.5 rounded-full bg-cyan-300"
                        style={{ left: `${8 + index * 5}%` }}
                      />
                    ))}
                  </div>
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_12px_40px_rgba(34,211,238,0.35)]">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-white">Payment successful</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-slate-300">
                    Your course is now unlocked. Everything is ready for your first lesson.
                  </p>
                  <div className="mt-4 rounded-[18px] border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
                    <p className="font-medium text-white">Order ID</p>
                    <p className="mt-1 text-cyan-200">{orderId}</p>
                  </div>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <button className="flex items-center gap-2 rounded-[16px] border border-white/10 bg-white/10 px-3 py-2.5 text-sm text-slate-200">
                      <ReceiptText className="h-4 w-4" />
                      Download invoice
                    </button>
                    <button className="flex items-center gap-2 rounded-[16px] bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-3 py-2.5 text-sm font-semibold text-white">
                      Go to My Learning
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ) : null}

              {status === 'failed' ? (
                <motion.div key="failed" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="rounded-[28px] border border-rose-400/20 bg-slate-950/80 p-5 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
                    <XCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Payment was interrupted</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-slate-300">
                    We could not complete the transaction. Your card has not been charged.
                  </p>
                  <div className="mt-5 flex justify-center gap-3">
                    <button onClick={handleRetry} className="rounded-[16px] bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white">
                      Retry payment
                    </button>
                    <button className="rounded-[16px] border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-slate-200">
                      Contact support
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </section>
        </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  )
}
