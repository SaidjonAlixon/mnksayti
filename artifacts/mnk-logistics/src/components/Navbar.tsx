import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
  { num: "01", name: "HOME", path: "/" },
  { num: "02", name: "ABOUT", path: "/about" },
  { num: "03", name: "DRIVERS", path: "/drivers" },
  { num: "04", name: "CONTACT", path: "/contact" },
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="ops-theme-toggle"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Day mode" : "Night mode"}
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.svg
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tick, setTick] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Blinking clock effect for "live" feel
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <header className={`ops-navbar ${scrolled ? "ops-navbar--scrolled" : ""}`}>
        {/* Red left accent strip */}
        <div className="ops-red-accent" />

        {/* Logo zone */}
        <Link to="/" className="ops-logo-zone">
          <span className="ops-logo-mark">MNK</span>
          <div className="ops-logo-meta">
            <span className="ops-logo-tagline">LOGISTICS LLC</span>
            <span className="ops-logo-status">
              <span className="ops-live-dot" />
              OPS LIVE
            </span>
          </div>
        </Link>

        {/* Divider */}
        <div className="ops-divider" />

        {/* Navigation links — numbered */}
        <nav className="ops-nav-links">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.name} to={link.path} className={`ops-nav-item ${isActive ? "ops-nav-item--active" : ""}`}>
                <span className="ops-nav-num">{link.num}</span>
                <span className="ops-nav-name">{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="ops-indicator"
                    className="ops-nav-active-bar"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="ops-right">
          {/* Live clock */}
          <div className="ops-clock">
            <span className="ops-clock-label">CT</span>
            <span className="ops-clock-time">{timeStr}</span>
          </div>

          <div className="ops-divider" />

          <ThemeToggle />

          <div className="ops-divider" />

          {/* CTA */}
          <Link to="/contact" className="ops-cta">
            <span>REQUEST QUOTE</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* Hamburger — mobile only */}
          <button className="ops-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="ops-mobile-overlay"
          >
            {/* top bar */}
            <div className="ops-mobile-top">
              <span className="ops-logo-mark" style={{ fontSize: "1.3rem" }}>MNK<span style={{ color: "var(--red)" }}>.</span></span>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <ThemeToggle />
                <button className="ops-mobile-close" onClick={() => setMobileOpen(false)}><X size={26} /></button>
              </div>
            </div>

            {/* links */}
            <nav className="ops-mobile-nav">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.path}
                    className={`ops-mobile-link ${location.pathname === link.path ? "ops-mobile-link--active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="ops-mobile-num">{link.num}</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* footer */}
            <div className="ops-mobile-footer">
              <Link to="/contact" className="ops-mobile-cta" onClick={() => setMobileOpen(false)}>
                REQUEST A QUOTE →
              </Link>
              <p className="ops-mobile-note">● DISPATCH ACTIVE · 24/7 · 48 STATES</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
