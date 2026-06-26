import { motion } from "framer-motion";
import { Truck, Snowflake, Box, Zap, Timer } from "lucide-react";

const SERVICES = [
  { id: 1, title: "DRY VAN", desc: "Reliable 53' dry van capacity for standard freight.", icon: Truck },
  { id: 2, title: "REEFER / TEMP-CONTROLLED", desc: "Precise temperature management for sensitive goods.", icon: Snowflake },
  { id: 3, title: "FLATBED", desc: "Specialized open-deck hauling for oversized loads.", icon: Box },
  { id: 4, title: "POWER ONLY", desc: "Tractor power to move your pre-loaded trailers.", icon: Zap },
  { id: 5, title: "EXPEDITED", desc: "Team drivers for time-critical, high-priority shipments.", icon: Timer },
];

export function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SERVICES.map((service, i) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group bg-[var(--surface)] border border-[var(--hairline)] rounded-lg p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-200 relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--blue)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-200" />
          <service.icon className="w-8 h-8 text-[var(--blue)] mb-4" />
          <h3 className="font-display font-bold text-xl text-[var(--ink)] mb-2">{service.title}</h3>
          <p className="font-sans text-[var(--muted)]">{service.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
