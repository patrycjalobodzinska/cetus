import { getLocale } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface Sponsor {
  _id: string;
  name?: string;
  category?: string;
  logo?: any;
  link?: string;
  darkBackground?: boolean;
}

const QUERY = `*[_type == "sponsor"] | order(order asc) {
  _id,
  "name": coalesce(name[$locale], name.pl),
  "category": coalesce(category[$locale], category.pl),
  logo,
  link,
  darkBackground
}`;

export default async function SponsorsSection() {
  const locale = await getLocale();

  let sponsors: Sponsor[] = [];
  try {
    sponsors = (await client.fetch<Sponsor[]>(QUERY, { locale })) ?? [];
  } catch (error) {
    console.error('Error fetching sponsors:', error);
  }

  if (sponsors.length === 0) {
    return null;
  }

  const heading = locale === 'en' ? 'Proud sponsor' : 'Dumny sponsor';
  const description =
    locale === 'en'
      ? 'We get involved where passion and character are born. We support clubs and athletes on their way to the top.'
      : 'Angażujemy się tam, gdzie rodzi się pasja i charakter. Wspieramy kluby i zawodników w drodze po kolejne sukcesy.';

  const clipPath = 'polygon(17% 0, 100% 0, 100% 89%, 83% 100%, 0 100%, 0 11%)';

  return (
    <section className="md:pt-16 md:pb-24 pt-8 pb-6 relative overflow-hidden">
      <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="heading-1 text-gray-800 mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-michroma)' }}
          >
            {heading}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {sponsors.map((sponsor) => {
            const dark = sponsor.darkBackground;
            const card = (
              <div
                style={{
                  clipPath,
                  background:
                    'linear-gradient(0deg, hsla(215, 69%, 36%, 1) 0%, hsla(190, 94%, 76%, 1) 100%)',
                }}
                className="rounded-2xl shadow-md shadow-blue-500/20 p-0.5 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-400/40 h-full"
              >
                <div
                  className={`rounded-2xl p-6 h-full flex flex-col items-center justify-center min-h-[140px] transition-all duration-300 ${
                    dark ? 'bg-slate-900 group-hover:bg-slate-800' : 'bg-white group-hover:bg-slate-50'
                  }`}
                  style={{ clipPath }}
                >
                  {sponsor.logo ? (
                    <div className="w-full md:h-26 flex items-center justify-center mb-3">
                      <img
                        src={urlFor(sponsor.logo).width(300).quality(80).auto('format').url()}
                        alt={sponsor.name || 'Sponsor'}
                        className="max-h-full max-w-full object-contain mx-auto"
                      />
                    </div>
                  ) : (
                    <div
                      className={`text-sm font-semibold uppercase tracking-wider mb-3 ${
                        dark ? 'text-white' : 'text-slate-600'
                      }`}
                    >
                      {sponsor.name}
                    </div>
                  )}

                  {sponsor.category && (
                    <p
                      className={`text-xs text-center uppercase tracking-wider mt-2 ${
                        dark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {sponsor.category}
                    </p>
                  )}
                </div>
              </div>
            );

            return (
              <div
                key={sponsor._id}
                className="group relative w-[150px] sm:w-[200px] md:w-[240px]"
              >
                {sponsor.link ? (
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full cursor-pointer"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
