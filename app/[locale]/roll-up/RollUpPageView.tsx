"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  Code2,
  Smartphone,
  BrainCircuit,
  Network,
  ShieldCheck,
  ArrowRight,
  Briefcase,
  GraduationCap,
  ChevronDown,
  Linkedin,
  Instagram,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import StarGradientButton from "@/app/components/ui/gradientBackground";

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShow(true));
    const hideTimer = setTimeout(() => setHide(true), 1900);
    const doneTimer = setTimeout(onFinish, 2500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] overflow-hidden bg-white transition-opacity duration-700 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}>
      <div
        className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] max-w-[90vw] max-h-[90vw] rounded-full bg-blue-100/70 blur-3xl transition-opacity duration-1000 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`pointer-events-none absolute top-[15%] left-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-blue-200/50 blur-2xl transition-all duration-1000 delay-200 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      />
      <div
        className={`pointer-events-none absolute bottom-[15%] right-[10%] w-40 h-40 md:w-56 md:h-56 rounded-full bg-blue-300/30 blur-2xl transition-all duration-1000 delay-300 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      />

      <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
        <div className="relative flex flex-col items-center gap-5">
          <div className="relative">
            <div
              className={`absolute -inset-6 md:-inset-10 rounded-full bg-blue-400/20 blur-2xl transition-opacity duration-1000 delay-200 ${
                show ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="relative overflow-hidden">
              <div
                className={`transition-all duration-1000 ease-out ${
                  show
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-3 scale-95"
                }`}
                style={{
                  clipPath: show ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                  transition:
                    "clip-path 1100ms cubic-bezier(0.7, 0, 0.3, 1), opacity 700ms ease-out, transform 1000ms ease-out",
                }}>
                <Image
                  src="/logocetus.png"
                  alt="CetusPro"
                  width={280}
                  height={94}
                  priority
                  className="w-48 md:w-72 h-auto relative"
                />
              </div>
              <div
                className={`absolute top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_12px_2px_rgba(59,130,246,0.6)] transition-all ${
                  show ? "splash-sweep" : "opacity-0"
                }`}
              />
            </div>
          </div>

          <div className="relative w-48 md:w-72 h-[2px] rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 rounded-full transition-all duration-[900ms] ease-out delay-500 ${
                show ? "w-full" : "w-0"
              }`}
            />
          </div>

          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full bg-blue-500 transition-all duration-500 ${
                  show ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                style={{ transitionDelay: `${900 + i * 120}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes splashSweep {
          0% {
            left: 0%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        .splash-sweep {
          animation: splashSweep 1100ms cubic-bezier(0.7, 0, 0.3, 1) both;
        }
      `}</style>
    </div>
  );
}

const POLYGON_CLIP =
  "polygon(0% 0px, 20px 0%, 95% 0%, 100% 20px, 100% 80%, 100% 100%, calc(100% - 20px) 100%, 5% 100%, 0% 80%)";

const ICON_MAP: Record<string, LucideIcon> = {
  code: Code2,
  smartphone: Smartphone,
  brain: BrainCircuit,
  network: Network,
  shield: ShieldCheck,
  briefcase: Briefcase,
  graduation: GraduationCap,
};

export interface RollUpStat {
  value: string;
  label: string;
}

export interface RollUpService {
  title: string;
  description?: string;
  icon?: string;
  link?: string;
}

export interface RollUpData {
  heroTitle?: string;
  heroTitleHighlight?: string;
  heroDescription?: string;
  stats: RollUpStat[];
  sectionTitle?: string;
  sectionTitleHighlight?: string;
  sectionSubtitle?: string;
  businessTitle?: string;
  businessSubtitle?: string;
  businessDescription?: string;
  businessServices: RollUpService[];
  businessPrimaryButtonText?: string;
  businessPrimaryButtonLink?: string;
  businessSecondaryButtonText?: string;
  businessSecondaryButtonLink?: string;
  careerTitle?: string;
  careerSubtitle?: string;
  careerDescription?: string;
  careerBullets: string[];
  careerCtaText?: string;
  careerCtaLink?: string;
  trustedLabel?: string;
  trustedDisplayMode?: "text" | "cards";
  trustedClients?: string;
  trustedCards: TrustedCard[];
}

export interface TrustedCard {
  name: string;
  logoUrl?: string;
  url?: string;
}

interface ScenarioCardProps {
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function ScenarioCard({
  isOpen,
  onToggle,
  icon,
  title,
  subtitle,
  children,
}: ScenarioCardProps) {
  return (
    <div
      className="relative w-full max-w-full min-w-0"
      style={{ clipPath: POLYGON_CLIP }}>
      <div
        className="p-px rounded-md w-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.5) 0%, rgba(147, 197, 253, 0.5) 100%)",
          clipPath: POLYGON_CLIP,
        }}>
        <div
          className="bg-white rounded-md w-full"
          style={{ clipPath: POLYGON_CLIP }}>
          <button
            onClick={onToggle}
            aria-expanded={isOpen}
            className="w-full text-left cursor-pointer p-4 md:p-6 flex items-center gap-3 md:gap-4 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
            <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="text-sm md:text-lg font-bold text-slate-900 leading-snug break-words"
                style={{ fontFamily: "var(--font-michroma)" }}>
                {title}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 mt-1 break-words">
                {subtitle}
              </p>
            </div>
            <ChevronDown
              className={`w-5 h-5 md:w-6 md:h-6 text-blue-600 transition-transform duration-300 shrink-0 ${
                isOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          <div
            className={`grid transition-all duration-500 ease-in-out ${
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}>
            <div className="overflow-hidden min-w-0">
              <div className="px-4 md:px-6 pb-6 pt-0 min-w-0">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function resolveLink(link: string | undefined, locale: string): string {
  if (!link) return `/${locale}`;
  if (
    link.startsWith("http://") ||
    link.startsWith("https://") ||
    link.startsWith("mailto:") ||
    link.startsWith("tel:")
  ) {
    return link;
  }
  return link.startsWith("/") ? `/${locale}${link}` : `/${locale}/${link}`;
}

const CONTEST_END = new Date("2026-05-27T00:00:00+02:00");

function ContestSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const diff = CONTEST_END.getTime() - Date.now();
      if (diff <= 0) {
        setVisible(false);
        return false;
      }
      setVisible(true);
      return true;
    };
    if (!check()) return;
    const id = setInterval(() => {
      if (!check()) clearInterval(id);
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <section className="pb-3 md:pb-5 overflow-x-hidden">
      <div className="max-w-3xl mx-auto px-0 sm:px-2">
        <div className="relative w-full max-w-full min-w-0 rounded-md overflow-hidden">
          <div
            className="p-px rounded-md w-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.6) 0%, rgba(168, 85, 247, 0.6) 100%)",
            }}>
            <div className="bg-white rounded-md w-full">
              <div className="p-4 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider">
                    <Trophy
                      className="w-3 h-3 md:w-3.5 md:h-3.5"
                      aria-hidden="true"
                    />
                    Konkurs
                  </div>
                </div>

                <h2
                  className="heading-1 text-slate-900 mb-2 md:mb-3 break-words"
                  style={{ fontFamily: "var(--font-michroma)" }}>
                  KONKURS przy stoisku{" "}
                  <span className="text-blue-600">Cetus Pro</span>
                </h2>
                <p className="text-sm md:text-base text-slate-600 mb-5">
                  Career Days WSIiZ Rzeszów - wygraj dostęp do Claude&apos;a,
                  jednego z najmocniejszych modeli językowych na rynku.
                </p>

                <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-5">
                  Jeśli interesuje Was praca z AI, zaglądajcie do nas. Nie ma
                  Was na targach? Też możecie wziąć udział online - ale liczy
                  się czas, konkurs trwa <strong>dokładnie 24 godziny</strong>{" "}
                  od publikacji posta.
                </p>

                <div className="mb-5">
                  <h3 className="text-xs md:text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
                    Do wygrania
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-white">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                        <Trophy
                          className="w-4 h-4 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 text-sm">
                          1 miesiąc Claude Premium
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-white">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                        <Trophy
                          className="w-4 h-4 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 text-sm">
                          5 miesięcy Claude w planie podstawowym
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mb-5 p-4 md:p-5 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
                  <h3 className="text-xs md:text-sm uppercase tracking-widest text-blue-600 font-semibold mb-2">
                    Pytanie konkursowe
                  </h3>
                  <p className="text-slate-900 text-sm md:text-base font-medium leading-relaxed break-words">
                    Jak myślisz - jaką jedną umiejętność warto rozwinąć w 2026
                    roku, żeby AI był Twoim partnerem w pracy, a nie
                    konkurencją?
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xs md:text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3">
                    Zasady udziału
                  </h3>
                  <ol className="space-y-3">
                    {[
                      "Zaobserwuj profil Cetus Pro na LinkedIn",
                      "Zostaw komentarz pod postem z odpowiedzią na pytanie konkursowe",
                      "Zrób repost posta na swoim profilu, oznaczając cetuspro.com oraz Wyższą Szkołę Informatyki i Zarządzania w Rzeszowie",
                    ].map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-slate-700 text-sm md:text-base break-words">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-row gap-2">
                  <a
                    href="https://www.linkedin.com/posts/cetuspro_careerdays-wsiiz-cetuspro-activity-7464945971693674496-0IQn?utm_source=share&utm_medium=member_desktop&rcm=ACoAADYGHCYBImMg4-rM-tyysDAwP6kIJvOBKAQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Weź udział na LinkedIn"
                    className="group flex items-center justify-center gap-2 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg px-3 py-2 text-white text-sm font-semibold hover:opacity-90 transition-opacity flex-1 min-w-0">
                    <Linkedin className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Weź udział</span>
                  </a>
                  <a
                    href="https://www.instagram.com/p/DYyzvfDN6aW/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Weź udział na Instagramie"
                    className="group flex items-center justify-center gap-2 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg px-3 py-2 text-white text-sm font-semibold hover:opacity-90 transition-opacity flex-1 min-w-0">
                    <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Weź udział</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RollUpPageView({ data }: { data: RollUpData }) {
  const locale = useLocale();
  const [openSection, setOpenSection] = useState<"business" | "career" | null>(
    null,
  );
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const original = document.body.style.overflow;
    if (!splashDone) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [splashDone]);

  const toggle = (section: "business" | "career") => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const isCareerExternal = !!(
    data.careerCtaLink &&
    (data.careerCtaLink.startsWith("http://") ||
      data.careerCtaLink.startsWith("https://"))
  );

  return (
    <>
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
      <main className="min-h-screen overflow-x-hidden">
        <section className="relative overflow-x-hidden max-w-[100vw] w-full flex flex-col items-center justify-start overflow-hidden">
          <div className="pt-32 md:pt-40 w-full justify-center container mx-auto pb-6 md:pb-10 flex flex-col items-center relative px-4">
            <ContestSection />
            <div className="flex flex-col z-30 items-center justify-center relative max-w-4xl mx-auto text-center">
              {(data.heroTitle || data.heroTitleHighlight) && (
                <h1
                  className="heading-hero tracking-tighter text-slate-900 mb-3 md:mb-5 break-words max-w-full"
                  style={{ fontFamily: "var(--font-michroma)" }}>
                  {data.heroTitle}
                  {data.heroTitle && data.heroTitleHighlight && " "}
                  {data.heroTitleHighlight && (
                    <span className="text-blue-600">
                      {data.heroTitleHighlight}
                    </span>
                  )}
                </h1>
              )}
              {data.heroDescription && (
                <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
                  {data.heroDescription}
                </p>
              )}
            </div>

            {data.stats.length > 0 && (
              <div className="relative w-full mx-auto mt-6 md:mt-10">
                <div className="relative max-w-3xl mx-auto px-4">
                  <div
                    className="relative w-full py-4 md:py-5 bg-gray-50 border border-gray-100 text-gray-900 flex items-center justify-around px-4 sm:px-8 drop-shadow-xl stats-polygon"
                    style={{
                      filter:
                        "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))",
                    }}>
                    <div
                      className="relative w-full grid gap-2 md:gap-6"
                      style={{
                        gridTemplateColumns: `repeat(${data.stats.length}, minmax(0, 1fr))`,
                      }}>
                      {data.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center text-center">
                          <div className="text-2xl md:text-4xl font-medium text-gray-900 tracking-wider leading-none">
                            {stat.value}+
                          </div>
                          <div className="text-[10px] md:text-xs text-gray-500 mt-1 font-medium tracking-wide uppercase">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-2 md:py-16 overflow-x-hidden">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {(data.sectionTitle ||
              data.sectionTitleHighlight ||
              data.sectionSubtitle) && (
              <div className="text-center mb-4 md:mb-10">
                <div className="w-12 md:w-16 h-1 bg-blue-600 rounded-full mx-auto mb-3 md:mb-5" />
                {(data.sectionTitle || data.sectionTitleHighlight) && (
                  <h2
                    className="heading-1 text-slate-900 mb-1 md:mb-2 break-words max-w-full"
                    style={{ fontFamily: "var(--font-michroma)" }}>
                    {data.sectionTitle}
                    {data.sectionTitle && data.sectionTitleHighlight && " "}
                    {data.sectionTitleHighlight && (
                      <span className="text-blue-600">
                        {data.sectionTitleHighlight}
                      </span>
                    )}
                  </h2>
                )}
                {data.sectionSubtitle && (
                  <p className="text-sm md:text-base text-slate-600">
                    {data.sectionSubtitle}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-4">
              <ScenarioCard
                isOpen={openSection === "business"}
                onToggle={() => toggle("business")}
                icon={
                  <Briefcase
                    className="w-6 h-6 md:w-7 md:h-7 text-blue-600"
                    aria-hidden="true"
                  />
                }
                title={data.businessTitle || ""}
                subtitle={data.businessSubtitle || ""}>
                {data.businessDescription && (
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-5">
                    {data.businessDescription}
                  </p>
                )}

                {data.businessServices.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {data.businessServices.map((service, idx) => {
                      const Icon =
                        (service.icon && ICON_MAP[service.icon]) || Code2;
                      return (
                        <li key={idx}>
                          <Link
                            href={resolveLink(service.link, locale)}
                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-blue-600/30 hover:shadow-sm transition-all group/item">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                              <Icon
                                className="w-4 h-4 text-blue-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-900 text-sm">
                                {service.title}
                              </p>
                              {service.description && (
                                <p className="text-xs text-slate-500 hidden sm:block">
                                  {service.description}
                                </p>
                              )}
                            </div>
                            <ArrowRight
                              className="w-4 h-4 text-slate-400 group-hover/item:text-blue-600 group-hover/item:translate-x-1 transition-all shrink-0"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {(data.businessPrimaryButtonText ||
                  data.businessSecondaryButtonText) && (
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    {data.businessPrimaryButtonText && (
                      <Link
                        href={resolveLink(
                          data.businessPrimaryButtonLink,
                          locale,
                        )}
                        className="w-full sm:w-auto">
                        <StarGradientButton>
                          <span className="flex items-center gap-2 justify-center">
                            {data.businessPrimaryButtonText}
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </StarGradientButton>
                      </Link>
                    )}
                    {data.businessSecondaryButtonText && (
                      <Link
                        href={resolveLink(
                          data.businessSecondaryButtonLink,
                          locale,
                        )}
                        className="w-full sm:w-auto text-center px-6 py-3 text-blue-600 font-semibold hover:opacity-70 transition-opacity text-sm md:text-base">
                        {data.businessSecondaryButtonText}
                      </Link>
                    )}
                  </div>
                )}
              </ScenarioCard>

              <ScenarioCard
                isOpen={openSection === "career"}
                onToggle={() => toggle("career")}
                icon={
                  <GraduationCap
                    className="w-6 h-6 md:w-7 md:h-7 text-blue-600"
                    aria-hidden="true"
                  />
                }
                title={data.careerTitle || ""}
                subtitle={data.careerSubtitle || ""}>
                {data.careerDescription && (
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-5">
                    {data.careerDescription}
                  </p>
                )}

                {data.careerBullets.length > 0 && (
                  <ul className="space-y-3 mb-6">
                    {data.careerBullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span className="text-slate-700 text-sm md:text-base">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {data.careerCtaText && data.careerCtaLink && (
                  <a
                    href={data.careerCtaLink}
                    target={isCareerExternal ? "_blank" : undefined}
                    rel={isCareerExternal ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-2 bg-linear-to-br from-blue-600 to-blue-500 rounded-xl px-4 md:px-5 py-4 text-white hover:opacity-90 transition-opacity w-full min-w-0">
                    <span className="font-semibold text-sm md:text-base min-w-0 break-words">
                      {data.careerCtaText}
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
                  </a>
                )}
              </ScenarioCard>
            </div>
          </div>
        </section>

        {(() => {
          const mode = data.trustedDisplayMode || "text";
          const hasText = mode === "text" && !!data.trustedClients;
          const hasCards = mode === "cards" && data.trustedCards.length > 0;
          if (!data.trustedLabel && !hasText && !hasCards) return null;
          return (
            <section className="py-8 md:py-12 overflow-x-hidden">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {data.trustedLabel && (
                  <p className="text-xs md:text-sm uppercase tracking-widest text-blue-600 font-semibold mb-3 md:mb-6">
                    {data.trustedLabel}
                  </p>
                )}
                {hasText && (
                  <p
                    className="text-sm md:text-lg text-slate-900 font-bold leading-relaxed"
                    style={{ fontFamily: "var(--font-michroma)" }}>
                    {data.trustedClients}
                  </p>
                )}
                {hasCards && (
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mt-2">
                    {data.trustedCards.map((card, idx) => {
                      const inner = (
                        <div className="h-20 md:h-24 rounded-xl border border-gray-100 bg-white hover:border-blue-600/30 hover:shadow-sm transition-all flex items-center justify-center p-3 md:p-4">
                          {card.logoUrl ? (
                            <Image
                              src={card.logoUrl}
                              alt={card.name}
                              width={160}
                              height={64}
                              className="max-h-full max-w-full w-auto h-auto object-contain"
                            />
                          ) : (
                            <span className="text-sm md:text-base font-semibold text-slate-700 text-center break-words">
                              {card.name}
                            </span>
                          )}
                        </div>
                      );
                      return (
                        <li key={idx}>
                          {card.url ? (
                            <a
                              href={card.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={card.name}
                              className="block">
                              {inner}
                            </a>
                          ) : (
                            inner
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </section>
          );
        })()}
      </main>
    </>
  );
}
