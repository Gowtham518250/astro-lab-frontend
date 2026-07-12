"use client";

import { motion } from "framer-motion";
import { Cpu, Satellite, Network, Orbit, Shield, Sparkles } from "lucide-react";

const technologies = [
  {
    icon: <Cpu />,
    title: "Quantum AI Models",
    description: "Adaptive learning algorithms that evolve with your pace and understanding."
  },
  {
    icon: <Satellite />,
    title: "Real-time Sat-Data",
    description: "Direct feeds from deep space probes and orbital telescopes integrated into courses."
  },
  {
    icon: <Network />,
    title: "Neural Networks",
    description: "Predictive student success modeling ensuring no astronaut is left behind."
  },
  {
    icon: <Orbit />,
    title: "Orbital Mechanics",
    description: "Interactive 3D simulations of celestial bodies and gravitational physics."
  },
  {
    icon: <Shield />,
    title: "Enterprise Security",
    description: "Military-grade encryption and secure authentication for research institutions."
  },
  {
    icon: <Sparkles />,
    title: "Holographic UX",
    description: "Next-gen immersive interfaces designed for spatial computing devices."
  }
];

export default function TechnologiesGrid() {
  return (
    <section id="technology" className="relative py-32 bg-[var(--color-accent)]/20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Powering the <span className="text-gradient">Future</span></h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our platform is built on bleeding-edge technologies to deliver an unparalleled educational experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                rotateX: 5,
                rotateY: -5,
                boxShadow: "0 20px 40px rgba(124, 92, 255, 0.2)" 
              }}
              className="glass-panel p-8 rounded-3xl group transition-all duration-300 relative overflow-hidden"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              {/* Background Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-secondary)] mb-6 group-hover:scale-110 group-hover:text-[var(--color-primary)] transition-all duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{tech.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
