import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "DRIVERS", path: "/drivers" },
    { name: "CONTACT", path: "/contact" }
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className={`mx-auto max-w-[760px] mt-4 transition-all duration-300 pointer-events-auto ${scrolled ? 'px-2' : 'px-4'}`}>
          <div className={`glass flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-2 px-4 shadow-[0_12px_40px_rgba(11,36,71,0.15)]' : 'py-3 px-6'}`} style={{ borderRadius: '100px' }}>
            
            {/* Logo */}
            <Link to="/" className="font-display font-bold text-lg md:text-xl tracking-tight text-[var(--ink)] flex-shrink-0">
              MNK <span className="text-[var(--blue)]">LOGISTICS</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1 relative">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.name}
                    to={link.path}
                    className={`relative px-4 py-2 font-mono text-xs tracking-widest transition-colors ${isActive ? 'text-[var(--blue)] font-bold' : 'text-[var(--muted)] hover:text-[var(--ink)]'}`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-indicator"
                        className="absolute bottom-1 left-4 right-4 h-[2px] bg-[var(--blue)]"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link to="/contact" className="hidden md:flex items-center bg-[var(--red)] text-white font-mono text-xs font-bold tracking-widest px-5 py-2.5 rounded-full hover:bg-[#c01015] transition-colors">
                GET A QUOTE
              </Link>
              <button 
                className="md:hidden p-2 text-[var(--ink)]"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] glass-dark flex flex-col items-center justify-center pointer-events-auto"
          >
            <button 
              className="absolute top-6 right-6 text-white p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-4xl text-white font-bold tracking-tight"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 bg-[var(--red)] text-white font-mono text-sm font-bold tracking-widest px-8 py-4 rounded-full"
              >
                GET A QUOTE
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
