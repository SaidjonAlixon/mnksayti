import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const INITIAL_ROWS = [
  { id: 1, lane: "CHI → DAL", equip: "DRY VAN", status: "IN TRANSIT", dot: "green", driver: "Driver #042", eta: "06:42:15" },
  { id: 2, lane: "ATL → MIA", equip: "REEFER", status: "LOADING", dot: "amber", driver: "Driver #089", eta: "—" },
  { id: 3, lane: "LAX → PHX", equip: "FLATBED", status: "IN TRANSIT", dot: "green", driver: "Driver #112", eta: "11:15:00" },
  { id: 4, lane: "NYC → ATL", equip: "DRY VAN", status: "DELIVERED ✓", dot: "grey", driver: "Driver #007", eta: "—" },
  { id: 5, lane: "HOU → DEN", equip: "POWER ONLY", status: "DISPATCHED", dot: "blue", driver: "Driver #033", eta: "14:30:00" },
  { id: 6, lane: "DEN → CHI", equip: "REEFER", status: "IN TRANSIT", dot: "green", driver: "Driver #054", eta: "02:10:45" },
  { id: 7, lane: "MEM → CHI", equip: "DRY VAN", status: "LOADING", dot: "amber", driver: "Driver #190", eta: "—" },
  { id: 8, lane: "SEA → LAX", equip: "FLATBED", status: "DISPATCHED", dot: "blue", driver: "Driver #022", eta: "08:45:00" },
];

const STATUS_CONFIG: Record<string, { bg: string, text: string, dot: string }> = {
  "IN TRANSIT": { bg: "bg-[#ecfdf5]", text: "text-[#065f46]", dot: "bg-[var(--success)]" },
  "LOADING": { bg: "bg-[#fffbeb]", text: "text-[#b45309]", dot: "bg-[var(--amber)]" },
  "DISPATCHED": { bg: "bg-[#eff6ff]", text: "text-[#1e40af]", dot: "bg-[var(--blue)]" },
  "DELIVERED ✓": { bg: "bg-[#f1f5f9]", text: "text-[#475569]", dot: "bg-[var(--muted)]" },
};

export function DispatchBoard() {
  const [rows, setRows] = useState(INITIAL_ROWS);

  useEffect(() => {
    const interval = setInterval(() => {
      setRows(currentRows => {
        const newRows = [...currentRows];
        const rowIndexToUpdate = Math.floor(Math.random() * newRows.length);
        const statuses = Object.keys(STATUS_CONFIG);
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        newRows[rowIndexToUpdate] = {
          ...newRows[rowIndexToUpdate],
          status: randomStatus,
          dot: STATUS_CONFIG[randomStatus].dot.replace('bg-[', '').replace(']', ''),
        };
        return newRows;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <h3 className="font-mono text-sm font-bold text-[var(--muted)] tracking-widest mb-4">REAL-TIME OPERATIONS</h3>
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(11,36,71,0.06)] overflow-hidden flex flex-col border border-[var(--hairline)]">
        
        {/* Top Bar */}
        <div className="bg-white border-b border-[var(--hairline)] border-l-4 border-l-[var(--blue)] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-[var(--ink)] text-lg font-bold">LIVE DISPATCH — ACTIVE LOADS</h3>
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--success)] animate-pulse" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2">
              {["ALL", "IN TRANSIT", "LOADING", "DELIVERED"].map(filter => (
                <button key={filter} className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-colors ${filter === "ALL" ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "bg-[var(--paper)] text-[var(--muted)] border-[var(--hairline)] hover:bg-gray-100"}`}>
                  {filter}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
              <input type="text" placeholder="Search loads..." className="pl-9 pr-4 py-2 bg-[var(--paper)] border border-[var(--hairline)] rounded-full text-sm font-sans focus:outline-none focus:border-[var(--blue)] w-full md:w-48" />
            </div>
          </div>
        </div>
        
        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left font-sans text-sm whitespace-nowrap min-w-[800px]">
            <thead className="bg-[var(--paper)] text-[var(--muted)] border-b border-[var(--hairline)]">
              <tr>
                <th className="px-6 py-4 font-mono text-xs font-bold tracking-wider">LANE</th>
                <th className="px-6 py-4 font-mono text-xs font-bold tracking-wider">EQUIPMENT</th>
                <th className="px-6 py-4 font-mono text-xs font-bold tracking-wider">STATUS</th>
                <th className="px-6 py-4 font-mono text-xs font-bold tracking-wider">DRIVER</th>
                <th className="px-6 py-4 font-mono text-xs font-bold tracking-wider text-right">ETA</th>
                <th className="px-6 py-4 font-mono text-xs font-bold tracking-wider text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              <AnimatePresence>
                {rows.map((row) => (
                  <motion.tr 
                    key={row.id} 
                    className="text-[var(--ink)] hover:bg-[rgba(10,77,156,0.02)] transition-colors group"
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <td className="px-6 py-4 font-display font-bold text-base">{row.lane}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs bg-[var(--paper)] border border-[var(--hairline)] px-2 py-1 rounded">
                        {row.equip}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <motion.div
                        key={row.status}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-bold ${STATUS_CONFIG[row.status]?.bg || 'bg-gray-100'} ${STATUS_CONFIG[row.status]?.text || 'text-gray-800'}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[row.status]?.dot || 'bg-gray-400'}`} />
                        {row.status}
                      </motion.div>
                    </td>
                    <td className="px-6 py-4 text-[var(--muted)] font-mono text-xs">{row.driver}</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-[var(--ink)]">{row.eta}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[var(--blue)] font-mono text-xs font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                        VIEW
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
