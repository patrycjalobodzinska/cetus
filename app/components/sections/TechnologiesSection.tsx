'use client';

import { useLocale } from 'next-intl';
import type { TechnologiesData } from '@/lib/sanity/types';

interface TechnologiesSectionProps {
  data: TechnologiesData | null;
}

export default function TechnologiesSection({ data }: TechnologiesSectionProps) {
  const locale = useLocale();

  if (!data || !data.categories || data.categories.length === 0) {
    return null;
  }

  return (
    <section className="py-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {data.title?.[locale as 'pl' | 'en'] || data.title?.pl}
          </h2>
          {data.description && (
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {data.description[locale as 'pl' | 'en'] || data.description.pl}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-8 mx-auto">
          <div className="grid md:grid-cols-2 w-full max-w-5xl gap-8">
            {data.categories.map((category, index) => {
              const categoryTitle = category.title?.[locale as 'pl' | 'en'] || category.title?.pl;
              const categoryItems = category.items?.[locale as 'pl' | 'en'] || category.items?.pl || [];
              if (!categoryTitle || categoryItems.length === 0) return null;
              return (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4" lang="en">
                    {categoryTitle}
                  </h3>
                  <ul className="space-y-2">
                    {categoryItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-slate-600" lang="en">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

