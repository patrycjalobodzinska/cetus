import { getLocale } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import CaseStudiesMosaic, { type MosaicCase } from "./CaseStudiesMosaic";

interface CaseStudyDoc {
  _id: string;
  title?: string;
  category?: string;
  description?: string;
  slug?: { current: string };
  image?: any;
  featured?: boolean;
}

// Główna realizacja (featured) idzie na początek, dalej od najnowszej.
const CS_QUERY = `*[_type == "caseStudy" && defined(slug.current)]
  | order(coalesce(featured, false) desc, _createdAt desc) {
  _id,
  "title": coalesce(title[$locale], title.pl),
  "category": coalesce(category[$locale], category.pl),
  "description": coalesce(description[$locale], description.pl),
  slug,
  image,
  featured
}`;

export default async function CaseStudiesSection() {
  const locale = await getLocale();

  let caseStudies: CaseStudyDoc[] = [];
  try {
    caseStudies = await client.fetch<CaseStudyDoc[]>(CS_QUERY, { locale });
  } catch (error) {
    console.error("Error fetching case studies:", error);
  }

  const cases: MosaicCase[] = (caseStudies ?? []).map((c) => ({
    id: c._id,
    title: c.title ?? "",
    category: c.category ?? "",
    description: c.description ?? "",
    slug: c.slug!.current,
    image: c.image ? urlFor(c.image).width(1600).quality(85).auto("format").url() : null,
  }));

  return (
    <section className="section-y relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CaseStudiesMosaic locale={locale} cases={cases} total={cases.length} />
      </div>
    </section>
  );
}
