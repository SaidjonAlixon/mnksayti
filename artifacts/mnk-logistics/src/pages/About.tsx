import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Shield, TrendingUp, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const CORP_CARDS = [
  { code: "REG-01", glyph: "F", val: "2018", title: "Founded", desc: "Asset-based carrier built in Chicago with one truck and a dispatch-first mindset." },
  { code: "REG-02", glyph: "A", val: "48", title: "Authority", desc: "FMCSA interstate operating authority across all contiguous United States." },
  { code: "REG-03", glyph: "I", val: "$1M+", title: "Insured", desc: "Cargo and liability coverage on every load — no exceptions, no gaps." },
  { code: "REG-04", glyph: "S", val: "SAT", title: "Safety rating", desc: "FMCSA satisfactory safety rating with vetted CDL-A operators." },
];

const CORP_FOLIO = [
  { tab: "OPS", color: "blue", title: "Operations-first culture", desc: "Every decision runs through dispatch reality — not a slide deck. Loads move because ops says so." },
  { tab: "TEC", color: "red", title: "Tech-integrated fleet", desc: "GPS on every truck, API tracking for shippers, automated status updates from wheels rolling to delivery." },
  { tab: "PRT", color: "dark", title: "Long-term partnerships", desc: "Brokers and shippers stay because we answer the phone, hit appointments, and document every mile." },
  { tab: "SAF", color: "green", title: "Safety above speed", desc: "Vetted CDL-A drivers, maintained equipment, and a culture that never cuts corners on compliance." },
];

const CORP_SEALS = [
  { glyph: "DOT", name: "DOT Registered", desc: "Active USDOT operating authority" },
  { glyph: "MC", name: "MC Authority", desc: "Interstate motor carrier certified" },
  { glyph: "CARGO", name: "Cargo Bond", desc: "$1M cargo insurance per load" },
  { glyph: "ATA", name: "Industry Member", desc: "American Trucking Associations" },
];

export function About() {
  useEffect(() => {
    // Timeline drawing animation
    gsap.fromTo(".timeline-line", 
      { height: 0 }, 
      { 
        height: "100%", 
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      }
    );
  }, []);

  return (
    <div className="w-full bg-[var(--paper)]">
      
      {/* Hero */}
      <section className="bg-[var(--blue-dark)] pt-32 pb-24 text-center border-b border-white/10">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-sm font-bold tracking-widest text-[var(--blue-light)] mb-8">
            HOME / ABOUT
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            About MNK Logistics
          </motion.h1>
        </div>
      </section>

      {/* CORP registry cards */}
      <section className="corp-strip">
        <div className="corp-head">
          <span className="corp-head-label">CORP · Company registry</span>
          <h2 className="corp-head-title">MNK at a glance</h2>
        </div>
        <div className="corp-grid">
          {CORP_CARDS.map((c, i) => (
            <motion.article
              key={c.code}
              className="corp-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className="corp-card-icon">
                <span className="corp-diamond">
                  <span className="corp-diamond-inner">{c.glyph}</span>
                </span>
              </div>
              <span className="corp-card-code">{c.code}</span>
              <div className="corp-card-val">{c.val}</div>
              <div className="corp-card-title">{c.title}</div>
              <p className="corp-card-desc">{c.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CORP folio index */}
      <section className="corp-folio">
        <div className="corp-folio-head">
          <span className="corp-folio-label">CORP · Company folio</span>
          <h2 className="corp-folio-title">How we operate</h2>
        </div>
        <div className="corp-folio-list">
          {CORP_FOLIO.map((row, i) => (
            <motion.article
              key={row.tab}
              className="corp-folio-row"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className={`corp-folio-tab corp-folio-tab--${row.color}`}>{row.tab}</span>
              <div className="corp-folio-body">
                <h3 className="corp-folio-row-title">{row.title}</h3>
                <p className="corp-folio-row-desc">{row.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CORP seal stamps */}
      <section className="corp-seal">
        <span className="corp-seal-head-label">CORP · Certifications</span>
        <h2 className="corp-seal-head-title">Verified & compliant</h2>
        <div className="corp-seal-grid">
          {CORP_SEALS.map((s, i) => (
            <motion.div
              key={s.glyph}
              className="corp-seal-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="corp-seal-ring">
                <span className="corp-seal-glyph">{s.glyph}</span>
              </div>
              <span className="corp-seal-name">{s.name}</span>
              <p className="corp-seal-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Split */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="w-full lg:w-[60%] prose prose-lg prose-p:font-sans prose-p:text-[var(--muted)] prose-headings:font-display prose-headings:text-[var(--ink)]"
          >
            <h2>Built on reliability. Driven by data.</h2>
            <p>
              Founded in 2018, MNK Logistics started with a simple observation: the freight industry was full of promises, but lacked execution. We set out to build an asset-based carrier that operates with the speed and transparency of a modern tech company.
            </p>
            <p>
              Today, our fleet moves essential freight across all 48 contiguous states. From temperature-sensitive pharmaceuticals to just-in-time manufacturing components, we treat every load as critical. Our 24/7 dispatch desk ensures that when you hand us a load, you can stop worrying about it.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} variants={fadeIn}
            className="w-full lg:w-[40%]"
          >
            <div className="glass p-10 border border-[var(--blue)] shadow-[0_20px_40px_rgba(11,36,71,0.08)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--blue-light)] rounded-full blur-[50px] opacity-20" />
              <h3 className="font-mono text-sm font-bold tracking-widest text-[var(--blue)] mb-8">AT A GLANCE</h3>
              <div className="space-y-6">
                <div>
                  <div className="font-display text-4xl font-bold text-[var(--ink)]">2018</div>
                  <div className="font-sans text-[var(--muted)]">Year Founded</div>
                </div>
                <div className="h-[1px] w-full bg-[var(--hairline)]" />
                <div>
                  <div className="font-display text-4xl font-bold text-[var(--ink)]">48</div>
                  <div className="font-sans text-[var(--muted)]">States Covered</div>
                </div>
                <div className="h-[1px] w-full bg-[var(--hairline)]" />
                <div>
                  <div className="font-display text-4xl font-bold text-[var(--ink)]">24/7</div>
                  <div className="font-sans text-[var(--muted)]">Live Operations</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white border-y border-[var(--hairline)]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="font-display text-4xl md:text-5xl font-bold text-[var(--ink)] mb-16 text-center"
          >
            Our Core Values
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Uncompromising Safety", desc: "We never prioritize speed over safety. Vetted drivers, maintained equipment." },
              { icon: TrendingUp, title: "Data-Driven Execution", desc: "Real-time tracking and metrics drive our operational decisions." },
              { icon: Users, title: "Partnership Approach", desc: "We view brokers, shippers, and our drivers as long-term partners." }
            ].map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[var(--paper)] p-10 rounded-[20px] border border-[var(--hairline)] text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-6 border border-[var(--hairline)]">
                  <v.icon className="w-8 h-8 text-[var(--blue)]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">{v.title}</h3>
                <p className="font-sans text-[var(--muted)]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline & Credentials Split */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Timeline */}
          <div>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="font-display text-4xl font-bold text-[var(--ink)] mb-12">
              The Journey
            </motion.h2>
            <div className="relative timeline-container pl-8">
              <div className="absolute top-0 bottom-0 left-[11px] w-[2px] bg-[var(--hairline)]" />
              <div className="timeline-line absolute top-0 left-[11px] w-[2px] bg-[var(--blue)]" />
              
              {[
                { year: "2018", title: "The Beginning", desc: "Started operations with a single truck." },
                { year: "2020", title: "Regional Expansion", desc: "Secured direct contracts and expanded to 15 states." },
                { temp: true },
                { year: "2022", title: "National Authority", desc: "Granted operating authority for all 48 contiguous states." },
                { year: "2024", title: "Tech Integration", desc: "Launched full API-integrated tracking and automated dispatch." }
              ].map((node, i) => (
                <div key={i} className={`relative mb-12 last:mb-0 ${node.temp ? 'opacity-0 h-4' : ''}`}>
                  {!node.temp && (
                    <>
                      <div className="absolute left-[-32px] top-1 w-6 h-6 rounded-full bg-white border-4 border-[var(--blue)] z-10 shadow-[0_0_10px_rgba(10,77,156,0.3)]" />
                      <div className="font-mono text-sm font-bold text-[var(--blue)] mb-2">{node.year}</div>
                      <h3 className="font-display text-2xl font-bold text-[var(--ink)] mb-2">{node.title}</h3>
                      <p className="font-sans text-[var(--muted)]">{node.desc}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Credentials */}
          <div>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="font-display text-4xl font-bold text-[var(--ink)] mb-12">
              Credentials
            </motion.h2>
            <div className="bg-white border border-[var(--hairline)] rounded-[20px] shadow-sm overflow-hidden">
              <div className="bg-[var(--blue-dark)] px-8 py-6">
                <h3 className="font-mono text-white text-sm tracking-widest font-bold">MNK LOGISTICS LLC</h3>
              </div>
              <ul className="divide-y divide-[var(--hairline)] font-mono text-sm">
                {[
                  { label: "DOT NUMBER", val: "XXXXXXX" },
                  { label: "MC NUMBER", val: "XXXXXXX" },
                  { label: "CARGO INSURANCE", val: "$1,000,000" },
                  { label: "LIABILITY", val: "$1,000,000" },
                  { label: "SAFETY RATING", val: "SATISFACTORY", color: "text-[var(--success)]" },
                  { label: "SCAC CODE", val: "MNKL" },
                ].map((row, i) => (
                  <li key={i} className="flex justify-between items-center px-8 py-6">
                    <span className="text-[var(--muted)]">{row.label}</span>
                    <span className={`font-bold ${row.color || 'text-[var(--ink)]'}`}>
                      {row.label === 'SAFETY RATING' && <Check className="inline w-4 h-4 mr-1" />}
                      {row.val}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
