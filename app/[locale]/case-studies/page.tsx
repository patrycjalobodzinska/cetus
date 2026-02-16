import { client } from '@/sanity/lib/client';
import MethodologySection from './components/MethodologySection';
import CaseStudyItem from './components/CaseStudyItem';
import { getTranslations } from 'next-intl/server';
import CTASection from '@/app/components/CTASection';

interface CaseStudy {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
  category?: string;
  description?: string;
  solution?: string;
  image?: any;
}

export default async function CaseStudiesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'caseStudies' });

  let caseStudies: CaseStudy[] = [];

  try {
    caseStudies = await client.fetch<CaseStudy[]>(`*[_type == "caseStudy"] | order(_createdAt desc) {
      _id,
      "title": coalesce(title[$locale], title.pl),
      slug,
      "category": coalesce(category[$locale], category.pl),
      "description": coalesce(description[$locale], description.pl),
      "solution": coalesce(solution[$locale], solution.pl),
      image
    }`, { locale });
  } catch (error) {
    console.error('Error fetching case studies:', error);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
 <MethodologySection />



      {/* Methodology Section */}

    <div className="flex flex-col z-30 pt-12 items-center justify-center relative">
            <div className="relative">
              <h2
                className="heading-hero tracking-tighter text-slate-900 text-center"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                <span>{t('hero.titlePrefix')} </span>
                <span className="text-blue-600">{t('hero.titleHighlight')}</span>
              </h2>
            </div>

            <div className="space-y-2 items-center justify-center flex flex-col max-w-xl relative w-full px-4 mt-8">
              <p className="text-lg lg:text-xl text-slate-600 leading-relaxed text-center">
                {t('hero.description')}
              </p>
            </div>
          </div>

      {/* Case Studies List */}
      {caseStudies && caseStudies.length > 0 ? (
        <>
          {caseStudies.map((study, index) => (
            <CaseStudyItem key={study._id} caseStudy={study} index={index} />
          ))}
        </>
      ) : (
        <section className="py-24 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">{t('noCaseStudies')}</p>
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={t('cta.title')}
        description={t('cta.description')}
        buttonText={t('cta.buttonText')}
        buttonLink="/kontakt"
        className="md:py-24 py-12"
      />
    </div>
  );
}
