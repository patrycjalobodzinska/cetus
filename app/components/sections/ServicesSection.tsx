'use client';

import { useState } from 'react';
import { CheckCircle, Zap } from 'lucide-react';
import PolygonAccordion from '@/app/components/PolygonAccordion';
import { useTranslations } from 'next-intl';
import type { ServicesSectionProps } from '@/types/sections';

export default function ServicesSection({ title, services, icons, className = '' }: ServicesSectionProps) {
  const t = useTranslations('aiAutomation');
  const [activeModule, setActiveModule] = useState(0);

  return (
    <section className={`py-24 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {title}
          </h2>
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 gap-12">
          <div className="space-y-3">
            {services.map((service, index) => {
              const Icon = icons?.[index];
              const isActive = activeModule === index;
              return (
                <PolygonAccordion
                  key={index}
                  title={service.title}
                  isOpen={false}
                  onToggle={() => setActiveModule(index)}
                  variant="button"
                  icon={Icon ? <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-blue-600'}`} /> : undefined}
                  isActive={isActive}
                >
                  {null}
                </PolygonAccordion>
              );
            })}
          </div>

          <div
            style={{
              background: "linear-gradient(0deg, hsla(215, 69%, 36%, 1) 0%, hsla(190, 94%, 76%, 1) 100%)",
            }}
            className="rounded-md shadow-md shadow-blue-300 p-0.5"
          >
            <div className="space-y-6 bg-white rounded-md p-8">
              <div className="flex items-center space-x-4 mb-6">
                {icons && icons[activeModule] && (() => {
                  const Icon = icons[activeModule];
                  return (
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  );
                })()}
                <h3 className="text-2xl font-bold text-slate-900">
                  {services[activeModule]?.title}
                </h3>
              </div>

              <p className="text-slate-600 leading-relaxed mb-6">
                {services[activeModule]?.description}
              </p>

              {services[activeModule]?.applications && services[activeModule].applications.length > 0 && (
                <div className="bg-linear-to-br from-slate-50 to-white rounded-2xl p-6 border border-blue-100">
                  <h4 className="text-lg font-bold text-slate-900 mb-4">
                    {t('services.applicationsLabel')}
                  </h4>
                  <ul className="space-y-3">
                    {services[activeModule].applications.map((app, appIndex) => (
                      <li
                        key={appIndex}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 shrink-0" />
                        <span className="text-slate-700 text-sm">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {services[activeModule]?.effect && (
                <div className="bg-linear-to-r from-blue-50 to-blue-50 p-6 rounded-2xl border border-blue-100">
                  <p className="text-slate-900 font-semibold flex items-center">
                    <Zap className="w-5 h-5 text-blue-600 mr-2" />
                    {t('services.effectLabel')} {services[activeModule].effect}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              {services[activeModule]?.title}
            </h3>
            <div className="flex items-center justify-center gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveModule(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeModule === index
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Przejdź do usługi ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
