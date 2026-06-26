import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export function KpiStrip() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const metrics = [
    { value: 10, suffix: "M+", label: "MILES HAULED" },
    { value: 48, suffix: "", label: "STATES COVERED" },
    { value: 99.2, suffix: "%", label: "ON TIME", decimals: 1 },
    { value: 500, suffix: "+", label: "LOADS / MO" }
  ];

  return (
    <div ref={ref} className="w-full bg-[var(--blue)] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/20">
        {metrics.map((metric, i) => (
          <div key={i} className="text-center">
            <div className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-2">
              {inView ? (
                <CountUp end={metric.value} duration={2} decimals={metric.decimals || 0} />
              ) : "0"}
              <span className="text-[var(--blue-bright)]">{metric.suffix}</span>
            </div>
            <div className="font-mono text-xs md:text-sm text-white/80 tracking-widest uppercase">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
