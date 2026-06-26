import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = ["HOME", "ABOUT", "DRIVERS", "CONTACT"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[var(--mnk-navy)]/90 backdrop-blur-md border-b border-[var(--mnk-hairline)]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between ml-8 md:ml-16">
        <div className="font-display text-3xl font-bold tracking-wider text-[var(--mnk-white)] cursor-pointer" onClick={() => scrollTo("home")}>
          MNK LOGISTICS
        </div>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link}>
                <button 
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="font-mono text-sm tracking-widest text-[var(--mnk-steel)] hover:text-[var(--mnk-white)] transition-colors relative group"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--mnk-red)] transition-all group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => scrollTo('contact')} className="bg-[var(--mnk-red)] text-white font-mono font-bold tracking-widest px-6 py-3 text-sm hover:-translate-y-[2px] transition-transform">
            GET A QUOTE
          </button>
        </div>

        <button className="md:hidden text-[var(--mnk-white)]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[var(--mnk-navy)] z-[60] flex flex-col items-center justify-center gap-8">
          <button className="absolute top-6 right-6 text-white" onClick={() => setMobileMenuOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          {navLinks.map((link) => (
            <button key={link} onClick={() => scrollTo(link.toLowerCase())} className="font-display text-4xl text-white">
              {link}
            </button>
          ))}
          <button onClick={() => scrollTo('contact')} className="bg-[var(--mnk-red)] text-white font-mono tracking-widest px-8 py-4 mt-8">
            GET A QUOTE
          </button>
        </div>
      )}
    </nav>
  );
}
