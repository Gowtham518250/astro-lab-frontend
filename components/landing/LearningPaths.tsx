"use client";

import { motion } from "framer-motion";
import { Rocket, Map, Target, Trophy } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Rocket,
    title: "Launch Basics",
    description: "Master the fundamentals of your chosen technology stack with hands-on exercises.",
  },
  {
    id: 2,
    icon: Map,
    title: "Navigate Projects",
    description: "Build real-world projects with guided tutorials and mentor feedback.",
  },
  {
    id: 3,
    icon: Target,
    title: "Master Advanced",
    description: "Dive deep into complex topics, algorithms, and system design principles.",
  },
  {
    id: 4,
    icon: Trophy,
    title: "Get Certified",
    description: "Earn your certificate, prepare for interviews, and land your dream job.",
  }
];

export default function LearningPaths() {
  return (
    <section className="py-24 bg-[var(--color-background-alt)] border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Your <span className="text-[var(--color-secondary)]">Roadmap</span> to Success
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Follow our structured, step-by-step journey designed to take you from absolute beginner to industry professional.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Connecting Line (Background) */}
          <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-1 bg-white/10 -translate-x-1/2 rounded-full overflow-hidden">
            {/* The Line that fills downwards */}
            <motion.div 
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-white rounded-full shadow-[0_0_15px_rgba(76,201,240,0.8)] relative"
            />
          </div>

          {/* Traveling Rocket */}
          <div className="absolute top-0 bottom-0 left-8 md:left-1/2 -translate-x-1/2 w-1 z-20 pointer-events-none">
            <motion.div
              initial={{ top: "0%", opacity: 0, scale: 0.5 }}
              whileInView={{ top: "100%", opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute -translate-y-1/2 -translate-x-[14px] w-8 h-8 rounded-full bg-[var(--color-background-alt)] border-2 border-[var(--color-secondary)] shadow-[0_0_20px_rgba(76,201,240,1)] flex items-center justify-center"
            >
              <Rocket className="w-4 h-4 text-white rotate-180" />
            </motion.div>
          </div>

          <div className="flex flex-col gap-8 md:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={step.title} className="relative flex items-center md:justify-between w-full">
                  {/* Left Side (Empty on Odd) */}
                  <div className={`hidden md:block w-[45%] ${isEven ? 'text-right' : 'opacity-0'}`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: (idx * 0.4) + 0.2 }}
                        className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-[var(--color-primary)]/50 transition-colors shadow-lg hover:shadow-[0_0_30px_rgba(124,92,255,0.2)] group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[var(--color-background-alt)] border border-white/10 flex items-center justify-center mb-4 ml-auto group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(76,201,240,0.15)] group-hover:shadow-[0_0_25px_rgba(76,201,240,0.4)] group-hover:border-[var(--color-secondary)]">
                          <step.icon className="w-6 h-6 text-[var(--color-secondary)]" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors">{step.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{step.description}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[var(--color-background-alt)] border-4 border-white/20 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4, delay: (idx * 0.6) }}
                      className="w-full h-full rounded-full bg-[var(--color-secondary)] shadow-[0_0_15px_rgba(76,201,240,1)]"
                    />
                  </div>

                  {/* Right Side (Mobile Always, Desktop on Odd) */}
                  <div className={`w-full pl-16 md:pl-0 md:w-[45%] ${isEven ? 'md:hidden' : ''}`}>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: (idx * 0.4) + 0.2 }}
                      className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-[var(--color-primary)]/50 transition-colors shadow-lg hover:shadow-[0_0_30px_rgba(124,92,255,0.2)] group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[var(--color-background-alt)] border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(76,201,240,0.15)] group-hover:shadow-[0_0_25px_rgba(76,201,240,0.4)] group-hover:border-[var(--color-secondary)]">
                        <step.icon className="w-6 h-6 text-[var(--color-secondary)]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-sm">{step.description}</p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Trophy Destination at Bottom */}
          <div className="relative mt-8 md:mt-12 w-full flex justify-center pb-12">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="w-20 h-20 rounded-full glass-panel border-2 border-[var(--color-primary)] flex items-center justify-center shadow-[0_0_40px_rgba(124,92,255,0.5)] z-10 ml-16 md:ml-0"
            >
              <Trophy className="w-8 h-8 text-[var(--color-primary)]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
