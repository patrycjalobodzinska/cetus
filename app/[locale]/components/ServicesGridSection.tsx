"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import Slider from "../../components/Slider";
import {
  Monitor,
  Smartphone,
  PenTool,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Users,
  GraduationCap,
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

const ICONS = [Monitor, Smartphone, PenTool, Sparkles, ShieldCheck, RefreshCw, Users, GraduationCap];

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
// Mockup sieci neuronowej / AI (kafel "AI i automatyzacja")
function AiMock({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 24, y: 30 }, { x: 24, y: 70 }, { x: 24, y: 110 },
    { x: 75, y: 50 }, { x: 75, y: 90 },
    { x: 126, y: 70 },
  ];
  const edges: [number, number][] = [
    [0, 3], [0, 4], [1, 3], [1, 4], [2, 3], [2, 4], [3, 5], [4, 5],
  ];
  return (
    <svg viewBox="0 0 150 140" className={className} aria-hidden="true" fill="none">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="#93c5fd" strokeWidth="1.5"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i} cx={n.x} cy={n.y} r={i === 5 ? 9 : 7}
          fill={i === 5 ? "#2563eb" : "#ffffff"}
          stroke="#2563eb" strokeWidth="2"
        />
      ))}
      {/* iskra */}
      <path d="M126 62 l3 6 6 1 -4 4 1 6 -6 -3 -6 3 1 -6 -4 -4 6 -1 z" fill="#38bdf8" />
    </svg>
  );
}

// Mockup tarczy / bezpieczeństwa (kafel "Cybersecurity")
function CyberMock({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 150" className={className} aria-hidden="true" fill="none">
      {/* tarcza */}
      <path
        d="M70 8 L124 28 V74 C124 108 100 130 70 142 C40 130 16 108 16 74 V28 Z"
        fill="#eff6ff" stroke="#2563eb" strokeWidth="3"
      />
      {/* kłódka */}
      <rect x="52" y="66" width="36" height="30" rx="6" fill="#2563eb" />
      <path d="M58 66 v-8 a12 12 0 0 1 24 0 v8" stroke="#1d4ed8" strokeWidth="4" fill="none" />
      <circle cx="70" cy="79" r="4.5" fill="#ffffff" />
      <rect x="68" y="79" width="4" height="9" rx="2" fill="#ffffff" />
      {/* linia skanu */}
      <line x1="28" y1="52" x2="112" y2="52" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 6" />
    </svg>
  );
}

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
  "md:col-span-4 md:row-span-2",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
];
// spokojna paleta: białe karty + JEDEN niebieski (feature)
const VARIANT = ["feature", "plain", "plain", "plain", "plain", "plain", "plain", "plain"] as const;

type Item = { title: string; desc: string; chips?: readonly string[]; cta?: string };

// Pojedyncza karta usługi (współdzielona: bento na desktopie + slider na mobile)
function Tile({ c, i, layoutClass }: { c: Item; i: number; layoutClass: string }) {
  const Icon = ICONS[i];
  const v = VARIANT[i];
  const dark = v === "feature";
  const chips = c.chips;

  const skin =
    v === "feature"
      ? "bg-blue-900 border-blue-800 text-white shadow-lg shadow-blue-600/20"
      : "bg-white border-gray-200 text-slate-900 shadow-sm hover:shadow-md hover:border-blue-200";

  return (
    <article
      className={`${layoutClass} group relative h-full overflow-hidden rounded-2xl border p-4 sm:p-5 flex flex-col min-h-0 transition-shadow ${skin}`}
    >
      {v === "feature" && (
        <>
          <Image
            src="/career_2.jpg"
            alt=""
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover object-center z-0 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-blue-950 via-blue-950/70 to-blue-950/20" />
        </>
      )}

      {v === "plain" && (
        <div
          aria-hidden="true"
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl z-0 transition-transform duration-500 group-hover:scale-125"
        />
      )}

      {i !== 1 && i !== 2 && i !== 3 && i !== 4 && (
        <Icon
          aria-hidden="true"
          className={`absolute -bottom-6 -right-5 w-28 h-28 z-0 transition-transform duration-500 group-hover:scale-105 ${
            dark ? "text-white/10" : "text-blue-600/[0.07]"
          }`}
          strokeWidth={1}
        />
      )}

      {i === 1 && (
        <PhoneMock className="absolute -bottom-9 right-6 w-24 rotate-[10deg] z-0 drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[6deg]" />
      )}
      {i === 2 && (
        <DesignMock className="absolute -bottom-4 -right-3 w-32 rotate-[6deg] z-0 drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[3deg]" />
      )}
      {i === 3 && (
        <AiMock className="absolute -bottom-3 -right-3 w-32 z-0 drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105" />
      )}
      {i === 4 && (
        <CyberMock className="absolute -bottom-4 -right-3 w-28 z-0 drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105" />
      )}

      <div
        className={`relative z-10 flex flex-col h-full ${v === "feature" ? "justify-end" : ""} ${
          i === 1 || i === 2 || i === 3 || i === 4 ? "pr-20" : ""
        }`}
      >
        <h3
          className={`font-bold mb-1.5 pr-6 ${
            v === "feature" ? "text-2xl sm:text-3xl" : "text-base sm:text-lg"
          }`}
        >
          {c.title}
        </h3>
        <p
          className={`text-[13px] sm:text-sm leading-snug ${
            dark ? "text-white/85" : "text-slate-600"
          }`}
        >
          {c.desc}
        </p>
        {chips ? (
          <div className="mt-3 flex flex-wrap gap-2">
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
    </article>
  );
}

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

        {/* Desktop: bento */}
        <div className="hidden md:grid grid-cols-12 gap-4 auto-rows-auto [grid-template-rows:180px_180px_auto]">
          {t.items.map((c, i) => (
            <Tile key={i} c={c} i={i} layoutClass={SPANS[i]} />
          ))}
        </div>

        {/* Mobile: slider ze strzałkami i kropkami */}
        <Slider className="md:hidden" slideWidth="85%">
          {t.items.map((c, i) => (
            <Tile key={i} c={c} i={i} layoutClass="min-h-[190px]" />
          ))}
        </Slider>
      </div>
    </section>
  );
}
