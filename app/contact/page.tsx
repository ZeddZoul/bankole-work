import Navbar from "@/components/Navbar";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg-light relative overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
