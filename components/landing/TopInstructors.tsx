"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const instructors = [
  {
    name: "Dr. Emily Chen",
    title: "Head of AI Research",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop",
    rating: "4.9",
    courses: "12",
    students: "120K+"
  },
  {
    name: "Prof. James Wilson",
    title: "Astrophysics Lead",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop",
    rating: "4.8",
    courses: "8",
    students: "85K+"
  },
  {
    name: "Sarah Jenkins",
    title: "Senior Data Scientist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop",
    rating: "4.9",
    courses: "15",
    students: "200K+"
  },
  {
    name: "David Kim",
    title: "Quantum Computing",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop",
    rating: "4.7",
    courses: "5",
    students: "45K+"
  }
];

export default function TopInstructors() {
  return (
    <section id="universities" className="py-24 bg-[var(--color-background)] border-y border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Learn from the <span className="text-gradient">Best</span>
            </h2>
            <p className="text-gray-400 max-w-2xl text-lg">
              Our instructors are industry leaders, renowned researchers, and leading professors from around the globe.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/instructors" className="inline-flex items-center gap-2 text-white font-semibold hover:text-[var(--color-primary)] transition-colors group">
              View All Instructors <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, idx) => (
            <motion.div
              key={instructor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-[2rem] overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <img 
                src={instructor.image} 
                alt={instructor.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
              
              {/* Info Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold text-white">{instructor.rating} Instructor Rating</span>
                </div>
                
                <h3 className="font-bold text-2xl text-white mb-1 group-hover:text-[var(--color-secondary)] transition-colors">{instructor.name}</h3>
                <p className="text-sm text-gray-300 mb-4">{instructor.title}</p>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                  <span className="text-xs font-semibold text-[var(--color-primary)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 px-2 py-1 rounded">
                    {instructor.courses} Courses
                  </span>
                  <span className="text-xs font-semibold text-gray-300 bg-white/10 px-2 py-1 rounded backdrop-blur-md">
                    {instructor.students} Students
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
