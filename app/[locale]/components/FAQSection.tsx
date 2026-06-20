import { getLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import FAQList from './FAQList';

interface FAQ {
  _id: string;
  title?: string;
  description?: string;
}

const QUERY = `*[_type == "faq"] | order(order asc) {
  _id,
  "title": coalesce(title[$locale], title.pl),
  "description": coalesce(description[$locale], description.pl)
}`;

export default async function FAQSection() {
  const locale = await getLocale();
  const t = await getTranslations('home.faq');

  let faqs: FAQ[] = [];
  try {
    faqs = (await client.fetch<FAQ[]>(QUERY, { locale })) ?? [];
  } catch (error) {
    console.error('Error fetching FAQs:', error);
  }

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="md:pt-24 md:pb-10 pt-6 pb-4 relative overflow-hidden">
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

        <FAQList faqs={faqs} />
      </div>
    </section>
  );
}
