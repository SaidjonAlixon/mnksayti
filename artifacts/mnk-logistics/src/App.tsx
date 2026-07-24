import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Drivers } from "./pages/Drivers";
import { Contact } from "./pages/Contact";
import { useEffect } from "react";
import Lenis from 'lenis';
import { ThemeProvider } from "./context/ThemeContext";
import { DriverApplicationProvider } from "./context/DriverApplicationContext";
import { DriverApplicationModal } from "./components/DriverApplication/DriverApplicationModal";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // Wait for route content to paint, then scroll to target
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        window.scrollTo(0, 0);
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <ThemeProvider>
      <DriverApplicationProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedRoutes />
          <DriverApplicationModal />
        </BrowserRouter>
      </DriverApplicationProvider>
    </ThemeProvider>
  );
}

export default App;
