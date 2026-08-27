import type { ReactNode } from "react";

interface SectionHeadingProps {
  /** krótka etykieta nad tytułem, renderowana jako "- ETYKIETA" */
  eyebrow?: string;
  title: string;
  lead?: string;
  /** np. link "Wszystkie realizacje" pod leadem */
  children?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

/**
 * Nagłówek sekcji w układzie ze strony głównej: niebieski nadtytuł, tytuł
 * w Michromie (`section-title`) i lead. Trzymamy go w jednym komponencie,
 * żeby podstrony nie rozjeżdżały się z home przy kolejnych zmianach.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  children,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "text-center" : "text-left"} ${className}`.trim()}
    >
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">
          - {eyebrow}
        </p>
      )}
      <h2 className="section-title text-slate-900 mb-3">{title}</h2>
      {lead && (
        <p
          className={`text-lg text-slate-600 leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      )}
      {children}
    </div>
  );
}
