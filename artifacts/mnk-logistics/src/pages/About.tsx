import { motion } from "framer-motion";
import { FreightMap } from "../components/FreightMap";

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export function About() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-[var(--paper)] pt-24 pb-16 border-b border-[var(--hairline)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeIn}
            className="font-display text-4xl md:text-6xl text-[var(--ink)] font-bold tracking-tight mb-8"
          >
            About MNK Logistics
          </motion.h1>
          <motion.div 
            initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }}
            className="prose prose-lg prose-p:text-[var(--muted)] prose-p:font-sans prose-p:leading-relaxed"
          >
            <p>
              Founded on the principles of reliability and transparency, MNK Logistics has grown from a single truck operation into a nationwide carrier serving all 48 contiguous states. We built this company because we saw a gap between what brokers promise and what carriers actually deliver.
            </p>
            <p>
              Today, our modern fleet of dry vans, reefers, and flatbeds moves essential freight for some of America's most demanding supply chains. Our dispatch desk operates 24/7, meaning you're never left wondering where your freight is or if it will arrive on time.
            </p>
            <p>
              Safety isn't just a metric for us—it's the foundation of everything we do. We hire experienced CDL-A professionals, maintain rigorous equipment standards, and utilize real-time tracking to ensure every load is executed flawlessly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coverage Map */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="font-display text-3xl text-[var(--ink)] font-bold mb-8"
          >
            National Coverage
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-sm border border-[var(--hairline)]"
          >
            <FreightMap staticMode={true} />
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[var(--paper)] border-y border-[var(--hairline)]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="font-display text-3xl text-[var(--ink)] font-bold mb-16">Our Journey</h2>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--hairline)] -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative z-10">
              {[
                { date: "2018", title: "Founded", desc: "Started with a single truck and a commitment to service." },
                { date: "2020", title: "100 Loads", desc: "Crossed our first major milestone of loads hauled safely." },
                { date: "2022", title: "48 States", desc: "Expanded operating authority across the contiguous US." },
                { date: "Today", title: "Modern Fleet", desc: "Serving national supply chains with real-time visibility." }
              ].map((node, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center md:items-start text-center md:text-left bg-[var(--paper)] md:bg-transparent"
                >
                  <div className="font-mono text-sm text-[var(--blue)] font-bold mb-4 bg-[var(--paper)] px-2">{node.date}</div>
                  <div className="w-4 h-4 rounded-full bg-[var(--blue)] mb-4 hidden md:block" />
                  <h3 className="font-display text-xl text-[var(--ink)] font-bold mb-2">{node.title}</h3>
                  <p className="font-sans text-sm text-[var(--muted)]">{node.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Values */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="font-display text-3xl text-[var(--ink)] font-bold mb-8">Core Values</h2>
            <div className="space-y-6">
              {[
                { title: "RELIABILITY", desc: "If we commit to a load, it gets covered. No excuses." },
                { title: "SAFETY", desc: "Zero compromises on driver, equipment, and public safety." },
                { title: "TRANSPARENCY", desc: "Honest communication, real-time tracking, and proactive updates." }
              ].map((val, i) => (
                <div key={i} className="bg-[var(--paper)] border border-[var(--hairline)] p-6 rounded-lg">
                  <h3 className="font-mono text-lg text-[var(--blue)] font-bold tracking-wide mb-2">{val.title}</h3>
                  <p className="font-sans text-[var(--muted)]">{val.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Credentials */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} transition={{ delay: 0.2 }}>
            <h2 className="font-display text-3xl text-[var(--ink)] font-bold mb-8">Credentials</h2>
            <div className="bg-white border border-[var(--hairline)] rounded-lg shadow-sm overflow-hidden">
              <div className="bg-[var(--ink)] px-6 py-4">
                <h3 className="font-mono text-white text-sm tracking-widest font-bold">MNK LOGISTICS LLC</h3>
              </div>
              <ul className="divide-y divide-[var(--hairline)] font-mono text-sm">
                <li className="flex justify-between px-6 py-4">
                  <span className="text-[var(--muted)]">DOT NUMBER</span>
                  <span className="font-bold text-[var(--ink)]">XXXXXXX</span>
                </li>
                <li className="flex justify-between px-6 py-4">
                  <span className="text-[var(--muted)]">MC NUMBER</span>
                  <span className="font-bold text-[var(--ink)]">XXXXXXX</span>
                </li>
                <li className="flex justify-between px-6 py-4">
                  <span className="text-[var(--muted)]">CARGO INSURANCE</span>
                  <span className="font-bold text-[var(--ink)]">$1,000,000</span>
                </li>
                <li className="flex justify-between px-6 py-4">
                  <span className="text-[var(--muted)]">LIABILITY INSURANCE</span>
                  <span className="font-bold text-[var(--ink)]">$1,000,000</span>
                </li>
                <li className="flex justify-between px-6 py-4">
                  <span className="text-[var(--muted)]">SAFETY RATING</span>
                  <span className="font-bold text-[var(--success)]">SATISFACTORY</span>
                </li>
                <li className="flex justify-between px-6 py-4">
                  <span className="text-[var(--muted)]">DISPATCH</span>
                  <span className="font-bold text-[var(--ink)]">24/7/365</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
