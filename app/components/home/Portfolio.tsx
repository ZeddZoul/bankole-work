"use client";

import { useState, useEffect } from "react";
import AccentFont from "../AccentFont";
import { motion } from "framer-motion";
import React from "react";

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

  // Get items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1; // mobile
      if (window.innerWidth < 1024) return 2; // tablet
      return 3; // desktop
    }
    return 3;
  };

  const [itemsPerView, setItemsPerView] = useState(3);

  // Update items per view on resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    // Set initial value
    setItemsPerView(getItemsPerView());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = portfolioItems.length - itemsPerView;

  const scrollToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const scrollToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <motion.section
      className="bg-black py-12 md:py-24 px-6 md:px-12 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <AccentFont className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white tracking-tight">
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
            className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 -ml-2 md:ml-0"
            aria-label="Previous images"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="md:w-4 md:h-4"
            >
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
            className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 -mr-2 md:mr-0"
            aria-label="Next images"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="md:w-4 md:h-4"
            >
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
          <div className="overflow-hidden px-4 md:px-0">
            <div
              className="flex gap-4 md:gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`flex-shrink-0 ${
                    itemsPerView === 1
                      ? "w-full"
                      : itemsPerView === 2
                      ? "w-1/2"
                      : "w-1/3"
                  } relative group cursor-pointer`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-black rounded-lg md:rounded-none">
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
                      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <h3 className="text-white text-base md:text-lg font-medium tracking-wide">
                          {item.title}
                        </h3>
                      </div>
                    )}

                    {/* Play Icon Overlay for local videos only */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-white ml-1 md:w-6 md:h-6"
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
            className="flex justify-center gap-2 mt-8 md:mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
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
            ))}
          </motion.div>

          {/* See All Reels Link */}
          <motion.div
            className="flex justify-center mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <a
              href="/works"
              className="text-white text-base md:text-lg font-medium hover:opacity-70 transition-opacity duration-300 border-b border-white/30 hover:border-white pb-1"
            >
              See all reels
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
