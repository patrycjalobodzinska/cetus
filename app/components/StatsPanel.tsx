"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function StatsPanel() {
  const t = useTranslations("stats");

  const stats = [
    { key: "projects", count: Number(t("projects.count")) },
    { key: "clients", count: Number(t("clients.count")) },
    { key: "experts", count: Number(t("experts.count")) },
    { key: "experience", count: Number(t("experience.count")) },
  ];

  return (
    <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12 lg:mb-6">
      <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-gray-200/70 bg-white/80 backdrop-blur-md p-6 md:p-8 shadow-[0_20px_50px_-24px_rgba(30,58,138,0.35)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.key}
              className={`group flex flex-col items-center text-center px-2 md:px-6 ${
                i > 0 ? "md:border-l md:border-gray-100" : ""
              }`}
            >
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums bg-gradient-to-br from-blue-600 to-sky-400 bg-clip-text text-transparent">
                <span aria-hidden="true">{stat.count}+</span>
                <span className="sr-only">Ponad {stat.count}</span>
              </div>
              <span className="mt-3 h-1 w-8 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 opacity-70 transition-all duration-300 group-hover:w-12 group-hover:opacity-100" />
              <div className="mt-3 text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {t(`${stat.key}.title`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
