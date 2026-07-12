import GlassNavbar from "@/components/landing/GlassNavbar";
import FooterContact from "@/components/landing/FooterContact";
import { Users, Clock } from "lucide-react";

export const metadata = {
  title: "About Us | AstroLab",
  description: "Learn more about the AstroLab team.",
};

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-cyan-500/30 selection:text-white flex flex-col">
      <GlassNavbar />
      
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden pt-32 pb-24">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl px-6">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
            <Users className="w-10 h-10 text-cyan-400" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Us</span>
          </h1>
          
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 mb-8">
            <Clock className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="text-lg font-semibold tracking-wide uppercase text-slate-300">Coming Soon</span>
          </div>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
            We are actively assembling our executive profiles. Check back in a week to meet the CEO, CFO, COO, and the brilliant minds powering the future of AstroLab.
          </p>
        </div>
      </div>

      <FooterContact />
    </main>
  );
}