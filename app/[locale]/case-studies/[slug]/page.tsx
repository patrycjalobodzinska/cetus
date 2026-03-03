import { client } from '@/sanity/lib/client';
import CaseStudyDetail from './CaseStudyDetail';

export async function generateStaticParams() {
  try {
    const caseStudies = await client.fetch<Array<{ slug: string }>>(`*[_type == "caseStudy"] {
      "slug": slug.current
    }`);
    return caseStudies
      .filter((s) => s.slug)
      .map((s) => ({ slug: s.slug }));
  } catch (error) {
    console.error('Error fetching case studies for static params:', error);
    return [];
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  let caseStudy: any = null;

  try {
    caseStudy = await client.fetch(
      `*[_type == "caseStudy" && slug.current == $slug][0] {
        _id,
        sections[] {
          _key,
          _type,
          variant,
          // csHeroSection
          "title": coalesce(title[$locale], title.pl),
          "category": coalesce(category[$locale], category.pl),
          "description": coalesce(description[$locale], description.pl),
          iframeUrl,
          // csChallengeSection
          "intro": coalesce(intro[$locale], intro.pl),
          "bullets": coalesce(bullets[$locale], bullets.pl),
          "consequence": coalesce(consequence[$locale], consequence.pl),
          // csScopeSection / csModulesSection / csResultsSection / csTechnologiesSection
          "sectionTitle": coalesce(sectionTitle[$locale], sectionTitle.pl),
          "note": coalesce(note[$locale], note.pl),
          // csCtaSection
          "heading": coalesce(heading[$locale], heading.pl),
          "buttonLabel": coalesce(buttonLabel[$locale], buttonLabel.pl),
          buttonHref,
          // csQuoteSection
          "quote": coalesce(quote[$locale], quote.pl),
          author,
          // items (stats / modules / scope / results / technologies)
          items[]{
            _key,
            icon,
            value,
            name,
            logo,
            "text": coalesce(text[$locale], text.pl),
            "label": coalesce(label[$locale], label.pl),
            "title": coalesce(title[$locale], title.pl),
            "description": coalesce(description[$locale], description.pl),
            image
          },
        }
      }`,
      { slug, locale }
    );
  } catch (error) {
    console.error('Error fetching case study:', error);
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Case study nie znalezione</p>
      </div>
    );
  }

  return <CaseStudyDetail caseStudy={caseStudy} />;
}
