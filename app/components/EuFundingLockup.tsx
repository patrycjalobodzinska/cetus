/**
 * Emblemat Unii Europejskiej z podpisem - wersja rysowana w kodzie.
 *
 * Używamy jej tam, gdzie w Sanity nie wgrano jeszcze oficjalnego zestawienia
 * znaków (plik od instytucji: Fundusze Europejskie + flaga UE + ew. barwy RP).
 * Gdy plik się pojawi, ma pierwszeństwo - to on jest wersją zgodną z Księgą
 * Znaku, a ta jest wyłącznie awaryjna.
 *
 * Emblemat jest odwzorowany zgodnie z opisem: pole PANTONE Reflex Blue
 * (#003399), dwanaście gwiazd PANTONE Yellow (#FFCC00) na okręgu o promieniu
 * 1/3 wysokości pola, wierzchołek każdej gwiazdy skierowany do góry.
 * Proporcja pola 3:2.
 */

const STAR_COUNT = 12;

// Pięcioramienna gwiazda o promieniu 1 jednostki, wierzchołkiem do góry.
const STAR_POINTS = Array.from({ length: 10 }, (_, i) => {
  const radius = i % 2 === 0 ? 1 : 1 / (2 * Math.cos(Math.PI / 5) + 1);
  const angle = -Math.PI / 2 + (i * Math.PI) / 5;
  return `${(Math.cos(angle) * radius).toFixed(4)},${(Math.sin(angle) * radius).toFixed(4)}`;
}).join(" ");

function EuEmblem({ className = "" }: { className?: string }) {
  // Pole 90x60, środek okręgu gwiazd (45, 30), promień 20 (1/3 wysokości),
  // gwiazda ma promień 3 (1/18 wysokości).
  const stars = Array.from({ length: STAR_COUNT }, (_, i) => {
    const angle = (i * 2 * Math.PI) / STAR_COUNT - Math.PI / 2;
    return {
      x: 45 + Math.cos(angle) * 20,
      y: 30 + Math.sin(angle) * 20,
    };
  });

  return (
    <svg
      viewBox="0 0 90 60"
      className={className}
      role="img"
      aria-label="Flaga Unii Europejskiej"
    >
      <rect width="90" height="60" fill="#003399" />
      {stars.map((star, i) => (
        <polygon
          key={i}
          points={STAR_POINTS}
          fill="#FFCC00"
          transform={`translate(${star.x.toFixed(4)} ${star.y.toFixed(4)}) scale(3)`}
        />
      ))}
    </svg>
  );
}

export default function EuFundingLockup({
  caption,
  className = "",
}: {
  /** Wymagany podpis, np. „Dofinansowane przez Unię Europejską". */
  caption: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`.trim()}>
      <EuEmblem className="h-10 aspect-[3/2] shrink-0 rounded-sm sm:h-12" />
      <p className="max-w-[16rem] text-sm font-semibold leading-snug text-slate-900">
        {caption}
      </p>
    </div>
  );
}

export { EuEmblem };
