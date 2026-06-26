import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { CustomCursor } from "./CustomCursor";

export function Layout() {
  const location = useLocation();
  const progress = useScrollProgress();

  return (
    <div className="min-h-[100dvh] flex flex-col relative">
      <CustomCursor />
      <div 
        className="scroll-progress" 
        style={{ transform: `scaleX(${progress})` }}
      />
      <Navbar />
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full pt-28" // space for floating nav
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
