
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import AppShowcaseSection from "@/components/landing/AppShowcaseSection";
import DownloadCtaSection from "@/components/landing/DownloadCtaSection";
import Footer from "@/components/landing/Footer";
import HotelManagerCTA from "@/components/landing/HotelManagerCTA";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">
        <HeroSection />
        <BenefitsSection />
        <FeaturesSection />
        <HotelManagerCTA />
        <AppShowcaseSection />
        <DownloadCtaSection />
      </main>
      <Footer />
    </div>
  );
}