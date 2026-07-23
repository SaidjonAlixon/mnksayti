import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useDriverApplication } from "../context/DriverApplicationContext";

const NAV_LINKS = [
  { code: "HUB", name: "Home", path: "/" },
  { code: "CORP", name: "About", path: "/about" },
  { code: "FLT", name: "Drivers", path: "/drivers" },
  { code: "COM", name: "Contact", path: "/contact" },
];

function ThemeShift({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      className={`mfx-shift ${compact ? "mfx-shift--compact" : ""}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Day mode" : "Night mode"}
    >
      <span className="mfx-shift-track">
        <motion.span
          className="mfx-shift-thumb"
          animate={{ x: isDark ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 480, damping: 32 }}
        />
        <span className={`mfx-shift-opt ${!isDark ? "mfx-shift-opt--active" : ""}`}>
          <Sun size={13} strokeWidth={2.2} />
          {!compact && <span>Day</span>}
        </span>
        <span className={`mfx-shift-opt ${isDark ? "mfx-shift-opt--active" : ""}`}>
          <Moon size={13} strokeWidth={2.2} />
          {!compact && <span>Night</span>}
        </span>
      </span>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { open: openApplication } = useDriverApplication();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`mfx-nav ${scrolled ? "mfx-nav--scrolled" : ""}`}>
        {/* Hazard stripe */}
        <div className="mfx-hazard" aria-hidden="true" />

        {/* Main deck */}
        <div className="mfx-deck">
          {/* Brand logo */}
          <Link to="/" className="mfx-brand">
            <div className="mfx-brand-lane">
              <img
                src="/logo.png"
                alt="MNK Logistics LLC"
                className="mfx-brand-logo mfx-brand-logo--drive"
              />
            </div>
          </Link>

          {/* Waypoint rail navigation */}
          <nav className="mfx-rail" aria-label="Main navigation">
            <div className="mfx-rail-track" aria-hidden="true">
              <div className="mfx-rail-dash" />
            </div>
            <ul className="mfx-rail-stops">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.code}>
                    <Link
                      to={link.path}
                      className={`mfx-stop ${isActive ? "mfx-stop--active" : ""}`}
                    >
                      <span className="mfx-stop-node">
                        <span className="mfx-stop-dot" />
                        {isActive && (
                          <motion.span
                            layoutId="mfx-stop-ring"
                            className="mfx-stop-pulse"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </span>
                      <span className="mfx-stop-code">{link.code}</span>
                      <span className="mfx-stop-name">{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right terminal */}
          <div className="mfx-terminal">
            <a href="tel:+18005551234" className="mfx-comms">
              <span className="mfx-comms-label">COMMS</span>
              <span className="mfx-comms-num">800·555·1234</span>
            </a>

            <ThemeShift compact />

            <button type="button" className="mfx-dispatch" onClick={openApplication}>
              <span className="mfx-dispatch-text mfx-dispatch-text--full">APPLY NOW</span>
              <span className="mfx-dispatch-text mfx-dispatch-text--short">APPLY</span>
              <span className="mfx-dispatch-arrow">▶</span>
            </button>

            <button
              className="mfx-gate-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dock gate */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mfx-gate-backdrop"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mfx-gate-panel"
            >
              <div className="mfx-hazard" aria-hidden="true" />
              <div className="mfx-gate-header">
                <Link to="/" className="mfx-gate-brand" onClick={() => setMobileOpen(false)}>
                  <img
                    src="/logo.png"
                    alt="MNK Logistics LLC"
                    className="mfx-brand-logo mfx-brand-logo--mobile"
                  />
                </Link>
                <button
                  className="mfx-gate-close"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="mfx-gate-nav">
                {NAV_LINKS.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.code}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.07, duration: 0.35 }}
                    >
                      <Link
                        to={link.path}
                        className={`mfx-gate-link ${isActive ? "mfx-gate-link--active" : ""}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="mfx-gate-link-code">{link.code}</span>
                         <span className="mfx-gate-link-name">{link.name}</span>
                        <span className="mfx-gate-link-arrow">▶</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mfx-gate-footer">
                <ThemeShift compact />
                <a href="tel:+18005551234" className="mfx-gate-comms">800·555·1234</a>
                <button type="button" className="mfx-gate-dispatch" onClick={() => { setMobileOpen(false); openApplication(); }}>
                  APPLY NOW ▶
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
