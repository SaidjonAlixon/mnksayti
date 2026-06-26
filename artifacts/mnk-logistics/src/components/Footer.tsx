import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--hairline)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="font-display font-bold text-2xl tracking-tight text-[var(--blue)] block mb-4">
              MNK LOGISTICS
            </Link>
            <p className="font-sans text-[var(--muted)] max-w-sm">
              America's freight, in motion. Delivering dry van, reefer, and flatbed freight across the contiguous U.S.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-sm text-[var(--ink)] font-bold mb-4">NAVIGATION</h4>
            <ul className="space-y-3 font-sans text-[var(--muted)]">
              <li><Link to="/" className="hover:text-[var(--blue)] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[var(--blue)] transition-colors">About Us</Link></li>
              <li><Link to="/drivers" className="hover:text-[var(--blue)] transition-colors">Join Our Fleet</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--blue)] transition-colors">Contact & Quotes</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-mono text-sm text-[var(--ink)] font-bold mb-4">CONTACT</h4>
            <ul className="space-y-3 font-sans text-[var(--muted)]">
              <li><a href="mailto:dispatch@mnklogistics.com" className="hover:text-[var(--blue)] transition-colors">dispatch@mnklogistics.com</a></li>
              <li><a href="tel:5550000000" className="hover:text-[var(--blue)] transition-colors">(555) 000-0000</a></li>
              <li className="font-mono text-xs mt-6">DOT: XXXXXXX</li>
              <li className="font-mono text-xs">MC: XXXXXXX</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[var(--hairline)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} MNK Logistics LLC. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="font-mono text-xs text-[var(--muted)] hover:text-[var(--ink)]">PRIVACY</Link>
            <Link to="#" className="font-mono text-xs text-[var(--muted)] hover:text-[var(--ink)]">TERMS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
