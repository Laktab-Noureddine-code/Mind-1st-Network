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
    { href: "#portfolio", label: "PORTFOLIO" },
    { href: "#service", label: "SERVICE" },
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
              src="/logo.png"
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
                className={`font-bold text-sm tracking-wide transition-all duration-300 hover:text-[#4a96c4] ${
                  scrolled ? "text-[#5bb6ea]" : "text-[#5bb6ea]"
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
              className={`hidden sm:block font-medium text-sm transition-all duration-300 hover:text-[#5bb6ea] ${
                scrolled ? "text-[#2D3436]" : "text-[#2D3436]/80"
              }`}
            >
              Log In
            </Link>

            {/* Sign Up Button */}
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#5bb6ea] text-white font-semibold text-sm hover:bg-[#4a96c4] transition-all duration-300 hover:shadow-lg hover:shadow-[#5bb6ea]/25"
            >
              Sign Up
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-[#2D3436] hover:bg-gray-100 transition-colors"
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

        {/* Mobile Menu */}
        
          {isOpen && (
            <div
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-gray-200 mt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 rounded-xl text-[#2D3436] hover:bg-[#eef7fc] transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-xl text-[#2D3436] hover:bg-[#eef7fc] transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 rounded-full bg-[#5bb6ea] text-white text-center font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          )}
        
      </div>
    </nav>
  );
}
