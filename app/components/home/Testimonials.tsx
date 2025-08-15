"use client";

import { useState, useEffect } from "react";
import AccentFont from "../AccentFont";
import { motion } from "framer-motion";
import React from "react";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Kristin Watson",
    title: "Best Service",
    content:
      "Adipiscing proin magna proin vitae. Blandit lectus ut nisl felis pretium elit sit ut imperdiet. Nibh et eu etiam.",
    avatar: "/hero.png",
  },
  {
    id: 2,
    name: "Jacob Jones",
    title: "Perfect!",
    content:
      "Adipiscing proin magna proin vitae. Blandit lectus ut nisl felis pretium elit sit ut imperdiet. Nibh et eu etiam.",
    avatar: "/hero.png",
  },
  {
    id: 3,
    name: "Brooklyn Simmons",
    title: "Superb",
    content:
      "Adipiscing proin magna proin vitae. Blandit lectus ut nisl felis pretium elit sit ut imperdiet. Nibh et eu etiam.",
    avatar: "/hero.png",
  },
  {
    id: 4,
    name: "Courtney Henry",
    title: "Amazing Work",
    content:
      "Adipiscing proin magna proin vitae. Blandit lectus ut nisl felis pretium elit sit ut imperdiet. Nibh et eu etiam.",
    avatar: "/hero.png",
  },
  {
    id: 5,
    name: "Cameron Williamson",
    title: "Outstanding",
    content:
      "Adipiscing proin magna proin vitae. Blandit lectus ut nisl felis pretium elit sit ut imperdiet. Nibh et eu etiam.",
    avatar: "/hero.png",
  },
];

const Testimonials = () => {
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

  const maxIndex = testimonials.length - itemsPerView;

  const scrollToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const scrollToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <motion.section
      className="py-12 md:py-24 px-6 md:px-12 bg-gray-50"
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
          <AccentFont className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 tracking-wider">
            <h2>What People Are Saying</h2>
          </AccentFont>
        </motion.div>

        {/* Testimonials Carousel */}
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
            className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all duration-300 -ml-2 md:ml-0"
            aria-label="Previous testimonials"
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
            className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all duration-300 -mr-2 md:mr-0"
            aria-label="Next testimonials"
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

          {/* Testimonials Grid */}
          <div className="overflow-hidden px-4 md:px-12">
            <div
              className="flex gap-4 md:gap-6 lg:gap-8 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className={`flex-shrink-0 ${
                    itemsPerView === 1
                      ? "w-full"
                      : itemsPerView === 2
                      ? "w-1/2"
                      : "w-1/3"
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-2 hover:scale-105 group">
                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 group-hover:text-black transition-colors duration-300">
                      {testimonial.title}
                    </h3>

                    {/* Content */}
                    <p className="text-gray-600 leading-relaxed mb-6 md:mb-8 flex-grow text-sm md:text-base group-hover:text-gray-700 transition-colors duration-300">
                      {testimonial.content}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-200 group-hover:ring-2 group-hover:ring-gray-300 transition-all duration-300">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm md:text-base group-hover:text-black transition-colors duration-300">
                          {testimonial.name}
                        </p>
                      </div>
                    </div>
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
                    ? "bg-gray-900"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
