import { client } from '@/sanity/lib/client';
import CaseStudyItem from './components/CaseStudyItem';
import { getTranslations } from 'next-intl/server';

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
    <div className="relative flex min-h-screen flex-col items-center">
      <div className="w-full max-w-7xl">
        {/* ── Hero - poświaty jak w hero strony głównej; tło niesie body ── */}
        <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
          <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-[var(--page-top-offset)] sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 top-10 z-0 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/3 z-0 h-[30rem] w-[30rem] rounded-full bg-sky-300/20 blur-3xl"
            />

            <div className="relative z-10 flex flex-col items-center justify-center">
              <h1
                className="heading-hero tracking-tighter text-slate-900 text-center"
                style={{ fontFamily: "var(--font-michroma)" }}
              >
                <span>{t('hero.titlePrefix')} </span>
                <span className="text-blue-600">{t('hero.titleHighlight')}</span>
              </h1>

              <p className="mt-8 max-w-xl text-center text-lg leading-relaxed text-slate-600 lg:text-xl">
                {t('hero.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies List */}
        {caseStudies && caseStudies.length > 0 ? (
          <>
            {caseStudies.map((study, index) => (
              <CaseStudyItem key={study._id} caseStudy={study} index={index} />
            ))}
          </>
        ) : (
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-20">
                <p className="text-slate-600 text-lg">{t('noCaseStudies')}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
