import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getTranslations } from "next-intl/server";
import CTASection from "@/app/components/CTASection";
import WhatsNewSection from "../components/WhatsNewSection";

const PAGE_SIZE = 6;

interface BlogPostListItem {
  _id: string;
  title?: string;
  slug?: { current: string };
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  coverImage?: any;
  author?: { name?: string };
}

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

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page } = await searchParams;
  const t = await getTranslations({ locale, namespace: "blog" });

  let posts: BlogPostListItem[] = [];

  try {
    posts = await client.fetch<BlogPostListItem[]>(
      `*[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        "title": coalesce(title[$locale], title.pl),
        slug,
        "excerpt": coalesce(excerpt[$locale], excerpt.pl),
        "category": coalesce(category[$locale], category.pl),
        publishedAt,
        coverImage,
        author { name }
      }`,
      { locale }
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  const publishedPosts = (posts ?? []).filter((p) => p.slug?.current);
  const totalPages = Math.max(1, Math.ceil(publishedPosts.length / PAGE_SIZE));
  const currentPage = Math.min(
    Math.max(1, Number.parseInt(page ?? "1", 10) || 1),
    totalPages
  );
  const pagePosts = publishedPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="min-h-screen">
      <section className="pt-[var(--page-top-offset)] pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="heading-hero tracking-tighter text-slate-900"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            <span>{t("hero.titlePrefix")} </span>
            <span className="text-blue-600">{t("hero.titleHighlight")}</span>
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
            {t("hero.description")}
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {pagePosts.length > 0 ? (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pagePosts.map((post) => (
                  <li key={post._id}>
                    <Link
                      href={`/${locale}/blog/${post.slug!.current}`}
                      className="group block h-full bg-white rounded-2xl border border-gray-200 hover:border-blue-600/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      {post.coverImage ? (
                        <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                          <Image
                            src={urlFor(post.coverImage)
                              .width(800)
                              .height(500)
                              .url()}
                            alt={post.title || ""}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-gradient-to-br from-slate-100 to-slate-200" />
                      )}

                      <div className="p-6">
                        {post.category && (
                          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
                            {post.category}
                          </span>
                        )}
                        {post.title && (
                          <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-snug">
                            {post.title}
                          </h2>
                        )}
                        {post.excerpt && (
                          <p className="text-slate-600 leading-relaxed text-sm line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                          {post.author?.name && <span>{post.author.name}</span>}
                          {post.publishedAt && (
                            <time dateTime={post.publishedAt}>
                              {formatDate(post.publishedAt, locale)}
                            </time>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">{t("noPosts")}</p>
            </div>
          )}

          {totalPages > 1 && (
            <nav
              className="mt-12 flex items-center justify-center gap-2"
              aria-label={locale === "en" ? "Pagination" : "Paginacja"}
            >
              {currentPage > 1 && (
                <Link
                  href={`/${locale}/blog?page=${currentPage - 1}`}
                  className="px-4 py-2 rounded-full border border-gray-200 text-slate-700 hover:border-blue-600/40 hover:text-blue-600 transition-colors"
                  aria-label={locale === "en" ? "Previous page" : "Poprzednia strona"}
                >
                  ←
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={`/${locale}/blog?page=${n}`}
                  aria-current={n === currentPage ? "page" : undefined}
                  className={
                    n === currentPage
                      ? "min-w-10 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold text-center"
                      : "min-w-10 px-4 py-2 rounded-full border border-gray-200 text-slate-700 hover:border-blue-600/40 hover:text-blue-600 transition-colors text-center"
                  }
                >
                  {n}
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link
                  href={`/${locale}/blog?page=${currentPage + 1}`}
                  className="px-4 py-2 rounded-full border border-gray-200 text-slate-700 hover:border-blue-600/40 hover:text-blue-600 transition-colors"
                  aria-label={locale === "en" ? "Next page" : "Następna strona"}
                >
                  →
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>

      <WhatsNewSection showHeading={false} />

      <CTASection
        title={t("cta.title")}
        description={t("cta.description")}
        buttonText={t("cta.buttonText")}
        buttonLink="/kontakt"
        className="md:py-24 py-12"
      />
    </div>
  );
}
