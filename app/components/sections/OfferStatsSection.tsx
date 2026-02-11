'use client';

import { useLocale } from 'next-intl';
import StatsPanel from '@/app/components/StatsPanel';
import type { OfferStatsData } from '@/lib/sanity/types';

interface OfferStatsSectionProps {
  data: OfferStatsData | null;
}

export default function OfferStatsSection({ data }: OfferStatsSectionProps) {
  const locale = useLocale();

  if (!data) {
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
        <StatsPanel />
      </div>
    </section>
  );
}

