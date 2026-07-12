"use client";

import { motion } from "framer-motion";
import { Laptop, Users, Award, Briefcase } from "lucide-react";

const features = [
  {
    icon: Laptop,
    title: "Flexible Learning",
    description: "Learn at your own pace, on your own schedule. Access high-quality videos, readings, and assignments anytime, anywhere.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Gain insights from leading professors and industry experts from the world's top universities and tech companies.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Award,
    title: "Valuable Certificates",
    description: "Earn recognized credentials to showcase your new skills to employers and enhance your professional portfolio.",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: Briefcase,
    title: "Career Support",
    description: "Access career resources, resume feedback, and interview prep to help you land your dream job after graduation.",
    color: "bg-amber-100 text-amber-600"
  }
];

export default function WhyLearnWithUs() {
  return (
    <section className="py-24 bg-[var(--color-background)] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary)]/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Why Learn on Astro Lab?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            We combine the world's best university content with advanced AI tools to accelerate your career in space and technology.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel rounded-2xl p-8 hover:bg-white/5 transition-colors group hover:shadow-[0_0_30px_rgba(124,92,255,0.15)]"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-white/10">
                <feature.icon className="w-6 h-6 text-[var(--color-secondary)]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--color-primary)] transition-colors">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
