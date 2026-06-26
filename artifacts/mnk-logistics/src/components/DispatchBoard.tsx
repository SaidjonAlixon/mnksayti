import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const INITIAL_ROWS = [
  { id: 1, lane: "CHI → DAL", equip: "DRY VAN",    status: "IN TRANSIT",  dot: "green", driver: "Driver #042", eta: "06:42:15" },
  { id: 2, lane: "ATL → MIA", equip: "REEFER",      status: "LOADING",     dot: "amber", driver: "Driver #089", eta: "—" },
  { id: 3, lane: "LAX → PHX", equip: "FLATBED",     status: "IN TRANSIT",  dot: "green", driver: "Driver #112", eta: "11:15:00" },
  { id: 4, lane: "NYC → ATL", equip: "DRY VAN",    status: "DELIVERED ✓", dot: "grey",  driver: "Driver #007", eta: "—" },
  { id: 5, lane: "HOU → DEN", equip: "POWER ONLY", status: "DISPATCHED",  dot: "blue",  driver: "Driver #033", eta: "14:30:00" },
  { id: 6, lane: "DEN → CHI", equip: "REEFER",      status: "IN TRANSIT",  dot: "green", driver: "Driver #054", eta: "02:10:45" },
  { id: 7, lane: "MEM → CHI", equip: "DRY VAN",    status: "LOADING",     dot: "amber", driver: "Driver #190", eta: "—" },
  { id: 8, lane: "SEA → LAX", equip: "FLATBED",     status: "DISPATCHED",  dot: "blue",  driver: "Driver #022", eta: "08:45:00" },
];

const STATUSES = ["IN TRANSIT", "LOADING", "DISPATCHED", "DELIVERED ✓"] as const;
type Status = typeof STATUSES[number];

const STATUS_STYLE: Record<Status, { badge: string; dot: string; label: string }> = {
  "IN TRANSIT":  { badge: "dispatch-badge--green",  dot: "dispatch-dot--green",  label: "IN TRANSIT" },
  "LOADING":     { badge: "dispatch-badge--amber",  dot: "dispatch-dot--amber",  label: "LOADING" },
  "DISPATCHED":  { badge: "dispatch-badge--blue",   dot: "dispatch-dot--blue",   label: "DISPATCHED" },
  "DELIVERED ✓": { badge: "dispatch-badge--grey",   dot: "dispatch-dot--grey",   label: "DELIVERED ✓" },
};

export function DispatchBoard() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setRows(current => {
        const next = [...current];
        const idx = Math.floor(Math.random() * next.length);
        const newStatus = STATUSES[Math.floor(Math.random() * STATUSES.length)];
        next[idx] = { ...next[idx], status: newStatus };
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filters = ["ALL", "IN TRANSIT", "LOADING", "DISPATCHED", "DELIVERED ✓"];

  const displayed = rows.filter(r => {
    const matchFilter = filter === "ALL" || r.status === filter;
    const matchSearch = search === "" || r.lane.toLowerCase().includes(search.toLowerCase()) || r.equip.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="w-full">
      <p className="dispatch-section-label">REAL-TIME OPERATIONS</p>
      <div className="dispatch-card">

        {/* Top bar */}
        <div className="dispatch-topbar">
          <div className="dispatch-topbar-left">
            <h3 className="dispatch-title">LIVE DISPATCH — ACTIVE LOADS</h3>
            <span className="dispatch-live-dot" />
          </div>
          <div className="dispatch-topbar-right">
            <div className="dispatch-filters">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`dispatch-filter ${filter === f ? "dispatch-filter--active" : ""}`}
                >
                  {f === "ALL" ? "ALL" : f.split(" ")[0]}
                </button>
              ))}
            </div>
            <div className="dispatch-search-wrap">
              <Search className="dispatch-search-icon" size={14} />
              <input
                type="text"
                placeholder="Search loads..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="dispatch-search"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="dispatch-table-wrap">
          <table className="dispatch-table">
            <thead>
              <tr className="dispatch-thead-row">
                <th className="dispatch-th">LANE</th>
                <th className="dispatch-th">EQUIPMENT</th>
                <th className="dispatch-th">STATUS</th>
                <th className="dispatch-th">DRIVER</th>
                <th className="dispatch-th dispatch-th--right">ETA</th>
                <th className="dispatch-th dispatch-th--right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {displayed.map(row => {
                  const s = STATUS_STYLE[row.status as Status] ?? STATUS_STYLE["DELIVERED ✓"];
                  return (
                    <motion.tr
                      key={row.id}
                      className="dispatch-row"
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="dispatch-td dispatch-lane">{row.lane}</td>
                      <td className="dispatch-td">
                        <span className="dispatch-equip-badge">{row.equip}</span>
                      </td>
                      <td className="dispatch-td">
                        <motion.div
                          key={row.status}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`dispatch-badge ${s.badge}`}
                        >
                          <span className={`dispatch-dot ${s.dot}`} />
                          {s.label}
                        </motion.div>
                      </td>
                      <td className="dispatch-td dispatch-driver">{row.driver}</td>
                      <td className="dispatch-td dispatch-eta">{row.eta}</td>
                      <td className="dispatch-td dispatch-td--right">
                        <button className="dispatch-view-btn">VIEW</button>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
