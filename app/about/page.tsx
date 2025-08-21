import Navbar from "@/components/Navbar";
import Portfolio from "@/components/about/Portfolio";
import HeroSection from "@/components/about/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import Testimonials from "@/components/about/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-light  relative overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <HeroSection />
        <AboutSection />
        <Portfolio />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}
