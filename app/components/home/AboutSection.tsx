"use client";

import AccentFont from "../AccentFont";
import { HiMail } from "react-icons/hi";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <motion.section
      className="py-24 px-12 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-100 p-8 rounded-none">
              <div className="bg-white p-6 rounded-none shadow-sm">
                <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-none">
                  <img
                    src="/hero.png"
                    alt="Gbenga Bankole - About"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <AccentFont className="text-4xl md:text-5xl lg:text-6xl tracking-widest font-semibold text-gray-900 ">
                <h2>About Gbenga</h2>
              </AccentFont>
            </motion.div>

            {/* Description */}
            <motion.div
              className="space-y-6 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-base md:text-lg leading-relaxed text-text-secondary font-light">
                Gbenga Is A Professional Lifestyle And Adventure Videographer
                With A Passion For Creative Storytelling Through His Images.
                Born In Nigeria, He&apos;s Spent The Last Five Years Travelling
                The World In Search Of Some Of The Most Unique Environments To
                Shoot.
              </p>

              <p className="text-base md:text-lg leading-relaxed text-text-secondary font-light">
                Working Alongside Global Brands Including Adobe, American
                Express, Fjallraven, The North Face & Visit Greenland To Name
                Just A Few. With The Creative Knowledge He&apos;s Built Up Over
                The Years He&apos;s Looking To Inspire You To Go Out And Create
                Beautiful Artwork Of Your Own.
              </p>
            </motion.div>

            {/* Email Contact */}
            <motion.div
              className="text-base text-text-primary pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <a
                href="mailto:info@bankole.work"
                className="font-light hover:opacity-70 transition-opacity flex items-center gap-2 duration-300"
              >
                <HiMail />
                info@bankole.work
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
