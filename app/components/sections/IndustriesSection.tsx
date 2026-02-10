'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import type { IndustriesData } from '@/lib/sanity/types';

interface IndustriesSectionProps {
  data: IndustriesData | null;
}

export default function IndustriesSection({ data }: IndustriesSectionProps) {
  const locale = useLocale();

  if (!data || !data.items || data.items.length === 0) {
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
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {data.items.map((industry, index) => {
            const industryName = industry.name?.[locale as 'pl' | 'en'] || industry.name?.pl;
            if (!industryName) return null;
            return (
              <div
                key={index}
                className="px-6 py-3 bg-blue-50 text-blue-900 rounded-full font-medium"
              >
                {industryName}
              </div>
            );
          })}
        </div>
        {data.buttonText && data.buttonLink && (
          <div className="text-center">
            <Link href={data.buttonLink}>
              <StarGradientButton>
                {data.buttonText[locale as 'pl' | 'en'] || data.buttonText.pl}
              </StarGradientButton>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
