import Navbar from "../components/Navbar";
import WorksGallery from "../components/works/WorksGallery";
import Footer from "../components/Footer";

export default function WorksPage() {
  return (
    <main className="min-h-screen bg-bg-light relative overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <WorksGallery />
        <Footer />
      </div>
    </main>
  );
}
