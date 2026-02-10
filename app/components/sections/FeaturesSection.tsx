'use client';

import PolygonAccordion from '@/app/components/PolygonAccordion';
import type { FeaturesSectionProps } from '@/types/sections';

export default function FeaturesSection({ title, features, icons, className = '' }: FeaturesSectionProps) {
  return (
    <section className={`lg:py-24 py-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-3">
            {features.map((feature, index) => {
              const Icon = icons?.[index];
              return (
                <PolygonAccordion
                  key={index}
                  title={feature.title}
                  isOpen={false}
                  onToggle={() => {}}
                  icon={Icon ? <Icon className="w-6 h-6 text-blue-600" /> : undefined}
                >
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </PolygonAccordion>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12 h-full min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  {icons && icons[0] && (() => {
                    const Icon = icons[0];
                    return <Icon className="w-12 h-12 text-white" />;
                  })()}
                </div>
                <p className="text-slate-600 text-lg">Wybierz funkcję, aby zobaczyć szczegóły</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
