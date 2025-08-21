"use client";

import AccentFont from "../AccentFont";
import { HiMail } from "react-icons/hi";
import { motion } from "framer-motion";
import Image from "next/image";
const HeroSection = () => {
  return (
    <div className="flex items-center hero-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 px-6 lg:px-12 py-4 max-w-[1400px] mx-auto items-center w-full">
        <motion.div
          className="lg:pr-12 text-center lg:text-left space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="text-lg md:text-xl text-text-secondary font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Hello! I&apos;m
            </motion.div>
            <AccentFont className="leading-[0.85]  tracking-tight">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {/* <span className="text-2xl font-semibold text-gray-900 md:text-3xl lg:text-5xl block tracking-widest relative">
                  Gbenga
                </span> */}

                <motion.span
                  className="text-6xl md:text-7xl font-semibold tracking-widest lg:text-8xl text-gray-900 block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Bankole
                </motion.span>
              </motion.h1>
            </AccentFont>
          </motion.div>

          <motion.div
            className="space-y-3 max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <p className="text-lg md:text-xl font-medium text-text-primary uppercase tracking-[0.1em] leading-relaxed">
              Worldwide Filmmaker
            </p>
            <p className="text-base md:text-lg leading-relaxed text-text-secondary font-light">
              Specialising In Travel And Lifestyle Videography And He Regularly
              Shares His Adventures From Around The Globe On His Instagram.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center justify-center lg:justify-start gap-4 text-base text-text-primary pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <span className="text-xl text-black">
              <HiMail />
            </span>
            <a
              href="mailto:info@bankole.work"
              className="font-light hover:opacity-70 transition-opacity duration-300"
            >
              info@bankole.work
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Image
              src="/hero.png"
              alt="Gbenga Bankole - Photographer"
              fill
              className="object-cover object-top"
              priority
            />
            <motion.div
              className="absolute bottom-6 right-6 bg-white/95 px-6 py-4 rounded-lg backdrop-blur-sm shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <span
                className="text-xs font-normal tracking-[0.2em] text-text-primary [writing-mode:vertical-rl] [text-orientation:mixed]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                BANKOLE
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
