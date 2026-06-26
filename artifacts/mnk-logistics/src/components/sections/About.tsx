import { motion } from "framer-motion";

export function About() {
  return (
    <section className="py-24 bg-[var(--mnk-surface)] border-y border-[var(--mnk-hairline)] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-5xl md:text-7xl text-[var(--mnk-white)] mb-8">
              BUILT TO HAUL.<br />
              <span className="text-[var(--mnk-steel)]">BUILT TO LAST.</span>
            </h2>
            <p className="font-sans text-lg text-[var(--mnk-steel)] mb-6 leading-relaxed">
              MNK Logistics isn't just another freight broker. We're a technology-driven, 
              asset-backed logistics partner operating at the intersection of heavy iron 
              and precise data.
            </p>
            <p className="font-sans text-lg text-[var(--mnk-steel)] mb-12 leading-relaxed">
              Our mission is simple: eliminate the friction in freight. From local runs to 
              cross-country hauls, we treat your cargo with the exact same precision we apply 
              to our own operations.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {['DOT: 1234567', 'MC: 987654', 'INSURANCE: $1M/$1M', 'SAFETY: SATISFACTORY'].map((tag, i) => (
                <div key={i} className="font-mono text-xs tracking-widest text-[var(--mnk-white)] bg-[var(--mnk-ink)] border border-[var(--mnk-hairline)] px-4 py-2">
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[15px] top-0 bottom-0 w-[1px] bg-[var(--mnk-hairline)]"></div>
            {[
              { year: "2015", title: "FOUNDED", desc: "Started with a single truck in the Midwest." },
              { year: "2018", title: "FIRST 100 LOADS", desc: "Expanded fleet and established dedicated routes." },
              { year: "2020", title: "48 STATES", desc: "Achieved full continental coverage with network." },
              { year: "TODAY", title: "NATIONAL SCALE", desc: "Operating millions of miles with 99.2% on-time." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative pl-12 mb-12 last:mb-0"
              >
                <div className="absolute left-[11px] top-1.5 w-2 h-2 bg-[var(--mnk-red)] rotate-45"></div>
                <div className="font-mono text-xs text-[var(--mnk-red)] tracking-widest mb-2">{item.year}</div>
                <h3 className="font-display text-2xl text-[var(--mnk-white)] mb-2">{item.title}</h3>
                <p className="font-sans text-[var(--mnk-steel)]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
