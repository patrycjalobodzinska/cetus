import { getLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import ReelsCarousel from '@/app/components/ReelsCarousel';

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

export default async function ReelsMarqueeSection({
  showHeading = true,
}: {
  /** na /blog nagłówek sekcji dubluje tytuł strony, więc go chowamy */
  showHeading?: boolean;
} = {}) {
  const locale = await getLocale();
  const t = await getTranslations('home.reels');

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

  return (
    <section
      className={
        showHeading
          ? 'section-y relative flex flex-col justify-center lg:min-h-[min(100vh,1000px)]'
          : 'relative flex flex-col justify-center pb-12 md:pb-20'
      }
    >
      {showHeading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">
              - {t('eyebrow')}
            </p>
            <h2 className="section-title text-slate-900 mb-3">{t('title')}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t('lead')}
            </p>
          </div>
        </div>
      )}

      {/* filmiki na całą szerokość ekranu - ręczny scroll + strzałki.
          Karuzela pilnuje, żeby grała tylko jedna rolka naraz. */}
      <ReelsCarousel
        ariaLabel={t('title')}
        width={PLAYER_WIDTH}
        height={PLAYER_HEIGHT}
        reels={reels.map((reel, i) => ({
          src: buildEmbedSrc(reel.url as string),
          caption: reel.caption,
          title: reel.caption || `Reel ${i + 1}`,
        }))}
      />
    </section>
  );
}
