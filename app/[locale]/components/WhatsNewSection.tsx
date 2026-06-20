import { getLocale } from 'next-intl/server';
import { client } from '@/sanity/lib/client';

interface Reel {
  url?: string;
  caption?: string;
}

interface WhatsNewData {
  title?: string;
  description?: string;
  reels?: Reel[];
}

const QUERY = `*[_type == "whatsNew"][0] {
  "title": coalesce(title[$locale], title.pl),
  "description": coalesce(description[$locale], description.pl),
  reels[] {
    url,
    "caption": coalesce(caption[$locale], caption.pl)
  }
}`;

// Buduje URL do oficjalnego pluginu wideo Facebooka z linku do reela/wideo.
const PLAYER_WIDTH = 267;
const PLAYER_HEIGHT = 476;
const buildEmbedSrc = (url: string) =>
  `https://www.facebook.com/plugins/video.php?height=${PLAYER_HEIGHT}&href=${encodeURIComponent(
    url,
  )}&show_text=false&width=${PLAYER_WIDTH}&t=0`;

export default async function WhatsNewSection({
  showHeading = true,
}: {
  showHeading?: boolean;
} = {}) {
  const locale = await getLocale();

  let data: WhatsNewData | null = null;
  try {
    data = await client.fetch<WhatsNewData | null>(QUERY, { locale });
  } catch (error) {
    console.error('Error fetching whatsNew:', error);
  }

  const reels = (data?.reels ?? []).filter((reel) => reel.url);
  if (reels.length === 0) {
    return null;
  }

  const heading = locale === 'en' ? "What's new" : 'Co u nas słychać';
  const description =
    locale === 'en'
      ? 'A behind-the-scenes look at life at CetusPro - events, initiatives and the people who make it happen.'
      : 'Zajrzyj za kulisy CetusPro - wydarzenia, inicjatywy i ludzie, którzy je tworzą.';

  return (
    <section
      className={`${
        showHeading ? 'pt-12 md:pt-20' : 'pt-0 md:pt-0'
      } pb-12 md:pb-16 relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10">
          {showHeading && (
            <>
              <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-6" />
              <h2
                className="heading-1 text-slate-900 leading-tight mb-4"
                style={{ fontFamily: 'var(--font-michroma)' }}
              >
                {heading}
              </h2>
            </>
          )}
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
        {/* Mobile: karuzela (przesuwanie + snap). Desktop (md+): kafelki obok siebie. */}
        <div className="flex gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scroll-px-4 scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
          {reels.map((reel, index) => (
            <div
              key={index}
              className="shrink-0 snap-center rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md shadow-blue-500/10 transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-400/30"
              style={{ width: PLAYER_WIDTH }}
            >
              <iframe
                src={buildEmbedSrc(reel.url as string)}
                width={PLAYER_WIDTH}
                height={PLAYER_HEIGHT}
                loading="lazy"
                style={{ border: 'none', overflow: 'hidden', display: 'block' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title={reel.caption || `Reel ${index + 1}`}
              />
              {reel.caption && (
                <p className="px-3 py-3 text-slate-700 text-sm font-medium text-center">
                  {reel.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
