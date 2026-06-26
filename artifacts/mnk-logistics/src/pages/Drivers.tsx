import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Check } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export function Drivers() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 1000);
  };

  return (
    <div className="w-full bg-[var(--paper)] min-h-screen">
      
      {/* Header Panel (Split) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="bg-white border border-[var(--hairline)] rounded-2xl shadow-sm overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left: Value Prop */}
          <div className="p-8 md:p-12 lg:w-1/2 flex flex-col justify-center bg-[var(--surface)] border-b lg:border-b-0 lg:border-r border-[var(--hairline)]">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <div className="font-mono text-sm text-[var(--muted)] font-bold tracking-wider mb-6">
                COMPANY DRIVER · CDL-A
              </div>
              <h1 className="font-display text-6xl md:text-8xl lg:text-[100px] text-[var(--blue)] leading-none font-bold mb-6 tracking-tighter">
                $0.70 <span className="text-3xl md:text-5xl text-[var(--ink)]">/ MILE</span>
              </h1>
              <p className="font-sans text-xl text-[var(--muted)] max-w-md leading-relaxed">
                Competitive pay, guaranteed home time, and newer equipment. Join a carrier that treats you like a professional.
              </p>
            </motion.div>
          </div>

          {/* Right: Application Form */}
          <div className="p-8 md:p-12 lg:w-1/2 bg-[var(--paper)]">
            <h2 className="font-display text-2xl text-[var(--ink)] font-bold mb-6">Quick Application</h2>
            
            <AnimatePresence mode="wait">
              {formStatus === "success" ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#Ecfdf5] border border-[var(--success)] p-8 rounded-xl flex flex-col items-center justify-center text-center h-full min-h-[300px]"
                >
                  <div className="w-16 h-16 bg-[var(--success)] rounded-full flex items-center justify-center text-white mb-6">
                    <Check size={32} />
                  </div>
                  <h3 className="font-display text-2xl text-[var(--ink)] font-bold mb-2">Application Received</h3>
                  <p className="font-sans text-[var(--muted)]">
                    Thanks for applying. Our recruiting team will contact you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setFormStatus("idle")}
                    className="mt-8 font-mono text-sm text-[var(--blue)] font-bold tracking-wider hover:underline"
                  >
                    SUBMIT ANOTHER
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                >
                  <div>
                    <label className="block font-mono text-xs font-bold text-[var(--ink)] mb-2">FULL NAME</label>
                    <input required type="text" className="w-full px-4 py-3 rounded border border-[var(--hairline)] bg-white focus:outline-none focus:border-[var(--blue)] font-sans transition-colors" placeholder="John Doe" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-xs font-bold text-[var(--ink)] mb-2">PHONE</label>
                      <input required type="tel" className="w-full px-4 py-3 rounded border border-[var(--hairline)] bg-white focus:outline-none focus:border-[var(--blue)] font-sans transition-colors" placeholder="(555) 000-0000" />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold text-[var(--ink)] mb-2">EMAIL</label>
                      <input required type="email" className="w-full px-4 py-3 rounded border border-[var(--hairline)] bg-white focus:outline-none focus:border-[var(--blue)] font-sans transition-colors" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-xs font-bold text-[var(--ink)] mb-2">CDL CLASS</label>
                      <select className="w-full px-4 py-3 rounded border border-[var(--hairline)] bg-white focus:outline-none focus:border-[var(--blue)] font-sans transition-colors">
                        <option>Class A</option>
                        <option>Class B</option>
                        <option>Class C</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold text-[var(--ink)] mb-2">YEARS EXP.</label>
                      <input required type="number" min="0" className="w-full px-4 py-3 rounded border border-[var(--hairline)] bg-white focus:outline-none focus:border-[var(--blue)] font-sans transition-colors" placeholder="2" />
                    </div>
                  </div>

                  <button 
                    disabled={formStatus === "submitting"}
                    className="w-full bg-[var(--red)] text-white font-display text-lg font-bold tracking-wide px-6 py-4 rounded hover:bg-[#c01015] transition-colors disabled:opacity-70 mt-4"
                  >
                    {formStatus === "submitting" ? "SUBMITTING..." : "APPLY NOW"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-y border-[var(--hairline)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Col: Benefits & Requirements */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl text-[var(--ink)] font-bold mb-8">Driver Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                {["WEEKLY PAY", "HOME TIME", "HEALTH BENEFITS", "NEWER TRUCKS", "SIGN-ON BONUS", "FUEL PROGRAM"].map((benefit, i) => (
                  <div key={i} className="bg-[var(--paper)] p-6 rounded-lg border border-[var(--hairline)] flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-[var(--blue)]" />
                    <span className="font-display text-lg font-bold text-[var(--ink)]">{benefit}</span>
                  </div>
                ))}
              </div>

              <h2 className="font-display text-3xl text-[var(--ink)] font-bold mb-8">Requirements</h2>
              <ul className="space-y-4 font-mono text-sm text-[var(--ink)] bg-[var(--paper)] p-8 rounded-lg border border-[var(--hairline)]">
                <li className="flex items-center gap-3"><Check className="text-[var(--success)]" size={18} /> Valid CDL-A License</li>
                <li className="flex items-center gap-3"><Check className="text-[var(--success)]" size={18} /> Minimum 1 year OTR experience</li>
                <li className="flex items-center gap-3"><Check className="text-[var(--success)]" size={18} /> 23+ years of age</li>
                <li className="flex items-center gap-3"><Check className="text-[var(--success)]" size={18} /> Clean MVR (Motor Vehicle Record)</li>
                <li className="flex items-center gap-3"><Check className="text-[var(--success)]" size={18} /> No DUI / DWI in last 5 years</li>
              </ul>
            </div>

            {/* Right Col: FAQs */}
            <div>
              <h2 className="font-display text-3xl text-[var(--ink)] font-bold mb-8">FAQs</h2>
              <Accordion.Root type="single" collapsible className="space-y-3">
                {[
                  { q: "How often do you pay?", a: "We pay weekly via direct deposit every Friday for all loads completed by Tuesday." },
                  { q: "What is your home time policy?", a: "We guarantee home time based on your route preferences. Typical OTR drivers are out 2 weeks, home 3 days." },
                  { q: "What kind of trucks do you run?", a: "We run late-model Freightliner and Volvo sleepers, all governed at 68 mph, equipped with APUs and inverters." },
                  { q: "Do you offer lease purchase?", a: "Yes, we have a walk-away lease purchase program available after 90 days of company driving." },
                  { q: "Are benefits offered?", a: "Yes, full medical, dental, and vision insurance is available after 60 days of employment." }
                ].map((faq, i) => (
                  <Accordion.Item key={i} value={`item-${i}`} className="bg-[var(--paper)] border border-[var(--hairline)] rounded-lg overflow-hidden">
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-[var(--ink)] hover:text-[var(--blue)] transition-colors [&[data-state=open]>svg]:rotate-180">
                        {faq.q}
                        <ChevronDown className="text-[var(--muted)] transition-transform duration-200" size={20} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden text-sm data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                      <div className="px-5 pb-5 pt-0 text-[var(--muted)] font-sans">
                        {faq.a}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
