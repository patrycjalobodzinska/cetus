'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import StarGradientButton from '@/app/components/ui/gradientBackground';

export default function CTASection() {
  const t = useTranslations('webApps.cta');
  const locale = useLocale();

  return (
    <section className="py-32 relative overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2
            className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {t('title')}
          </h2>

          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href={`/${locale}/kontakt`}>
              <StarGradientButton>
                {t('buttonText')}
              </StarGradientButton>
            </Link>
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-slate-500 text-sm">{t('emailLabel')}</p>
            <a
              href="mailto:kontakt@cetuspro.pl"
              className="text-lg font-semibold text-blue-600 hover:opacity-70 transition-opacity"
            >
              kontakt@cetuspro.pl
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
