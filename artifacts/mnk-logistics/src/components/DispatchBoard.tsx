import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_ROWS = [
  { id: 1, lane: "CHI → DAL", equip: "DRY VAN", status: "IN TRANSIT", dot: "green", eta: "06:42" },
  { id: 2, lane: "ATL → MIA", equip: "REEFER", status: "LOADING", dot: "amber", eta: "—" },
  { id: 3, lane: "LAX → PHX", equip: "FLATBED", status: "IN TRANSIT", dot: "green", eta: "11:15" },
  { id: 4, lane: "NYC → ATL", equip: "DRY VAN", status: "DELIVERED ✓", dot: "green", eta: "—" },
  { id: 5, lane: "HOU → DEN", equip: "POWER ONLY", status: "DISPATCHED", dot: "amber", eta: "14:30" },
];

const POSSIBLE_STATUSES = [
  { status: "IN TRANSIT", dot: "green" },
  { status: "LOADING", dot: "amber" },
  { status: "DELIVERED ✓", dot: "green" },
  { status: "DISPATCHED", dot: "amber" },
];

export function DispatchBoard() {
  const [rows, setRows] = useState(INITIAL_ROWS);

  useEffect(() => {
    // Cycle rows every 4 seconds
    const interval = setInterval(() => {
      setRows(currentRows => {
        const newRows = [...currentRows];
        const rowIndexToUpdate = Math.floor(Math.random() * newRows.length);
        const randomStatus = POSSIBLE_STATUSES[Math.floor(Math.random() * POSSIBLE_STATUSES.length)];
        
        newRows[rowIndexToUpdate] = {
          ...newRows[rowIndexToUpdate],
          status: randomStatus.status,
          dot: randomStatus.dot,
        };
        return newRows;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[var(--surface)] border border-[var(--hairline)] rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="bg-[var(--blue)] px-4 py-3 flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--success)] animate-pulse" />
        <h3 className="font-mono text-white text-xs font-bold tracking-wider">LIVE DISPATCH — ACTIVE LOADS</h3>
      </div>
      
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left font-mono text-sm whitespace-nowrap min-w-[500px]">
          <thead className="bg-[var(--paper)] text-[var(--muted)] border-b border-[var(--hairline)]">
            <tr>
              <th className="px-4 py-3 font-normal">LANE</th>
              <th className="px-4 py-3 font-normal">EQUIP</th>
              <th className="px-4 py-3 font-normal">STATUS</th>
              <th className="px-4 py-3 font-normal text-right">ETA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--hairline)]">
            {rows.map((row) => (
              <tr key={row.id} className="text-[var(--ink)]">
                <td className="px-4 py-3 font-bold">{row.lane}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{row.equip}</td>
                <td className="px-4 py-3">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={row.status}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-center gap-2"
                    >
                      <span className={`w-2 h-2 rounded-full ${row.dot === 'green' ? 'bg-[var(--success)]' : 'bg-[var(--amber)]'}`} />
                      {row.status}
                    </motion.div>
                  </AnimatePresence>
                </td>
                <td className="px-4 py-3 text-right">{row.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
