'use client';

import { useTranslations } from 'next-intl';

export default function WhyFeaturesSection() {
  const t = useTranslations('webApps.whyFeatures');

  const features = [
    { key: 'modernTech' },
    { key: 'responsiveDesign' },
    { key: 'performance' },
    { key: 'security' },
    { key: 'seo' },
    { key: 'support' }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {t('title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-600/30"
            >
              <div className="relative p-8">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                  {t(`${feature.key}.title`)}
                </h3>

                <p className="text-lg text-slate-600 leading-relaxed">
                  {t(`${feature.key}.description`)}
                </p>

                <div className="mt-6 h-1 w-16 bg-blue-600 rounded-full group-hover:w-24 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
