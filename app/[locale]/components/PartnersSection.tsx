import { getLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface Partner {
  _id: string;
  name?: string;
  logo?: any;
  description?: string;
  url?: string;
  invertColors?: boolean;
}

const QUERY = `*[_type == "partner"] | order(order asc) {
  _id,
  "name": coalesce(name[$locale], name.pl),
  logo,
  "description": coalesce(description[$locale], description.pl),
  url,
  invertColors
}`;

export default async function PartnersSection() {
  const locale = await getLocale();
  const t = await getTranslations('home.partners');

  let partners: Partner[] = [];
  try {
    partners = (await client.fetch<Partner[]>(QUERY, { locale })) ?? [];
  } catch (error) {
    console.error('Error fetching partners:', error);
  }

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-10">
          {t('title')}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {partners.map((partner) => {
              const Wrapper = partner.url ? 'a' : 'div';
              const wrapperProps = partner.url
                ? {
                    href: partner.url,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': partner.name,
                  }
                : {};
              return (
                <Wrapper
                  key={partner._id}
                  className="group flex items-center justify-center h-24 w-[calc(50%-0.5rem)] sm:w-44 rounded-xl border border-gray-100 bg-white px-4 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md"
                  {...wrapperProps}
                >
                  {partner.logo ? (
                    <img
                      src={urlFor(partner.logo).width(300).quality(80).auto('format').url()}
                      alt={partner.name || 'Partner'}
                      className={`max-h-10 w-auto object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100${partner.invertColors ? ' brightness-0 group-hover:brightness-100' : ''}`}
                    />
                  ) : (
                    <span className="text-slate-400 text-base font-semibold tracking-wide transition-colors group-hover:text-slate-700">
                      {partner.name}
                    </span>
                  )}
                </Wrapper>
              );
            })}
          </div>
      </div>
    </section>
  );
}
