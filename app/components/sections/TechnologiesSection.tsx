'use client';

import { useLocale } from 'next-intl';
import TechnologiesMarquee from '@/app/components/TechnologiesMarquee';
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
    <section className="py-24 border-t border-gray-200 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="heading-1 text-slate-900 mb-6"
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
        <TechnologiesMarquee data={data} />
      </div>
    </section>
  );
}

