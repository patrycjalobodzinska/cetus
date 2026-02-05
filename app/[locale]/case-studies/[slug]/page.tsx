import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import CaseStudyDetail from './CaseStudyDetail';

interface CaseStudy {
  _id: string;
  title?: string;
  slug?: {
    current: string;
  };
  category?: string;
  description?: string;
  image?: any;
  solution?: string;
  results?: string[];
  technologies?: string[];
  modules?: Array<{
    icon?: string;
    title?: string;
    description?: string[];
    image?: any;
  }>;
  stats?: Array<{
    value?: string;
    label?: string;
    icon?: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const caseStudies = await client.fetch<Array<{ slug: string }>>(`*[_type == "caseStudy"] {
      "slug": slug.current
    }`);

    return caseStudies
      .filter((study) => study.slug)
      .map((study) => ({
        slug: study.slug,
      }));
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

  let caseStudy: CaseStudy | null = null;

  try {
    caseStudy = await client.fetch<CaseStudy>(
      `*[_type == "caseStudy" && slug.current == $slug][0] {
        _id,
        "title": coalesce(title[$locale], title.pl),
        slug,
        "category": coalesce(category[$locale], category.pl),
        "description": coalesce(description[$locale], description.pl),
        image,
        "solution": coalesce(solution[$locale], solution.pl),
        "results": coalesce(results[$locale], results.pl),
        technologies,
        modules[] {
          icon,
          "title": coalesce(title[$locale], title.pl),
          "description": coalesce(description[$locale], description.pl),
          image
        },
        stats[] {
          value,
          "label": coalesce(label[$locale], label.pl),
          icon
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
