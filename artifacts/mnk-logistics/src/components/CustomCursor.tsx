import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (typeof window === "undefined" || window.innerWidth < 768) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none z-[9999]"
      style={{
        background: "radial-gradient(circle, var(--blue) 0%, transparent 70%)",
        opacity: isVisible ? 0.1 : 0,
        filter: "blur(40px)",
      }}
      animate={{
        x: position.x - 100,
        y: position.y - 100,
      }}
      transition={{
        type: "tween",
        ease: "linear",
        duration: 0.1
      }}
    />
  );
}
