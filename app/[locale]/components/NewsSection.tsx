import Link from "next/link";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface NewsItem {
  _id: string;
  title?: string;
  slug?: { current: string };
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  coverImage?: any;
}

// Najnowsze aktualności na stronie głównej. Współdzieli dane z listą /blog ("Co u nas").
const QUERY = `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc)[0...3] {
  _id,
  "title": coalesce(title[$locale], title.pl),
  slug,
  "excerpt": coalesce(excerpt[$locale], excerpt.pl),
  "category": coalesce(category[$locale], category.pl),
  publishedAt,
  coverImage
}`;

function formatDate(iso: string | undefined, locale: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(locale === "pl" ? "pl-PL" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function NewsSection() {
  const locale = await getLocale();

  let items: NewsItem[] = [];
  try {
    items = await client.fetch<NewsItem[]>(QUERY, { locale });
  } catch (error) {
    console.error("Error fetching news (Co u nas słychać):", error);
  }

  if (!items || items.length === 0) {
    return null;
  }

  const heading = locale === "en" ? "What's new" : "Co u nas słychać";
  const subtitle =
    locale === "en"
      ? "The latest initiatives, events and news from life at CetusPro."
      : "Najnowsze inicjatywy, wydarzenia i nowości z życia CetusPro.";
  const allLabel = locale === "en" ? "See all news" : "Zobacz wszystkie";

  return (
    <section className="md:py-24 py-10 relative overflow-hidden">
      <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="heading-1 text-gray-800 mb-4 leading-tight"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {heading}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item._id}>
              <Link
                href={`/${locale}/blog/${item.slug!.current}`}
                className="group block h-full bg-white rounded-2xl border border-gray-200 hover:border-blue-600/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {item.coverImage ? (
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <Image
                      src={urlFor(item.coverImage).width(800).height(500).url()}
                      alt={item.title || ""}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 flex items-center justify-center p-6">
                    {item.category && (
                      <span className="text-white/90 text-sm font-semibold uppercase tracking-wider text-center">
                        {item.category}
                      </span>
                    )}
                  </div>
                )}

                <div className="p-6">
                  {item.category && (
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
                      {item.category}
                    </span>
                  )}
                  {item.title && (
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-snug">
                      {item.title}
                    </h3>
                  )}
                  {item.excerpt && (
                    <p className="text-slate-600 leading-relaxed text-sm line-clamp-3">
                      {item.excerpt}
                    </p>
                  )}
                  {item.publishedAt && (
                    <div className="mt-4 text-xs text-slate-500">
                      <time dateTime={item.publishedAt}>
                        {formatDate(item.publishedAt, locale)}
                      </time>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            {allLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
