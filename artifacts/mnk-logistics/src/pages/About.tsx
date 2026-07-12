import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Shield, TrendingUp, Users } from "lucide-react";
import { MediaFigure, MediaGallery, MediaSplit, PageHeroMedia } from "../components/PageMedia";
import { TRUCK_IMAGES } from "../constants/truck-images";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_STORY_BLOCKS = [
  {
    id: "story",
    reverse: false,
    image: TRUCK_IMAGES.terminal,
    alt: "MNK operations at terminal",
    label: "Our story",
    title: "Built on reliability. Driven by data.",
    paragraphs: [
      "Founded in 2018, MNK Logistics set out to be an asset-based carrier with the speed and transparency of a modern tech company — execution over excuses.",
      "Today we move freight across all 48 contiguous states with 24/7 dispatch and real-time visibility on every load.",
    ],
    stats: [
      { val: "2018", label: "Year founded" },
      { val: "48", label: "States covered" },
      { val: "24/7", label: "Live dispatch" },
    ],
  },
  {
    id: "fleet",
    reverse: true,
    image: TRUCK_IMAGES.highway,
    alt: "MNK truck on the open highway",
    label: "Our fleet",
    title: "Late-model power. Maintained like it matters.",
    paragraphs: [
      "Every tractor in the MNK fleet is late-model equipment with GPS, ELD compliance, and preventive maintenance on a fixed schedule — not when something breaks.",
      "Shippers get clean equipment and on-time wheels. Drivers get trucks they can trust for long hauls coast to coast.",
    ],
    stats: [
      { val: "2022+", label: "Model years" },
      { val: "GPS", label: "On every unit" },
      { val: "68", label: "Mph governed" },
    ],
  },
  {
    id: "ops",
    reverse: false,
    image: TRUCK_IMAGES.convoy,
    alt: "MNK convoy moving freight",
    label: "Operations",
    title: "Dispatch that answers. Freight that moves.",
    paragraphs: [
      "Our ops desk is staffed around the clock — brokers and shippers talk to people who know the load, not a ticket queue.",
      "From pickup confirmation to delivery POD, status updates stay in sync so partners never chase us for answers.",
    ],
    stats: [
      { val: "<30m", label: "Quote reply" },
      { val: "POD", label: "Same day" },
      { val: "1:1", label: "Load support" },
    ],
  },
] as const;

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const CORP_CARDS = [
  { code: "REG-01", glyph: "F", val: "2018", title: "Founded", desc: "Asset-based carrier built in Chicago with one truck and a dispatch-first mindset." },
  { code: "REG-02", glyph: "A", val: "48", title: "Authority", desc: "FMCSA interstate operating authority across all contiguous United States." },
  { code: "REG-03", glyph: "I", val: "$1M+", title: "Insured", desc: "Cargo and liability coverage on every load — no exceptions, no gaps." },
  { code: "REG-04", glyph: "S", val: "SAT", title: "Safety rating", desc: "FMCSA satisfactory safety rating with vetted CDL-A operators." },
];

const CORP_FOLIO = [
  { tab: "OPS", color: "blue", title: "Operations-first culture", desc: "Every decision runs through dispatch reality — not a slide deck. Loads move because ops says so." },
  { tab: "TEC", color: "red", title: "Tech-integrated fleet", desc: "GPS on every truck, API tracking for shippers, automated status updates from wheels rolling to delivery." },
  { tab: "PRT", color: "dark", title: "Long-term partnerships", desc: "Brokers and shippers stay because we answer the phone, hit appointments, and document every mile." },
  { tab: "SAF", color: "green", title: "Safety above speed", desc: "Vetted CDL-A drivers, maintained equipment, and a culture that never cuts corners on compliance." },
];

const CORP_SEALS = [
  { glyph: "DOT", name: "DOT Registered", desc: "Active USDOT operating authority" },
  { glyph: "MC", name: "MC Authority", desc: "Interstate motor carrier certified" },
  { glyph: "CARGO", name: "Cargo Bond", desc: "$1M cargo insurance per load" },
  { glyph: "ATA", name: "Industry Member", desc: "American Trucking Associations" },
];

const JOURNEY = [
  { year: "2018", title: "The Beginning", desc: "Started operations with a single truck and a dispatch-first mindset." },
  { year: "2020", title: "Regional Expansion", desc: "Secured direct contracts and expanded coverage to 15 states." },
  { year: "2022", title: "National Authority", desc: "Granted operating authority across all 48 contiguous states." },
  { year: "2024", title: "Tech Integration", desc: "Launched API tracking, automated status, and live dispatch tools." },
  { year: "2026", title: "Scale & Partnerships", desc: "Growing broker relationships and late-model fleet capacity nationwide." },
] as const;

const CREDENTIALS = [
  { label: "DOT number", val: "XXXXXXX" },
  { label: "MC number", val: "XXXXXXX" },
  { label: "Cargo insurance", val: "$1,000,000" },
  { label: "Liability", val: "$1,000,000" },
  { label: "Safety rating", val: "Satisfactory", ok: true },
  { label: "SCAC code", val: "MNKL" },
] as const;

export function About() {
  useEffect(() => {
    // Timeline drawing animation
    gsap.fromTo(".timeline-line", 
      { height: 0 }, 
      { 
        height: "100%", 
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      }
    );
  }, []);

  return (
    <div className="w-full bg-[var(--paper)]">
      
      <PageHeroMedia image={TRUCK_IMAGES.fleetLine} blur={9} className="pt-32 pb-24 text-center">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-sm font-bold tracking-widest text-[var(--blue-light)] mb-8">
            HOME / ABOUT
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            About MNK Logistics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="font-sans text-lg text-white/70 max-w-2xl mx-auto mt-6"
          >
            Asset-based carrier built for brokers, shippers, and drivers who expect execution — not excuses.
          </motion.p>
        </div>
      </PageHeroMedia>

      {/* CORP registry cards */}
      <section className="corp-strip">
        <div className="corp-head">
          <span className="corp-head-label">CORP · Company registry</span>
          <h2 className="corp-head-title">MNK at a glance</h2>
        </div>
        <div className="corp-grid">
          {CORP_CARDS.map((c, i) => (
            <motion.article
              key={c.code}
              className="corp-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div className="corp-card-icon">
                <span className="corp-diamond">
                  <span className="corp-diamond-inner">{c.glyph}</span>
                </span>
              </div>
              <span className="corp-card-code">{c.code}</span>
              <div className="corp-card-val">{c.val}</div>
              <div className="corp-card-title">{c.title}</div>
              <p className="corp-card-desc">{c.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-[1400px] mx-auto">
        <MediaGallery
          items={[
            { src: TRUCK_IMAGES.highway, alt: "MNK truck on the highway", label: "Coast-to-coast lanes" },
            { src: TRUCK_IMAGES.convoy, alt: "MNK convoy on the road", label: "Fleet in motion" },
            { src: TRUCK_IMAGES.sleeper, alt: "MNK sleeper cab", label: "Late-model equipment" },
          ]}
        />
      </section>

      {/* CORP folio index */}
      <section className="corp-folio">
        <div className="corp-folio-head">
          <span className="corp-folio-label">CORP · Company folio</span>
          <h2 className="corp-folio-title">How we operate</h2>
        </div>
        <div className="corp-folio-list">
          {CORP_FOLIO.map((row, i) => (
            <motion.article
              key={row.tab}
              className="corp-folio-row"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className={`corp-folio-tab corp-folio-tab--${row.color}`}>{row.tab}</span>
              <div className="corp-folio-body">
                <h3 className="corp-folio-row-title">{row.title}</h3>
                <p className="corp-folio-row-desc">{row.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CORP seal stamps */}
      <section className="corp-seal">
        <span className="corp-seal-head-label">CORP · Certifications</span>
        <h2 className="corp-seal-head-title">Verified & compliant</h2>
        <div className="corp-seal-grid">
          {CORP_SEALS.map((s, i) => (
            <motion.div
              key={s.glyph}
              className="corp-seal-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="corp-seal-ring">
                <span className="corp-seal-glyph">{s.glyph}</span>
              </div>
              <span className="corp-seal-name">{s.name}</span>
              <p className="corp-seal-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="about-story">
        <div className="about-story__inner">
          {ABOUT_STORY_BLOCKS.map((block, i) => (
            <motion.div
              key={block.id}
              className="about-story__block"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
            >
              <MediaSplit
                image={block.image}
                alt={block.alt}
                reverse={block.reverse}
                className="about-story__split"
              >
                <div className="about-story__content">
                  <span className="about-story__label">{block.label}</span>
                  <h2 className="about-story__title">{block.title}</h2>
                  {block.paragraphs.map((text) => (
                    <p key={text.slice(0, 24)} className="about-story__text">
                      {text}
                    </p>
                  ))}
                  <div className="about-story__stats">
                    {block.stats.map((stat) => (
                      <div key={stat.label} className="about-story__stat">
                        <span className="about-story__stat-val">{stat.val}</span>
                        <span className="about-story__stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MediaSplit>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white border-y border-[var(--hairline)]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="font-display text-4xl md:text-5xl font-bold text-[var(--ink)] mb-16 text-center"
          >
            Our Core Values
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Uncompromising Safety", desc: "We never prioritize speed over safety. Vetted drivers, maintained equipment." },
              { icon: TrendingUp, title: "Data-Driven Execution", desc: "Real-time tracking and metrics drive our operational decisions." },
              { icon: Users, title: "Partnership Approach", desc: "We view brokers, shippers, and our drivers as long-term partners." }
            ].map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[var(--paper)] p-10 rounded-[20px] border border-[var(--hairline)] text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-6 border border-[var(--hairline)]">
                  <v.icon className="w-8 h-8 text-[var(--blue)]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--ink)] mb-4">{v.title}</h3>
                <p className="font-sans text-[var(--muted)]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-journey">
        <div className="about-journey__inner">
          <div className="about-journey__col">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="about-journey__label">Timeline</span>
              <h2 className="about-journey__title">The Journey</h2>
            </motion.div>

            <div className="about-journey__rail timeline-container">
              <div className="about-journey__line-bg" aria-hidden="true" />
              <div className="about-journey__line timeline-line" aria-hidden="true" />
              {JOURNEY.map((node, i) => (
                <motion.article
                  key={node.year}
                  className="about-journey__node"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="about-journey__dot" aria-hidden="true" />
                  <span className="about-journey__year">{node.year}</span>
                  <h3 className="about-journey__node-title">{node.title}</h3>
                  <p className="about-journey__node-desc">{node.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="about-journey__col">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="about-journey__label">Compliance</span>
              <h2 className="about-journey__title">Credentials</h2>
            </motion.div>

            <div className="about-creds">
              <MediaFigure
                src={TRUCK_IMAGES.yard}
                alt="MNK certified fleet at the yard"
                caption="DOT · MC · Insured operations"
                className="about-creds__media"
              />
              <div className="about-creds__panel">
                <div className="about-creds__head">
                  <strong>MNK Logistics LLC</strong>
                  <span>Active authority · Cargo & liability on file</span>
                </div>
                <ul className="about-creds__list">
                  {CREDENTIALS.map((row) => (
                    <li key={row.label}>
                      <span>{row.label}</span>
                      <strong className={"ok" in row && row.ok ? "about-creds__ok" : undefined}>
                        {"ok" in row && row.ok ? <Check size={14} aria-hidden="true" /> : null}
                        {row.val}
                      </strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
