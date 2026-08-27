import { urlFor } from "@/sanity/lib/image";

export interface LogoWallItem {
  id: string;
  name?: string;
  logo?: any;
  url?: string | null;
  /** Podpis pod logo - używany przez sponsorów (np. dyscyplina). */
  caption?: string | null;
  /** true, gdy logo jest jasne (białe litery) i potrzebuje ciemnego tła. */
  darkBackground?: boolean;
}

/**
 * Ściana logotypów - jeden styl karty dla „Zaufali nam" i „Dumny sponsor",
 * żeby obie sekcje czytały się jak ta sama rodzina, a nie dwa różne moduły.
 * Zwykła siatka, bez karuzeli: logotypy klientów mają być do przeczytania,
 * a nie do gonienia wzrokiem.
 */
export default function LogoWall({ items }: { items: LogoWallItem[] }) {
  if (!items.length) return null;

  return (
    // Mobile: siatka po dwa logo w rzędzie (przy stałej szerokości karty
    // flex-wrap dawał jedno na wiersz). Od sm w górę wraca zawijany rząd
    // wyśrodkowanych kart o stałej szerokości.
    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-stretch sm:justify-center sm:gap-5">
      {items.map((item) => {
        const inner = (
          <>
            {item.logo ? (
              <img
                src={urlFor(item.logo).width(360).quality(80).auto("format").url()}
                alt={item.name || ""}
                className="max-h-10 w-auto object-contain sm:max-h-14"
              />
            ) : (
              <span
                className={`text-lg font-semibold tracking-wide ${
                  item.darkBackground ? "text-slate-200" : "text-slate-500"
                }`}
              >
                {item.name}
              </span>
            )}
            {item.caption && (
              <span className="mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-600 sm:mt-3 sm:text-xs">
                {item.caption}
              </span>
            )}
          </>
        );

        // Jasne logotypy (białe litery) dostają ciemne tło - na białej karcie
        // byłyby niewidoczne. Sterowane polem `logoTone` w Sanity.
        //
        // Uwaga: w Tailwind 4 `-translate-y-*` ustawia właściwość `translate`,
        // a nie `transform` - lista przejść musi wymieniać `translate`, inaczej
        // karta podskakuje skokowo, a płynnie animuje się tylko cień.
        const cardClass = item.darkBackground
          ? "flex h-24 w-full flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 px-4 sm:h-32 sm:w-60 sm:px-8 shadow-sm transition-[translate,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-md"
          : "flex h-24 w-full flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-4 sm:h-32 sm:w-60 sm:px-8 shadow-sm transition-[translate,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-blue-200 hover:shadow-md";

        return item.url ? (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className={cardClass}
          >
            {inner}
          </a>
        ) : (
          <div key={item.id} className={cardClass}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
