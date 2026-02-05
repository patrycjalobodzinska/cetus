'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import StarGradientButton from '@/app/components/ui/gradientBackground';

export default function HomeCTASection() {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <section className="py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8"></div>

          <h2
            className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {t('getStarted')}
          </h2>

          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('contactUs')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href={`/${locale}/kontakt`}>
              <StarGradientButton>
                {t('letsTalk')}
              </StarGradientButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
