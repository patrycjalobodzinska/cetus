'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
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

export default function HomepageModulesSection() {
  const locale = useLocale();
  const [modules, setModules] = useState<HomepageModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModules() {
      try {
        const data = await client.fetch<HomepageModule[]>(
          `*[_type == "homepageModule"] | order(order asc) {
            _id,
            moduleNumber,
            "title": coalesce(title[$locale], title.pl),
            "description": coalesce(description[$locale], description.pl),
            image,
            link,
            "linkText": coalesce(linkText[$locale], linkText.pl)
          }`,
          { locale }
        );
        setModules(data);
      } catch (error) {
        console.error('Error fetching homepage modules:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchModules();
  }, [locale]);

  if (loading) {
    return (
      <section className="md:py-24 py-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600"></p>
          </div>
        </div>
      </section>
    );
  }

  if (modules.length === 0) {
    return null;
  }

  return (
    <section className="md:py-24 py-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto border-y md:border-y-0 border-y-gray-200 px-4 sm:px-6 lg:px-8">
        <div className={ clsx(modules.length > 2? "divide-y ":"divide-y md:divide-y-0","grid  md:divide-x divide-gray-300 md:grid-cols-2 divide-y")}>
          {modules.map((module, index) => (
            <div
              key={index}
              className="group md:p-6 py-4 relative"
            >
              <div className="relative h-full">
                {module.image && (
                  <div className="relative w-full h-[400px] mb-6 rounded-2xl overflow-hidden">
                    <Image
                      src={urlFor(module.image).width(1200).height(800).url()}
                      alt={module.title || 'Module image'}
                      fill
                      className="object-cover  transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  {module.moduleNumber && (
                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                      {module.moduleNumber}
                    </p>
                  )}

                  {module.title && (
                    <h3
                      className="heading-2 text-slate-900 leading-tight"
                      style={{ fontFamily: "var(--font-michroma)" }}
                    >
                      {module.title}
                    </h3>
                  )}

                  {module.description && (
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {module.description}
                    </p>
                  )}

                  {module.link && module.linkText && (
                    <Link
                      href={module.link}
                      className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-blue-600 transition-colors group/link"
                    >
                      {module.linkText}
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

