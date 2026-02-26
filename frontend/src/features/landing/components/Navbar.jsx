import { useState, useEffect } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "HOME" },
    { href: "#about", label: "ABOUT" },
    { href: "#portfolio", label: "HOW IT WORKS" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg mx-4 lg:mx-auto py-3"
            : "py-2"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.svg"
              className={`transition-all duration-300 ${
                scrolled ? "h-9" : "h-11"
              }`}
              loading="lazy"
              alt="Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-bold text-sm tracking-wide transition-all duration-300 hover:text-secondary/80 ${
                  scrolled ? "text-secondary" : "text-secondary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Login Link */}
            <Link
              to="/login"
              className={`hidden md:block font-medium text-sm transition-all duration-300 hover:text-secondary/80 ${
                scrolled ? "text-secondary" : "text-secondary/80"
              }`}
            >
              Log In
            </Link>

            {/* Sign Up Button */}
            <Link
              to="/register"
              className="my-btn hidden md:inline-flex items-center justify-center px-5 py-2.5 bg-app-primary text-white font-semibold text-sm hover:bg-secondary/80 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/25"
            >
              Sign Up
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-secondary hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <VscChromeClose size={22} />
              ) : (
                <RiMenu3Fill size={22} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
            >
              <div className="p-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 rounded-xl font-medium text-secondary hover:bg-[#eef7fc] hover:text-app-primary transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 mt-2 border-t border-gray-100 space-y-3">
                  <Link
                    to="/login"
                    className="my-btn w-full block px-4 py-3 text-center text-secondary font-medium hover:bg-[#eef7fc] transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="my-btn w-full block px-4 py-3 bg-app-primary text-white text-center font-semibold rounded-xl shadow-md hover:bg-secondary/80 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
