'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, BookOpen, Clock, Star, Play, Trash2, ArrowRight } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'

export default function FavoritesPage() {
  const { favorites, isLoading, toggle } = useFavorites()

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-sm font-medium text-rose-300">
            <Heart className="h-4 w-4 fill-current" />
            <span>Saved Courses</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Your Favorites</h1>
          <p className="mt-2 text-slate-400">
            Courses you&apos;ve bookmarked for later. Start learning whenever you&apos;re ready.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-[24px] border border-white/10 bg-slate-900 h-80" />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-[32px] border border-white/10 bg-slate-900/50 py-24 text-center backdrop-blur-xl"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-2xl" />
              <Heart className="relative h-16 w-16 text-rose-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No favorites yet</h2>
            <p className="text-slate-400 max-w-sm mb-8">
              Browse courses and click the heart icon to save them here for quick access.
            </p>
            <Link
              href="/courses"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-8 py-3 font-semibold text-white hover:opacity-90 transition shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              Browse Courses <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((fav, index) => (
              <motion.div
                key={fav.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-white/20 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={fav.course.thumbnail}
                    alt={fav.course.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  {/* Play button on hover */}
                  <Link
                    href={`/courses/${fav.course.id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/80 backdrop-blur-md shadow-xl">
                      <Play className="h-6 w-6 fill-white text-white ml-1" />
                    </div>
                  </Link>

                  {/* Level badge */}
                  <div className="absolute top-3 left-3 rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white border border-white/10">
                    {fav.course.level}
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => toggle.mutate(fav.courseId)}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/80 backdrop-blur-md text-white hover:bg-rose-500 transition opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="mb-1">
                    <span className="text-xs font-medium text-cyan-400">{fav.course.category}</span>
                  </div>
                  <h3 className="font-bold text-white line-clamp-2 text-base leading-snug mb-2">
                    {fav.course.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">{fav.course.instructor}</p>

                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {Math.floor(fav.course.duration / 60)}h {fav.course.duration % 60}m
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      4.9
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-white">₹{fav.course.price}</span>
                      {fav.course.discount > 0 && (
                        <span className="text-xs text-slate-500 line-through">
                          ₹{(fav.course.price * (1 + fav.course.discount / 100)).toFixed(0)}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/courses/${fav.course.id}`}
                      className="flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition"
                    >
                      <BookOpen className="h-4 w-4" /> View
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
