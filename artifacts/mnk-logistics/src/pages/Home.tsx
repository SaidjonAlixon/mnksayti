import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, ArrowRight, ShieldCheck, Map, Clock, Users, Star } from "lucide-react";
import { FreightMap } from "../components/FreightMap";
import { DispatchBoard } from "../components/DispatchBoard";
import { useCounter } from "../hooks/useCounter";
import { useMagneticButton } from "../hooks/useMagneticButton";

const sectionTransition = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-headline', { y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
      gsap.from('.hero-map', { x: 60, opacity: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  
  const milesCounter = useCounter(10000000, 2500, statsInView);
  const statesCounter = useCounter(48, 2000, statsInView);
  const onTimeCounter = useCounter(99, 2000, statsInView);
  const loadsCounter = useCounter(500, 2000, statsInView);

  const ctaBtnRef = useMagneticButton(30);

  return (
    <div className="w-full">
      {/* SECTION 1: HERO */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex items-center bg-[var(--paper)] pt-20 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[var(--blue)] rounded-full blur-[120px] opacity-5 pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[var(--blue)] rounded-full blur-[100px] opacity-5 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full z-10 flex flex-col lg:flex-row items-center gap-12 pt-12 pb-24">
          <div className="w-full lg:w-[55%]">
            <div className="hero-headline inline-block font-mono text-xs font-bold tracking-widest text-[var(--ink)] bg-white border border-[var(--hairline)] px-4 py-2 rounded-full mb-8 shadow-sm">
              FULL TRUCKLOAD CARRIER · EST. 2018
            </div>
            <h1 className="hero-headline font-display text-[56px] md:text-[80px] lg:text-[100px] leading-[0.95] font-bold text-[var(--ink)] mb-8 tracking-tighter">
              America's freight,<br />
              moving in<br />
              <span className="text-[var(--blue)]">real time.</span>
            </h1>
            <p className="hero-headline font-sans text-xl text-[var(--muted)] max-w-lg mb-10 leading-relaxed">
              MNK Logistics delivers dry van, reefer, and flatbed across 48 states. Reliable. Tracked. On time.
            </p>
            <div className="hero-headline flex flex-wrap gap-4 items-center mb-16">
              <Link 
                to="/contact" 
                ref={ctaBtnRef as any}
                className="bg-[var(--red)] text-white font-mono text-sm font-bold tracking-widest px-8 py-4 rounded-full hover:bg-[#c01015] transition-colors flex items-center gap-3 group"
              >
                GET A QUOTE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/drivers" 
                className="text-[var(--blue)] font-mono text-sm font-bold tracking-widest px-8 py-4 hover:bg-[rgba(10,77,156,0.05)] rounded-full transition-colors"
              >
                VIEW OUR FLEET
              </Link>
            </div>
            
            <div className="hero-headline flex flex-wrap gap-4">
              {['10M+ Miles', '48 States', '99.2% On-Time', '24/7 Ops'].map(stat => (
                <div key={stat} className="glass px-4 py-2 font-mono text-xs font-bold text-[var(--ink)]">
                  {stat}
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-[45%] hero-map">
            <div className="glass p-2">
              <FreightMap />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE FREIGHT DASHBOARD */}
      <section className="py-24 bg-white relative z-20 -mt-8 border-t border-[var(--hairline)] rounded-t-[40px]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={sectionTransition}>
            <DispatchBoard />
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US */}
      <section className="py-32 bg-[var(--blue-dark)] text-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionTransition}
            className="font-display text-5xl md:text-6xl font-bold mb-16 tracking-tight"
          >
            Built different. Runs better.
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: ShieldCheck, title: "FULLY INSURED", desc: "$1M cargo & liability coverage standard on every load." },
              { icon: Map, title: "REAL-TIME TRACKING", desc: "Live GPS on every load. Never wonder where your freight is." },
              { icon: Clock, title: "24/7 DISPATCH", desc: "Our operations desk never sleeps. We are always online." },
              { icon: Users, title: "SAFETY RECORD", desc: "Vetted CDL-A drivers only. Zero compromises on safety." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0E2244] border border-white/10 rounded-[20px] p-8 md:p-10 hover:bg-[#112a52] transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-[var(--blue)] flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="font-sans text-white/60 text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: FLEET SHOWCASE */}
      <section className="py-32 bg-[var(--paper)]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionTransition}
            className="font-display text-5xl md:text-6xl font-bold text-[var(--ink)] mb-16 tracking-tight"
          >
            Our Equipment
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: "DRY VAN", badge: "AVAILABLE", badgeColor: "text-[var(--success)] bg-[#ecfdf5]", specs: "53ft / Up to 45,000 lbs / Air-ride" },
              { title: "REEFER", badge: "AVAILABLE", badgeColor: "text-[var(--success)] bg-[#ecfdf5]", specs: "Temp-controlled / 53ft / Food-grade" },
              { title: "FLATBED", badge: "LIMITED", badgeColor: "text-[var(--amber)] bg-[#fffbeb]", specs: "Step-deck available / Over-dimensional" }
            ].map((fleet, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative bg-white border border-[var(--hairline)] rounded-[20px] p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(11,36,71,0.08)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--blue)] to-[var(--blue-light)] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start mb-8">
                  <h3 className="font-display text-3xl font-bold text-[var(--ink)]">{fleet.title}</h3>
                  <span className={`font-mono text-[10px] font-bold tracking-wider px-3 py-1 rounded-full ${fleet.badgeColor}`}>
                    {fleet.badge}
                  </span>
                </div>
                
                <div className="flex-grow">
                  <p className="font-sans text-[var(--muted)] mb-8">{fleet.specs}</p>
                </div>
                
                <Link to="/contact" className="font-mono text-sm font-bold text-[var(--blue)] flex items-center gap-2 group/link">
                  BOOK NOW
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
                
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--blue)]/5 to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: COVERAGE MAP */}
      <section className="py-32 bg-[var(--paper)] border-t border-[var(--hairline)] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionTransition}
            className="font-display text-5xl md:text-6xl font-bold text-[var(--ink)] mb-12 tracking-tight"
          >
            Our Coverage
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto mb-12"
          >
            <FreightMap staticMode={true} />
          </motion.div>
          
          <p className="font-sans text-xl text-[var(--muted)] max-w-2xl mx-auto">
            48 contiguous states. From the Pacific to the Atlantic, we've got it covered.
          </p>
        </div>
      </section>

      {/* SECTION 6: HOW SHIPPING WORKS */}
      <section className="py-32 bg-[var(--blue)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionTransition}
            className="font-display text-5xl md:text-6xl font-bold mb-20 tracking-tight text-center"
          >
            How a load moves
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-white/20" />
            
            {[
              { step: "01", title: "REQUEST", desc: "Submit your freight details online or call us." },
              { step: "02", title: "MATCH", desc: "We assign the right driver and equipment instantly." },
              { step: "03", title: "DISPATCH", desc: "Real-time tracking begins as soon as we roll." },
              { step: "04", title: "DELIVER", desc: "Confirmed delivery with instant documentation." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--blue)] border-2 border-[var(--red)] flex items-center justify-center font-mono text-xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
                <p className="font-sans text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: COMPANY NUMBERS */}
      <section ref={statsRef} className="py-32 bg-[var(--paper)] border-y border-[var(--hairline)]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            <div className="text-center">
              <div className="font-display text-5xl md:text-7xl font-bold text-[var(--blue)] mb-2">
                {milesCounter.toLocaleString()}+
              </div>
              <div className="font-mono text-xs font-bold text-[var(--muted)] tracking-widest">MILES DRIVEN</div>
            </div>
            <div className="text-center">
              <div className="font-display text-5xl md:text-7xl font-bold text-[var(--blue)] mb-2">
                {statesCounter}
              </div>
              <div className="font-mono text-xs font-bold text-[var(--muted)] tracking-widest">STATES COVERED</div>
            </div>
            <div className="text-center">
              <div className="font-display text-5xl md:text-7xl font-bold text-[var(--blue)] mb-2">
                {onTimeCounter.toFixed(1)}%
              </div>
              <div className="font-mono text-xs font-bold text-[var(--muted)] tracking-widest">ON-TIME RATE</div>
            </div>
            <div className="text-center">
              <div className="font-display text-5xl md:text-7xl font-bold text-[var(--blue)] mb-2">
                {loadsCounter}+
              </div>
              <div className="font-mono text-xs font-bold text-[var(--muted)] tracking-widest">LOADS / MONTH</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS */}
      <section className="py-32 bg-[var(--blue-dark)] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionTransition}
            className="font-display text-5xl md:text-6xl font-bold text-white mb-16 tracking-tight"
          >
            What our partners say
          </motion.h2>

          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -1000 }}
            className="flex gap-8 cursor-grab active:cursor-grabbing"
          >
            {[
              { quote: "MNK has never missed a pickup in 2 years of working together.", author: "Sarah K.", role: "Freight Broker" },
              { quote: "The real-time tracking alone is worth it. Always know where my freight is.", author: "Marcus T.", role: "Shipper" },
              { quote: "Professional, responsive, and their drivers are top tier.", author: "Linda R.", role: "Logistics Manager" }
            ].map((t, i) => (
              <div key={i} className="min-w-[350px] md:min-w-[450px] p-8 rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex gap-1 mb-6 text-[var(--amber)]">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                </div>
                <p className="font-display text-2xl text-white mb-8 leading-snug">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-white font-sans">{t.author}</div>
                  <div className="font-mono text-xs text-white/60">{t.role}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 9: PARTNERS MARQUEE */}
      <section className="py-8 bg-white border-y border-[var(--hairline)] overflow-hidden flex items-center">
        <div className="font-mono text-xs font-bold tracking-widest text-[var(--muted)] px-8 border-r border-[var(--hairline)] whitespace-nowrap hidden md:block">
          TRUSTED BY LOGISTICS PROFESSIONALS
        </div>
        <div className="flex-1 flex overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
            className="flex gap-12 px-12 items-center"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 items-center">
                {['DOT CERTIFIED', 'FULLY INSURED', 'FMCSA COMPLIANT', 'CDL-A VERIFIED', 'REAL-TIME GPS', 'SAFETY RATED'].map((badge, j) => (
                  <div key={j} className="font-mono text-sm font-bold text-[var(--ink)] border border-[var(--blue)] px-4 py-2 rounded whitespace-nowrap">
                    {badge}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section className="py-32 bg-[var(--paper)]">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionTransition}
            className="font-display text-5xl md:text-6xl font-bold text-[var(--ink)] mb-16 tracking-tight text-center"
          >
            Frequently asked
          </motion.h2>

          <Accordion.Root type="single" collapsible className="space-y-4">
            {[
              { q: "What freight types do you haul?", a: "We specialize in Dry Van, Reefer (temperature controlled), and Flatbed freight across all 48 contiguous states." },
              { q: "How do I request a quote?", a: "You can request a quote via our online form, email us at dispatch@mnklogistics.com, or call our 24/7 dispatch desk directly." },
              { q: "Do you offer real-time tracking?", a: "Yes, every load is GPS tracked. We provide automated updates and a tracking link upon request." },
              { q: "What are your service areas?", a: "We operate coast-to-coast across the lower 48 states, with heavy lane density in the Midwest, South, and East Coast." },
              { q: "How is pricing determined?", a: "Pricing is based on current market rates, lane density, equipment type required, weight, and fuel surcharges. We offer competitive, transparent spot and contract pricing." },
              { q: "Do you hire owner-operators?", a: "Yes, we have a robust owner-operator program with percentage pay and fuel discounts. Visit our Drivers page for details." }
            ].map((faq, i) => (
              <Accordion.Item key={i} value={`faq-${i}`} className="border-b border-[var(--hairline)]">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between py-6 text-left font-display text-2xl font-bold text-[var(--ink)] hover:text-[var(--blue)] transition-colors [&[data-state=open]>svg]:rotate-180">
                    {faq.q}
                    <ChevronDown className="text-[var(--muted)] transition-transform duration-300" size={24} />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-lg data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                  <div className="pb-6 text-[var(--muted)] font-sans">
                    {faq.a}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* SECTION 11: CTA BANNER */}
      <section className="py-32 bg-[var(--blue)] relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 2px, transparent 2px, transparent 20px)' }} />
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionTransition}
            className="font-display text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight"
          >
            Ready to move?
          </motion.h2>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} variants={sectionTransition}
            className="font-sans text-2xl text-white/80 mb-12"
          >
            Get a freight quote in under 2 minutes.
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} variants={sectionTransition}>
            <Link 
              to="/contact" 
              className="inline-block bg-[var(--red)] text-white font-mono text-lg font-bold tracking-widest px-12 py-6 rounded-full hover:bg-[#c01015] hover:scale-105 transition-all shadow-[0_0_40px_rgba(224,20,26,0.4)]"
            >
              GET A QUOTE &rarr;
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
