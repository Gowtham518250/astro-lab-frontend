import GlassNavbar from "@/components/landing/GlassNavbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutMission from "@/components/landing/AboutMission";
import TechnologiesGrid from "@/components/landing/TechnologiesGrid";
import StatisticsCounters from "@/components/landing/StatisticsCounters";
import CinematicGallery from "@/components/landing/CinematicGallery";
import FooterContact from "@/components/landing/FooterContact";

export default function LandingPage() {
  return (
    <main className="bg-[var(--color-background)] min-h-screen text-white selection:bg-[var(--color-primary)] selection:text-white">
      <GlassNavbar />
      <HeroSection />
      <AboutMission />
      <TechnologiesGrid />
      <StatisticsCounters />
      <CinematicGallery />
      <FooterContact />
    </main>
  );
}