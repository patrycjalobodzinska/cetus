"use client";

import { useLocale } from "next-intl";
import { ShieldCheck, Gauge, Users, LifeBuoy } from "lucide-react";

const CONTENT = {
  pl: {
    eyebrow: "Dlaczego my",
    claimPre: "Pewność, że ",
    claimHl: "wszystko zadziała.",
    para: "Zostajemy odpowiedzialni za rezultat - od pierwszego audytu po lata utrzymania.",
    points: [
      { t: "Odpowiedzialność za wynik", d: "Bierzemy na siebie efekt biznesowy, nie tylko dostarczenie kodu." },
      { t: "Przewidywalność", d: "Jasny zakres, budżet i harmonogram - bez niespodzianek." },
      { t: "Stały zespół", d: "Ci sami inżynierowie i jeden opiekun przez cały projekt." },
      { t: "Ciągłość", d: "Utrzymanie, rozwój i wsparcie z gwarancjami SLA po wdrożeniu." },
    ],
  },
  en: {
    eyebrow: "Why us",
    claimPre: "Certainty that ",
    claimHl: "everything works.",
    para: "We stay accountable for the outcome - from the first audit to years of maintenance.",
    points: [
      { t: "Accountable for outcomes", d: "We own the business result, not just code delivery." },
      { t: "Predictability", d: "Clear scope, budget and timeline - no surprises." },
      { t: "A stable team", d: "The same engineers and one lead throughout the project." },
      { t: "Continuity", d: "Maintenance, growth and support with SLA guarantees after go-live." },
    ],
  },
} as const;

const ICONS = [ShieldCheck, Gauge, Users, LifeBuoy];

export default function WhyUsSection() {
  const locale = useLocale();
  const t = CONTENT[locale === "en" ? "en" : "pl"];

  return (
    <section className="relative flex min-h-[min(100vh,1000px)] flex-col justify-center overflow-hidden py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Teza */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                {t.eyebrow}
              </span>
            </div>
            <h2 className="font-extrabold tracking-tight leading-[1.1] text-3xl sm:text-4xl">
              <span className="text-slate-900">{t.claimPre}</span>
              <span className="text-blue-600">{t.claimHl}</span>
            </h2>
            <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-md">
              {t.para}
            </p>
          </div>

          {/* Punkty */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
              {t.points.map((p, i) => {
                const Icon = ICONS[i];
                return (
                  <div key={i} className="group relative overflow-hidden bg-white p-6 lg:p-7 transition-colors hover:bg-blue-50/40">
                    {/* ikona jako znak wodny w tle */}
                    <Icon
                      aria-hidden="true"
                      className="absolute -bottom-4 -right-3 w-24 h-24 text-blue-600/[0.07] z-0 transition-transform duration-500 group-hover:scale-110"
                      strokeWidth={1}
                    />
                    <div className="relative z-10">
                      <h3 className="text-base font-bold text-slate-900 mb-1.5">{p.t}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{p.d}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
