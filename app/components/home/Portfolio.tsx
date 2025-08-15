"use client";

import { useState } from "react";
import AccentFont from "../AccentFont";
import { motion } from "framer-motion";

interface PortfolioItem {
  id: number;
  type: "video" | "youtube";
  src: string;
  title?: string;
  thumbnail?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    type: "youtube",
    src: "dQw4w9WgXcQ", // YouTube video ID
    title: "Adventure Reel 1",
    thumbnail: "/hero-placeholder.svg",
  },
  {
    id: 2,
    type: "video",
    src: "/sample-video.mp4", // Local video file
    title: "Travel Story",
    thumbnail: "/hero-placeholder.svg",
  },
  {
    id: 3,
    type: "youtube",
    src: "jNQXAC9IVRw", // YouTube video ID
    title: "Mountain View",
    thumbnail: "/hero-placeholder.svg",
  },
  {
    id: 4,
    type: "video",
    src: "/sample-video-2.mp4", // Local video file
    title: "Ocean Waves",
    thumbnail: "/hero-placeholder.svg",
  },
  {
    id: 5,
    type: "youtube",
    src: "M7lc1UVf-VE", // YouTube video ID
    title: "Desert Canyon",
    thumbnail: "/hero-placeholder.svg",
  },
  {
    id: 6,
    type: "video",
    src: "/sample-video-3.mp4", // Local video file
    title: "Peak Views",
    thumbnail: "/hero-placeholder.svg",
  },
];

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToNext = () => {
    setCurrentIndex((prev) =>
      prev === portfolioItems.length - 3 ? 0 : prev + 1
    );
  };

  const scrollToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? portfolioItems.length - 3 : prev - 1
    );
  };

  return (
    <motion.section
      className="bg-black py-24 px-12 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <AccentFont className="text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight">
            <h2>My Reels</h2>
          </AccentFont>
        </motion.div>

        {/* Portfolio Gallery */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Navigation Buttons */}
          <button
            onClick={scrollToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            aria-label="Previous images"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={scrollToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            aria-label="Next images"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Video Gallery */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}
            >
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="flex-shrink-0 w-1/3 relative group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-black">
                    {item.type === "youtube" ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${item.src}?autoplay=0&mute=1&controls=1&rel=0`}
                        title={item.title || `Video ${item.id}`}
                        className="w-full h-full object-cover"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        poster={item.thumbnail}
                      >
                        <source src={item.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 pointer-events-none" />

                    {/* Video Title */}
                    {item.title && (
                      <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <h3 className="text-white text-lg font-medium tracking-wide">
                          {item.title}
                        </h3>
                      </div>
                    )}

                    {/* Play Icon Overlay for local videos only */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-white ml-1"
                          >
                            <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <motion.div
            className="flex justify-center gap-2 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {Array.from({ length: portfolioItems.length - 2 }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white"
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            )}
          </motion.div>

          {/* See All Reels Link */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <a
              href="/works"
              className="text-white text-lg font-medium hover:opacity-70 transition-opacity duration-300 border-b border-white/30 hover:border-white pb-1"
            >
              See all reels
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
