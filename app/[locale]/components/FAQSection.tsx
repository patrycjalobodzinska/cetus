'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { client } from '@/sanity/lib/client';
import PolygonAccordion from '@/app/components/PolygonAccordion';

interface FAQ {
  _id: string;
  title?: string;
  description?: string;
}

export default function FAQSection() {
  const t = useTranslations('home.faq');
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const data = await client.fetch<FAQ[]>(
          `*[_type == "faq"] | order(order asc) {
            _id,
            "title": coalesce(title[$locale], title.pl),
            "description": coalesce(description[$locale], description.pl)
          }`,
          { locale }
        );
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFAQs();
  }, [locale]);

  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600">{t('loading', { defaultValue: 'Ładowanie...' })}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="heading-1 text-slate-900 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {t('title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <PolygonAccordion
              key={faq._id}
              title={faq.title || ''}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <p className="text-slate-600 leading-relaxed">
                {faq.description || ''}
              </p>
            </PolygonAccordion>
          ))}
        </div>
      </div>
    </section>
  );
}
