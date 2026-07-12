"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, Search, Star, Award, BookOpen, Users,
  GraduationCap, Twitter, Linkedin, Github
} from "lucide-react";

// Expanded list of instructors for the dedicated page
const allInstructors = [
  {
    id: "inst-1",
    name: "Dr. Emily Chen",
    title: "Head of AI Research at TechNova",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop",
    rating: "4.9",
    courses: 12,
    students: "120K+",
    tags: ["Machine Learning", "Neural Networks"],
    badge: "Top Instructor"
  },
  {
    id: "inst-2",
    name: "Prof. James Wilson",
    title: "Astrophysics Lead, Exoplanet Research",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop",
    rating: "4.8",
    courses: 8,
    students: "85K+",
    tags: ["Astrophysics", "Python"],
    badge: "Distinguished"
  },
  {
    id: "inst-3",
    name: "Sarah Jenkins",
    title: "Senior Data Scientist & Author",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop",
    rating: "4.9",
    courses: 15,
    students: "200K+",
    tags: ["Data Science", "Analytics"],
    badge: "Bestselling"
  },
  {
    id: "inst-4",
    name: "David Kim",
    title: "Quantum Computing Engineer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop",
    rating: "4.7",
    courses: 5,
    students: "45K+",
    tags: ["Quantum", "Hardware"],
    badge: ""
  },
  {
    id: "inst-5",
    name: "Elena Rodriguez",
    title: "UX/UI Design Director",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1376&auto=format&fit=crop",
    rating: "4.9",
    courses: 22,
    students: "310K+",
    tags: ["Design", "Figma", "Research"],
    badge: "Visionary"
  },
  {
    id: "inst-6",
    name: "Marcus Johnson",
    title: "Lead Systems Architect",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1374&auto=format&fit=crop",
    rating: "4.8",
    courses: 11,
    students: "95K+",
    tags: ["System Design", "Cloud"],
    badge: "Expert"
  },
  {
    id: "inst-7",
    name: "Dr. Aisha Patel",
    title: "Bioinformatics Researcher",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1470&auto=format&fit=crop",
    rating: "4.9",
    courses: 9,
    students: "65K+",
    tags: ["Biology", "Data Mining"],
    badge: ""
  },
  {
    id: "inst-8",
    name: "Leonidas Pappas",
    title: "Cybersecurity Analyst",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop",
    rating: "4.7",
    courses: 14,
    students: "150K+",
    tags: ["Security", "Networking"],
    badge: "Top Rated"
  }
];

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInstructors = allInstructors.filter(inst => 
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    inst.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-32 pb-24 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-secondary)]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-primary)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Learn from the <br />
              <span className="text-gradient">Best Minds</span>
            </h1>
            <p className="text-xl text-gray-400">
              Our instructors are industry leaders, renowned researchers, and leading professors from around the globe.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-96 relative"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text"
              placeholder="Search by name or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all shadow-inner"
            />
          </motion.div>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredInstructors.length > 0 ? (
            filteredInstructors.map((inst, idx) => (
              <motion.div
                key={inst.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group glass-panel rounded-[2rem] overflow-hidden border border-white/5 hover:border-[var(--color-secondary)]/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(76,201,240,0.15)] hover:-translate-y-2 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] to-transparent z-10" />
                  <img 
                    src={inst.image} 
                    alt={inst.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 filter contrast-125"
                  />
                  
                  {/* Badges */}
                  {inst.badge && (
                    <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] px-3 py-1 rounded-full border border-white/20 shadow-lg">
                      <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> {inst.badge}
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-2 py-1.5 rounded-lg border border-white/10 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-white">{inst.rating}</span>
                  </div>

                  {/* Social Links on Hover */}
                  <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Link href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[var(--color-primary)] hover:border-transparent transition-colors text-white">
                      <Twitter className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#0077b5] hover:border-transparent transition-colors text-white">
                      <Linkedin className="w-4 h-4" />
                    </Link>
                    <Link href="#" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:border-transparent transition-colors text-white">
                      <Github className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative z-20 flex-grow flex flex-col bg-gradient-to-b from-[#050816]/0 to-[#050816]">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[var(--color-secondary)] transition-colors">{inst.name}</h3>
                  <p className="text-sm text-[var(--color-secondary)] font-medium mb-4">{inst.title}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {inst.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm font-semibold">{inst.courses} Courses</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-semibold">{inst.students}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No instructors found</h3>
              <p className="text-gray-400">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
