import React from "react";
import WorksGallery from "@/components/works/WorksGallery";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function WorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <WorksGallery />
      <Footer />
    </main>
  );
}
