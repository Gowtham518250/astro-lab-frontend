"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";
import { useCourses } from "@/hooks/useCourse";

// Fallback placeholder courses if backend is empty/down
const fallbackCourses = [
  {
    id: "fb1",
    title: "Quantum Machine Learning",
    description: "Explore the intersection of quantum computing and neural networks. Learn to build models that process data in multi-dimensional superposition.",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
    category: "AI & Data Science",
    instructor: "Dr. Elena Rostova",
    level: "Advanced",
    duration: 40,
    price: 199,
    slug: "quantum-machine-learning"
  },
  {
    id: "fb2",
    title: "Astrodynamics & Orbital Mechanics",
    description: "Master the physics of spaceflight. Calculate orbital trajectories, transfer orbits, and deep space navigation using Python.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    category: "Space Tech",
    instructor: "Cmdr. James Holden",
    level: "Intermediate",
    duration: 32,
    price: 149,
    slug: "astrodynamics-orbital-mechanics"
  },
  {
    id: "fb3",
    title: "Python for Astrophysics",
    description: "Analyze real exoplanet transit data and telescope imagery. The perfect starting point for software engineers looking to the stars.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    category: "Programming",
    instructor: "Prof. Sarah Chen",
    level: "Beginner",
    duration: 24,
    price: 99,
    slug: "python-for-astrophysics"
  }
];

export default function FeaturedCourses({ limit }: { limit?: number }) {
  const { data, isLoading } = useCourses({ limit: limit || 6 });
  const courses = data?.courses?.length ? data.courses : fallbackCourses;

  return (
    <section id="explore" className="py-24 bg-[var(--color-background-alt)] overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[var(--color-primary)]/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured <span className="text-gradient">Missions</span>
            </h2>
            <p className="text-gray-400 max-w-2xl text-lg">
              Explore our most popular courses and start learning highly sought-after skills today.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">
              Browse All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="w-full relative z-10">
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-6 flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-12 pt-4 px-6 gap-6 snap-x snap-mandatory hide-scrollbar" style={{ scrollPaddingLeft: 'max(24px, calc((100vw - 80rem) / 2))' }}>
            {/* Pad left to align with max-w-7xl */}
            <div className="min-w-[max(0px,calc((100vw-80rem)/2-24px))] shrink-0" />
            
            {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative min-w-[320px] max-w-[320px] flex flex-col glass-panel rounded-[2rem] overflow-hidden snap-center cursor-pointer hover:shadow-[0_0_40px_rgba(124,92,255,0.2)] hover:-translate-y-2 transition-all duration-300"
              >
                {/* Thumbnail Container */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-900 border-b border-white/10">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Stanford_University_seal_2003.svg" className="w-4 h-4 invert brightness-0" alt="University" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Stanford</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-white">4.9</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-secondary)] mb-3">
                    <span className="bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] px-2 py-0.5 rounded border border-[var(--color-secondary)]/20 uppercase tracking-wide">
                      {course.category}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{course.level}</span>
                  </div>
                  
                  <h3 className="font-bold text-xl text-white mb-2 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 line-clamp-2 mb-6 flex-grow">
                    {course.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-400">{course.duration} hrs</span>
                    </div>
                    <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/20">
                      ${course.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <div className="min-w-[max(0px,calc((100vw-80rem)/2-24px))] shrink-0" />
          </div>
        )}
      </div>
    </section>
  );
}
