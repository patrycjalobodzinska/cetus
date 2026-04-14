'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { FileDown, Shield, CheckCircle, Award } from 'lucide-react';
import StarGradientButton from '@/app/components/ui/gradientBackground';

export default function PolitikaJakosciPage() {
  const locale = useLocale();
  const t = useTranslations('qualityPolicy');

  const guarantees = [0, 1, 2, 3, 4, 5, 6].map((i) => t(`guarantees.${i}`));
  const directions = [0, 1, 2].map((i) => t(`directions.${i}`));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-x-hidden max-w-[100vw] w-full flex flex-col items-center justify-start overflow-hidden">
        <div className="pt-[var(--page-top-offset)] w-full justify-center container mx-auto pb-12 flex flex-col items-center relative overflow-x-hidden px-4">
          <div className="flex flex-col z-30 items-center justify-center relative max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-8">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1
              className="heading-hero tracking-tighter text-slate-900 mb-6"
              style={{ fontFamily: 'var(--font-michroma)' }}
            >
              {t('title')} <span className="text-blue-600">{t('titleHighlight')}</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 md:p-10 mb-12">
            <p className="text-lg text-slate-700 leading-relaxed">
              {t('introduction')}
            </p>
          </div>

          {/* Guarantees */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-7 h-7 text-blue-600 shrink-0" />
              <h2 className="heading-3 text-slate-900">
                {t('guaranteesTitle')}
              </h2>
            </div>
            <div className="space-y-4">
              {guarantees.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-600/30 transition-all duration-300"
                >
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-slate-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Directions */}
          <div className="mb-16">
            <h2 className="heading-3 text-slate-900 mb-6">
              {t('directionsTitle')}
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {t('directionsDescription')}
            </p>
            <div className="grid gap-4">
              {directions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-gradient-to-r from-blue-50 to-transparent rounded-xl border border-blue-100"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Statement */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-8 md:p-10 text-white mb-12">
            <p className="text-lg leading-relaxed text-white/95">
              {t('statement')}
            </p>
            <div className="mt-6 pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between gap-4">
              <p className="text-white/80">{t('statementDate')}</p>
              <p className="text-white font-semibold">{t('statementAuthor')}</p>
            </div>
          </div>

          {/* Download PDF */}
          <div className="text-center">
            <a
              href="/documents/polityka-jakosci.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StarGradientButton>
                <span className="flex items-center gap-2">
                  <FileDown className="w-5 h-5" />
                  {t('downloadPdf')}
                </span>
              </StarGradientButton>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
