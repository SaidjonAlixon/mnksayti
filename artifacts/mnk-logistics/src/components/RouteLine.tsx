import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function RouteLine() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? scrollY / docHeight : 0;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed left-4 md:left-8 top-0 bottom-0 w-[2px] bg-[var(--mnk-hairline)] z-40">
      <motion.div
        className="absolute top-0 left-0 right-0 bg-[var(--mnk-red)] origin-top"
        style={{ scaleY: progress, height: '100%' }}
      />
      {/* Decorative Nodes could go here, bound to section intersections */}
    </div>
  );
}
