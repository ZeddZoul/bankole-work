import Navbar from "./components/Navbar";
import Portfolio from "./components/home/Portfolio";
import HeroSection from "./components/home/HeroSection";
import AboutSection from "./components/home/AboutSection";
import Testimonials from "./components/home/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-light  relative overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <HeroSection />
        <Portfolio />
        <AboutSection />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}
