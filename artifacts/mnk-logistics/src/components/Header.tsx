import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "DRIVERS", path: "/drivers" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[var(--surface)] border-b border-[var(--hairline)] transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-xl tracking-tight text-[var(--blue)]">
          MNK LOGISTICS
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`font-mono text-sm font-medium tracking-wide transition-colors relative ${
                  isActive ? "text-[var(--blue)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="header-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[var(--blue)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/contact"
            className="bg-[var(--red)] text-white font-display font-medium tracking-wide px-5 py-2 text-sm rounded transition-transform hover:scale-105 active:scale-95"
          >
            GET A QUOTE
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[var(--ink)] p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-[var(--surface)] border-b border-[var(--hairline)] p-4 shadow-lg md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-mono text-base font-medium tracking-wide p-3 rounded ${
                  location.pathname === link.path
                    ? "bg-[var(--paper)] text-[var(--blue)]"
                    : "text-[var(--ink)]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[var(--red)] text-white text-center font-display font-medium tracking-wide px-5 py-3 mt-2 text-sm rounded"
            >
              GET A QUOTE
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
