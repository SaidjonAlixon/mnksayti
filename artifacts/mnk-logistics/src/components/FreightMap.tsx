import { motion } from "framer-motion";

const US_MAP_PATH = "M 10 20 Q 30 10 50 15 T 90 20 T 130 15 T 160 30 T 180 50 T 190 80 T 180 110 T 150 140 T 120 160 T 90 170 T 50 160 T 20 130 T 5 90 T 10 50 Z";

const HUBS = [
  { id: "CHI", x: 120, y: 60, name: "Chicago, IL" },
  { id: "DAL", x: 100, y: 120, name: "Dallas, TX" },
  { id: "ATL", x: 140, y: 110, name: "Atlanta, GA" },
  { id: "LAX", x: 30, y: 100, name: "Los Angeles, CA" },
  { id: "NYC", x: 170, y: 50, name: "New York, NY" },
  { id: "HOU", x: 105, y: 140, name: "Houston, TX" },
  { id: "DEN", x: 70, y: 80, name: "Denver, CO" },
  { id: "MEM", x: 125, y: 95, name: "Memphis, TN" },
];

const ROUTES = [
  { from: "CHI", to: "DAL", equip: "DRY VAN", status: "ON TIME", duration: 5 },
  { from: "LAX", to: "DEN", equip: "REEFER", status: "IN TRANSIT", duration: 4 },
  { from: "NYC", to: "ATL", equip: "FLATBED", status: "DELIVERED", duration: 6 },
  { from: "ATL", to: "MEM", equip: "POWER ONLY", status: "ON TIME", duration: 4.5 },
  { from: "MEM", to: "CHI", equip: "DRY VAN", status: "IN TRANSIT", duration: 5.5 },
  { from: "DEN", to: "CHI", equip: "REEFER", status: "ON TIME", duration: 7 },
  { from: "HOU", to: "DAL", equip: "FLATBED", status: "IN TRANSIT", duration: 3 },
];

export function FreightMap({ staticMode = false }: { staticMode?: boolean }) {
  return (
    <div className="relative w-full aspect-[4/3] max-h-[500px] bg-[var(--paper)] rounded-lg border border-[var(--hairline)] overflow-hidden shadow-sm">
      <svg viewBox="0 0 200 180" className="w-full h-full p-4" preserveAspectRatio="xMidYMid meet">
        {/* Base Map */}
        <path 
          d={US_MAP_PATH} 
          fill="none" 
          stroke="var(--hairline)" 
          strokeWidth="1" 
          className="opacity-50"
        />

        {/* Routes */}
        {ROUTES.map((route, i) => {
          const fromHub = HUBS.find(h => h.id === route.from)!;
          const toHub = HUBS.find(h => h.id === route.to)!;
          const cx = (fromHub.x + toHub.x) / 2;
          const cy = Math.min(fromHub.y, toHub.y) - 20;
          const pathId = `route-${i}`;
          
          return (
            <g key={i}>
              <path
                id={pathId}
                d={`M ${fromHub.x} ${fromHub.y} Q ${cx} ${cy} ${toHub.x} ${toHub.y}`}
                fill="none"
                stroke="var(--blue)"
                strokeWidth="0.5"
                className="opacity-30"
              />
              {!staticMode && (
                <>
                  <circle r="1.5" fill="var(--red)" className="motion-reduce:hidden">
                    <animateMotion
                      dur={`${route.duration}s`}
                      repeatCount="indefinite"
                      path={`M ${fromHub.x} ${fromHub.y} Q ${cx} ${cy} ${toHub.x} ${toHub.y}`}
                    />
                  </circle>
                  <text className="hidden md:block text-[3px] font-mono fill-[var(--ink)] font-bold motion-reduce:hidden">
                    <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
                      <tspan dy="-3" className="bg-white">{`${route.from} → ${route.to} · ${route.equip}`}</tspan>
                    </textPath>
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Hubs */}
        {HUBS.map(hub => (
          <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
            {!staticMode && (
              <circle r="4" fill="var(--blue)" className="pulse-ring motion-reduce:hidden" />
            )}
            <circle r="1.5" fill="var(--blue)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
