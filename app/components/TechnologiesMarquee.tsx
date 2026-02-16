"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { TechnologiesData } from "@/lib/sanity/types";

interface TechDisplayItem {
  name: string;
  logo?: any;
}

function flattenTechnologies(
  data: TechnologiesData | null,
  locale: "pl" | "en",
): TechDisplayItem[] {
  if (!data?.categories) return [];

  const result: TechDisplayItem[] = [];
  for (const category of data.categories) {
    const items = category.items;
    if (!items) continue;

    // Stary format: items to obiekt { pl: string[], en: string[] }
    if (
      !Array.isArray(items) &&
      typeof items === "object" &&
      ("pl" in items || "en" in items)
    ) {
      const legacy = items as { pl?: string[]; en?: string[] };
      const raw = legacy[locale] ?? legacy.pl ?? legacy.en ?? [];
      const arr: string[] = Array.isArray(raw) ? raw : [];
      for (const name of arr) {
        if (name) result.push({ name });
      }
      continue;
    }

    // Nowy format: items to tablica [{ name, logo }, ...]
    if (Array.isArray(items)) {
      for (const item of items) {
        if (!item) continue;
        if ("name" in item && item.name) {
          const name = item.name[locale] || item.name.pl || item.name.en || "";
          if (name) result.push({ name, logo: item.logo });
        }
      }
    }
  }
  return result;
}

function TechPill({ item }: { item: TechDisplayItem }) {
  return (
    <div className="flex items-center gap-3 px-5 py-2.5 bg-[#f5f0e8] rounded-full shrink-0 border border-[#ebe6dd] shadow-sm">
      {item.logo ? (
        <div className="relative w-6 h-6 shrink-0">
          <Image
            src={urlFor(item.logo).width(48).height(48).url()}
            alt={item.name}
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
      ) : null}
      <span className="text-slate-800 font-medium text-sm whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: TechDisplayItem[];
  direction: "left" | "right";
}) {
  if (items.length === 0) return null;

  const duplicated = [...items, ...items, ...items, ...items];
  const animationClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="overflow-hidden w-full">
      <div
        className={`flex gap-4 ${animationClass}`}
        style={{ width: "max-content" }}>
        {duplicated.map((item, i) => (
          <TechPill key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

interface TechnologiesMarqueeProps {
  data: TechnologiesData | null;
}

export default function TechnologiesMarquee({
  data,
}: TechnologiesMarqueeProps) {
  const locale = useLocale() as "pl" | "en";
  const allItems = flattenTechnologies(data, locale);

  if (allItems.length === 0) return null;

  const third = Math.ceil(allItems.length / 3);
  const row1 = allItems.slice(0, third);
  const row2 = allItems.slice(third, third * 2);
  const row3 = allItems.slice(third * 2);

  return (
    <div className="w-full space-y-4 py-8">
      <MarqueeRow items={row1} direction="left" />
      <MarqueeRow items={row2} direction="right" />
      <MarqueeRow items={row3} direction="left" />
    </div>
  );
}
