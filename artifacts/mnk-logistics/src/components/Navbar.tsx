import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const TICKER_ITEMS = [
  "● ACTIVE LOADS: 47",
  "IN TRANSIT: 31",
  "DELIVERED TODAY: 16",
  "99.2% ON-TIME RATE",
  "MC-XXXXXXX",
  "DOT-XXXXXXX",
  "48 STATES COVERED",
  "24/7 DISPATCH ACTIVE",
  "500+ LOADS / MONTH",
  "FULLY INSURED",
];

function Ticker() {
  return (
    <div className="mnk-ticker-strip">
      <div className="mnk-ticker-track">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="mnk-ticker-item">
            {item}
            <span className="mnk-ticker-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "DRIVERS", path: "/drivers" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      <header className={`mnk-header ${scrolled ? "mnk-header--scrolled" : ""}`}>
        {/* Live Status Ticker Strip */}
        <div className={`mnk-ticker-wrapper ${scrolled ? "mnk-ticker-wrapper--hidden" : ""}`}>
          <Ticker />
        </div>

        {/* Main Navigation Bar */}
        <div className="mnk-nav-bar">
          {/* Left: Logo Block — dark navy panel */}
          <Link to="/" className="mnk-logo-block">
            <span className="mnk-logo-text">
              MNK<span className="mnk-logo-red">.</span>
            </span>
            <span className="mnk-logo-sub">LOGISTICS LLC</span>
          </Link>

          {/* Center: Nav Links */}
          <nav className="mnk-nav-links">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`mnk-nav-link ${isActive ? "mnk-nav-link--active" : ""}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-bar-indicator"
                      className="mnk-nav-indicator"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA block + mobile toggle */}
          <div className="mnk-nav-right">
            <Link to="/contact" className="mnk-cta-block">
              <span className="mnk-cta-label">GET A QUOTE</span>
              <svg className="mnk-cta-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <button
              className="mnk-hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mnk-mobile-menu"
          >
            <div className="mnk-mobile-header">
              <span className="mnk-logo-text" style={{ color: "#fff", fontSize: "1.4rem" }}>
                MNK<span style={{ color: "var(--red)" }}>.</span>
              </span>
              <button className="mnk-mobile-close" onClick={() => setMobileOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <nav className="mnk-mobile-links">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    className={`mnk-mobile-link ${location.pathname === link.path ? "mnk-mobile-link--active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="mnk-mobile-link-num">0{i + 1}</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mnk-mobile-footer">
              <Link to="/contact" className="mnk-mobile-cta" onClick={() => setMobileOpen(false)}>
                GET A QUOTE →
              </Link>
              <p className="mnk-mobile-status">● DISPATCH ACTIVE · 24/7</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
