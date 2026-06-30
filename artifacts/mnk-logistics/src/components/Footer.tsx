import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="ft">
      <div className="ft-inner">
        <div className="ft-grid">

          <div className="ft-brand-col">
            <Link to="/" className="ft-brand">
              <img
                src="/logo.png"
                alt="MNK Logistics LLC"
                className="ft-logo"
              />
            </Link>
            <p className="ft-tagline">America's freight, in motion.</p>
            <div className="ft-social">
              <a href="#" className="ft-social-btn" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="ft-social-btn" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="ft-social-btn" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="ft-social-btn" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="ft-col-title">Quick links</h4>
            <ul className="ft-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/drivers">Drivers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="ft-col-title">Services</h4>
            <ul className="ft-links ft-links--plain">
              <li>Dry Van</li>
              <li>Reefer</li>
              <li>Flatbed</li>
              <li>Power Only</li>
              <li>Expedited</li>
            </ul>
          </div>

          <div>
            <h4 className="ft-col-title">Contact</h4>
            <ul className="ft-links">
              <li><a href="tel:5550000000">(555) 000-0000</a></li>
              <li><a href="mailto:dispatch@mnklogistics.com">dispatch@mnklogistics.com</a></li>
              <li className="ft-hours">
                <span className="ft-hours-label">Hours</span>
                24/7/365 Dispatch
              </li>
              <li className="ft-badges">
                <span className="ft-badge">DOT: 1234567</span>
                <span className="ft-badge">MC: 7654321</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <p className="ft-copy">
            © {new Date().getFullYear()} MNK Logistics LLC. Built with precision.
          </p>
          <div className="ft-legal">
            <Link to="#">Privacy policy</Link>
            <Link to="#">Terms of service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
