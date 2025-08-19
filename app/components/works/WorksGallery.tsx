"use client";

import { useState, useEffect } from "react";
import AccentFont from "../AccentFont";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import React from "react";

interface WorkItem {
  id: number;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  height: string; // Tailwind height class
  featured?: boolean;
}

const worksData: WorkItem[] = [
  {
    id: 1,
    title: "Epic Journey Through the Alps",
    category: "Tour Promo",
    description:
      "A breathtaking promotional video showcasing the stunning alpine landscapes and adventure tourism experiences.",
    thumbnail: "/hero.png",
    videoUrl: "#",
    height: "h-80",
    featured: true,
  },
  {
    id: 2,
    title: "Mercedes AMG GT Commercial",
    category: "Car Commercials",
    description:
      "High-octane commercial showcasing the power and elegance of luxury automotive engineering.",
    thumbnail: "/hero.png",
    videoUrl: "#",
    height: "h-64",
  },
  {
    id: 3,
    title: "Afrobeat Sensation",
    category: "Music Videos",
    description:
      "Vibrant music video capturing the energy and rhythm of contemporary Afrobeat culture.",
    thumbnail: "/hero.png",
    videoUrl: "#",
    height: "h-72",
  },
  {
    id: 4,
    title: "Stories from Lagos Streets",
    category: "Documentaries",
    description:
      "An intimate documentary exploring the daily lives and dreams of Lagos residents.",
    thumbnail: "/hero.png",
    videoUrl: "#",
    height: "h-96",
    featured: true,
  },
  {
    id: 5,
    title: "60-Second Brand Story",
    category: "Short Form Content",
    description:
      "Dynamic short-form content designed for social media engagement and brand awareness.",
    thumbnail: "/hero.png",
    videoUrl: "#",
    height: "h-60",
  },
  {
    id: 6,
    title: "Sustainable Fashion Collection",
    category: "Clothing Brands",
    description:
      "Showcasing eco-conscious fashion through compelling visual narratives.",
    thumbnail: "/hero.png",
    videoUrl: "#",
    height: "h-88",
  },
  {
    id: 7,
    title: "Handcrafted Elegance",
    category: "Jewelry Brands",
    description:
      "Luxury jewelry campaign highlighting artisanal craftsmanship and timeless design.",
    thumbnail: "/hero.png",
    videoUrl: "#",
    height: "h-56",
  },
  {
    id: 8,
    title: "BMW X5 Desert Adventure",
    category: "Car Commercials",
    description:
      "Cinematic commercial capturing the BMW X5's performance in challenging desert terrain.",
    thumbnail: "/hero.png",
    videoUrl: "#",
    height: "h-84",
    featured: true,
  },
  {
    id: 9,
    title: "Discover Morocco",
    category: "Tour Promo",
    description:
      "Travel promotional video showcasing Morocco's rich culture, landscapes, and hidden gems.",
    thumbnail: "/hero.png",
    videoUrl: "#",
    height: "h-72",
  },
  {
    id: 10,
    title: "Urban Beats",
    category: "Music Videos",
    description:
      "Contemporary music video blending urban aesthetics with dynamic choreography.",
    thumbnail: "/hero.png",
    videoUrl: "#",
    height: "h-68",
  },
  {
    id: 11,
    title: "TikTok Campaign Series",
    category: "Short Form Content",
    description:
      "Creative short-form content series designed for maximum social media impact.",
    thumbnail: "/hero.png",
    videoUrl: "#",
    height: "h-64",
  },
  {
    id: 12,
    title: "The Art of Traditional Weaving",
    category: "Documentaries",
    description:
      "Documentary exploring traditional textile crafts and the artisans preserving ancient techniques.",
    thumbnail: "/hero.png",
    videoUrl: "#",
    height: "h-76",
  },
];

const categories = [
  "All",
  "Tour Promo",
  "Car Commercials",
  "Music Videos",
  "Short Form Content",
  "Clothing Brands",
  "Jewelry Brands",
  "Documentaries",
];

const WorksGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Get items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 4; // mobile - show 4 items initially
      if (window.innerWidth < 1024) return 6; // tablet - show 6 items initially
      return 8; // desktop - show 8 items initially
    }
    return 8;
  };

  // Update items per view on resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerView());
    };

    // Set initial value
    setItemsPerPage(getItemsPerView());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredWorks =
    selectedCategory === "All"
      ? worksData
      : worksData.filter((work) => work.category === selectedCategory);

  const visibleWorks = filteredWorks.slice(0, itemsPerPage);
  const hasMoreItems = filteredWorks.length > itemsPerPage;

  const loadMore = () => {
    setItemsPerPage((prev) =>
      Math.min(prev + getItemsPerView(), filteredWorks.length)
    );
  };

  return (
    <motion.section
      className="py-12 md:py-24 px-6 md:px-12 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AccentFont className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-900 tracking-wider mb-6">
            <h1>Selected Works</h1>
          </AccentFont>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A curated collection of visual stories that showcase the art of
            videography and the power of compelling narratives from around the
            world.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium rounded-full transition-all duration-300 border ${
                selectedCategory === category
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Responsive Grid Gallery */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {visibleWorks.map((work, index) => (
            <motion.div
              key={work.id}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className={`relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                  work.featured ? "ring-2 ring-gray-200" : ""
                }`}
              >
                {/* Thumbnail */}
                <div
                  className={`relative ${work.height} sm:h-64 md:${work.height} overflow-hidden`}
                >
                  <Image
                    src={work.thumbnail}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      className="w-12 h-12 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPlay className="text-gray-900 ml-1" size={16} />
                    </motion.div>
                  </div>

                  {/* Featured Badge */}
                  {work.featured && (
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-gray-900 text-white px-2 py-1 md:px-3 md:py-1 text-xs font-medium rounded-full">
                      Featured
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/90 text-gray-900 px-2 py-1 md:px-3 md:py-1 text-xs font-medium rounded-full backdrop-blur-sm">
                    {work.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 lg:p-8">
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2 md:mb-3 leading-tight group-hover:text-black transition-colors duration-300 line-clamp-2">
                    {work.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300 line-clamp-3">
                    {work.description}
                  </p>
                </div>

                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {hasMoreItems && (
          <motion.div
            className="text-center mt-12 md:mt-16 lg:mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button
              onClick={loadMore}
              className="px-6 md:px-8 lg:px-12 py-3 md:py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors duration-300 text-sm md:text-base lg:text-lg"
            >
              Load More Works
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default WorksGallery;
