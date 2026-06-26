import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Check, Briefcase, Clock, Truck, Heart } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export function Drivers() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  return (
    <div className="w-full bg-[var(--paper)]">
      
      {/* Hero */}
      <section className="bg-[var(--blue-dark)] pt-32 pb-24 text-center">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-sm font-bold tracking-widest text-[var(--red)] mb-6 bg-white/10 inline-block px-4 py-2 rounded-full">
            COMPANY DRIVER · CDL-A
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-[80px] md:text-[120px] font-bold text-[var(--red)] tracking-tighter leading-none mb-6"
          >
            $0.70 <span className="text-4xl md:text-6xl text-white">/ MILE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="font-sans text-xl text-white/70 max-w-2xl mx-auto"
          >
            Drive late-model equipment, get home when promised, and get paid weekly. No games, just freight.
          </motion.p>
        </div>
      </section>

      {/* Split Layout: Benefits & Application */}
      <section className="py-24 max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Benefits & Requirements */}
        <div>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="font-display text-4xl font-bold text-[var(--ink)] mb-10">
            Why Drive For MNK?
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {[
              { icon: Briefcase, title: "Weekly Pay", desc: "Direct deposit every Friday." },
              { icon: Clock, title: "Home Time", desc: "Guaranteed home time based on your lane." },
              { icon: Truck, title: "Newer Trucks", desc: "Late-model Freightliner & Volvo sleepers." },
              { icon: Heart, title: "Full Benefits", desc: "Health, dental, and vision available." }
            ].map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass p-6">
                <div className="w-10 h-10 rounded-full bg-[var(--blue)]/10 flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-[var(--blue)]" />
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--ink)] mb-2">{b.title}</h3>
                <p className="font-sans text-sm text-[var(--muted)]">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="font-display text-3xl font-bold text-[var(--ink)] mb-8">
            Minimum Requirements
          </motion.h2>
          <ul className="space-y-4">
            {[
              "Valid CDL-A License",
              "Minimum 1 year OTR experience",
              "23+ years of age",
              "Clean MVR (Motor Vehicle Record)",
              "No DUI / DWI in last 5 years"
            ].map((req, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 bg-white p-4 rounded-lg border border-[var(--hairline)]">
                <div className="w-6 h-6 rounded-full bg-[var(--success)]/20 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[var(--success)]" />
                </div>
                <span className="font-mono text-sm font-bold text-[var(--ink)]">{req}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: Application Form */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white border border-[var(--hairline)] rounded-[24px] shadow-sm p-8 md:p-12 sticky top-32">
          <h2 className="font-display text-3xl font-bold text-[var(--ink)] mb-8">Quick Application</h2>
          
          <AnimatePresence mode="wait">
            {formStatus === "success" ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-[#ecfdf5] border border-[var(--success)] rounded-xl p-10 text-center h-[400px] flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 bg-[var(--success)] rounded-full flex items-center justify-center text-white mb-6">
                  <Check size={40} />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">Application Sent</h3>
                <p className="font-sans text-[var(--muted)] mb-8">Our recruiting team will contact you within 24 hours to discuss opportunities.</p>
                <button onClick={() => setFormStatus("idle")} className="font-mono text-sm font-bold text-[var(--blue)] hover:underline">
                  SUBMIT ANOTHER
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-6">
                
                {/* Premium Floating Label Inputs */}
                <div className="relative group">
                  <input required type="text" id="name" className="peer w-full px-4 pt-6 pb-2 rounded-lg border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans text-[var(--ink)] transition-all placeholder-transparent" placeholder="Full Name" />
                  <label htmlFor="name" className="absolute left-4 top-2 text-[10px] font-mono font-bold text-[var(--muted)] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--blue)] pointer-events-none">FULL NAME</label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input required type="tel" id="phone" className="peer w-full px-4 pt-6 pb-2 rounded-lg border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans text-[var(--ink)] transition-all placeholder-transparent" placeholder="Phone" />
                    <label htmlFor="phone" className="absolute left-4 top-2 text-[10px] font-mono font-bold text-[var(--muted)] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--blue)] pointer-events-none">PHONE</label>
                  </div>
                  <div className="relative group">
                    <input required type="email" id="email" className="peer w-full px-4 pt-6 pb-2 rounded-lg border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans text-[var(--ink)] transition-all placeholder-transparent" placeholder="Email" />
                    <label htmlFor="email" className="absolute left-4 top-2 text-[10px] font-mono font-bold text-[var(--muted)] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--blue)] pointer-events-none">EMAIL</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <select required id="cdl" className="peer w-full px-4 pt-6 pb-2 rounded-lg border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans text-[var(--ink)] transition-all appearance-none">
                      <option value="" disabled selected></option>
                      <option value="A">Class A</option>
                      <option value="B">Class B</option>
                    </select>
                    <label htmlFor="cdl" className="absolute left-4 top-2 text-[10px] font-mono font-bold text-[var(--muted)] transition-all peer-focus:text-[var(--blue)] pointer-events-none">CDL CLASS</label>
                  </div>
                  <div className="relative group">
                    <input required type="number" id="exp" min="0" className="peer w-full px-4 pt-6 pb-2 rounded-lg border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans text-[var(--ink)] transition-all placeholder-transparent" placeholder="Exp" />
                    <label htmlFor="exp" className="absolute left-4 top-2 text-[10px] font-mono font-bold text-[var(--muted)] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--blue)] pointer-events-none">YEARS EXP.</label>
                  </div>
                </div>

                <button 
                  disabled={formStatus === "submitting"}
                  className="w-full bg-[var(--blue)] text-white font-display text-xl font-bold tracking-wide py-5 rounded-lg hover:bg-[var(--blue-light)] transition-colors disabled:opacity-70 mt-4 shadow-[0_10px_20px_rgba(10,77,156,0.2)]"
                >
                  {formStatus === "submitting" ? (
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }}>
                      PROCESSING...
                    </motion.div>
                  ) : "APPLY NOW"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white border-y border-[var(--hairline)]">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-display text-4xl font-bold text-[var(--ink)] mb-12 text-center">Driver FAQ</h2>
          <Accordion.Root type="single" collapsible className="space-y-4">
            {[
              { q: "How often do you pay?", a: "We pay weekly via direct deposit every Friday for all loads completed by Tuesday." },
              { q: "What is your home time policy?", a: "We guarantee home time based on your route preferences. Typical OTR drivers are out 2 weeks, home 3 days." },
              { q: "Are trucks governed?", a: "Yes, our late-model Freightliner and Volvo sleepers are governed at 68 mph for safety and fuel efficiency." },
              { q: "Do you offer lease purchase?", a: "Yes, we have a walk-away lease purchase program available after 90 days of company driving." },
              { q: "Can I take my truck home?", a: "Yes, as long as you have a secure, legal place to park it during your home time." }
            ].map((faq, i) => (
              <Accordion.Item key={i} value={`driver-faq-${i}`} className="border-b border-[var(--hairline)]">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between py-6 text-left font-display text-2xl font-bold text-[var(--ink)] hover:text-[var(--blue)] transition-colors [&[data-state=open]>svg]:rotate-180">
                    {faq.q}
                    <ChevronDown className="text-[var(--muted)] transition-transform duration-300" size={24} />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-lg data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                  <div className="pb-6 text-[var(--muted)] font-sans">
                    {faq.a}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

    </div>
  );
}
