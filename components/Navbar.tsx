"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AccentFont from "./AccentFont";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [heroHeight, setHeroHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Get hero section height on mount
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      setHeroHeight(heroSection.clientHeight);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollY(currentScrollY);

      // Show/hide navbar based on scroll direction and position
      if (currentScrollY > heroHeight) {
        // Past hero section - hide when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY) {
          setIsNavbarVisible(false);
        } else {
          setIsNavbarVisible(true);
        }
      } else {
        // Within hero section - always show navbar
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY, heroHeight]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Determine if logo should be visible
  const isLogoVisible = () => {
    if (windowWidth >= 1024) return true; // Always visible on lg and above

    // Only apply disappearing behavior on about page
    if (pathname === "/about") {
      return scrollY > heroHeight; // On mobile about page, only visible when past hero section
    }

    return true; // Always visible on other pages
  };
  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 flex justify-between items-center px-6 sm:px-12 py-6 z-50 bg-white transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="nav-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            onClick={toggleMobileMenu}
            className="flex items-center gap-3 bg-transparent border-none cursor-pointer text-lg font-normal tracking-wider text-gray-800 uppercase"
          >
            <span>MENU</span>
            <div className="flex flex-col gap-1">
              <span className="w-3 h-[2px] bg-gray-800 rounded-2xl"></span>
              <span className="w-6 h-[2px] bg-gray-800 rounded-2xl"></span>
            </div>
          </button>
        </motion.div>

        <motion.div
          className="nav-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: isLogoVisible() ? 1 : 0,
            y: 0,
            scale: isLogoVisible() ? 1 : 0.8,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <AccentFont className="text-3xl sm:text-4xl font-semibold text-gray-900 m-0">
            <h1>Bankole</h1>
          </AccentFont>
        </motion.div>

        {/* Social links - hidden on mobile (580px and below) */}
        <motion.div
          className="nav-right hidden min-[581px]:flex"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex gap-6 items-center">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-800 no-underline transition-opacity duration-300 hover:opacity-70"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-800 no-underline transition-opacity duration-300 hover:opacity-70"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-800 no-underline transition-opacity duration-300 hover:opacity-70"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-[60] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo at top center */}
            <motion.div
              className="flex justify-center items-center pt-8 pb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <AccentFont className="text-5xl font-semibold text-gray-900 m-0">
                <h1>Bankole</h1>
              </AccentFont>
            </motion.div>

            {/* Mobile Menu Content */}
            <motion.div
              className="flex-1 flex flex-col justify-center items-center px-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {/* Navigation Links */}
              <div className="flex flex-col gap-8 text-center mb-12">
                <Link href="/" onClick={toggleMobileMenu}>
                  <motion.span
                    className="text-4xl font-semibold text-gray-900 no-underline tracking-wide cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Portfolio
                  </motion.span>
                </Link>
                <Link href="/about" onClick={toggleMobileMenu}>
                  <motion.span
                    className="text-4xl font-semibold text-gray-900 no-underline tracking-wide cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    About
                  </motion.span>
                </Link>
                <Link
                  href="mailto:info@bankole.work"
                  onClick={toggleMobileMenu}
                >
                  <motion.span
                    className="text-4xl font-semibold text-gray-900 no-underline tracking-wide cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact
                  </motion.span>
                </Link>
              </div>

              {/* Social Links in Mobile Menu */}
              <motion.div
                className="flex gap-8 items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <motion.a
                  href="#"
                  aria-label="Facebook"
                  className="text-gray-800 no-underline transition-opacity duration-300 hover:opacity-70"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaFacebookF size={24} />
                </motion.a>
                <motion.a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-gray-800 no-underline transition-opacity duration-300 hover:opacity-70"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedinIn size={24} />
                </motion.a>
                <motion.a
                  href="#"
                  aria-label="Instagram"
                  className="text-gray-800 no-underline transition-opacity duration-300 hover:opacity-70"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaInstagram size={24} />
                </motion.a>
                <motion.a
                  href="mailto:gbenga@bankole.com"
                  aria-label="Email"
                  className="text-gray-800 no-underline transition-opacity duration-300 hover:opacity-70"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <HiMail size={24} />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Close button at bottom center */}
            <motion.div
              className="flex justify-center items-center pb-8 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <motion.button
                onClick={toggleMobileMenu}
                className="p-4 text-gray-800 bg-transparent border-none cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoClose size={32} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
