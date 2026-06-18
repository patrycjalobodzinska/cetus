import { client } from "@/sanity/lib/client";
import BlogPostDetail from "./BlogPostDetail";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const posts = await client.fetch<Array<{ slug: string }>>(
      `*[_type == "blogPost" && defined(slug.current)] {
        "slug": slug.current
      }`
    );
    return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
  } catch (error) {
    console.error("Error fetching blog posts for static params:", error);
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  let post: any = null;

  try {
    post = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        "title": coalesce(title[$locale], title.pl),
        "excerpt": coalesce(excerpt[$locale], excerpt.pl),
        "category": coalesce(category[$locale], category.pl),
        publishedAt,
        author {
          name,
          "role": coalesce(role[$locale], role.pl),
          avatar
        },
        tags,
        sections[] {
          _key,
          _type,
          variant,
          tone,
          language,
          filename,
          code,
          url,
          // localized strings/texts
          "title": coalesce(title[$locale], title.pl),
          "category": coalesce(category[$locale], category.pl),
          "excerpt": coalesce(excerpt[$locale], excerpt.pl),
          "heading": coalesce(heading[$locale], heading.pl),
          "description": coalesce(description[$locale], description.pl),
          "sectionTitle": coalesce(sectionTitle[$locale], sectionTitle.pl),
          "caption": coalesce(caption[$locale], caption.pl),
          "alt": coalesce(alt[$locale], alt.pl),
          "quote": coalesce(quote[$locale], quote.pl),
          author,
          "role": coalesce(role[$locale], role.pl),
          "body": coalesce(body[$locale], body.pl),
          "buttonLabel": coalesce(buttonLabel[$locale], buttonLabel.pl),
          buttonHref,
          blank,
          align,
          "items": coalesce(items[$locale], items.pl, items),
          image,
          // rich text - pick localized content array
          "content": coalesce(
            select($locale == "pl" => contentPl, $locale == "en" => contentEn),
            contentPl
          ),
          // gallery items
          "galleryItems": items[]{
            _key,
            image,
            "caption": coalesce(caption[$locale], caption.pl),
            "alt": coalesce(alt[$locale], alt.pl)
          }
        }
      }`,
      { slug, locale }
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
  }

  if (!post) {
    notFound();
  }

  return <BlogPostDetail post={post} locale={locale} />;
}
