import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useDriverApplication } from "../context/DriverApplicationContext";
import { MediaFigure, MediaGallery, PageHeroMedia } from "../components/PageMedia";
import { TRUCK_IMAGES } from "../constants/truck-images";

const FLT_TICKETS = [
  { code: "PAY-01", icon: "$0.70", unit: "per mile", iconClass: "", title: "Weekly pay", desc: "Direct deposit every Friday — no holdbacks, no surprises." },
  { code: "FLT-02", icon: "2024", unit: "model year", iconClass: "flt-ticket-icon--blue", title: "Fleet", desc: "Late-model Freightliner & Volvo sleepers, governed at 68 mph." },
  { code: "HTM-03", icon: "2 & 3", unit: "out & home", iconClass: "flt-ticket-icon--dark", title: "Home time", desc: "Guaranteed home time based on your lane — typical 2 weeks out, 3 home." },
  { code: "LSE-04", icon: "90", unit: "day program", iconClass: "", title: "Lease purchase", desc: "Walk-away lease purchase available after 90 days of company driving." },
];

const FLT_DOCKS = [
  { num: "01", title: "Call recruiting", val: "(412) 729-2000", desc: "Speak to a recruiter Mon–Fri, 8am–6pm EST.", href: "tel:+14127292000" },
  { num: "02", title: "Email resume", val: "drivers@mnklogistics.com", desc: "Send CDL, MVR, and work history — reply within 24 hrs.", href: "mailto:drivers@mnklogistics.com" },
  { num: "03", title: "Orientation", val: "3 days", desc: "Paid orientation at our Carnegie, PA terminal — hotel covered." },
  { num: "04", title: "First dispatch", val: "Day 4", desc: "Assigned a dedicated dispatcher who knows your lane prefs." },
  { num: "05", title: "Rider policy", val: "Pets OK", desc: "One pet under 40 lbs allowed after 30 days with deposit." },
  { num: "06", title: "Referral bonus", val: "$1,000", desc: "Paid after your referral completes 90 days on the road." },
];

const FLT_LANES = [
  { id: "LN-01", from: "CHI", to: "DAL", meta: "Open · OTR" },
  { id: "LN-02", from: "ATL", to: "MIA", meta: "Open · Regional" },
  { id: "LN-03", from: "LAX", to: "PHX", meta: "Open · OTR" },
  { id: "LN-04", from: "HOU", to: "DEN", meta: "Open · OTR" },
  { id: "LN-05", from: "MEM", to: "NYC", meta: "Limited · OTR" },
];

const FLT_SPECS = [
  { type: "SPEC-A", name: "Freightliner Cascadia", rows: [["Year", "2022–2024"], ["Engine", "Detroit DD15"], ["Governor", "68 mph"], ["APU", "Yes"]] },
  { type: "SPEC-B", name: "Volvo VNL 760", rows: [["Year", "2023–2024"], ["Engine", "Volvo D13"], ["Governor", "68 mph"], ["Fridge", "Yes"]] },
  { type: "SPEC-C", name: "Trailer Fleet", rows: [["Dry Van", "53 ft"], ["Reefer", "53 ft"], ["Flatbed", "48 ft"], ["Avg Age", "< 3 yrs"]] },
];

const FLT_PERKS = [
  { val: "$0.70", label: "CPM starting" },
  { val: "Fri", label: "Weekly deposit" },
  { val: "68", label: "Mph governed" },
  { val: "2wk", label: "Typical out" },
];

const REQUIREMENTS = [
  "Valid CDL-A License",
  "Minimum 1 year OTR experience",
  "23+ years of age",
  "Clean MVR (Motor Vehicle Record)",
  "No DUI / DWI in last 5 years",
];

export function Drivers() {
  const { open: openApplication } = useDriverApplication();

  return (
    <div className="w-full bg-[var(--paper)]">

      <PageHeroMedia image={TRUCK_IMAGES.sleeper} blur={9} className="pt-32 pb-24 text-center">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-sm font-bold tracking-widest text-[var(--red)] mb-6 bg-white/10 inline-block px-4 py-2 rounded-full">
            COMPANY DRIVER · CDL-A
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-[80px] md:text-[120px] font-bold text-[var(--red)] tracking-tighter leading-none mb-6"
          >
            $0.70 <span className="text-4xl md:text-6xl text-white">/ MILE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="font-sans text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            Drive late-model equipment, get home when promised, and get paid weekly. No games, just freight.
          </motion.p>
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
            className="dap-hero-apply"
            onClick={openApplication}
          >
            Start application →
          </motion.button>
        </div>
      </PageHeroMedia>

      <section className="flt-strip">
        <div className="flt-head">
          <span className="flt-head-label">FLT · Driver program</span>
          <h2 className="flt-head-title">What you actually get</h2>
        </div>
        <div className="flt-grid">
          {FLT_TICKETS.map((t, i) => (
            <motion.article
              key={t.code}
              className="flt-ticket"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
            >
              <span className="flt-ticket-notch" aria-hidden="true" />
              <div className="flt-ticket-code">{t.code}</div>
              <div className={`flt-ticket-icon ${t.iconClass}`}>{t.icon}</div>
              <div className="flt-ticket-unit">{t.unit}</div>
              <div className="flt-ticket-title">{t.title}</div>
              <p className="flt-ticket-desc">{t.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="flt-join">
        <div className="flt-join__top">
          <MediaFigure
            src={TRUCK_IMAGES.fleetLine}
            alt="MNK trucks ready for dispatch"
            caption="Fleet · Ready to roll"
            className="flt-join__media"
          />
          <div className="flt-join__reqs">
            <h2 className="flt-join__heading">Minimum requirements</h2>
            <ul className="flt-req-list flt-req-list--grid">
              {REQUIREMENTS.map((req, i) => (
                <motion.li
                  key={req}
                  className="flt-req-item"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="flt-req-check">✓</span>
                  {req}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flt-join__perks">
          {FLT_PERKS.map((p) => (
            <div key={p.label} className="flt-join__perk">
              <span className="flt-join__perk-val">{p.val}</span>
              <span className="flt-join__perk-label">{p.label}</span>
            </div>
          ))}
        </div>

        <div className="flt-join__dock">
          <div className="flt-recruit-head">
            <span className="flt-recruit-label">FLT · Recruiting dock</span>
            <h2 className="flt-recruit-title">How to join the fleet</h2>
          </div>
          <div className="flt-recruit-grid flt-recruit-grid--wide">
            {FLT_DOCKS.map((d, i) => (
              <motion.article
                key={d.num}
                className="flt-dock"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {d.href ? (
                  <a href={d.href} className="flt-dock-link">
                    <span className="flt-dock-num">{d.num}</span>
                    <div className="flt-dock-body">
                      <span className="flt-dock-title">{d.title}</span>
                      <span className="flt-dock-val">{d.val}</span>
                      <p className="flt-dock-desc">{d.desc}</p>
                    </div>
                  </a>
                ) : (
                  <>
                    <span className="flt-dock-num">{d.num}</span>
                    <div className="flt-dock-body">
                      <span className="flt-dock-title">{d.title}</span>
                      <span className="flt-dock-val">{d.val}</span>
                      <p className="flt-dock-desc">{d.desc}</p>
                    </div>
                  </>
                )}
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          className="flt-join__cta"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flt-join__cta-copy">
            <strong>Ready to roll?</strong>
            <p>Start your CDL-A application online — recruiting replies within one business day.</p>
          </div>
          <button type="button" className="flt-join__cta-btn" onClick={openApplication}>
            Apply now →
          </button>
        </motion.div>
      </section>

      <section className="flt-lanes">
        <span className="flt-lanes-label">FLT · Active lanes</span>
        <h2 className="flt-lanes-title">Routes we're hiring for</h2>
        <div className="flt-lanes-track">
          {FLT_LANES.map((l, i) => (
            <motion.div
              key={l.id}
              className="flt-lane"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <span className="flt-lane-id">{l.id}</span>
              <span className="flt-lane-route">{l.from}<span>→</span>{l.to}</span>
              <span className="flt-lane-meta">{l.meta}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="flt-spec">
        <span className="flt-spec-label">FLT · Equipment specs</span>
        <h2 className="flt-spec-title">What you'll drive</h2>
        <div className="px-4 md:px-8 max-w-[1400px] mx-auto mb-10">
          <MediaGallery
            items={[
              { src: TRUCK_IMAGES.sleeper, alt: "Freightliner sleeper cab", label: "Sleeper tractors" },
              { src: TRUCK_IMAGES.yard, alt: "Trailers at the yard", label: "Trailer fleet" },
              { src: TRUCK_IMAGES.convoy, alt: "Trucks in convoy", label: "On the road" },
            ]}
          />
        </div>
        <div className="flt-spec-grid">
          {FLT_SPECS.map((s, i) => (
            <motion.article
              key={s.type}
              className="flt-spec-sheet"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flt-spec-type">{s.type}</div>
              <div className="flt-spec-name">{s.name}</div>
              <div className="flt-spec-rows">
                {s.rows.map(([k, v]) => (
                  <div key={k} className="flt-spec-row">
                    <span>{k}</span>
                    <strong>{v}</strong>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="py-24 bg-[var(--surface)] border-y border-[var(--hairline)]">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-display text-4xl font-bold text-[var(--ink)] mb-12 text-center">Driver FAQ</h2>
          <Accordion.Root type="single" collapsible className="space-y-4">
            {[
              { q: "How often do you pay?", a: "We pay weekly via direct deposit every Friday for all loads completed by Tuesday." },
              { q: "What is your home time policy?", a: "We guarantee home time based on your route preferences. Typical OTR drivers are out 2 weeks, home 3 days." },
              { q: "Are trucks governed?", a: "Yes, our late-model Freightliner and Volvo sleepers are governed at 68 mph for safety and fuel efficiency." },
              { q: "Do you offer lease purchase?", a: "Yes, we have a walk-away lease purchase program available after 90 days of company driving." },
              { q: "Can I take my truck home?", a: "Yes, as long as you have a secure, legal place to park it during your home time." },
            ].map((faq, i) => (
              <Accordion.Item key={i} value={`driver-faq-${i}`} className="border-b border-[var(--hairline)]">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between py-6 text-left font-display text-2xl font-bold text-[var(--ink)] hover:text-[var(--blue)] transition-colors [&[data-state=open]>svg]:rotate-180">
                    {faq.q}
                    <ChevronDown className="text-[var(--muted)] transition-transform duration-300" size={24} />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-lg data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                  <div className="pb-6 text-[var(--muted)] font-sans">{faq.a}</div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>
    </div>
  );
}
