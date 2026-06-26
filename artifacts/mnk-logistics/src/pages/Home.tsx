import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FreightMap } from "../components/FreightMap";
import { DispatchBoard } from "../components/DispatchBoard";
import { KpiStrip } from "../components/KpiStrip";
import { ServiceGrid } from "../components/ServiceGrid";
import { CheckCircle2 } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

export function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* SECTION 1: Hero Console */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24 w-full">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            className="w-full lg:w-[65%] order-2 lg:order-1"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-white/50 backdrop-blur-3xl -z-10 rounded-3xl" />
              <FreightMap />
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-[35%] order-1 lg:order-2 flex flex-col items-start"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="inline-block border border-[var(--hairline)] rounded-full px-3 py-1 bg-white mb-6">
              <span className="font-mono text-[10px] sm:text-xs text-[var(--muted)] tracking-wider">
                FULL TRUCKLOAD · 48 STATES · 24/7 DISPATCH
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-[var(--ink)] mb-6 font-bold tracking-tight">
              America's freight, in motion.
            </motion.h1>
            
            <motion.p variants={fadeIn} className="font-sans text-lg text-[var(--muted)] mb-8 leading-relaxed max-w-lg">
              MNK Logistics delivers dry van, reefer, and flatbed freight across the contiguous U.S. Coast to coast, on time.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4 w-full">
              <Link 
                to="/contact" 
                className="bg-[var(--red)] text-white font-display font-medium tracking-wide px-6 py-3 rounded hover:bg-[#c01015] transition-colors"
              >
                GET A QUOTE
              </Link>
              <Link 
                to="/drivers" 
                className="bg-transparent border border-[var(--blue)] text-[var(--blue)] font-display font-medium tracking-wide px-6 py-3 rounded hover:bg-[var(--blue)] hover:text-white transition-colors"
              >
                JOIN OUR FLEET
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Live Dispatch Board */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24 w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <DispatchBoard />
        </motion.div>
      </section>

      {/* SECTION 3: KPI Strip */}
      <KpiStrip />

      {/* SECTION 4: Services Grid */}
      <section className="bg-[var(--paper)] py-24 border-y border-[var(--hairline)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-[var(--ink)] font-bold mb-4">Capacity Solutions</h2>
            <p className="font-sans text-[var(--muted)] max-w-2xl text-lg">Equipment and expertise for every type of freight.</p>
          </motion.div>
          <ServiceGrid />
        </div>
      </section>

      {/* SECTION 5: How a Load Moves */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--ink) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl text-[var(--ink)] font-bold mb-4">How a Load Moves</h2>
            <p className="font-sans text-[var(--muted)] text-lg">Precision execution from quote to delivery.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-[2px] border-t-2 border-dashed border-[var(--blue-bright)] opacity-30 z-0" />
            
            {[
              { num: 1, title: "BOOK", desc: "Submit a quote request. Our team responds in minutes with competitive rates." },
              { num: 2, title: "DISPATCH", desc: "We assign the optimal driver and route, ensuring capacity meets your timeline." },
              { num: 3, title: "DELIVER", desc: "Track in real-time. We deliver safely, securely, and on schedule." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15 + 0.2 }}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--blue)] text-white font-display text-xl font-bold flex items-center justify-center mb-6 shadow-md border-4 border-white">
                  {step.num}
                </div>
                <h3 className="font-display text-2xl text-[var(--ink)] font-bold mb-3">{step.title}</h3>
                <p className="font-sans text-[var(--muted)]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Trust Strip */}
      <section className="bg-[var(--hairline)] py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
            {["FULLY INSURED", "SAFETY RATED", "REAL-TIME TRACKING", "24/7 OPS"].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[var(--blue)]" />
                <span className="font-mono text-sm font-bold text-[var(--ink)] tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA Panel */}
      <section className="bg-[var(--blue)] py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl text-white font-bold mb-8"
          >
            Ready to move freight?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              to="/contact" 
              className="inline-block bg-[var(--red)] text-white font-display text-lg font-medium tracking-wide px-10 py-4 rounded hover:bg-[#c01015] hover:scale-105 transition-all shadow-lg"
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
