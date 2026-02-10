'use client';

import { useLocale, useTranslations } from 'next-intl';
import PolygonCard from '@/app/components/PolygonCard';
import type { ProjectsGridSectionProps } from '@/types/sections';

export default function ProjectsGridSection({ projects }: ProjectsGridSectionProps) {
  const t = useTranslations('offer');
  const locale = useLocale();

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {t('pageTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('pageDescription')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length > 0 ? (
            <div className="lg:grid grid-cols-3 items-center justify-center gap-6">
              {projects.map((project, index) => {
                if (!project.title && !project.description) return null;
                if (!project.slug) return null;
                return (
                  <PolygonCard
                    className="w-full mb-4 h-full"
                    key={index}
                    imageUrl={project.image || undefined}
                    title={project.title || ''}
                    description={project.description || ''}
                    href={`/${locale}/oferta/${project.slug}`}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">{t('noOffers')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
