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

// Oficjalny plugin wideo Facebooka.
const PLAYER_WIDTH = 267;
const PLAYER_HEIGHT = 476;
const buildEmbedSrc = (url: string) =>
  `https://www.facebook.com/plugins/video.php?height=${PLAYER_HEIGHT}&href=${encodeURIComponent(
    url,
  )}&show_text=false&width=${PLAYER_WIDTH}&t=0`;

export default async function ReelsMarqueeSection() {
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
    <section className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">
            - {heading}
          </p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* filmiki na całą szerokość ekranu - ręczny scroll (bez autoplay) */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen py-2 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 pb-3">
          {reels.map((reel, i) => (
            <div
              key={`${reel.url}-${i}`}
              className="shrink-0 snap-center rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md shadow-blue-500/10"
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
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title={reel.caption || `Reel ${i + 1}`}
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
