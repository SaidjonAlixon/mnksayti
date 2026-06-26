import { motion } from "framer-motion";

const US_MAP_OUTLINE = "M 120 40 Q 180 20 300 25 T 500 40 T 700 30 T 800 60 T 900 100 T 920 180 T 850 250 T 800 350 T 750 400 T 680 460 T 600 450 T 550 480 T 450 420 T 350 430 T 250 400 T 150 350 T 80 250 T 60 150 Z";

const HUBS = [
  { id: "CHI", x: 580, y: 220, name: "Chicago" },
  { id: "DAL", x: 480, y: 380, name: "Dallas" },
  { id: "ATL", x: 620, y: 360, name: "Atlanta" },
  { id: "LAX", x: 120, y: 320, name: "Los Angeles" },
  { id: "NYC", x: 760, y: 200, name: "New York" },
  { id: "HOU", x: 460, y: 420, name: "Houston" },
  { id: "DEN", x: 340, y: 260, name: "Denver" },
  { id: "MEM", x: 580, y: 340, name: "Memphis" },
  { id: "MIA", x: 680, y: 460, name: "Miami" },
  { id: "SEA", x: 120, y: 140, name: "Seattle" },
];

const ROUTES = [
  { from: "CHI", to: "DAL", dur: 5, delay: 0 },
  { from: "DAL", to: "LAX", dur: 7, delay: 1 },
  { from: "ATL", to: "NYC", dur: 6, delay: 0.5 },
  { from: "HOU", to: "DEN", dur: 5.5, delay: 2 },
  { from: "MEM", to: "CHI", dur: 4.5, delay: 1.5 },
  { from: "LAX", to: "SEA", dur: 6.5, delay: 0 },
  { from: "DAL", to: "ATL", dur: 5, delay: 2.5 },
  { from: "NYC", to: "MIA", dur: 8, delay: 1 },
];

export function FreightMap({ staticMode = false }: { staticMode?: boolean }) {
  return (
    <div className={`relative w-full aspect-[16/10] bg-[var(--paper)] rounded-2xl border border-[var(--hairline)] overflow-hidden shadow-sm ${!staticMode ? 'float' : ''}`}>
      <svg viewBox="0 0 960 600" className="w-full h-full p-8" preserveAspectRatio="xMidYMid meet">
        {/* Base Map */}
        <path 
          d={US_MAP_OUTLINE} 
          fill="rgba(10, 77, 156, 0.03)" 
          stroke="var(--hairline)" 
          strokeWidth="2" 
        />

        {/* Routes */}
        {ROUTES.map((route, i) => {
          const fromHub = HUBS.find(h => h.id === route.from)!;
          const toHub = HUBS.find(h => h.id === route.to)!;
          const cx = (fromHub.x + toHub.x) / 2;
          const cy = Math.min(fromHub.y, toHub.y) - 60;
          const pathId = `route-${i}`;
          const pathData = `M ${fromHub.x} ${fromHub.y} Q ${cx} ${cy} ${toHub.x} ${toHub.y}`;
          
          return (
            <g key={i}>
              <path
                id={pathId}
                d={pathData}
                fill="none"
                stroke="var(--blue)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-30"
              />
              {!staticMode && (
                <circle r="5" fill="var(--red)" className="motion-reduce:hidden">
                  <animateMotion
                    dur={`${route.dur}s`}
                    begin={`${route.delay}s`}
                    repeatCount="indefinite"
                    path={pathData}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Hubs */}
        {HUBS.map(hub => (
          <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
            {!staticMode && (
              <circle r="7" fill="var(--blue)" className="node-pulse motion-reduce:hidden" />
            )}
            <circle r="7" fill="var(--blue)" />
            <text 
              y="-15" 
              textAnchor="middle" 
              className="font-mono text-[10px] fill-[var(--ink)] font-bold tracking-wider"
            >
              {hub.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
