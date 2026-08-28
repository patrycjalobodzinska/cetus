"use client";

import Script from "next/script";
import { useConsent } from "./ConsentProvider";

/**
 * Microsoft Clarity - statystyki i nagrania sesji.
 *
 * Skrypt trafia do dokumentu WYŁĄCZNIE po zgodzie na analitykę. Nie ma tu
 * wariantu „ładujemy i czekamy na zgodę": Clarity zapisuje dane w urządzeniu
 * od pierwszej sekundy, więc samo jego wczytanie byłoby już naruszeniem.
 *
 * Identyfikator projektu podajemy w `NEXT_PUBLIC_CLARITY_PROJECT_ID`. Bez
 * zmiennej komponent nic nie robi - dzięki temu lokalny development i preview
 * nie zaśmiecają statystyk produkcyjnych.
 */
export default function ClarityScript() {
  const { categories } = useConsent();
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  if (!projectId || !categories.analytics) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${projectId}");`}
    </Script>
  );
}
