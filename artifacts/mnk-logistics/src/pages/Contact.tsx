import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Check, Send } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const COM_CHANNELS = [
  { freq: "146.520", type: "Voice", variant: "live", val: "(555) 000-0000", desc: "24/7 live dispatch — speak to ops, not a voicemail.", href: "tel:5550000000" },
  { freq: "DATA-02", type: "Email", variant: "data", val: "dispatch@mnklogistics.com", desc: "Quote requests, lane inquiries, and load updates.", href: "mailto:dispatch@mnklogistics.com", sm: true },
  { freq: "RT-03", type: "Response", variant: "wait", val: "< 30 min", desc: "Average quote turnaround during business hours.", href: undefined },
  { freq: "HQ-04", type: "Location", variant: "loc", val: "Chicago, IL", desc: "1234 Freight Parkway, Suite 500 · DOT & MC on file.", href: undefined },
];

const COM_HOURS = [
  { time: "24/7", zone: "Dispatch desk", desc: "Live ops for load tracking, breakdowns, and urgent lane changes." },
  { time: "6am–8pm", zone: "Quote desk", desc: "Rate requests answered same-day — fastest before 4pm CST." },
  { time: "Mon–Fri", zone: "Billing", desc: "Invoice questions, POD requests, and payment status." },
  { time: "Mon–Sat", zone: "Recruiting", desc: "Driver applications and fleet inquiries." },
];

const COM_STAMPS = [
  { rate: "Dry Van", type: "Standard freight", desc: "53 ft trailers, 45,000 lbs max. General commodity.", tag: "Most requested" },
  { rate: "Reefer", type: "Temperature controlled", desc: "Food-grade certified units, continuous temp monitoring.", tag: "Food & pharma" },
  { rate: "Flatbed", type: "Open deck", desc: "Step-deck and standard flatbed for oversized loads.", tag: "Construction" },
  { rate: "Power Only", type: "Drop & hook", desc: "You provide the trailer — we provide the tractor and driver.", tag: "Flexible" },
];

export function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  return (
    <div className="w-full bg-[var(--paper)] min-h-screen">
      
      <section className="bg-[var(--blue-dark)] pt-32 pb-24 text-center">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight mb-6"
          >
            Contact & Quotes
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="font-sans text-xl text-white/70 max-w-2xl mx-auto"
          >
            Get a rate in minutes. Speak to a live dispatcher 24/7.
          </motion.p>
        </div>
      </section>

      {/* COM dispatch channels */}
      <section className="com-strip">
        <div className="com-head">
          <span className="com-head-label">COM · Dispatch channels</span>
          <h2 className="com-head-title">Reach ops directly</h2>
        </div>
        <div className="com-grid">
          {COM_CHANNELS.map((ch, i) => {
            const inner = (
              <>
                <div className="com-panel-top">
                  <div className="com-signal" aria-hidden="true">
                    <span className="com-signal-bar" />
                    <span className="com-signal-bar" />
                    <span className="com-signal-bar" />
                    <span className="com-signal-bar" />
                  </div>
                  <span className="com-freq">{ch.freq}</span>
                </div>
                <span className="com-panel-type">{ch.type}</span>
                <div className={`com-panel-val ${ch.sm ? "com-panel-val--sm" : ""} ${ch.variant === "live" ? "com-live-dot" : ""}`}>
                  {ch.val}
                </div>
                <p className="com-panel-desc">{ch.desc}</p>
              </>
            );
            return (
              <motion.article
                key={ch.freq}
                className={`com-panel com-panel--${ch.variant}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                {ch.href ? (
                  <a href={ch.href} className="com-panel-link">{inner}</a>
                ) : inner}
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* COM hours timetable */}
      <section className="com-hours">
        <span className="com-hours-label">COM · Operations window</span>
        <h2 className="com-hours-title">When we're available</h2>
        <div className="com-hours-grid">
          {COM_HOURS.map((h, i) => (
            <motion.article
              key={h.zone}
              className="com-hours-slot"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="com-hours-time">{h.time}</div>
              <span className="com-hours-zone">{h.zone}</span>
              <p className="com-hours-desc">{h.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* COM stamp cards */}
      <section className="com-stamps">
        <span className="com-stamps-label">COM · Equipment quotes</span>
        <h2 className="com-stamps-title">What we haul</h2>
        <div className="com-stamps-grid">
          {COM_STAMPS.map((s, i) => (
            <motion.article
              key={s.rate}
              className="com-stamp"
              initial={{ opacity: 0, rotate: -2 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="com-stamp-rate">{s.rate}</div>
              <div className="com-stamp-type">{s.type}</div>
              <p className="com-stamp-desc">{s.desc}</p>
              <span className="com-stamp-tag">{s.tag}</span>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="py-24 max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
        
        {/* Left: Premium Quote Form */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="lg:col-span-3 bg-white border border-[var(--hairline)] rounded-[24px] shadow-[0_20px_40px_rgba(11,36,71,0.06)] p-8 md:p-12 relative z-10">
          <h2 className="font-display text-3xl font-bold text-[var(--ink)] mb-8">Request a Rate</h2>
          
          <AnimatePresence mode="wait">
            {formStatus === "success" ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-[#eff6ff] border border-[var(--blue-light)] rounded-[20px] p-12 text-center h-[500px] flex flex-col items-center justify-center"
              >
                <div className="w-24 h-24 bg-[var(--blue)] rounded-full flex items-center justify-center text-white mb-8 shadow-[0_10px_20px_rgba(10,77,156,0.3)]">
                  <Send size={40} className="ml-2" />
                </div>
                <h3 className="font-display text-3xl font-bold text-[var(--ink)] mb-4">Request Sent to Dispatch</h3>
                <p className="font-sans text-lg text-[var(--muted)] mb-8 max-w-md">Our operations desk is calculating your rate and will reply to your email shortly.</p>
                <button onClick={() => setFormStatus("idle")} className="font-mono text-sm font-bold tracking-widest text-[var(--blue)] border-b border-[var(--blue)] pb-1 hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors">
                  SUBMIT ANOTHER LANE
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-6">
                
                {/* Floating Labels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input required type="text" id="company" className="peer w-full px-4 pt-6 pb-2 rounded-lg border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans text-[var(--ink)] transition-all placeholder-transparent" placeholder="Company" />
                    <label htmlFor="company" className="absolute left-4 top-2 text-[10px] font-mono font-bold text-[var(--muted)] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--blue)] pointer-events-none">COMPANY NAME</label>
                  </div>
                  <div className="relative group">
                    <input required type="email" id="email" className="peer w-full px-4 pt-6 pb-2 rounded-lg border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans text-[var(--ink)] transition-all placeholder-transparent" placeholder="Email" />
                    <label htmlFor="email" className="absolute left-4 top-2 text-[10px] font-mono font-bold text-[var(--muted)] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--blue)] pointer-events-none">EMAIL ADDRESS</label>
                  </div>
                </div>

                <div className="relative group">
                  <select required id="type" className="peer w-full px-4 pt-6 pb-2 rounded-lg border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans text-[var(--ink)] transition-all appearance-none">
                    <option value="" disabled selected></option>
                    <option value="van">Dry Van</option>
                    <option value="reefer">Reefer</option>
                    <option value="flatbed">Flatbed</option>
                  </select>
                  <label htmlFor="type" className="absolute left-4 top-2 text-[10px] font-mono font-bold text-[var(--muted)] transition-all peer-focus:text-[var(--blue)] pointer-events-none">EQUIPMENT REQUIRED</label>
                </div>

                <div className="bg-[var(--paper)] p-6 rounded-lg border border-[var(--hairline)] grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input required type="text" id="origin" className="peer w-full px-4 pt-6 pb-2 rounded border border-[var(--hairline)] bg-white focus:outline-none focus:border-[var(--blue)] font-display text-lg font-bold text-[var(--ink)] transition-all placeholder-transparent" placeholder="Origin" />
                    <label htmlFor="origin" className="absolute left-4 top-2 text-[10px] font-mono font-bold text-[var(--blue)] transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:top-2 peer-focus:text-[10px] pointer-events-none">ORIGIN (CITY, ST)</label>
                  </div>
                  <div className="relative group">
                    <input required type="text" id="dest" className="peer w-full px-4 pt-6 pb-2 rounded border border-[var(--hairline)] bg-white focus:outline-none focus:border-[var(--blue)] font-display text-lg font-bold text-[var(--ink)] transition-all placeholder-transparent" placeholder="Dest" />
                    <label htmlFor="dest" className="absolute left-4 top-2 text-[10px] font-mono font-bold text-[var(--blue)] transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:top-2 peer-focus:text-[10px] pointer-events-none">DESTINATION (CITY, ST)</label>
                  </div>
                </div>

                <div className="relative group">
                  <textarea rows={4} id="notes" className="peer w-full px-4 pt-6 pb-2 rounded-lg border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans text-[var(--ink)] transition-all placeholder-transparent" placeholder="Notes"></textarea>
                  <label htmlFor="notes" className="absolute left-4 top-2 text-[10px] font-mono font-bold text-[var(--muted)] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--blue)] pointer-events-none">DETAILS (WEIGHT, DIMENSIONS, COMMODITY)</label>
                </div>

                <button 
                  disabled={formStatus === "submitting"}
                  className="w-full bg-[var(--red)] text-white font-mono tracking-widest font-bold py-5 rounded-lg hover:bg-[#c01015] transition-colors disabled:opacity-70 mt-4 shadow-[0_10px_20px_rgba(224,20,26,0.2)]"
                >
                  {formStatus === "submitting" ? "PROCESSING..." : "SUBMIT FOR QUOTE"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right: Contact Panel */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6 pt-12 lg:pt-0">
          
          <div className="glass-dark p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <Phone size={200} />
            </div>
            <h3 className="font-mono text-sm tracking-widest font-bold text-[var(--blue-light)] mb-8">24/7 DISPATCH DESK</h3>
            
            <a href="tel:5550000000" className="block group mb-8">
              <div className="font-sans text-sm text-white/60 mb-2">CALL DIRECT</div>
              <div className="font-display text-4xl md:text-5xl font-bold text-white group-hover:text-[var(--blue-light)] transition-colors">(555) 000-0000</div>
            </a>

            <a href="mailto:dispatch@mnklogistics.com" className="block group mb-12">
              <div className="font-sans text-sm text-white/60 mb-2">EMAIL</div>
              <div className="font-display text-2xl font-bold text-white break-all group-hover:text-[var(--blue-light)] transition-colors">dispatch@<br/>mnklogistics.com</div>
            </a>

            <div className="pt-8 border-t border-white/10 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-[var(--success)] animate-pulse shadow-[0_0_10px_rgba(31,164,99,0.8)]" />
              <span className="font-mono text-sm font-bold text-white tracking-widest">DISPATCH ONLINE</span>
            </div>
          </div>

          <div className="bg-white border border-[var(--hairline)] rounded-[20px] p-8 shadow-sm flex items-start gap-5">
            <div className="w-12 h-12 bg-[var(--paper)] rounded-full flex items-center justify-center shrink-0">
              <MapPin className="text-[var(--blue)]" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-[var(--ink)] mb-2">Headquarters</h3>
              <p className="font-sans text-[var(--muted)] mb-4 leading-relaxed">
                1234 Freight Parkway<br/>
                Suite 500<br/>
                Chicago, IL 60601
              </p>
              <div className="inline-flex flex-col gap-1">
                <span className="font-mono text-xs font-bold bg-[var(--paper)] px-2 py-1 rounded text-[var(--ink)] border border-[var(--hairline)]">DOT: XXXXXXX</span>
                <span className="font-mono text-xs font-bold bg-[var(--paper)] px-2 py-1 rounded text-[var(--ink)] border border-[var(--hairline)]">MC: XXXXXXX</span>
              </div>
            </div>
          </div>

        </motion.div>
      </section>
    </div>
  );
}
