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
          // csHeroSection
          "category": coalesce(category[$locale], category.pl),
          "title": coalesce(title[$locale], title.pl),
          "summary": coalesce(summary[$locale], summary.pl),
          meta[]{
            "label": coalesce(label[$locale], label.pl),
            "value": coalesce(value[$locale], value.pl)
          },
          "buttonLabel": coalesce(buttonLabel[$locale], buttonLabel.pl),
          buttonHref,
          webImage,
          phoneImage,
          // csFeaturesSection / csAboutSection / csScopeSection / csGallerySection
          "eyebrow": coalesce(eyebrow[$locale], eyebrow.pl),
          "heading": coalesce(heading[$locale], heading.pl),
          "paragraphs": coalesce(paragraphs[$locale], paragraphs.pl),
          screenA,
          screenB,
          images[]{
            _key,
            asset,
            hotspot,
            crop,
            "caption": coalesce(caption[$locale], caption.pl)
          },
          // items (features / metrics / outcome / scope / tech)
          items[]{
            _key,
            icon,
            value,
            name,
            "tag": coalesce(tag[$locale], tag.pl),
            "text": coalesce(text[$locale], text.pl),
            "label": coalesce(label[$locale], label.pl),
            "title": coalesce(title[$locale], title.pl),
            "points": coalesce(points[$locale], points.pl)
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
