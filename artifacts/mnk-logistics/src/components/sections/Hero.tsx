import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export function Hero() {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="min-h-screen pt-32 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-[var(--mnk-white)] mb-6">
            WE HAUL.<br />
            <span className="text-[var(--mnk-steel)]">YOU GROW.</span>
          </h1>
          <p className="font-sans text-xl md:text-2xl text-[var(--mnk-steel)] mb-10 max-w-2xl">
            Coast to coast. Dry van, reefer, flatbed. 48 states, every load, on time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <button className="bg-[var(--mnk-red)] text-white font-mono font-bold tracking-widest px-8 py-4 text-sm hover:-translate-y-[2px] transition-transform flex items-center justify-center gap-2" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              GET A QUOTE
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="border border-[var(--mnk-steel)] text-[var(--mnk-white)] font-mono font-bold tracking-widest px-8 py-4 text-sm hover:-translate-y-[2px] hover:bg-[var(--mnk-surface)] transition-all" onClick={() => document.getElementById('drivers')?.scrollIntoView({ behavior: 'smooth' })}>
              JOIN OUR FLEET
            </button>
          </div>
        </motion.div>
      </div>

      <div className="w-full bg-[var(--mnk-red)] text-white py-3 border-y border-[var(--mnk-hairline)] mb-20">
        <div className="marquee-container">
          <div className="marquee-content font-mono text-sm tracking-widest gap-8 px-4">
            {Array(4).fill(0).map((_, i) => (
              <span key={i} className="contents">
                <span>RELIABLE</span><span>•</span>
                <span>ON-TIME DELIVERY</span><span>•</span>
                <span>48 STATES</span><span>•</span>
                <span>FULLY INSURED</span><span>•</span>
                <span>CDL-A DRIVERS</span><span>•</span>
                <span>10M+ MILES</span><span>•</span>
                <span>99.2% ON-TIME</span><span>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div ref={statsRef} className="max-w-7xl mx-auto px-4 md:px-8 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--mnk-hairline)] border border-[var(--mnk-hairline)]">
          {[
            { value: 10, suffix: "M+", label: "MILES HAULED" },
            { value: 48, suffix: "", label: "STATES COVERED" },
            { value: 99.2, suffix: "%", label: "ON-TIME DELIVERY", decimals: 1 },
            { value: 500, suffix: "+", label: "LOADS/MONTH" }
          ].map((stat, i) => (
            <div key={i} className="bg-[var(--mnk-surface)] p-6 flex flex-col justify-center items-center text-center">
              <div className="font-display text-4xl md:text-5xl text-[var(--mnk-white)] mb-2">
                {statsInView ? (
                  <CountUp end={stat.value} duration={1.5} decimals={stat.decimals || 0} />
                ) : "0"}
                <span className="text-[var(--mnk-red)]">{stat.suffix}</span>
              </div>
              <div className="font-mono text-xs tracking-widest text-[var(--mnk-steel)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-32">
        <h2 className="font-display text-4xl md:text-5xl text-[var(--mnk-white)] mb-12">OUR SERVICES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["DRY VAN", "REEFER / TEMP-CONTROLLED", "FLATBED", "EXPEDITED", "DISPATCH SERVICES"].map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-[var(--mnk-surface)] border border-[var(--mnk-hairline)] p-8 hover:-translate-y-1 transition-all duration-300 hover:border-[var(--mnk-blue)] cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 font-mono text-xs text-[var(--mnk-steel)]">0{i+1}</div>
              <h3 className="font-display text-2xl text-[var(--mnk-white)] mt-8 mb-4">{service}</h3>
              <div className="w-8 h-[2px] bg-[var(--mnk-red)] group-hover:w-16 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-32">
        <h2 className="font-display text-4xl md:text-5xl text-[var(--mnk-white)] mb-12">PROCESS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-[var(--mnk-hairline)] -z-10"></div>
          {[
            { step: "1", title: "BOOK", desc: "Request a quote. Fast response." },
            { step: "2", title: "DISPATCH", desc: "We coordinate the perfect equipment." },
            { step: "3", title: "DELIVER", desc: "Real-time tracking, on time." }
          ].map((proc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-16 h-16 bg-[var(--mnk-ink)] border border-[var(--mnk-red)] flex items-center justify-center font-display text-3xl text-[var(--mnk-red)] mb-6">
                {proc.step}
              </div>
              <h3 className="font-display text-3xl text-[var(--mnk-white)] mb-4">{proc.title}</h3>
              <p className="font-sans text-[var(--mnk-steel)]">{proc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--mnk-hairline)] border border-[var(--mnk-hairline)]">
          {["FULLY INSURED", "REAL-TIME TRACKING", "24/7 DISPATCH", "SAFETY-FIRST"].map((val, i) => (
            <div key={i} className="bg-[var(--mnk-ink)] p-8 text-center">
              <h3 className="font-display text-2xl text-[var(--mnk-white)]">{val}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-32">
        <h2 className="font-display text-4xl md:text-5xl text-[var(--mnk-white)] mb-12">DISPATCH LOG</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { text: "MNK Logistics completely transformed our supply chain. Their dispatch team is proactive and their drivers are top-tier professionals. We never worry about a load once they take it.", author: "DIRECTOR OF OPERATIONS, NATIONAL RETAILER", ref: "LOAD REF: 48992-A" },
            { text: "In a market full of empty promises, MNK actually delivers. Real-time tracking and 24/7 communication make them our go-to carrier for expedited and high-value freight.", author: "LOGISTICS MANAGER, INDUSTRIAL MFG", ref: "LOAD REF: 88124-B" }
          ].map((testimonial, i) => (
            <div key={i} className="bg-[var(--mnk-surface)] border border-[var(--mnk-hairline)] p-8">
              <div className="font-mono text-xs text-[var(--mnk-red)] mb-6">[{testimonial.ref}]</div>
              <p className="font-sans text-lg text-[var(--mnk-white)] mb-8 italic">"{testimonial.text}"</p>
              <div className="font-mono text-xs tracking-widest text-[var(--mnk-steel)]">{testimonial.author}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-[var(--mnk-red)] py-16 text-center">
        <h2 className="font-display text-4xl md:text-6xl text-white mb-8">READY TO MOVE FREIGHT?</h2>
        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-[var(--mnk-red)] font-mono font-bold tracking-widest px-8 py-4 text-sm hover:-translate-y-[2px] transition-transform uppercase">
          Request A Quote
        </button>
      </div>
    </section>
  );
}
