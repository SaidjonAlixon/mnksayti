import { useState } from "react";
import { motion } from "framer-motion";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-24 bg-[var(--mnk-surface)] border-t border-[var(--mnk-hairline)] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="font-display text-5xl md:text-7xl text-[var(--mnk-white)] mb-8">REQUEST QUOTE</h2>
            
            <div className="space-y-6 font-mono text-sm tracking-wide text-[var(--mnk-steel)] mb-12 bg-[var(--mnk-ink)] p-6 border border-[var(--mnk-hairline)]">
              <div className="flex flex-col">
                <span className="text-[var(--mnk-red)] mb-1">PHONE</span>
                <span className="text-[var(--mnk-white)] text-lg">(555) 000-0000</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[var(--mnk-red)] mb-1">EMAIL</span>
                <span className="text-[var(--mnk-white)]">dispatch@mnklogistics.com</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[var(--mnk-red)] mb-1">HOURS</span>
                <span className="text-[var(--mnk-white)]">MON-FRI 6AM-8PM CT<br/>24/7 DISPATCH</span>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
               <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
               className="bg-[var(--mnk-ink)] border border-[var(--mnk-hairline)] p-12 text-center h-full flex flex-col items-center justify-center"
             >
               <div className="font-display text-3xl text-white mb-2">QUOTE REQUESTED</div>
               <p className="text-[var(--mnk-steel)] font-sans">Our dispatch team will return a quote within 30 minutes.</p>
             </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs text-[var(--mnk-steel)] tracking-widest">COMPANY NAME</label>
                  <input required type="text" className="w-full bg-[var(--mnk-ink)] border border-[var(--mnk-hairline)] p-3 text-white focus:border-[var(--mnk-blue)] outline-none" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-[var(--mnk-steel)] tracking-widest">ORIGIN</label>
                    <input required type="text" placeholder="City, State / ZIP" className="w-full bg-[var(--mnk-ink)] border border-[var(--mnk-hairline)] p-3 text-white focus:border-[var(--mnk-blue)] outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-[var(--mnk-steel)] tracking-widest">DESTINATION</label>
                    <input required type="text" placeholder="City, State / ZIP" className="w-full bg-[var(--mnk-ink)] border border-[var(--mnk-hairline)] p-3 text-white focus:border-[var(--mnk-blue)] outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs text-[var(--mnk-steel)] tracking-widest">FREIGHT DETAILS</label>
                  <textarea required rows={4} placeholder="Weight, dimensions, special requirements..." className="w-full bg-[var(--mnk-ink)] border border-[var(--mnk-hairline)] p-3 text-white focus:border-[var(--mnk-blue)] outline-none resize-none"></textarea>
                </div>
                
                <button type="submit" className="w-full bg-[var(--mnk-red)] text-white font-mono font-bold tracking-widest p-4 hover:bg-[#c01016] transition-colors">
                  REQUEST QUOTE
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
