/**
 * Obudowa telefonu na karcie realizacji.
 *
 * Pasek stanu (godzina, zasięg, wi-fi, bateria) i wyspa są narysowane w SVG,
 * a nie zabrane ze zrzutu: zrzuty aplikacji zaczynają się własnym nagłówkiem,
 * który wpadał dokładnie pod wyspę i robił się nieczytelny. Zrzut leci więc
 * dopiero POD paskiem stanu, tak jak na prawdziwym urządzeniu.
 *
 * SVG ma viewBox, więc pasek skaluje się razem z szerokością telefonu -
 * przy w-24 i przy w-32 proporcje zostają te same.
 */
export default function PhoneFrame({
  src,
  className = "",
  bezel = "md",
}: {
  src: string;
  className?: string;
  /** Przy małych telefonach gruba ramka zjada ekran. */
  bezel?: "sm" | "md";
}) {
  const pad = bezel === "sm" ? "p-[3px]" : "p-[5px]";
  const outerR = bezel === "sm" ? "rounded-[1.4rem]" : "rounded-[1.9rem]";
  const innerR = bezel === "sm" ? "rounded-[1.25rem]" : "rounded-[1.6rem]";

  return (
    <div
      aria-hidden="true"
      className={`${outerR} ${pad} bg-slate-900 shadow-[0_18px_40px_-14px_rgba(15,23,42,0.55)] ring-1 ring-slate-900/10 ${className}`}
    >
      <div className={`${innerR} relative flex aspect-[9/19] flex-col overflow-hidden bg-[#f8fafc]`}>
        <StatusBar />
        {/* Zrzut zaczyna się pod paskiem stanu - nagłówek aplikacji nie wchodzi
            już pod wyspę. min-h-0 jest konieczne, żeby flex pozwolił mu się
            skurczyć zamiast rozpychać ekran. */}
        <img src={src} alt="" className="min-h-0 w-full flex-1 object-cover object-top" />
        {/* Odblask szkła - jedna cienka smuga, żeby ekran nie był płaski. */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent" />
      </div>
    </div>
  );
}

/** Pasek stanu iOS - jasny, z ciemnymi ikonami (jak w trybie dziennym). */
function StatusBar() {
  return (
    <svg viewBox="0 0 390 54" className="w-full shrink-0" fill="none" aria-hidden="true">
      <rect width="390" height="54" fill="#f8fafc" />

      {/* Godzina */}
      <text
        x="72"
        y="34"
        textAnchor="middle"
        fill="#0f172a"
        fontSize="19"
        fontWeight="600"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      >
        9:41
      </text>

      {/* Wyspa - fizyczne wycięcie, więc zostaje czarna także na jasnym pasku */}
      <rect x="140" y="9" width="110" height="30" rx="15" fill="#000000" />

      {/* Zasięg - cztery słupki */}
      <rect x="276" y="24" width="4" height="7" rx="1.2" fill="#0f172a" />
      <rect x="283" y="20" width="4" height="11" rx="1.2" fill="#0f172a" />
      <rect x="290" y="16" width="4" height="15" rx="1.2" fill="#0f172a" />
      <rect x="297" y="12" width="4" height="19" rx="1.2" fill="#0f172a" />

      {/* Wi-fi - trzy łuki i kropka */}
      <path d="M312 19.5a15 15 0 0 1 18 0" stroke="#0f172a" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M316 24.5a9 9 0 0 1 10 0" stroke="#0f172a" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="321" cy="29.5" r="2.2" fill="#0f172a" />

      {/* Bateria */}
      <rect x="340" y="14" width="30" height="15" rx="4.5" stroke="#0f172a" strokeOpacity="0.4" strokeWidth="1.6" />
      <rect x="342.5" y="16.5" width="21" height="10" rx="2.6" fill="#0f172a" />
      <path d="M372 19.5v4a2.6 2.6 0 0 0 0-4Z" fill="#0f172a" fillOpacity="0.4" />
    </svg>
  );
}
