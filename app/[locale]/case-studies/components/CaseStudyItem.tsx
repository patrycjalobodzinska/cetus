'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import { useTranslations, useLocale } from 'next-intl';

interface CaseStudyItemProps {
  caseStudy: {
    _id: string;
    title?: string;
    slug?: {
      current: string;
    };
    category?: string;
    description?: string;
    image?: any;
    solution?: string;
  };
  index: number;
}

export default function CaseStudyItem({ caseStudy, index }: CaseStudyItemProps) {
  const t = useTranslations('caseStudies');
  const locale = useLocale();
  const isEven = index % 2 === 0;

  if (!caseStudy.slug?.current) return null;

  return (
    <section className={`md:py-24 py-12 `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
          {/* Text Content */}
          <div className={`${!isEven ? 'lg:col-start-2' : ''}`}>
            {caseStudy.category && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-blue-600 rounded-full text-xs font-medium mb-6">
                {caseStudy.category}
              </div>
            )}

            {caseStudy.title && (
              <h2
                className="heading-1 text-slate-900 mb-6 leading-tight"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                {caseStudy.title}
              </h2>
            )}

            {caseStudy.description && (
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {caseStudy.description}
              </p>
            )}

            {caseStudy.solution && (
              <>
                <p className="text-lg font-semibold text-slate-900 mb-4">
                  {t('effect')}
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {caseStudy.solution}
                </p>
              </>
            )}

            <div className="mb-8">
              <p className="text-slate-600 mb-4">
                {t('cta.text')}
              </p>
              <Link href={`/${locale}/case-studies/${caseStudy.slug.current}`}>
                <StarGradientButton>
                  {t('cta.button')}
                </StarGradientButton>
              </Link>
            </div>
          </div>

          {/* Image/Mockup */}
          <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            {caseStudy.image && (
              <div className="relative">
                <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-3 shadow-2xl">
                  <div className="relative bg-black rounded-lg p-2">
                    <div className="relative bg-white rounded-sm overflow-hidden aspect-[16/10]">
                      <img
                        src={urlFor(caseStudy.image).width(1200).height(750).url()}
                        alt={caseStudy.title || 'Case Study'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

