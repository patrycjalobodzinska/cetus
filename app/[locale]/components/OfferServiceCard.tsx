import Link from "next/link";
import {
  ArrowUpRight,
  GraduationCap,
  Monitor,
  PenTool,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Karta usługi na /oferta - ten sam język wizualny co kafelki „Co robimy"
 * na stronie głównej: biała karta, poświata w narożniku, duża wodna ikona
 * i strzałka. Pierwsza karta dostaje ciemny wariant flagowy, żeby siatka
 * miała punkt wejścia, tak samo jak na stronie głównej.
 *
 * Kolejność ikon jest zgodna z kolejnością usług w messages → offer.projects,
 * czyli identyczna jak w ServicesGridSection.
 */
const ICONS: LucideIcon[] = [
  Monitor,
  Smartphone,
  PenTool,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Users,
  GraduationCap,
];

export default function OfferServiceCard({
  index,
  title,
  description,
  href,
  cta,
  feature = false,
}: {
  index: number;
  title: string;
  description: string;
  href: string;
  cta: string;
  feature?: boolean;
}) {
  const Icon = ICONS[index % ICONS.length];

  const skin = feature
    ? "border-blue-900/40 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white shadow-xl shadow-blue-900/25"
    : "border-slate-200 bg-white text-slate-900 shadow-sm hover:border-blue-200 hover:shadow-md";

  return (
    <Link
      href={href}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 ${skin}`}
    >
      {feature ? (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0 z-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <span
            aria-hidden="true"
            className="absolute -right-10 -top-16 z-0 h-56 w-56 rounded-full bg-blue-500/30 blur-3xl"
          />
        </>
      ) : (
        <span
          aria-hidden="true"
          className="absolute -right-10 -top-10 z-0 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl transition-transform duration-500 ease-out group-hover:scale-125"
        />
      )}

      <Icon
        aria-hidden="true"
        strokeWidth={1}
        className={`absolute -bottom-6 -right-5 z-0 h-28 w-28 transition-transform duration-500 ease-out group-hover:scale-105 ${
          feature ? "text-white/10" : "text-blue-600/[0.07]"
        }`}
      />

      <div className="relative z-10 flex h-full flex-col">
        <h3 className="pr-6 text-lg font-bold leading-snug lg:text-xl">{title}</h3>
        <p
          className={`mt-3 flex-1 text-sm leading-relaxed ${
            feature ? "text-blue-100" : "text-slate-600"
          }`}
        >
          {description}
        </p>
        <span
          className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${
            feature ? "text-white" : "text-slate-900 group-hover:text-blue-600"
          } transition-colors duration-200 ease-out`}
        >
          {cta}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
