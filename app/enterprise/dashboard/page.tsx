'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Users, CreditCard, Settings, Plus, Download, Search, MoreVertical, TrendingUp, ShieldCheck, Mail, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PublicNavbar } from '@/components/navbar/PublicNavbar'
import { PublicFooter } from '@/components/footer/PublicFooter'

// Mock Data
const employees = [
  { id: 1, name: 'Alice Freeman', email: 'alice@company.com', role: 'Developer', progress: 85, status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@company.com', role: 'Designer', progress: 100, status: 'Certified' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@company.com', role: 'Manager', progress: 12, status: 'Inactive' },
  { id: 4, name: 'Diana Prince', email: 'diana@company.com', role: 'Data Scientist', progress: 45, status: 'Active' },
]

export default function EnterpriseDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'licenses' | 'branding'>('overview')
  const [buySeats, setBuySeats] = useState(50)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 relative">
      <div className="bg-particles" />
      <PublicNavbar />
      
      {/* Top Header */}
      <div className="pt-24 pb-8 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl relative z-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-white flex items-center justify-center shadow-xl shadow-white/5 border-2 border-white/10">
              <span className="text-3xl font-black text-slate-900">ACME</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Enterprise Plan
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-white">Acme Corp Learning Portal</h1>
              <p className="text-slate-400 text-sm mt-1">Manage licenses, track employee progress, and customize your portal.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button onClick={() => setActiveTab('licenses')} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]">
              <Plus className="h-4 w-4" /> Add Seats
            </button>
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2.5 rounded-xl font-bold transition-colors">
              <Download className="h-4 w-4" /> Export Report
            </button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="mx-auto max-w-7xl px-6 mt-8 flex gap-8 border-b border-white/5">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'employees', label: 'Employees', icon: Users },
            { id: 'licenses', label: 'Licenses & Billing', icon: CreditCard },
            { id: 'branding', label: 'White-label Settings', icon: Settings },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "pb-4 text-sm font-bold flex items-center gap-2 transition-all relative",
                activeTab === tab.id ? "text-indigo-400" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-400 rounded-t-full shadow-[0_-2px_10px_rgba(129,140,248,0.5)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-12 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><Users className="h-24 w-24" /></div>
                  <h3 className="text-sm font-bold text-slate-400 mb-2">Total Seats Utilized</h3>
                  <div className="flex items-end gap-3">
                    <p className="text-4xl font-extrabold text-white">42</p>
                    <p className="text-slate-500 font-semibold mb-1">/ 50</p>
                  </div>
                  <div className="mt-4 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[84%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  </div>
                </div>
                
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><ShieldCheck className="h-24 w-24" /></div>
                  <h3 className="text-sm font-bold text-slate-400 mb-2">Certifications Earned</h3>
                  <div className="flex items-end gap-3">
                    <p className="text-4xl font-extrabold text-white">128</p>
                    <p className="text-emerald-400 text-sm font-bold flex items-center gap-1 mb-1.5"><TrendingUp className="h-3 w-3" /> +12 this month</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 mb-2">Next Renewal</h3>
                    <p className="text-2xl font-bold text-white">Oct 14, 2027</p>
                  </div>
                  <button onClick={() => setActiveTab('licenses')} className="w-full mt-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2 rounded-xl text-sm font-bold transition-colors">
                    Manage Billing
                  </button>
                </div>
              </div>

              {/* Course Progress Chart Mockup */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-6">Company Skill Progression</h3>
                <div className="h-64 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                  {[40, 65, 30, 85, 100, 50, 75].map((h, i) => (
                    <div key={i} className="w-full bg-slate-800 rounded-t-xl relative group">
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-t-xl transition-all duration-500" style={{ height: `${h}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {h}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-xs font-bold text-slate-500 uppercase">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* EMPLOYEES TAB */}
          {activeTab === 'employees' && (
            <motion.div key="employees" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              
              <div className="flex justify-between items-center bg-slate-900/50 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                <div className="relative">
                  <input type="text" placeholder="Search employees..." className="bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none w-64" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                  <Mail className="h-4 w-4" /> Invite Employees
                </button>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-950/50 text-xs uppercase text-slate-400 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 font-bold">Employee</th>
                      <th className="px-6 py-4 font-bold">Role</th>
                      <th className="px-6 py-4 font-bold">Course Progress</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {employees.map(emp => (
                      <tr key={emp.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white border border-white/10">
                              {emp.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-white">{emp.name}</p>
                              <p className="text-xs text-slate-500">{emp.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">{emp.role}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className={cn("h-full rounded-full", emp.progress === 100 ? "bg-emerald-500" : "bg-indigo-500")} style={{ width: `${emp.progress}%` }} />
                            </div>
                            <span className="text-xs font-bold text-slate-400">{emp.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-bold border",
                            emp.status === 'Active' ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" :
                            emp.status === 'Certified' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            "bg-slate-800 text-slate-400 border-slate-700"
                          )}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-500 hover:text-white transition-colors p-2"><MoreVertical className="h-5 w-5" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* LICENSES TAB */}
          {activeTab === 'licenses' && (
            <motion.div key="licenses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-2xl mx-auto">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 mb-6 mx-auto">
                  <CreditCard className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-white text-center mb-2">Purchase More Seats</h2>
                <p className="text-slate-400 text-center mb-8">Add licenses instantly. Unassigned licenses never expire.</p>
                
                <div className="bg-slate-950 rounded-2xl p-6 border border-white/5 mb-6">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 block">Select Quantity</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="10" 
                      max="500" 
                      step="10" 
                      value={buySeats} 
                      onChange={(e) => setBuySeats(parseInt(e.target.value))}
                      className="flex-1 accent-indigo-500" 
                    />
                    <div className="w-20 bg-slate-900 border border-white/10 rounded-lg text-center py-2 font-bold text-xl text-white">
                      {buySeats}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8 px-2">
                  <span className="text-lg text-slate-300">Total for {buySeats} seats (billed annually)</span>
                  <span className="text-3xl font-extrabold text-white">${buySeats * 199}</span>
                </div>

                <button className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold py-4 rounded-xl shadow-[0_10px_30px_rgba(99,102,241,0.4)] hover:scale-[1.02] transition-transform">
                  Proceed to Checkout <ArrowRight className="inline h-5 w-5 ml-2" />
                </button>
              </div>
            </motion.div>
          )}

          {/* BRANDING TAB */}
          {activeTab === 'branding' && (
            <motion.div key="branding" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-8">
              
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Visual Identity</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-bold text-slate-400 block mb-3">Company Logo</label>
                      <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer bg-slate-950/50">
                        <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-3">
                          <Building2 className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-white">Click to upload logo</p>
                        <p className="text-xs text-slate-500 mt-1">SVG, PNG, or JPG (max. 800x400px)</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-bold text-slate-400 block mb-3">Brand Color</label>
                      <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-rose-500 cursor-pointer border-2 border-transparent hover:border-white transition-colors" />
                        <div className="h-10 w-10 rounded-full bg-emerald-500 cursor-pointer border-2 border-transparent hover:border-white transition-colors" />
                        <div className="h-10 w-10 rounded-full bg-cyan-500 cursor-pointer border-2 border-transparent hover:border-white transition-colors" />
                        <div className="h-10 w-10 rounded-full bg-indigo-500 cursor-pointer border-2 border-white shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-colors flex items-center justify-center"><CheckCircle2 className="h-5 w-5 text-white" /></div>
                        <div className="h-10 w-10 rounded-full bg-fuchsia-500 cursor-pointer border-2 border-transparent hover:border-white transition-colors" />
                      </div>
                    </div>
                  </div>
                  
                  <button className="mt-8 bg-white text-slate-900 font-bold py-3 px-8 rounded-xl hover:bg-slate-200 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Live Preview */}
              <div className="bg-slate-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
                <div className="bg-slate-900 p-4 border-b border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs text-slate-500 font-mono">Live Preview</span>
                  <div className="w-10" />
                </div>
                <div className="p-6 pointer-events-none">
                  {/* Mock Portal */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-10 w-24 bg-white rounded-lg flex items-center justify-center text-slate-900 font-black text-sm">ACME</div>
                    <div className="h-8 w-8 rounded-full bg-slate-800" />
                  </div>
                  <div className="h-32 rounded-2xl bg-gradient-to-r from-indigo-900/50 to-transparent border border-indigo-500/20 mb-6 p-6 flex flex-col justify-center">
                    <div className="h-4 w-1/3 bg-indigo-400 rounded mb-2" />
                    <div className="h-3 w-1/4 bg-slate-500 rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 rounded-xl bg-slate-900 border border-white/5" />
                    <div className="h-24 rounded-xl bg-slate-900 border border-white/5" />
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <PublicFooter />
    </div>
  )
}
