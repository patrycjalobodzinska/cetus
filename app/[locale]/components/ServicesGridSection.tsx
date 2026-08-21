"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import {
  Monitor,
  Smartphone,
  PenTool,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Users,
  GraduationCap,
  Rocket,
  ArrowRight,
} from "lucide-react";

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
      { title: "Cetus Venture Capital", desc: "Wsparcie technologiczne i inwestycyjne dla projektów o wysokim potencjale wzrostu.", cta: "Poznaj Cetus Venture" },
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
      { title: "Cetus Venture Capital", desc: "Technology and investment support for high-growth-potential ventures.", cta: "Explore Cetus Venture" },
    ],
  },
} as const;

const ICONS = [Monitor, Smartphone, PenTool, Sparkles, ShieldCheck, RefreshCw, Users, GraduationCap, Rocket];

// Wygenerowany mockup design/artboard z placeholderami (do kafla UX/UI)
function DesignMock({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 140" className={className} aria-hidden="true" fill="none">
      {/* artboard */}
      <rect x="4" y="4" width="132" height="120" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      {/* blok hero */}
      <rect x="14" y="16" width="112" height="34" rx="6" fill="#eff6ff" />
      <rect x="22" y="26" width="44" height="6" rx="3" fill="#2563eb" />
      <rect x="22" y="37" width="66" height="5" rx="2.5" fill="#cbd5e1" />
      {/* dwa bloki layoutu */}
      <rect x="14" y="58" width="53" height="32" rx="6" fill="#f1f5f9" />
      <rect x="73" y="58" width="53" height="32" rx="6" fill="#f1f5f9" />
      <circle cx="27" cy="72" r="6" fill="#93c5fd" />
      <rect x="38" y="69" width="22" height="4" rx="2" fill="#cbd5e1" />
      {/* próbki kolorów */}
      <circle cx="20" cy="107" r="6" fill="#1d4ed8" />
      <circle cx="35" cy="107" r="6" fill="#3b82f6" />
      <circle cx="50" cy="107" r="6" fill="#93c5fd" />
      <circle cx="65" cy="107" r="6" fill="#e2e8f0" />
      {/* kursor */}
      <path
        d="M104 84 L104 112 L111 105 L116 116 L121 114 L116 103 L126 103 Z"
        fill="#0f172a"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Wygenerowany mockup ekranu telefonu z placeholderami (do kafla Aplikacje mobilne)
function PhoneMock({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 240" className={className} aria-hidden="true" fill="none">
      {/* korpus */}
      <rect x="2" y="2" width="116" height="236" rx="26" fill="#0f172a" />
      <rect x="8" y="8" width="104" height="224" rx="20" fill="#ffffff" />
      {/* notch */}
      <rect x="44" y="14" width="32" height="7" rx="3.5" fill="#0f172a" />
      {/* header */}
      <rect x="18" y="30" width="84" height="22" rx="7" fill="#2563eb" />
      <rect x="24" y="38" width="34" height="6" rx="3" fill="#ffffff" opacity="0.9" />
      {/* linie tekstu */}
      <rect x="18" y="62" width="70" height="6" rx="3" fill="#e2e8f0" />
      <rect x="18" y="74" width="84" height="6" rx="3" fill="#e2e8f0" />
      {/* karta 1 */}
      <rect x="18" y="90" width="84" height="34" rx="8" fill="#eff6ff" stroke="#dbeafe" />
      <circle cx="32" cy="107" r="7" fill="#3b82f6" />
      <rect x="46" y="100" width="46" height="5" rx="2.5" fill="#cbd5e1" />
      <rect x="46" y="110" width="34" height="5" rx="2.5" fill="#e2e8f0" />
      {/* karta 2 */}
      <rect x="18" y="130" width="84" height="34" rx="8" fill="#f8fafc" stroke="#eef2f7" />
      <circle cx="32" cy="147" r="7" fill="#93c5fd" />
      <rect x="46" y="140" width="46" height="5" rx="2.5" fill="#cbd5e1" />
      <rect x="46" y="150" width="30" height="5" rx="2.5" fill="#e2e8f0" />
      {/* dolna nawigacja */}
      <rect x="18" y="196" width="84" height="26" rx="10" fill="#f1f5f9" />
      <circle cx="34" cy="209" r="5" fill="#2563eb" />
      <circle cx="60" cy="209" r="5" fill="#cbd5e1" />
      <circle cx="86" cy="209" r="5" fill="#cbd5e1" />
    </svg>
  );
}
const SPANS = [
  "md:col-span-6 md:row-span-2",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-12",
];
// spokojna paleta: białe karty + JEDEN niebieski (feature) + JEDEN ciemny (baner)
const VARIANT = ["feature", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "banner"] as const;

export default function ServicesGridSection() {
  const locale = useLocale();
  const t = CONTENT[locale === "en" ? "en" : "pl"];

  return (
    <section className="relative py-14 lg:py-20">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-2">
            - {t.eyebrow}
          </p>
          <h2
            className="text-slate-900 text-2xl sm:text-3xl lg:text-4xl mb-2"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {t.title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm lg:text-base">{t.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(130px,auto)]">
          {t.items.map((c, i) => {
            const Icon = ICONS[i];
            const v = VARIANT[i];
            const dark = v === "feature" || v === "banner";
            const cta = "cta" in c ? c.cta : undefined;
            const chips = "chips" in c ? c.chips : undefined;

            const skin =
              v === "feature"
                ? "bg-blue-900 border-blue-800 text-white shadow-lg shadow-blue-600/20"
                : v === "banner"
                ? "bg-slate-900 border-slate-900 text-white md:flex-row md:items-center md:justify-between"
                : "bg-white border-gray-200 text-slate-900 shadow-sm hover:shadow-md hover:border-blue-200";

            return (
              <article
                key={i}
                className={`${SPANS[i]} group relative overflow-hidden rounded-2xl border p-4 sm:p-5 flex flex-col min-h-0 transition-shadow ${skin}`}
              >
                {/* feature: zdjęcie w tle + niebieskie przyciemnienie */}
                {v === "feature" && (
                  <>
                    <Image
                      src="/web_apps.jpg"
                      alt=""
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-cover object-center z-0"
                    />
                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-blue-950 via-blue-950/70 to-blue-950/15" />
                  </>
                )}

                {/* delikatny kolorowy blob w tle - dodaje ciepła */}
                {v === "plain" && (
                  <div
                    aria-hidden="true"
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl z-0 transition-transform duration-500 group-hover:scale-125"
                  />
                )}

                {/* tematyczny znak wodny ikony (tło) */}
                {v !== "banner" && i !== 1 && i !== 2 && (
                  <Icon
                    aria-hidden="true"
                    className={`absolute -bottom-6 -right-5 w-28 h-28 z-0 transition-transform duration-500 group-hover:scale-105 ${
                      dark ? "text-white/10" : "text-blue-600/[0.07]"
                    }`}
                    strokeWidth={1}
                  />
                )}

                {/* mockup telefonu (kafel Aplikacje mobilne) */}
                {i === 1 && (
                  <PhoneMock className="absolute -bottom-9 -right-2 w-24 rotate-[10deg] z-0 drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[6deg]" />
                )}

                {/* mockup design/artboard (kafel UX/UI) */}
                {i === 2 && (
                  <DesignMock className="absolute -bottom-4 -right-3 w-32 rotate-[6deg] z-0 drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[3deg]" />
                )}

                {/* treść */}
                {v === "banner" ? (
                  <>
                    <Image
                      src="/DSC_3998.JPEG"
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-cover object-[50%_40%] z-0 opacity-70"
                    />
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-slate-900/25" />
                    <div className="relative z-10 max-w-2xl">
                      <h3 className="text-xl sm:text-2xl font-bold mb-1">{c.title}</h3>
                      <p className="text-white/75 text-sm leading-snug">{c.desc}</p>
                    </div>
                    <div className="relative z-10 mt-4 md:mt-0 shrink-0">
                      <button className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm rounded-full px-5 py-3 hover:bg-blue-50 transition-colors">
                        {cta}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <Rocket aria-hidden="true" className="absolute -bottom-8 right-44 w-36 h-36 text-white/[0.06] z-0" strokeWidth={1} />
                  </>
                ) : (
                  <div className={`relative z-10 flex flex-col h-full ${v === "feature" ? "justify-end" : ""} ${i === 1 || i === 2 ? "pr-24" : ""}`}>
                    <h3 className={`font-bold mb-1.5 pr-6 ${v === "feature" ? "text-2xl sm:text-3xl" : "text-base sm:text-lg"}`}>
                      {c.title}
                    </h3>
                    <p className={`text-[13px] sm:text-sm leading-snug ${dark ? "text-white/85" : "text-slate-600"}`}>
                      {c.desc}
                    </p>
                    <div className="mt-3">
                      {cta ? (
                        <button className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold text-sm rounded-full px-4 py-2.5 hover:bg-black transition-colors">
                          {cta}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : chips ? (
                        <div className="flex flex-wrap gap-2">
                          {chips.map((chip, j) => (
                            <span
                              key={j}
                              className={`text-xs font-mono rounded-full px-3 py-1 border ${
                                dark ? "border-white/25 text-white/85" : "border-gray-200 text-slate-600"
                              }`}
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
