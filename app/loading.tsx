'use client'

import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        {/* Glowing aura */}
        <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[50px] dark:bg-indigo-500/30"></div>
        
        {/* Animated Rocket */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-[0_0_40px_rgba(79,70,229,0.3)]"
        >
          <Rocket className="h-10 w-10" />
        </motion.div>

        {/* Loading Text */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Warping to destination...</h2>
          <div className="mt-4 flex items-center justify-center gap-1.5">
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
            />
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
            />
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}