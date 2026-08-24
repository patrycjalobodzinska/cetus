import HeroCurosora from "../../components/HeroCurosora";
import ValueStatementSection from "../components/ValueStatementSection";
import ServicesGridSection from "../components/ServicesGridSection";
import ProcessSection from "../components/ProcessSection";
import WhyUsSection from "../components/WhyUsSection";
import PartnersSection from "../components/PartnersSection";
import ReelsMarqueeSection from "../components/ReelsMarqueeSection";
import HomepageModulesSection from "../components/HomepageModulesSection";
import FAQSection from "../components/FAQSection";
import HomeCTASection from "../components/HomeCTASection";

// Podgląd nowego układu strony głównej pod klienta C-level.
export default function TestHomePreview() {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <main className="w-full max-w-7xl">
        {/* Hero */}
        <HeroCurosora />
        {/* Co robimy - kafelki usług */}
        <ServicesGridSection />
        {/* Co u nas słychać – filmiki z FB (karuzela) */}
        <ReelsMarqueeSection />
        {/* Kim jesteśmy – mocne zdanie wartości */}
        <ValueStatementSection />
        {/* Proces – przewidywalność */}
        <ProcessSection />
        {/* Dlaczego my – teza + atuty */}
        <WhyUsSection />
        {/* Zaufali nam – logotypy klientów */}
        <PartnersSection />
        {/* Dlaczego klienci nam ufają */}
        <HomepageModulesSection />
        {/* FAQ dużych klientów */}
        <FAQSection />
        {/* CTA */}
        <HomeCTASection />
      </main>
    </div>
  );
}
