"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import React from "react";
import { allProjects } from "../../lib/allProjects";
import CarouselVideoItem from "../CarouselVideoItem";
import VideoModal from "../VideoModal";

interface Project {
  id: number;
  title: string;
  category: string;
  videoSrc: string;
  type: string;
  featured?: boolean;
  description: string;
  tags?: string[];
}

// Extract unique categories from projects
const getCategories = (projects: Project[]) => {
  const categories = projects.map((project) => project.category);
  const uniqueCategories = Array.from(new Set(categories));
  return ["All", ...uniqueCategories.sort()];
};

const WorksGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedVideo, setSelectedVideo] = useState<Project | null>(null);

  // Refs for video management
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const videoProgressRef = useRef<{ [key: string]: number }>({});

  // Simple state setter for video progress (used by CarouselVideoItem)
  const setVideoProgress = (
    progress: React.SetStateAction<{ [key: string]: number }>
  ) => {
    // Update the ref directly since this is the source of truth
    if (typeof progress === "function") {
      const newProgress = progress(videoProgressRef.current);
      Object.assign(videoProgressRef.current, newProgress);
    } else {
      Object.assign(videoProgressRef.current, progress);
    }
  };

  const categories = getCategories(allProjects);

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
      ? allProjects
      : allProjects.filter((work) => work.category === selectedCategory);

  const visibleWorks = filteredWorks.slice(0, itemsPerPage);
  const hasMoreItems = filteredWorks.length > itemsPerPage;

  const loadMore = () => {
    setItemsPerPage((prev) =>
      Math.min(prev + getItemsPerView(), filteredWorks.length)
    );
  };

  // Handle video click to open modal
  const handleVideoClick = (project: Project, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedVideo(project);
  };

  // Close video modal
  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  // Handle category change - reset pagination
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setItemsPerPage(getItemsPerView()); // Reset to initial load amount
  };

  return (
    <>
      <motion.section
        className="py-8 md:py-12 px-6 md:px-12 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 uppercase mb-4">
              My Works
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Creative projects spanning fashion, music videos, and commercials
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
                onClick={() => handleCategoryChange(category)}
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

          {/* Video Gallery Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {visibleWorks.map((project, index) => (
              <CarouselVideoItem
                key={project.id}
                project={project}
                index={index}
                videoRefs={videoRefs}
                videoProgressRef={videoProgressRef}
                setVideoProgress={setVideoProgress}
                onVideoClick={handleVideoClick}
              />
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
                See More Works ({filteredWorks.length - itemsPerPage} remaining)
              </button>
            </motion.div>
          )}

          {/* Works Count */}
          <motion.div
            className="text-center mt-8 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Showing {visibleWorks.length} of {filteredWorks.length}{" "}
            {selectedCategory === "All"
              ? "works"
              : selectedCategory.toLowerCase()}
          </motion.div>
        </div>
      </motion.section>

      {/* Video Modal */}
      <VideoModal
        selectedVideo={selectedVideo}
        onClose={closeVideoModal}
        videoProgressRef={videoProgressRef}
      />
    </>
  );
};

export default WorksGallery;
