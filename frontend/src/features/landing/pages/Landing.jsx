// Components
import Navbar from "@/features/landing/components/Navbar";
import HeroSection from "@/features/landing/components/HeroSection";
import Features from "@/features/landing/components/Features";
import HowItWorks from "@/features/landing/components/HowItWorks";
import NewsletterSection from "@/features/landing/components/NewsletterSection";
import FaqSection from "@/features/landing/components/FaqSection";
import { Footer } from "@/features/landing/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <Features />

        {/* How It Works Section */}
        <HowItWorks />

        {/* FAQ Section */}
        <FaqSection />

        {/* Newsletter Section - "Stay up to date" */}
        <NewsletterSection />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
