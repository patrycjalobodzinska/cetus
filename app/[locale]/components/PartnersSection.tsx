'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface Partner {
  _id: string;
  name?: string;
  logo?: any;
  description?: string;
  caseStudySlug?: string;
}

export default function PartnersSection() {
  const t = useTranslations('home.partners');
  const locale = useLocale();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const data = await client.fetch<Partner[]>(
          `*[_type == "partner"] | order(order asc) {
            _id,
            "name": coalesce(name[$locale], name.pl),
            logo,
            "description": coalesce(description[$locale], description.pl),
            "caseStudySlug": caseStudy->slug.current
          }`,
          { locale }
        );
        setPartners(data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, [locale]);

  if (loading) {
    return (
      <section className="py-24  relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white/60">{t('loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section className="md:py-24 py-12  relative overflow-hidden"> <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {t('title')}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {partners.map((partner, index) => {
            const clipPath = "polygon(17% 0, 100% 0, 100% 89%, 83% 100%, 0 100%, 0 11%)";

            const cardContent = (
              <div
                style={{
                  clipPath: clipPath,
                  background: "linear-gradient(0deg, hsla(215, 69%, 36%, 1) 0%, hsla(190, 94%, 76%, 1) 100%)",
                }}
                className="rounded-2xl shadow-md shadow-blue-500/20 p-0.5 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-400/40 h-full"
              >
                <div
                  className="bg-white rounded-2xl p-6 h-full flex flex-col items-center justify-center min-h-[140px] transition-all duration-300 group-hover:bg-slate-50 cursor-pointer"
                  style={{
                    clipPath: clipPath
                  }}
                >
                  {partner.logo ? (
                    <div className="w-full md:h-26 flex items-center justify-center mb-3">
                      <img
                        src={urlFor(partner.logo).url()}
                        alt={partner.name || 'Partner'}
                        className=" max-h-full max-w-full object-contain brightness-0 opacity-100 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ) : (
                    <div className="text-slate-600 text-sm font-semibold uppercase tracking-wider mb-3">
                      {partner.name}
                    </div>
                  )}

                  {partner.description && (
                    <p className="text-slate-600 text-xs text-center line-clamp-2 mt-2">
                      {partner.description}
                    </p>
                  )}
                </div>
              </div>
            );

            return (
              <div
                key={partner._id}
                className="group relative"
              >
                {partner.caseStudySlug ? (
                  <Link href={`/${locale}/case-studies/${partner.caseStudySlug}`}>
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
