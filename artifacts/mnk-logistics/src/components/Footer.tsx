import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--blue-dark)] text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1 */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-display font-bold text-2xl tracking-tight text-white block mb-4">
              MNK <span className="text-[var(--blue-light)]">LOGISTICS</span>
            </Link>
            <p className="font-sans text-white/60 mb-8 max-w-xs">
              America's freight, in motion.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--blue)] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--blue)] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--blue)] transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--blue)] transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          {/* Column 2 */}
          <div>
            <h4 className="font-mono text-sm text-white/40 font-bold mb-6 tracking-widest">QUICK LINKS</h4>
            <ul className="space-y-4 font-sans text-white/80">
              <li><Link to="/" className="hover:text-[var(--blue-light)] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[var(--blue-light)] transition-colors">About</Link></li>
              <li><Link to="/drivers" className="hover:text-[var(--blue-light)] transition-colors">Drivers</Link></li>
              <li><Link to="/contact" className="hover:text-[var(--blue-light)] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-mono text-sm text-white/40 font-bold mb-6 tracking-widest">SERVICES</h4>
            <ul className="space-y-4 font-sans text-white/80">
              <li>Dry Van</li>
              <li>Reefer</li>
              <li>Flatbed</li>
              <li>Power Only</li>
              <li>Expedited</li>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h4 className="font-mono text-sm text-white/40 font-bold mb-6 tracking-widest">CONTACT</h4>
            <ul className="space-y-4 font-sans text-white/80">
              <li><a href="tel:5550000000" className="hover:text-[var(--blue-light)] transition-colors">(555) 000-0000</a></li>
              <li><a href="mailto:dispatch@mnklogistics.com" className="hover:text-[var(--blue-light)] transition-colors">dispatch@mnklogistics.com</a></li>
              <li className="pt-4"><span className="text-white/40 block text-xs font-mono tracking-widest mb-1">HOURS</span>24/7/365 Dispatch</li>
              <li className="pt-2 flex gap-4 font-mono text-xs">
                <span className="bg-white/10 px-2 py-1 rounded">DOT: 1234567</span>
                <span className="bg-white/10 px-2 py-1 rounded">MC: 7654321</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-white/40">
            © {new Date().getFullYear()} MNK Logistics LLC. Built with precision.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="font-mono text-xs text-white/40 hover:text-white transition-colors">PRIVACY POLICY</Link>
            <Link to="#" className="font-mono text-xs text-white/40 hover:text-white transition-colors">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
