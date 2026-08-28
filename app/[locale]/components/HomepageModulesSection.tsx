import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { isHiddenPath } from '@/lib/featureFlags';

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
  publishedAt?: string;
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
  publishedAt?: string;
}

function formatDate(iso: string | undefined, locale: string) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(locale === 'pl' ? 'pl-PL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
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

// Najnowsze 3 wpisy z bloga ("Co u nas słychać") + 1 moduł = 4 karty w gridzie.
const POSTS_QUERY = `*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc)[0...3] {
  _id,
  "title": coalesce(title[$locale], title.pl),
  slug,
  "excerpt": coalesce(excerpt[$locale], excerpt.pl),
  "category": coalesce(category[$locale], category.pl),
  coverImage,
  publishedAt
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

  const tm = await getTranslations('home.modules');
  const readMore = tm('readMore');

  // Najpierw najnowsze wpisy z bloga, potem moduły strony głównej (np. "Dlaczego klienci nam ufają?").
  const cards: Card[] = [
    ...posts.map((post) => ({
      key: post._id,
      image: post.coverImage,
      label: post.category,
      title: post.title,
      description: post.excerpt,
      link: `/${locale}/blog/${post.slug?.current ?? ''}`,
      linkText: readMore,
      publishedAt: post.publishedAt,
    })),
    ...modules.map((module) => ({
      key: module._id,
      image: module.image,
      label: module.moduleNumber,
      title: module.title,
      description: module.description,
      // Link modułu wpisuje się recznie w CMS, więc może prowadzić do sekcji
      // ukrytej w serwisie (O nas, Realizacje). Karta zostaje, ale bez CTA -
      // inaczej strona główna linkowałaby do czegoś, czego nie ma w nawigacji.
      link: isHiddenPath(module.link) ? undefined : module.link,
      linkText: module.linkText,
    })),
  ];

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="section-y relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">
            - {tm('eyebrow')}
          </p>
          <h2 className="section-title text-slate-900 mb-3">{tm('title')}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {tm('lead')}
          </p>
        </div>
      </div>
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
                  {(card.label || card.publishedAt) && (
                    <div className="flex items-center gap-3 text-sm text-gray-600 uppercase tracking-wider">
                      {card.label && <span>{card.label}</span>}
                      {card.label && card.publishedAt && (
                        <span aria-hidden="true" className="text-gray-400">
                          ·
                        </span>
                      )}
                      {card.publishedAt && (
                        <time dateTime={card.publishedAt} className="normal-case tracking-normal">
                          {formatDate(card.publishedAt, locale)}
                        </time>
                      )}
                    </div>
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
