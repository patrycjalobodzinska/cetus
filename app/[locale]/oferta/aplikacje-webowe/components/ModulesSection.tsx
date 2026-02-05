'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import PolygonAccordion from '@/app/components/PolygonAccordion';
import { getIcon } from '../utils/moduleIcons';
import ModulePreviewCard from './ModulePreviewCard';

export default function ModulesSection() {
  const t = useTranslations('webApps.modules');
  const [activeModule, setActiveModule] = useState(0);

  const modules = [
    { icon: 'lock', key: 'security' },
    { icon: 'wallet', key: 'payments' },
    { icon: 'message-circle', key: 'communication' },
    { icon: 'map', key: 'navigation' },
    { icon: 'bar-chart', key: 'analytics' },
    { icon: 'palette', key: 'personalization' }
  ].map(module => ({
    icon: module.icon,
    title: t(`${module.key}.title`),
    items: [
      t(`${module.key}.item1`),
      t(`${module.key}.item2`),
      t(`${module.key}.item3`),
      t(`${module.key}.item4`)
    ]
  }));

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {t('title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-3">
            {modules.map((module, index) => {
              const Icon = getIcon(module.icon);
              const isActive = activeModule === index;

              return (
                <PolygonAccordion
                  key={index}
                  title={module.title}
                  isOpen={false}
                  onToggle={() => setActiveModule(index)}
                  variant="button"
                  icon={<Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-blue-600'}`} />}
                  isActive={isActive}
                >
                  {null}
                </PolygonAccordion>
              );
            })}
          </div>

          <ModulePreviewCard activeModule={activeModule} modules={modules} />
        </div>
      </div>
    </section>
  );
}
