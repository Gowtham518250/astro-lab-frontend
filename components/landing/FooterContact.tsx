"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Mail } from "lucide-react";

export default function FooterContact() {
  return (
    <footer id="contact" className="relative py-24 border-t border-white/10 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[var(--color-primary)]/10 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Join the <span className="text-gradient">Mission</span></h2>
          <p className="text-gray-400 text-lg mb-12">
            Ready to embark on an educational journey across the stars? 
            Reach out to our mission control center.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[var(--color-secondary)]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Mission Control</h4>
                <p className="text-sm text-gray-400">Low Earth Orbit Station 4</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[var(--color-primary)]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Transmission</h4>
                <p className="text-sm text-gray-400">signals@astrolab.space</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <form className="glass-panel p-8 md:p-10 rounded-3xl space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Astronaut Name</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                placeholder="Commander Shepard"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Comms Channel (Email)</label>
              <input 
                type="email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-secondary)] transition-colors"
                placeholder="shepard@alliance.mil"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Transmission Data</label>
              <textarea 
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                placeholder="We need backup in the Omega nebula..."
              />
            </div>

            <button 
              type="button"
              className="w-full relative group overflow-hidden rounded-xl bg-white text-black font-bold py-4 transition-transform hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                Transmit Signal <Send className="w-4 h-4" />
              </span>
            </button>
          </form>
        </motion.div>
      </div>

      <div className="mt-24 text-center border-t border-white/5 pt-8 text-gray-600 text-sm">
        © 2026 Astro Lab Inc. All planetary rights reserved.
      </div>
    </footer>
  );
}
