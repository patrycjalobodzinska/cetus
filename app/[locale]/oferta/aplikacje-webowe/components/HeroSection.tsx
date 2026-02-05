'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import StarGradientButton from '@/app/components/ui/gradientBackground';

export default function HeroSection() {
  const t = useTranslations('webApps');
  const locale = useLocale();

  return (
    <section className="relative overflow-x-hidden max-w-[100vw] w-full flex flex-col items-center justify-start overflow-hidden">
      <div className="mt-36 w-full justify-center container mx-auto pb-12 flex flex-col lg:flex-row items-center relative overflow-x-hidden">
        <div className="flex flex-col z-30 lg:pt-10 xl:pt-0 items-center justify-center relative px-4 lg:pl-10 lg:pr-0">
          <div className="relative lg:min-h-[280px] xl:min-h-[320px]">
            <h1
              className="text-4xl lg:text-7xl tracking-tighter text-slate-900 leading-[0.9] font-bold text-center"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              <div className="flex items-center justify-center gap-4 min-h-[1.2em]">
                <span>{t('hero.title')}</span>
              </div>
              <span className="block text-slate-900 min-h-[1.2em] text-center">
                <span className="text-blue-600">{t('hero.highlight')}</span>
                <span>{t('hero.subtitle')}</span>
              </span>
            </h1>
          </div>

          <div className="space-y-2 items-center justify-center flex flex-col max-w-lg relative w-full px-4 mt-8">
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed text-center">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href={`/${locale}/kontakt`}>
                <StarGradientButton>
                  {t('hero.buttonText')}
                </StarGradientButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
