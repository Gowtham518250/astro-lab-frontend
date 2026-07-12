"use client";

import { motion } from "framer-motion";
import { Rocket, Target, Zap } from "lucide-react";

const milestones = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Mission Objective",
    description: "To democratize space and science education through interactive, AI-driven learning experiences that scale across the universe."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Technological Leap",
    description: "Integrating next-generation web technologies, real-time data from space agencies, and advanced AI models into a unified platform."
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Launch Phase",
    description: "Deploying our flagship courses in Astrophysics, Robotics, and Quantum Computing to the first 10,000 pioneer astronauts."
  }
];

export default function AboutMission() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our <span className="text-gradient">Mission</span></h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are not just building a platform; we are constructing a gateway to the stars. 
            Astro Lab bridges the gap between complex science and intuitive learning.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-transparent opacity-30 md:-translate-x-1/2" />

          <div className="space-y-24">
            {milestones.map((milestone, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-primary)] shadow-[0_0_20px_rgba(124,92,255,0.4)] flex items-center justify-center text-[var(--color-secondary)] md:-translate-x-1/2 z-10">
                  {milestone.icon}
                </div>

                <div className="ml-20 md:ml-0 md:w-1/2 md:px-12">
                  <div className={`glass-panel p-8 rounded-3xl hover:bg-white/5 transition-colors duration-500 border border-white/5 hover:border-[var(--color-primary)]/50 ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <h3 className="text-2xl font-bold text-white mb-4">{milestone.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
