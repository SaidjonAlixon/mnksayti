import { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function Drivers() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-24 relative bg-[var(--mnk-navy)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl text-[var(--mnk-white)] mb-4">DRIVE WITH THE BEST.</h2>
          <div className="font-display text-6xl md:text-8xl text-[var(--mnk-red)] tracking-wider">
            $0.70 <span className="text-3xl md:text-4xl text-[var(--mnk-steel)]">/ MILE</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--mnk-hairline)] border border-[var(--mnk-hairline)] mb-20">
          {[
            { title: "TOP PAY", desc: "Industry-leading rates per mile" },
            { title: "HOME TIME", desc: "Flexible scheduling options" },
            { title: "HEALTH BENEFITS", desc: "Full medical/dental/vision" },
            { title: "NEWER EQUIPMENT", desc: "2022 or newer models" },
            { title: "SIGN-ON BONUS", desc: "$5,000 sign-on bonus" },
            { title: "FUEL PROGRAM", desc: "Comprehensive fuel program" }
          ].map((benefit, i) => (
            <div key={i} className="bg-[var(--mnk-surface)] p-6 md:p-8 text-center hover:bg-[var(--mnk-ink)] transition-colors">
              <h3 className="font-display text-2xl text-[var(--mnk-white)] mb-2">{benefit.title}</h3>
              <p className="font-sans text-sm text-[var(--mnk-steel)]">{benefit.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h3 className="font-display text-4xl text-[var(--mnk-white)] mb-8 text-center">REQUIREMENTS</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["CDL-A REQUIRED", "1YR OTR EXPERIENCE", "23+ YEARS OLD", "CLEAN MVR"].map((req, i) => (
              <div key={i} className="font-mono text-sm tracking-widest text-[var(--mnk-white)] bg-[var(--mnk-ink)] border border-[var(--mnk-hairline)] px-6 py-3">
                {req}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-[var(--mnk-surface)] border border-[var(--mnk-hairline)] p-6 md:p-10">
            <h3 className="font-display text-3xl text-[var(--mnk-white)] mb-6 border-b border-[var(--mnk-hairline)] pb-4">QUICK APPLY</h3>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-[var(--mnk-red)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h4 className="font-display text-2xl text-white mb-2">APPLICATION RECEIVED</h4>
                <p className="text-[var(--mnk-steel)]">Our recruiting team will contact you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-[var(--mnk-steel)] tracking-widest">FULL NAME</label>
                    <input required type="text" className="w-full bg-[var(--mnk-ink)] border border-[var(--mnk-hairline)] p-3 text-white focus:border-[var(--mnk-blue)] outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-[var(--mnk-steel)] tracking-widest">PHONE</label>
                    <input required type="tel" className="w-full bg-[var(--mnk-ink)] border border-[var(--mnk-hairline)] p-3 text-white focus:border-[var(--mnk-blue)] outline-none" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-xs text-[var(--mnk-steel)] tracking-widest">EMAIL</label>
                  <input required type="email" className="w-full bg-[var(--mnk-ink)] border border-[var(--mnk-hairline)] p-3 text-white focus:border-[var(--mnk-blue)] outline-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-[var(--mnk-steel)] tracking-widest">CDL CLASS</label>
                    <select required className="w-full bg-[var(--mnk-ink)] border border-[var(--mnk-hairline)] p-3 text-white focus:border-[var(--mnk-blue)] outline-none">
                      <option value="A">Class A</option>
                      <option value="B">Class B</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-[var(--mnk-steel)] tracking-widest">YEARS OTR</label>
                    <input required type="number" min="0" className="w-full bg-[var(--mnk-ink)] border border-[var(--mnk-hairline)] p-3 text-white focus:border-[var(--mnk-blue)] outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs text-[var(--mnk-steel)] tracking-widest">MESSAGE (OPTIONAL)</label>
                  <textarea rows={3} className="w-full bg-[var(--mnk-ink)] border border-[var(--mnk-hairline)] p-3 text-white focus:border-[var(--mnk-blue)] outline-none resize-none"></textarea>
                </div>
                
                <button type="submit" className="w-full bg-[var(--mnk-red)] text-white font-mono font-bold tracking-widest p-4 hover:bg-[#c01016] transition-colors">
                  APPLY NOW
                </button>
              </form>
            )}
          </div>

          <div>
            <h3 className="font-display text-4xl text-[var(--mnk-white)] mb-8">FREQUENTLY ASKED</h3>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "HOW OFTEN DO DRIVERS GET HOME?", a: "We offer flexible scheduling. Regional drivers are home weekly, while OTR drivers typically stay out 14-21 days with 3-4 days home." },
                { q: "WHAT KIND OF TRUCKS DO YOU OPERATE?", a: "Our fleet consists of 2022 or newer Freightliner Cascadias and Volvo VNLs, fully equipped with APUs, inverters, and refrigerators." },
                { q: "IS THERE A RIDER OR PET POLICY?", a: "Yes, we allow one adult rider (18+) and up to two pets (dogs or cats) from day one, with a minor pet deposit." },
                { q: "HOW DOES DISPATCH WORK?", a: "We have 24/7 dedicated dispatch. You'll be assigned a primary dispatcher who knows your preferences and running style." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-[var(--mnk-hairline)] bg-[var(--mnk-surface)] px-6">
                  <AccordionTrigger className="font-display text-xl text-[var(--mnk-white)] hover:text-[var(--mnk-red)] text-left py-6">{faq.q}</AccordionTrigger>
                  <AccordionContent className="font-sans text-[var(--mnk-steel)] pb-6 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
