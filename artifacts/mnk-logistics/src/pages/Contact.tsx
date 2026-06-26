import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Check } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 1000);
  };

  return (
    <div className="w-full bg-[var(--paper)] min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-12 text-center md:text-left">
          <h1 className="font-display text-4xl md:text-5xl text-[var(--ink)] font-bold mb-4">Request a Quote</h1>
          <p className="font-sans text-[var(--muted)] text-lg">Fast rates. Reliable capacity. 24/7 dispatch.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Quote Form Console */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="w-full lg:w-2/3 bg-white border border-[var(--hairline)] rounded-xl shadow-sm p-6 md:p-10">
            <AnimatePresence mode="wait">
              {formStatus === "success" ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#eff6ff] border border-[var(--blue-bright)] p-12 rounded-xl flex flex-col items-center justify-center text-center h-full min-h-[400px]"
                >
                  <div className="w-20 h-20 bg-[var(--blue)] rounded-full flex items-center justify-center text-white mb-6">
                    <Check size={40} />
                  </div>
                  <h3 className="font-display text-3xl text-[var(--ink)] font-bold mb-4">Quote Requested</h3>
                  <p className="font-sans text-[var(--muted)] text-lg mb-8 max-w-md">
                    Our dispatch team is reviewing your lane requirements. We will contact you with a rate shortly.
                  </p>
                  <button 
                    onClick={() => setFormStatus("idle")}
                    className="font-mono text-sm text-[var(--blue)] font-bold tracking-wider hover:underline"
                  >
                    REQUEST ANOTHER QUOTE
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs font-bold text-[var(--ink)] mb-2">COMPANY NAME</label>
                      <input required type="text" className="w-full px-4 py-3 rounded border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans transition-colors" placeholder="Acme Logistics" />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold text-[var(--ink)] mb-2">FREIGHT TYPE</label>
                      <select className="w-full px-4 py-3 rounded border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans transition-colors">
                        <option>Dry Van</option>
                        <option>Reefer / Temp-Controlled</option>
                        <option>Flatbed</option>
                        <option>Power Only</option>
                        <option>Other / Expedited</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[var(--paper)] rounded border border-[var(--hairline)]">
                    <div>
                      <label className="block font-mono text-xs font-bold text-[var(--ink)] mb-2 text-[var(--blue)]">ORIGIN CITY, ST</label>
                      <input required type="text" className="w-full px-4 py-3 rounded border border-[var(--hairline)] bg-white focus:outline-none focus:border-[var(--blue)] font-sans" placeholder="Chicago, IL" />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold text-[var(--ink)] mb-2 text-[var(--blue)]">DESTINATION CITY, ST</label>
                      <input required type="text" className="w-full px-4 py-3 rounded border border-[var(--hairline)] bg-white focus:outline-none focus:border-[var(--blue)] font-sans" placeholder="Dallas, TX" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs font-bold text-[var(--ink)] mb-2">PICKUP DATE</label>
                      <input required type="date" className="w-full px-4 py-3 rounded border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans transition-colors" />
                    </div>
                    <div>
                      <label className="block font-mono text-xs font-bold text-[var(--ink)] mb-2">EMAIL OR PHONE</label>
                      <input required type="text" className="w-full px-4 py-3 rounded border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans transition-colors" placeholder="contact@acme.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold text-[var(--ink)] mb-2">ADDITIONAL NOTES (WEIGHT, DIMENSIONS, ETC.)</label>
                    <textarea rows={3} className="w-full px-4 py-3 rounded border border-[var(--hairline)] bg-[var(--paper)] focus:bg-white focus:outline-none focus:border-[var(--blue)] font-sans transition-colors" placeholder="42,000 lbs. Must deliver by Friday noon." />
                  </div>

                  <button 
                    disabled={formStatus === "submitting"}
                    className="w-full md:w-auto md:min-w-[240px] bg-[var(--red)] text-white font-display text-lg font-bold tracking-wide px-8 py-4 rounded hover:bg-[#c01015] transition-colors disabled:opacity-70 float-right"
                  >
                    {formStatus === "submitting" ? "PROCESSING..." : "REQUEST A QUOTE"}
                  </button>
                  <div className="clear-both"></div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }} className="w-full lg:w-1/3 space-y-6">
            
            <div className="bg-[var(--ink)] p-8 rounded-xl text-white shadow-md">
              <div className="font-mono text-xs tracking-widest text-[var(--muted)] mb-6">24/7 DISPATCH DESK</div>
              
              <a href="tel:5550000000" className="block group mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[var(--blue)] transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-sans text-sm text-white/60 mb-1">CALL US DIRECTLY</div>
                    <div className="font-mono text-xl md:text-2xl font-bold">(555) 000-0000</div>
                  </div>
                </div>
              </a>

              <a href="mailto:dispatch@mnklogistics.com" className="block group mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[var(--blue)] transition-colors">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-sans text-sm text-white/60 mb-1">EMAIL FOR QUOTES</div>
                    <div className="font-mono text-sm md:text-base font-bold break-all">dispatch@mnklogistics.com</div>
                  </div>
                </div>
              </a>
              
              <div className="border-t border-white/20 pt-8">
                <div className="font-mono text-xs tracking-widest text-[var(--muted)] mb-4">OPERATING HOURS</div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">OFFICE</span>
                    <span>MON-SAT 6AM-8PM CT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">DISPATCH</span>
                    <span className="text-[var(--success)] font-bold">24/7/365</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[var(--hairline)] p-8 rounded-xl shadow-sm">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[var(--blue)] shrink-0" />
                <div>
                  <div className="font-display font-bold text-lg text-[var(--ink)] mb-2">MNK Logistics HQ</div>
                  <address className="font-sans text-[var(--muted)] not-italic mb-4">
                    1234 Freight Parkway<br />
                    Suite 500<br />
                    Chicago, IL 60601
                  </address>
                  <div className="font-mono text-xs bg-[var(--paper)] inline-block px-3 py-1 rounded border border-[var(--hairline)] text-[var(--ink)] font-bold">
                    DOT: XXXXXXX | MC: XXXXXXX
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
