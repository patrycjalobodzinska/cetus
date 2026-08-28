import HeroCurosora from "../../components/HeroCurosora";
import ServicesGridSection from "./ServicesGridSection";
import ReelsMarqueeSection from "./ReelsMarqueeSection";
import ProcessSection from "./ProcessSection";
import CaseStudiesSection from "./CaseStudiesSection";
import HomepageModulesSection from "./HomepageModulesSection";
import PartnersSection from "./PartnersSection";
import InitiativesSection from "./InitiativesSection";
// Sekcja „Dumny sponsor" jest chwilowo ukryta (decyzja klienta 2026-08-28) -
// komponent i dane w CMS zostają, żeby dało się ją włączyć jedną linijką.
// import SponsorsSection from "./SponsorsSection";

/**
 * Układ strony głównej - jedno źródło kolejności sekcji.
 * Renderują go zarówno `/` jak i `/test`, żeby podglądowa trasa nie rozjechała
 * się z produkcyjną (wcześniej były to dwie osobne, rozbieżne listy).
 */
export default function HomeSections() {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl">
        {/* Hero */}
        <HeroCurosora />
        {/* Co robimy - kafelki usług */}
        <ServicesGridSection />
        {/* Co u nas słychać - filmiki z FB */}
        <ReelsMarqueeSection />
        {/* Proces - przewidywalność */}
        <ProcessSection />
        {/* Realizacje */}
        <CaseStudiesSection />
        {/* Dlaczego klienci nam ufają */}
        <HomepageModulesSection />
        {/* Zaufali nam - logotypy klientów */}
        <PartnersSection />
        {/* Nasze inicjatywy - hackathon, Academy, Elevate */}
        <InitiativesSection />
        {/* Dumny sponsor - ukryte: {<SponsorsSection />} */}
        {/* CTA jest teraz wspólne dla całego serwisu - PreFooterCTA w layoucie */}
      </div>
    </div>
  );
}
