'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ProcessSection() {
  const t = useTranslations('home.process');
  const locale = useLocale();

  const steps = [
    { key: 'audit' },
    { key: 'roadmap' },
    { key: 'management' },
    { key: 'acceptance' },
    { key: 'maintenance' }
  ];

  return (
    <section className="md:py-24 py-12  relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h2
            className="heading-1 text-slate-900 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {t('title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/case-studies`}>

              <StarGradientButton> {t('cta.caseStudies')}
              </StarGradientButton>
            </Link>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0">
            <div className="absolute inset-0 border-t-2 border-dashed border-gray-300"></div>
            {steps.map((_, index) => (
              <div
                key={index}
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"
                style={{
                  left: `${(index + 1) * (100 / (steps.length + 1))}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              ></div>
            ))}
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => {
              const clipPath = "polygon(17% 0, 100% 0, 100% 89%, 83% 100%, 0 100%, 0 11%)";

              return (
                <div
                  key={step.key}
                  className="group"
                >
                  <div
                    style={{
                        //clipPath: clipPath,
                      background: "linear-gradient(0deg, hsla(215, 69%, 36%, 1) 0%, hsla(190, 94%, 76%, 1) 100%)",
                    }}
                    className="rounded-2xl shadow-md shadow-blue-300/50 p-0.5 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-400/50 h-full"
                  >
                    <div
                      className="bg-white rounded-2xl p-6 h-full flex flex-col"
                      style={{
                   //     clipPath: clipPath
                      }}
                    >
                      {/* Step Header */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          {t(`steps.${step.key}.stepLabel`)}
                        </span>
                      </div>

                      {/* Question */}
                      <p className="text-sm text-slate-500 mb-3 italic">
                        {t(`steps.${step.key}.question`)}
                      </p>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {t(`steps.${step.key}.title`)}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 leading-relaxed flex-1">
                        {t(`steps.${step.key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

