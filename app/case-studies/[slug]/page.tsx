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
  const caseStudies = await client.fetch<CaseStudy[]>(`*[_type == "caseStudy"] {
    "slug": slug.current
  }`);

  return caseStudies
    .filter((study) => study.slug)
    .map((study) => ({
      slug: study.slug as string,
    }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const caseStudy = await client.fetch<CaseStudy>(
    `*[_type == "caseStudy" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      category,
      description,
      image,
      solution,
      results,
      technologies,
      modules[] {
        icon,
        title,
        description,
        image
      },
      stats
    }`,
    { slug }
  );

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Case study nie znalezione</p>
      </div>
    );
  }

  return <CaseStudyDetail caseStudy={caseStudy} />;
}
