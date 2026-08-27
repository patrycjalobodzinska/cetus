"use client";

import { useLocale } from "next-intl";
import Slider from "../../components/Slider";
import Tile, { SPANS } from "./ServiceTile";

const CONTENT = {
  pl: {
    eyebrow: "Usługi",
    title: "Co robimy",
    sub: "Pełen zakres inżynierii oprogramowania - od produktu, przez rozwój, po utrzymanie systemów krytycznych.",
    items: [
      { title: "Aplikacje webowe", desc: "Skalowalne platformy dla procesów krytycznych - wydajne, bezpieczne i gotowe na wzrost.", chips: [".NET Core", "React", "Azure"] },
      { title: "Aplikacje mobilne", desc: "iOS i Android klasy produkcyjnej, spójne z ekosystemem systemów." },
      { title: "UX/UI Design", desc: "Warsztaty, prototypy i projekt interfejsu przed linijką kodu." },
      { title: "AI i automatyzacja", desc: "Agenci, integracje LLM i automatyzacja pracy tam, gdzie realnie skraca koszt procesu." },
      { title: "Cybersecurity", desc: "Audyty, hardening i zgodność z wymogami regulacyjnymi.", chips: ["Pentesty", "RODO", "SOC"] },
      { title: "Transformacja technologiczna", desc: "Modernizacja legacy i migracje do chmury - bez przestojów." },
      { title: "Outsourcing programistów", desc: "Doświadczone zespoły w Waszym procesie, z governance." },
      { title: "Akademia i szkolenia", desc: "Rozwój kompetencji technologicznych dla zespołów." },
    ],
  },
  en: {
    eyebrow: "Services",
    title: "What we do",
    sub: "The full scope of software engineering - from product, through growth, to maintaining critical systems.",
    items: [
      { title: "Web applications", desc: "Scalable platforms for critical processes - performant, secure and ready to grow.", chips: [".NET Core", "React", "Azure"] },
      { title: "Mobile applications", desc: "Production-grade iOS and Android, aligned with your systems ecosystem." },
      { title: "UX/UI Design", desc: "Workshops, prototypes and interface design before a line of code." },
      { title: "AI & automation", desc: "Agents, LLM integrations and automation where it truly cuts process cost." },
      { title: "Cybersecurity", desc: "Audits, hardening and regulatory compliance.", chips: ["Pentests", "GDPR", "SOC"] },
      { title: "Technology transformation", desc: "Legacy modernization and cloud migration - no downtime." },
      { title: "Developer outsourcing", desc: "Experienced teams in your process, with governance." },
      { title: "Academy & training", desc: "Technology skill development for teams." },
    ],
  },
} as const;


export default function ServicesGridSection() {
  const locale = useLocale();
  const t = CONTENT[locale === "en" ? "en" : "pl"];
  const featureEyebrow = locale === "en" ? "Flagship service" : "Usługa flagowa";

  return (
    <section className="section-y relative flex flex-col justify-center lg:min-h-[min(100vh,1000px)]">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">
            - {t.eyebrow}
          </p>
          <h2
            className="section-title text-slate-900 mb-2"
          >
            {t.title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm lg:text-base">{t.sub}</p>
        </div>

        {/* Desktop: bento */}
        <div className="hidden md:grid grid-cols-12 gap-4 auto-rows-auto [grid-template-rows:190px_190px_auto]">
          {t.items.map((c, i) => (
            <Tile key={i} c={c} i={i} layoutClass={SPANS[i]} eyebrow={i === 0 ? featureEyebrow : undefined} />
          ))}
        </div>

        {/* Mobile: slider ze strzałkami i kropkami */}
        <Slider className="md:hidden" slideWidth="85%" ariaLabel="Co robimy">
          {t.items.map((c, i) => (
            <Tile key={i} c={c} i={i} layoutClass="min-h-[220px]" eyebrow={i === 0 ? featureEyebrow : undefined} />
          ))}
        </Slider>
      </div>
    </section>
  );
}
