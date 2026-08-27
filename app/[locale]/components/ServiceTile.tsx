"use client";

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

/**
 * Kafel usługi - jeden komponent dla sekcji „Co robimy" na stronie głównej
 * i dla siatki na /oferta. Ikony, makiety i układ bento wybierane są po
 * indeksie, a kolejność usług jest w obu miejscach identyczna (osiem tych
 * samych obszarów), więc te same indeksy dają ten sam wygląd.
 */
const ICONS = [Monitor, Smartphone, PenTool, Sparkles, ShieldCheck, RefreshCw, Users, GraduationCap];

// Mockup przeglądarki / dashboardu (kafel flagowy "Aplikacje webowe")
function BrowserMock({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={className} aria-hidden="true" fill="none">
      {/* okno */}
      <rect x="1" y="1" width="318" height="218" rx="16" fill="#ffffff" />
      {/* pasek */}
      <rect x="1" y="1" width="318" height="30" rx="16" fill="#f1f5f9" />
      <rect x="1" y="16" width="318" height="15" fill="#f1f5f9" />
      <circle cx="20" cy="16" r="4" fill="#f87171" />
      <circle cx="35" cy="16" r="4" fill="#fbbf24" />
      <circle cx="50" cy="16" r="4" fill="#34d399" />
      <rect x="80" y="10" width="180" height="12" rx="6" fill="#e2e8f0" />
      {/* sidebar */}
      <rect x="1" y="31" width="70" height="188" fill="#eff6ff" />
      <rect x="16" y="48" width="40" height="8" rx="4" fill="#2563eb" />
      <rect x="16" y="68" width="40" height="7" rx="3.5" fill="#bfdbfe" />
      <rect x="16" y="84" width="40" height="7" rx="3.5" fill="#bfdbfe" />
      <rect x="16" y="100" width="40" height="7" rx="3.5" fill="#bfdbfe" />
      {/* KPI */}
      <rect x="86" y="46" width="70" height="44" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
      <rect x="164" y="46" width="70" height="44" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
      <rect x="242" y="46" width="66" height="44" rx="10" fill="#2563eb" />
      <rect x="98" y="56" width="30" height="7" rx="3.5" fill="#cbd5e1" />
      <rect x="98" y="70" width="42" height="11" rx="5.5" fill="#1d4ed8" />
      <rect x="176" y="56" width="30" height="7" rx="3.5" fill="#cbd5e1" />
      <rect x="176" y="70" width="42" height="11" rx="5.5" fill="#334155" />
      <rect x="254" y="56" width="26" height="7" rx="3.5" fill="#bfdbfe" />
      <rect x="254" y="70" width="38" height="11" rx="5.5" fill="#ffffff" />
      {/* wykres */}
      <rect x="86" y="100" width="222" height="104" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
      <path
        d="M100 178 L134 156 L166 166 L200 132 L234 146 L268 116 L296 128"
        stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M100 178 L134 156 L166 166 L200 132 L234 146 L268 116 L296 128 L296 196 L100 196 Z"
        fill="#2563eb" fillOpacity="0.1"
      />
      {[100, 134, 166, 200, 234, 268, 296].map((cx, idx) => (
        <circle key={idx} cx={cx} cy={[178, 156, 166, 132, 146, 116, 128][idx]} r="3" fill="#2563eb" />
      ))}
    </svg>
  );
}

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
  "md:col-span-5 md:row-span-2",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
];
// Slugi podstron /oferta/* w tej samej kolejności co usługi - te same osiem
// obszarów co na /oferta, więc indeks kafla wskazuje jego podstronę.
const SLUGS = [
  "aplikacje-webowe",
  "aplikacje-mobilne",
  "ui-ux-design",
  "aI-i-automatyzacja-procesow",
  "cybersecurity",
  "transformacja-technologiczna",
  "outsourcing-programistow",
  "akademia-i-szkolenia",
] as const;

// spokojna paleta: białe karty + JEDEN niebieski (feature)
const VARIANT = ["feature", "plain", "plain", "plain", "plain", "plain", "plain", "plain"] as const;

type Item = { title: string; desc: string; chips?: readonly string[]; cta?: string };

// Pojedyncza karta usługi (współdzielona: bento na desktopie + slider na mobile)
function Tile({
  c,
  i,
  layoutClass,
  eyebrow,
}: {
  c: Item;
  i: number;
  layoutClass: string;
  eyebrow?: string;
}) {
  const Icon = ICONS[i];
  const v = VARIANT[i];
  const dark = v === "feature";
  const chips = c.chips;

  const skin =
    v === "feature"
      ? "bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white shadow-xl shadow-blue-900/30"
      : "bg-white text-slate-900 shadow-sm hover:shadow-md";

  return (
    <article
      // Kafel jest zawsze linkiem (home i /oferta), więc dostaje stan wskazania:
      // delikatne uniesienie + mocniejszy cień. W Tailwind 4 `-translate-y-*`
      // ustawia właściwość `translate`, dlatego jest ona wymieniona w transition.
      className={`${layoutClass} group relative h-full overflow-hidden rounded-2xl p-4 sm:p-5 flex flex-col min-h-0 transition-[translate,box-shadow] duration-200 ease-out hover:-translate-y-1 ${skin}`}
    >
      {v === "feature" && (
        <>
          {/* subtelna siatka + poświata */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute -top-16 -right-10 z-0 h-56 w-56 rounded-full bg-blue-500/30 blur-3xl" />
          <BrowserMock className="absolute -bottom-8 -right-8 w-[62%] max-w-[300px] rotate-[4deg] z-0 drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[2deg]" />
        </>
      )}

      {v === "plain" && (
        <div
          aria-hidden="true"
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl z-0 transition-transform duration-500 group-hover:scale-125"
        />
      )}

      {i !== 1 && i !== 2 && (
        <Icon
          aria-hidden="true"
          className={`absolute -bottom-6 -right-5 w-28 h-28 z-0 transition-transform duration-500 group-hover:scale-105 ${
            dark ? "text-white/10" : "text-blue-600/[0.07]"
          }`}
          strokeWidth={1}
        />
      )}

      {i === 1 && (
        <PhoneMock className="absolute -bottom-9 -right-2 w-24 rotate-[10deg] z-0 drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[6deg]" />
      )}
      {i === 2 && (
        <DesignMock className="absolute -bottom-4 -right-3 w-32 rotate-[6deg] z-0 drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[3deg]" />
      )}

      <div
        className={`relative z-10 flex flex-col h-full ${
          i === 1 || i === 2 ? "pr-24" : ""
        }`}
      >
        {eyebrow && (
          <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-blue-300">
            {eyebrow}
          </span>
        )}
        <h3
          className={`font-bold mb-1.5 pr-6 ${
            v === "feature" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
          }`}
        >
          {c.title}
        </h3>
        <p
          className={`text-sm sm:text-base leading-snug ${
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

export { SPANS, VARIANT, SLUGS };
export type { Item };
export default Tile;
