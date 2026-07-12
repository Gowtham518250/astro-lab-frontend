'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hash, Volume2, Plus, Settings, Hash as HashIcon, Search, Bell, Users, MessageSquare, Heart, Share2, Reply, Smile, Send, Compass } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Real data will be fetched from API
interface Server { id: string; name: string; image: string; isGlobal: boolean; channels: any[] }
interface Channel { id: string; name: string; type: string; unread?: boolean }
interface Message { id: string; user: string; avatar: string; time: string; text: string; badge?: string }

export default function CommunityPage() {
  const [activeChannel, setActiveChannel] = useState('c1')
  const [inputMsg, setInputMsg] = useState('')
  const [servers, setServers] = useState<Server[]>([])
  const [channels, setChannels] = useState<Channel[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch servers and channels from the real backend API
    fetch('/api/community/servers', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.servers && data.servers.length > 0) {
          setServers(data.servers.map((s: any, i: number) => ({ ...s, active: i === 0 })))
          setChannels(data.servers[0].channels.map((c: any) => ({ ...c, unread: false })))
          if (data.servers[0].channels.length > 0) {
            setActiveChannel(data.servers[0].channels[0].id)
          }
        }
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!activeChannel) return
    // Fetch messages for active channel
    fetch(`/api/community/channels/${activeChannel}/messages`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.messages) {
          setMessages(data.messages.map((m: any) => ({
            id: m.id,
            user: m.user.name,
            avatar: m.user.avatar,
            time: new Date(m.createdAt).toLocaleTimeString(),
            text: m.text
          })))
        }
      })
  }, [activeChannel])

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30 relative">
      <div className="bg-particles" />
      
      {/* 1. Servers Sidebar (Leftmost) */}
      <div className="w-[72px] bg-slate-900/50 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-4 gap-4 z-20 shadow-2xl">
        <Link href="/dashboard" className="h-12 w-12 rounded-[24px] hover:rounded-[16px] bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-indigo-500 hover:text-white transition-all duration-300">
          <Compass className="h-6 w-6" />
        </Link>
        <div className="w-8 h-[2px] bg-white/10 rounded-full" />
        
        {servers.map(server => (
          <div key={server.id} className="relative group flex items-center justify-center">
            {/* Active Indicator */}
            <AnimatePresence>
              {server.active && (
                <motion.div layoutId="activeServer" className="absolute -left-1 w-2 h-10 bg-white rounded-r-full" />
              )}
            </AnimatePresence>
            {!server.active && (
              <div className="absolute -left-1 w-2 h-2 bg-white rounded-r-full opacity-0 group-hover:opacity-100 group-hover:h-5 transition-all duration-300" />
            )}
            
            <button className={cn(
              "h-12 w-12 rounded-[24px] group-hover:rounded-[16px] transition-all duration-300 overflow-hidden border-2",
              server.active ? "rounded-[16px] border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]" : "border-transparent"
            )}>
              <img src={server.image} alt={server.name} className="h-full w-full object-cover" />
            </button>
          </div>
        ))}
        
        <button className="h-12 w-12 rounded-[24px] hover:rounded-[16px] bg-slate-800/50 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all duration-300 border border-emerald-500/20">
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {/* 2. Channels Sidebar */}
      <div className="w-60 bg-slate-900/30 backdrop-blur-md border-r border-white/5 flex flex-col z-10">
        <div className="h-14 border-b border-white/5 flex items-center px-4 shadow-sm bg-slate-900/50">
          <h2 className="font-bold text-white tracking-wide">Astro Lab Global</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
          
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1 mb-2 hover:text-slate-300 cursor-pointer transition-colors">
              <span>Text Channels</span>
              <Plus className="h-3 w-3" />
            </div>
            <div className="space-y-1">
              {channels.filter(c => c.type === 'text').map(channel => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-2 py-1.5 rounded-md transition-colors",
                    activeChannel === channel.id 
                      ? "bg-white/10 text-white" 
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
                    channel.unread && activeChannel !== channel.id && "text-white font-semibold"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <HashIcon className="h-4 w-4 opacity-70" />
                    <span className="truncate">{channel.name}</span>
                  </div>
                  {channel.unread && activeChannel !== channel.id && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1 mb-2 hover:text-slate-300 cursor-pointer transition-colors">
              <span>Voice Channels</span>
              <Plus className="h-3 w-3" />
            </div>
            <div className="space-y-1">
              {channels.filter(c => c.type === 'voice').map(channel => (
                <button
                  key={channel.id}
                  className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors"
                >
                  <Volume2 className="h-4 w-4 opacity-70" />
                  <span className="truncate">{channel.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* User Status Area */}
        <div className="h-16 bg-slate-900/80 border-t border-white/5 p-2 flex items-center gap-2">
          <div className="relative">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="User" className="h-9 w-9 rounded-full bg-white/10" />
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
          </div>
          <div className="flex-1 truncate">
            <p className="text-sm font-bold text-white truncate">GuestUser</p>
            <p className="text-[11px] text-slate-400 truncate">Online</p>
          </div>
          <div className="flex gap-1">
            <button className="p-1.5 text-slate-400 hover:bg-white/10 hover:text-white rounded-md transition-colors"><Settings className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* 3. Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-950/40 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 to-transparent pointer-events-none" />
        
        {/* Chat Header */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 z-10 bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Hash className="h-6 w-6 text-slate-500" />
            <h2 className="font-bold text-white tracking-wide">{channels.find(c => c.id === activeChannel)?.name || 'general'}</h2>
            <div className="h-4 w-[1px] bg-white/10 mx-2" />
            <p className="text-sm text-slate-400 hidden sm:block">General discussion about courses and topics.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex items-center bg-slate-900 border border-white/10 rounded-md px-2 py-1">
              <input type="text" placeholder="Search" className="bg-transparent text-sm w-36 outline-none text-white placeholder-slate-500" />
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <button className="text-slate-400 hover:text-white transition-colors"><Bell className="h-5 w-5" /></button>
            <button className="text-slate-400 hover:text-white transition-colors"><Users className="h-5 w-5" /></button>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 z-10 space-y-6 flex flex-col justify-end">
          
          <div className="text-center my-8">
            <div className="mx-auto w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-4">
              <Hash className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-2">Welcome to #{channels.find(c => c.id === activeChannel)?.name || 'general'}!</h1>
            <p className="text-slate-400">This is the start of the #{channels.find(c => c.id === activeChannel)?.name || 'general'} channel.</p>
          </div>

          <div className="space-y-1 w-full">
            {messages.map((msg, i) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex gap-4 hover:bg-white/5 p-2 rounded-xl transition-colors w-full"
              >
                <img src={msg.avatar} alt={msg.user} className="h-10 w-10 rounded-full bg-white/10 mt-1 cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-shadow" />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-white hover:underline cursor-pointer">{msg.user}</span>
                    {msg.badge && <span className="text-[10px] bg-indigo-500 text-white px-1.5 rounded-sm uppercase tracking-wider font-bold">{msg.badge}</span>}
                    <span className="text-xs text-slate-500">{msg.time}</span>
                  </div>
                  <p className="text-slate-300 mt-1 leading-relaxed">{msg.text}</p>
                </div>
                
                {/* Hover Reveal Actions */}
                <div className="absolute right-4 -top-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 border border-white/10 rounded-md flex shadow-xl overflow-hidden">
                  <button className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Add Reaction"><Smile className="h-4 w-4" /></button>
                  <button className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border-l border-white/10" title="Reply"><Reply className="h-4 w-4" /></button>
                  <button className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border-l border-white/10" title="Share"><Share2 className="h-4 w-4" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 px-6 z-10 pb-6">
          <div className="relative flex items-center bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-lg focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
            <button className="p-1 mr-2 bg-slate-700 hover:bg-slate-600 rounded-full text-slate-300 transition-colors">
              <Plus className="h-4 w-4" />
            </button>
            <input 
              type="text" 
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder={`Message #${channels.find(c => c.id === activeChannel)?.name || 'general'}`}
              className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-500"
            />
            <div className="flex items-center gap-2">
              <button className="text-slate-400 hover:text-white transition-colors"><Smile className="h-5 w-5" /></button>
              {inputMsg.trim() && (
                <button className="bg-indigo-500 hover:bg-indigo-400 text-white rounded-md p-1.5 ml-2 transition-colors">
                  <Send className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
