import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Check } from "lucide-react";
import { ContactPageShell } from "../components/PageMedia";
import { COMPANY } from "../constants/company";

const CONTACT_CARDS = [
  {
    icon: Phone,
    label: "Call dispatch",
    value: COMPANY.phoneDisplay,
    note: "24/7 live ops",
    href: `tel:${COMPANY.phoneTel}`,
    accent: "red",
  },
  {
    icon: Mail,
    label: "Email quotes",
    value: COMPANY.email,
    note: "Reply under 30 min",
    href: `mailto:${COMPANY.email}`,
    accent: "blue",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: COMPANY.cityState,
    note: COMPANY.street,
    href: COMPANY.mapLink,
    accent: "green",
  },
];

export function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1200);
  };

  return (
    <ContactPageShell>
      <header className="com-v2-hero">
        <motion.div
          className="com-v2-hero__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="com-v2-hero__eyebrow">Get in touch</span>
          <h1 className="com-v2-hero__title">Contact & Quotes</h1>
          <p className="com-v2-hero__sub">One form. One dispatcher. Coast-to-coast freight.</p>
        </motion.div>
      </header>

      <main className="com-v2-main">
        <div className="com-v2-cards">
          {CONTACT_CARDS.map((card, i) => (
            <motion.a
              key={card.label}
              href={card.href}
              className={`com-v2-card com-v2-card--${card.accent}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.08, duration: 0.45 }}
            >
              <span className="com-v2-card__icon" aria-hidden="true">
                <card.icon size={22} strokeWidth={2} />
              </span>
              <span className="com-v2-card__label">{card.label}</span>
              <span className="com-v2-card__value">{card.value}</span>
              <span className="com-v2-card__note">{card.note}</span>
            </motion.a>
          ))}
        </div>

        <div className="com-v2-layout">
          <motion.section
            id="quote"
            className="com-v2-panel com-v2-panel--form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="com-v2-panel__head">
              <h2>Request a rate</h2>
              <p>Tell us the lane — we will email your quote.</p>
            </div>

            <AnimatePresence mode="wait">
              {formStatus === "success" ? (
                <motion.div
                  key="done"
                  className="com-v2-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span className="com-v2-success__icon" aria-hidden="true">
                    <Check size={28} />
                  </span>
                  <h3>Request sent</h3>
                  <p>Dispatch will reply to your email shortly.</p>
                  <button type="button" onClick={() => setFormStatus("idle")} className="com-v2-link-btn">
                    Send another lane
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="com-v2-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="com-v2-form__row">
                    <label className="com-v2-field">
                      <span>Name</span>
                      <input required type="text" name="name" placeholder="Your name" />
                    </label>
                    <label className="com-v2-field">
                      <span>Email</span>
                      <input required type="email" name="email" placeholder="you@company.com" />
                    </label>
                  </div>

                  <div className="com-v2-form__row">
                    <label className="com-v2-field">
                      <span>Origin</span>
                      <input required type="text" name="origin" placeholder="City, ST" />
                    </label>
                    <label className="com-v2-field">
                      <span>Destination</span>
                      <input required type="text" name="destination" placeholder="City, ST" />
                    </label>
                  </div>

                  <label className="com-v2-field">
                    <span>Equipment</span>
                    <select required name="equipment" defaultValue="">
                      <option value="" disabled>Select type</option>
                      <option value="van">Dry Van</option>
                      <option value="reefer">Reefer</option>
                      <option value="flatbed">Flatbed</option>
                      <option value="power">Power Only</option>
                    </select>
                  </label>

                  <label className="com-v2-field">
                    <span>Notes <em>(optional)</em></span>
                    <textarea name="notes" rows={3} placeholder="Weight, pickup date, commodity…" />
                  </label>

                  <button type="submit" className="com-v2-submit" disabled={formStatus === "submitting"}>
                    {formStatus === "submitting" ? "Sending…" : "Submit for quote"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.section>

          <motion.aside
            className="com-v2-side"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
          >
            <div className="com-v2-panel com-v2-panel--map">
              <div className="com-v2-panel__head">
                <h2>Find us</h2>
                <p className="com-v2-panel__address">{COMPANY.addressLine}</p>
              </div>
              <div className="com-v2-map">
                <iframe
                  title="MNK Logistics headquarters map"
                  src={COMPANY.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a className="com-v2-map-link" href={COMPANY.mapLink} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </div>

            <div className="com-v2-panel com-v2-panel--hours">
              <div className="com-v2-hours">
                <Clock size={18} aria-hidden="true" />
                <div>
                  <strong>Dispatch · 24/7</strong>
                  <span>Quotes answered fastest before 4pm CST</span>
                </div>
              </div>
              <div className="com-v2-status">
                <span className="com-v2-status__dot" aria-hidden="true" />
                Dispatch online now
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
    </ContactPageShell>
  );
}
