import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useCounter } from "../hooks/useCounter";
import { useDriverApplication } from "../context/DriverApplicationContext";

const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const LIVE_LANES = [
  "CHI → DAL · IN TRANSIT",
  "ATL → MIA · LOADING",
  "LAX → PHX · DISPATCHED",
  "NYC → ATL · IN TRANSIT",
  "HOU → DEN · DELIVERED",
  "MEM → CHI · LOADING",
  "SEA → LAX · IN TRANSIT",
  "DEN → DAL · DISPATCHED",
];

const HUBS = [
  "HOUSTON", "DALLAS", "CHICAGO", "NYC", "ATLANTA", "PHOENIX",
  "DENVER", "SEATTLE", "MIAMI", "DETROIT", "MEMPHIS", "LA",
  "KANSAS CITY", "NASHVILLE", "CHARLOTTE", "COLUMBUS",
];

const CAPS = [
  { n: "01", t: "Fully insured", d: "$1M cargo & liability on every load." },
  { n: "02", t: "Live GPS tracking", d: "Know where your freight is — always." },
  { n: "03", t: "24/7 dispatch", d: "Ops desk never sleeps. Call anytime." },
  { n: "04", t: "Vetted CDL-A drivers", d: "Safety record you can trust." },
];

const FLEET = [
  { t: "Dry Van", s: "Available", d: "53ft · 45,000 lbs · Air-ride suspension" },
  { t: "Reefer", s: "Available", d: "Temperature controlled · Food-grade certified" },
  { t: "Flatbed", s: "Limited", d: "Step-deck · Over-dimensional capability" },
];

const STEPS = [
  { n: "01", t: "Request", d: "Submit freight details online or by phone." },
  { n: "02", t: "Match", d: "We assign the right driver and equipment." },
  { n: "03", t: "Dispatch", d: "GPS tracking begins when wheels roll." },
  { n: "04", t: "Deliver", d: "Confirmed delivery with documentation." },
];

const FAQS = [
  { q: "What freight types do you haul?", a: "Dry Van, Reefer, and Flatbed across all 48 contiguous states." },
  { q: "How do I request a quote?", a: "Use our online form, email dispatch@mnklogistics.com, or call 24/7." },
  { q: "Do you offer real-time tracking?", a: "Yes — every load is GPS tracked with automated updates." },
  { q: "What are your service areas?", a: "Coast-to-coast lower 48. Heavy Midwest, South, and East Coast density." },
  { q: "How is pricing determined?", a: "Market rates, lane, equipment, weight, and fuel surcharge." },
  { q: "Do you hire owner-operators?", a: "Yes — see our Drivers page for program details." },
];

const CERT_BADGES = [
  "DOT Certified", "Fully Insured", "FMCSA Compliant",
  "CDL-A Verified", "Real-Time GPS", "Safety Rated",
];

function CertTickerStrip({ id }: { id: string }) {
  const items = [...CERT_BADGES, ...CERT_BADGES];
  return (
    <div className="hw-ticker-strip">
      {items.map((b, i) => (
        <span key={`${id}-${i}-${b}`} className="hw-ticker-item">
          <span className="hw-ticker-text">{b}</span>
          <span className="hw-ticker-sep">•</span>
        </span>
      ))}
    </div>
  );
}

export function Home() {
  const statsRef = useRef(null);
  const inView = useInView(statsRef, { once: true });
  const miles = useCounter(10000000, 2500, inView);
  const states = useCounter(48, 2000, inView);
  const onTime = useCounter(99, 2000, inView);
  const loads = useCounter(500, 2000, inView);
  const { open: openApplication } = useDriverApplication();

  return (
    <div className="hw">
      {/* HERO — departure board, no map */}
      <section className="sig-hero">
        <div className="sig-hero-bg" aria-hidden="true">
          <span className="sig-watermark">48</span>
          <div className="sig-road">
            <div className="sig-road-dot" />
          </div>
        </div>

        <div className="sig-hero-layout">
          <div className="sig-board" aria-hidden="true">
            <div className="sig-board-label">ACTIVE LANES</div>
            <div className="sig-board-scroll">
              <div className="sig-board-track">
                {[...LIVE_LANES, ...LIVE_LANES].map((lane, i) => (
                  <span key={i} className="sig-board-row">{lane}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="sig-main">
            <motion.div className="sig-status" initial="hidden" animate="visible" variants={fade}>
              <span className="sig-status-dot" />
              DISPATCH OPEN · 24/7
            </motion.div>

            <motion.h1 className="sig-headline" initial="hidden" animate="visible" variants={fade} transition={{ delay: 0.06 }}>
              <span className="sig-word">Load</span>
              <span className="sig-word sig-word--accent">Roll</span>
              <span className="sig-word">Proof</span>
            </motion.h1>

            <motion.p className="sig-tagline" initial="hidden" animate="visible" variants={fade} transition={{ delay: 0.12 }}>
              Your freight doesn't wait in a queue. Neither do we — dry van, reefer, and flatbed across America.
            </motion.p>

            <motion.div className="sig-actions" initial="hidden" animate="visible" variants={fade} transition={{ delay: 0.18 }}>
              <button type="button" className="sig-btn sig-btn--primary" onClick={openApplication}>Apply Now →</button>
              <Link to="/drivers" className="sig-btn sig-btn--ghost">Join the fleet</Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="sig-metrics"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { v: "10M+", l: "Miles" },
            { v: "48", l: "States" },
            { v: "99.2%", l: "On-time" },
            { v: "24/7", l: "Desk" },
          ].map((s) => (
            <div key={s.l} className="sig-metric">
              <span className="sig-metric-val">{s.v}</span>
              <span className="sig-metric-lbl">{s.l}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* CAPABILITIES — divider grid, no cards */}
      <section className="hw-band">
        <h2 className="hw-band-title hw-band-title--solo">Why MNK runs different</h2>
        <div className="hw-split-4">
          {CAPS.map((c, i) => (
            <motion.div
              key={c.n}
              className="hw-split-cell"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <span className="hw-cell-num">{c.n}</span>
              <h3 className="hw-cell-title">{c.t}</h3>
              <p className="hw-cell-desc">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FLEET */}
      <section className="hw-band hw-band--alt">
        <h2 className="hw-band-title hw-band-title--solo">Equipment on the road</h2>
        <div className="hw-split-3">
          {FLEET.map((f, i) => (
            <motion.div
              key={f.t}
              className="hw-fleet-row"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className="hw-fleet-head">
                <h3 className="hw-fleet-name">{f.t}</h3>
                <span className={`hw-fleet-tag ${f.s === "Limited" ? "hw-fleet-tag--warn" : ""}`}>{f.s}</span>
              </div>
              <p className="hw-fleet-desc">{f.d}</p>
              <Link to="/contact" className="hw-link">Book this unit →</Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COVERAGE — hub grid, no map */}
      <section className="hw-band hw-band--hubs">
        <h2 className="hw-band-title hw-band-title--solo">48-state hub network</h2>
        <p className="hw-hubs-note">Pacific to Atlantic — major lanes, major markets, one carrier.</p>
        <div className="hw-hubs">
          {HUBS.map((hub) => (
            <span key={hub} className="hw-hub">{hub}</span>
          ))}
        </div>
      </section>

      {/* PIPELINE */}
      <section className="hw-band hw-band--red">
        <h2 className="hw-band-title hw-band-title--light hw-band-title--solo">How a load moves</h2>
        <div className="hw-pipeline">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              className="hw-pipe"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              <span className="hw-pipe-num">{s.n}</span>
              <h3 className="hw-pipe-title">{s.t}</h3>
              <p className="hw-pipe-desc">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NUMBERS */}
      <section ref={statsRef} className="hw-band hw-band--numbers">
        <div className="hw-numbers">
          {[
            { v: `${miles.toLocaleString()}+`, l: "Miles" },
            { v: states, l: "States" },
            { v: `${onTime.toFixed(1)}%`, l: "On-time" },
            { v: `${loads}+`, l: "Loads / mo" },
          ].map((s) => (
            <div key={s.l} className="hw-num-cell">
              <span className="hw-num-val">{s.v}</span>
              <span className="hw-num-lbl">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS — open quotes, no cards */}
      <section className="hw-band hw-band--dark">
        <h2 className="hw-band-title hw-band-title--light hw-band-title--solo">Partner voices</h2>
        <div className="hw-quotes">
          {[
            { q: "MNK has never missed a pickup in 2 years of working together.", a: "Sarah K. · Freight Broker" },
            { q: "Real-time tracking alone is worth the partnership.", a: "Marcus T. · Shipper" },
            { q: "Professional, responsive, top-tier drivers every time.", a: "Linda R. · Logistics Manager" },
          ].map((t, i) => (
            <motion.blockquote
              key={i}
              className="hw-quote"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p>"{t.q}"</p>
              <footer>{t.a}</footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* CERT TICKER */}
      <section className="hw-ticker" aria-hidden="true">
        <div className="hw-ticker-track">
          <CertTickerStrip id="a" />
          <CertTickerStrip id="b" />
        </div>
      </section>

      {/* FAQ */}
      <section className="hw-band">
        <h2 className="hw-band-title hw-band-title--solo">Questions</h2>
        <div className="hw-faq-layout">
          <Accordion.Root type="single" collapsible className="hw-faq">
            {FAQS.map((f, i) => (
              <Accordion.Item key={i} value={`f-${i}`} className="hw-faq-item">
                <Accordion.Header>
                  <Accordion.Trigger className="hw-faq-trigger">
                    {f.q}
                    <ChevronDown size={18} className="hw-faq-icon" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="hw-faq-body">
                  <p>{f.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          <motion.aside
            className="hw-faq-aside"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hw-faq-desk">
              <span className="hw-faq-desk-label">Need a direct answer?</span>
              <div className="hw-faq-desk-status">
                <span className="hw-faq-desk-dot" aria-hidden="true" />
                Dispatch online · 24/7
              </div>
              <p className="hw-faq-desk-lead">
                Skip the wait — call or email ops for lane rates, equipment, and availability.
              </p>
              <a href="tel:5550000000" className="hw-faq-desk-phone">(555) 000-0000</a>
              <a href="mailto:dispatch@mnklogistics.com" className="hw-faq-desk-email">
                dispatch@mnklogistics.com
              </a>
              <div className="hw-faq-desk-stats">
                <div className="hw-faq-desk-stat">
                  <strong>&lt; 30 min</strong>
                  <span>Quote response</span>
                </div>
                <div className="hw-faq-desk-stat">
                  <strong>48</strong>
                  <span>States covered</span>
                </div>
                <div className="hw-faq-desk-stat">
                  <strong>99.2%</strong>
                  <span>On-time delivery</span>
                </div>
              </div>
              <Link to="/contact" className="hw-faq-desk-btn">Request a quote →</Link>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* CTA — full bleed */}
      <section className="hw-cta">
        <h2 className="hw-cta-title">Ready to move?</h2>
        <p className="hw-cta-sub">Quote in under 2 minutes · 24/7 dispatch desk</p>
        <Link to="/contact" className="hw-btn hw-btn--fill hw-btn--lg">Get a quote →</Link>
      </section>
    </div>
  );
}
