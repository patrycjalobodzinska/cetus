import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

interface HomepageModule {
  _id: string;
  moduleNumber?: string;
  title?: string;
  description?: string;
  image?: any;
  link?: string;
  linkText?: string;
}

interface BlogPost {
  _id: string;
  title?: string;
  slug?: { current: string };
  excerpt?: string;
  category?: string;
  coverImage?: any;
}

// Ujednolicony kształt karty dla wpisów z bloga i modułów strony głównej.
interface Card {
  key: string;
  image?: any;
  label?: string;
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
}

const MODULES_QUERY = `*[_type == "homepageModule"] | order(order asc) {
  _id,
  moduleNumber,
  "title": coalesce(title[$locale], title.pl),
  "description": coalesce(description[$locale], description.pl),
  image,
  link,
  "linkText": coalesce(linkText[$locale], linkText.pl)
}`;

// Najnowsze 2 wpisy z bloga ("Co u nas słychać").
const POSTS_QUERY = `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc)[0...2] {
  _id,
  "title": coalesce(title[$locale], title.pl),
  slug,
  "excerpt": coalesce(excerpt[$locale], excerpt.pl),
  "category": coalesce(category[$locale], category.pl),
  coverImage
}`;

export default async function HomepageModulesSection() {
  const locale = await getLocale();

  let modules: HomepageModule[] = [];
  let posts: BlogPost[] = [];
  try {
    [modules, posts] = await Promise.all([
      client.fetch<HomepageModule[]>(MODULES_QUERY, { locale }),
      client.fetch<BlogPost[]>(POSTS_QUERY, { locale }),
    ]);
    modules = modules ?? [];
    posts = posts ?? [];
  } catch (error) {
    console.error('Error fetching homepage modules/posts:', error);
  }

  const readMore = locale === 'en' ? 'Read more' : 'Czytaj więcej';

  // Najpierw dwa wpisy z bloga, potem dwa moduły strony głównej.
  const cards: Card[] = [
    ...posts.map((post) => ({
      key: post._id,
      image: post.coverImage,
      label: post.category,
      title: post.title,
      description: post.excerpt,
      link: `/${locale}/blog/${post.slug?.current ?? ''}`,
      linkText: readMore,
    })),
    ...modules.map((module) => ({
      key: module._id,
      image: module.image,
      label: module.moduleNumber,
      title: module.title,
      description: module.description,
      link: module.link,
      linkText: module.linkText,
    })),
  ];

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="md:py-24 py-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto border-y md:border-y-0 border-y-gray-200 px-4 sm:px-6 lg:px-8">
        <div className={clsx(cards.length > 2 ? "divide-y " : "divide-y md:divide-y-0", "grid  md:divide-x divide-gray-300 md:grid-cols-2 divide-y")}>
          {cards.map((card, index) => (
            <div
              key={card.key || index}
              className="group md:p-6 py-4 relative"
            >
              <div className="relative h-full">
                {card.image && (
                  <div className="relative w-full h-[400px] mb-6 rounded-2xl overflow-hidden">
                    <Image
                      src={urlFor(card.image).width(1200).height(800).url()}
                      alt={card.title || 'Module image'}
                      fill
                      className="object-cover  transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  {card.label && (
                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                      {card.label}
                    </p>
                  )}

                  {card.title && (
                    <h3
                      className="heading-2 text-slate-900 leading-tight"
                      style={{ fontFamily: "var(--font-michroma)" }}
                    >
                      {card.title}
                    </h3>
                  )}

                  {card.description && (
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  )}

                  {card.link && card.linkText && (
                    <Link
                      href={card.link}
                      className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-blue-600 transition-colors group/link"
                    >
                      {card.linkText}
                      <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
