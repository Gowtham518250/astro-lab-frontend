import GlassNavbar from "@/components/landing/GlassNavbar";
import HeroCoursera from "@/components/landing/HeroCoursera";
import PopularCategories from "@/components/landing/PopularCategories";
import FeaturedCourses from "@/components/landing/FeaturedCourses";
import WhyLearnWithUs from "@/components/landing/WhyLearnWithUs";
import LearningPaths from "@/components/landing/LearningPaths";
import TopInstructors from "@/components/landing/TopInstructors";
import StatisticsCounters from "@/components/landing/StatisticsCounters";
import Testimonials from "@/components/landing/Testimonials";
import PricingPlans from "@/components/landing/PricingPlans";
import FooterContact from "@/components/landing/FooterContact";

export default function LandingPage() {
  return (
    <main className="bg-[var(--color-background)] min-h-screen text-white selection:bg-[var(--color-primary)] selection:text-white overflow-hidden">
      <GlassNavbar />
      <HeroCoursera />
      <PopularCategories />
      <FeaturedCourses />
      <WhyLearnWithUs />
      <LearningPaths />
      <TopInstructors />
      <StatisticsCounters />
      <Testimonials />
      <PricingPlans />
      <FooterContact />
    </main>
  );
}