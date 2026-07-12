"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Software Engineer at Google",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
    quote: "The deep learning specialization completely changed my career trajectory. The instructors are world-class and the hands-on projects gave me exactly what I needed to land my dream job.",
  },
  {
    name: "Sarah Chen",
    role: "Data Scientist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop",
    quote: "I've taken courses on many platforms, but Astro Lab stands out. The community, the interactive labs, and the quality of the videos are unparalleled. Highly recommended.",
  },
  {
    name: "Michael Rodriguez",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1287&auto=format&fit=crop",
    quote: "The business analytics course is a must-have. I use the frameworks I learned here every single day at work. Highly recommend to anyone looking to level up.",
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[var(--color-background-alt)] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-[var(--color-primary)]/5 blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Learner <span className="text-[var(--color-secondary)]">Outcomes</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Join millions of learners who have achieved their career goals with our platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-panel rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_0_30px_rgba(76,201,240,0.15)] group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8 font-medium">
                "{test.quote}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={test.image} 
                  alt={test.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-primary)]/30 group-hover:border-[var(--color-primary)] transition-colors"
                />
                <div>
                  <h4 className="font-bold text-white">{test.name}</h4>
                  <p className="text-sm text-[var(--color-secondary)]">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
