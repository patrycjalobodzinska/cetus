import { getLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface Partner {
  _id: string;
  name?: string;
  logo?: any;
  description?: string;
  caseStudySlug?: string;
}

const QUERY = `*[_type == "partner"] | order(order asc) {
  _id,
  "name": coalesce(name[$locale], name.pl),
  logo,
  "description": coalesce(description[$locale], description.pl),
  "caseStudySlug": caseStudy->slug.current
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

  const clipPath = "polygon(17% 0, 100% 0, 100% 89%, 83% 100%, 0 100%, 0 11%)";

  return (
    <section className="md:py-24 py-6 relative overflow-hidden">
      <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="heading-1 text-gray-800 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {t('title')}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {partners.map((partner) => (
            <div key={partner._id} className="group relative">
              <div
                style={{
                  clipPath,
                  background: "linear-gradient(0deg, hsla(215, 69%, 36%, 1) 0%, hsla(190, 94%, 76%, 1) 100%)",
                }}
                className="rounded-2xl shadow-md shadow-blue-500/20 p-0.5 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-400/40 h-full"
              >
                <div
                  className="bg-white rounded-2xl p-6 h-full flex flex-col items-center justify-center min-h-[140px] transition-all duration-300 group-hover:bg-slate-50 cursor-pointer"
                  style={{ clipPath }}
                >
                  {partner.logo ? (
                    <div className="w-full md:h-26 flex items-center justify-center mb-3">
                      <img
                        src={urlFor(partner.logo).width(300).quality(80).auto('format').url()}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
