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

  const track = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">
            - {t('title')}
          </p>
          <h2
            className="text-slate-900 text-2xl sm:text-3xl leading-tight"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {t('description')}
          </h2>
        </div>
      </div>

      {/* animowany pasek logo na całą szerokość ekranu */}
      <div className="group/marquee relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
        <div className="flex w-max animate-marquee-left gap-5 px-3 group-hover/marquee:[animation-play-state:paused]">
          {track.map((partner, i) => {
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
                key={`${partner._id}-${i}`}
                className="group shrink-0 flex items-center justify-center h-24 w-48 rounded-2xl border border-gray-100 bg-white px-6 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5"
                {...wrapperProps}
              >
                {partner.logo ? (
                  <img
                    src={urlFor(partner.logo).width(300).quality(80).auto('format').url()}
                    alt={partner.name || 'Partner'}
                    className="max-h-11 w-auto object-contain"
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
