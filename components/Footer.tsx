"use client";

import AccentFont from "./AccentFont";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { SiBehance, SiDribbble } from "react-icons/si";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <motion.footer
      className="bg-black text-white py-16 px-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div
            className="space-y-6 lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <AccentFont className="text-3xl font-semibold text-white">
              <h3>BANKOLE</h3>
            </AccentFont>
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
              Adipiscing proin magna proin mauris donec dignissim congue vel
              maximus.
            </p>
          </motion.div>

          {/* Links Section */}
          <motion.div
            className="space-y-6 lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium text-white">Quick Links</h4>
            <nav className="space-y-3">
              <Link
                href="/"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/works"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Works
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </nav>
          </motion.div>

          {/* Social Section */}
          <motion.div
            className="space-y-6 lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium text-white">Get to Know Me</h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Behance"
              >
                <SiBehance className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Dribbble"
              >
                <SiDribbble className="w-5 h-5 text-white" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-800 pt-8 mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Legal Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 order-2 md:order-1">
              <a
                href="/privacy"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors order-1 md:order-2"
            >
              Back to top
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 15L12 9L6 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Copyright */}
          <motion.div
            className="text-center mt-8 pt-6 border-t border-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xs text-gray-500">
              2025 Bankole & All Rights Reserved
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
