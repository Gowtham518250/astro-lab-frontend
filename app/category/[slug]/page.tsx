"use client";

import { use } from "react";
import { useCourses } from "@/hooks/useCourse";
import Link from "next/link";
import { ArrowLeft, Clock, Star, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  // Format slug back to category name (e.g., 'computer-science' -> 'Computer Science')
  const formattedCategory = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const { data, isLoading } = useCourses({ category: formattedCategory });

  // Fallback courses just in case the backend is empty for this category
  const fallbackCourses = [
    {
      id: "fb1",
      title: `Advanced ${formattedCategory} Fundamentals`,
      description: `Master the core principles of ${formattedCategory.toLowerCase()} with hands-on projects and industry-standard tools.`,
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
      category: formattedCategory,
      instructor: "Dr. Alan Turing",
      level: "Intermediate",
      duration: 32,
      price: 149,
      slug: `${slug}-fundamentals`
    },
    {
      id: "fb2",
      title: `${formattedCategory} Masterclass`,
      description: `Take your skills to the next level. Learn advanced architectures, optimizations, and best practices.`,
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
      category: formattedCategory,
      instructor: "Prof. Sarah Chen",
      level: "Advanced",
      duration: 48,
      price: 199,
      slug: `${slug}-masterclass`
    },
    {
      id: "fb3",
      title: `Introduction to ${formattedCategory}`,
      description: `The perfect starting point for beginners looking to break into the field.`,
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
      category: formattedCategory,
      instructor: "Cmdr. James Holden",
      level: "Beginner",
      duration: 24,
      price: 99,
      slug: `intro-${slug}`
    }
  ];

  const courses = data?.courses?.length ? data.courses : fallbackCourses;

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-32 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary)]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {formattedCategory} <span className="text-gradient">Courses</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl"
          >
            Explore our comprehensive curriculum for {formattedCategory}. Whether you are a beginner or a seasoned professional, we have a mission for you.
          </motion.p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col glass-panel rounded-[2rem] overflow-hidden cursor-pointer hover:shadow-[0_0_40px_rgba(124,92,255,0.2)] hover:-translate-y-2 transition-all duration-300"
              >
                {/* Thumbnail Container */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-900 border-b border-white/10">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Overlay Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <PlayCircle className="w-8 h-8 text-white fill-white/20" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/1024px-Seal_of_Leland_Stanford_Junior_University.svg.png" className="w-4 h-4 invert brightness-0" alt="University" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Stanford</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1.5 rounded-lg border border-white/10 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-white">4.9</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-secondary)]">
                      <span className="bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] px-2 py-1 rounded border border-[var(--color-secondary)]/20 uppercase tracking-wide">
                        {course.category}
                      </span>
                    </div>
                    <span className="text-gray-400 text-xs font-medium bg-white/5 px-2 py-1 rounded border border-white/5">{course.level}</span>
                  </div>
                  
                  <h3 className="font-bold text-xl text-white mb-3 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 line-clamp-2 mb-6 flex-grow leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400 font-medium">{course.duration} hrs</span>
                    </div>
                    <Link 
                      href={`/course/${course.slug}`}
                      className="font-bold text-white bg-white/10 px-5 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors text-sm"
                    >
                      Enroll • ${course.price}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
