"use client";

import { motion } from "framer-motion";

const images = [
  {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    title: "Orbital View",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop",
    title: "Deep Space Satellite",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1974&auto=format&fit=crop",
    title: "Martian Surface",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1918&auto=format&fit=crop",
    title: "Nebula Research",
    span: "md:col-span-2 md:row-span-1",
  }
];

export default function CinematicGallery() {
  return (
    <section id="gallery" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Visualizing the <span className="text-gradient">Cosmos</span></h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the universe through the lenses of our highest-fidelity satellite feeds and simulated environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${img.span}`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${img.url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-2">{img.title}</h3>
                <div className="h-1 w-12 bg-[var(--color-primary)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
