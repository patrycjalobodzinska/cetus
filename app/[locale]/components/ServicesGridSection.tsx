"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import Tile, { SPANS, SLUGS } from "./ServiceTile";

const CONTENT = {
  pl: {
    eyebrow: "Usługi",
    title: "Co robimy",
    sub: "Pełen zakres inżynierii oprogramowania - od produktu, przez rozwój, po utrzymanie systemów krytycznych.",
    items: [
      { title: "Aplikacje webowe", desc: "Skalowalne platformy dla procesów krytycznych - wydajne, bezpieczne i gotowe na wzrost.", chips: [".NET Core", "React", "Azure", "AWS", "Google Cloud"] },
      { title: "Aplikacje mobilne", desc: "iOS i Android klasy produkcyjnej, spójne z ekosystemem systemów." },
      { title: "Fast Prototyping", desc: "Klikalny prototyp i projekt interfejsu w kilka dni - zanim powstanie pierwsza linijka kodu." },
      { title: "AI i automatyzacja", desc: "Agenci, integracje LLM i automatyzacja pracy tam, gdzie realnie skraca koszt procesu." },
      { title: "Cybersecurity", desc: "Audyty, testy i zgodność z wymogami regulacyjnymi." },
      { title: "Outsourcing programistów", desc: "Doświadczone zespoły w Waszym procesie, z governance." },
      { title: "Akademia i szkolenia", desc: "Rozwój kompetencji technologicznych dla zespołów." },
    ],
  },
  en: {
    eyebrow: "Services",
    title: "What we do",
    sub: "The full scope of software engineering - from product, through growth, to maintaining critical systems.",
    items: [
      { title: "Web applications", desc: "Scalable platforms for critical processes - performant, secure and ready to grow.", chips: [".NET Core", "React", "Azure", "AWS", "Google Cloud"] },
      { title: "Mobile applications", desc: "Production-grade iOS and Android, aligned with your systems ecosystem." },
      { title: "Fast Prototyping", desc: "A clickable prototype and interface design in days - before the first line of code." },
      { title: "AI & automation", desc: "Agents, LLM integrations and automation where it truly cuts process cost." },
      { title: "Cybersecurity", desc: "Audits, tests and regulatory compliance." },
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

        {/* Desktop: bento. Każdy kafel prowadzi do swojej podstrony /oferta/*,
            tak samo jak siatka na /oferta - kolejność usług jest identyczna,
            więc indeks kafla wskazuje jego slug. */}
        {/* Wiersze rosną z treścią (`minmax`), bo sztywne 190 px ucinało opisy
            w wąskich kaflach na md - kafel ma `overflow-hidden`. */}
        <div className="hidden auto-rows-[minmax(150px,auto)] grid-cols-12 gap-4 md:grid">
          {t.items.map((c, i) => (
            <Link
              key={i}
              href={`/${locale}/oferta/${SLUGS[i]}`}
              aria-label={c.title}
              className={`${SPANS[i]} group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded-2xl`}
            >
              <Tile c={c} i={i} layoutClass="h-full" eyebrow={i === 0 ? featureEyebrow : undefined} />
            </Link>
          ))}
        </div>

        {/* Mobile: siatka 2 kolumn zamiast slidera. Slider chował sześć z siedmiu
            usług za przewijaniem w bok, którego część użytkowników nie zauważa -
            w siatce cała oferta jest widoczna od razu. Kafel flagowy zostaje na
            pełną szerokość, bo ma plakietki technologii i największą makietę. */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {t.items.map((c, i) => (
            <Link
              key={i}
              href={`/${locale}/oferta/${SLUGS[i]}`}
              aria-label={c.title}
              className={`group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                i === 0 ? "col-span-2" : ""
              }`}
            >
              <Tile
                c={c}
                i={i}
                layoutClass={`h-full ${i === 0 ? "min-h-[220px]" : "min-h-[180px]"}`}
                eyebrow={i === 0 ? featureEyebrow : undefined}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
