import { createClient } from "@sanity/client";
import fs from "node:fs";

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split("\n").filter(Boolean).map((l) => {
    const [k, ...v] = l.split("=");
    return [k.trim(), v.join("=").trim().replace(/^"(.*)"$/, "$1")];
  }),
);
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});
const ls = (pl, en) => ({ _type: "localeString", pl, en });
const lt = (pl, en) => ({ _type: "localeText", pl, en });

// ─── processSection ────────────────────────────────────────────────────────
const PS_ID = "e73c35f2-9f38-4611-aaad-eecc85a12430";
const steps = {
  "1a82c984bd81": {
    q: ls("Nie masz pełnego obrazu swoich systemów i ryzyk?", "Lacking a full picture of your systems and risks?"),
    t: ls("Audyt i analiza", "Audit & assessment"),
    d: lt(
      "Analizujemy architekturę, procesy i dane. Otrzymujesz pełny obraz stanu, mapę ryzyk technicznych i biznesowych oraz konkretne rekomendacje - podstawę do trafnych decyzji inwestycyjnych.",
      "We analyze your architecture, processes and data. You get a clear picture of the current state, a map of technical and business risks, and concrete recommendations - a basis for sound investment decisions.",
    ),
  },
  "b61cee0871ed": {
    q: ls("Wiele priorytetów, ograniczony budżet i czas?", "Many priorities, limited budget and time?"),
    t: ls("Strategia i roadmapa", "Strategy & roadmap"),
    d: lt(
      "Tworzymy roadmapę z priorytetami, zależnościami i celami biznesowymi. Zespoły po obu stronach działają w jednym kierunku, a Wy zyskujecie przewidywalny plan i kontrolę nad zakresem.",
      "We build a roadmap with clear priorities, dependencies and business goals. Teams on both sides move in one direction, and you gain a predictable plan and control over scope.",
    ),
  },
  "d036437ef828": {
    q: ls("Potrzebujesz kontroli nad zakresem i tempem?", "Need control over scope and pace?"),
    t: ls("Realizacja", "Delivery"),
    d: lt(
      "Budujemy rozwiązanie iteracyjnie, zgodnie z ustaloną mapą i standardami jakości. Kontrolowany rozwój, bez rozjazdu zakresu i nieprzewidzianych kosztów.",
      "We build the solution iteratively, following the agreed roadmap and quality standards. Controlled growth, no scope creep, no unexpected costs.",
    ),
  },
  "60a4deb3daf5": {
    q: ls("Chcesz zero niespodzianek przy odbiorach?", "Want zero surprises at delivery?"),
    t: ls("Odbiory i transparentność", "Acceptance & transparency"),
    d: lt(
      "Regularnie prezentujemy postęp i weryfikujemy zgodność z celami biznesowymi. Pełna transparentność i przewidywalność na każdym etapie współpracy.",
      "We present progress regularly and verify alignment with business goals. Full transparency and predictability at every stage of the partnership.",
    ),
  },
  "056ac984f754": {
    q: ls("Twój system wymaga stabilności i ciągłości działania?", "Do your systems need stability and continuity?"),
    t: ls("Utrzymanie i rozwój", "Maintenance & support"),
    d: lt(
      "Monitorujemy, aktualizujemy i utrzymujemy stabilność oraz bezpieczeństwo systemów - z gotowością na SLA. Wy skupiacie się na biznesie, my odpowiadamy za ciągłość.",
      "We monitor, update and maintain the stability and security of your systems - with SLA readiness. You focus on the business; we take responsibility for continuity.",
    ),
  },
};
let psPatch = client
  .patch(PS_ID)
  .set({
    title: ls("Proces, który daje przewidywalność", "A delivery process built for predictability"),
    description: lt(
      "Prowadzimy projekty w ustrukturyzowanym, powtarzalnym procesie - od audytu i architektury, przez development, po wdrożenie i utrzymanie. Każdy etap to jasna odpowiedzialność, mierzalne rezultaty i pełna transparentność dla interesariuszy.",
      "We run projects in a structured, repeatable process - from audit and architecture, through development, to deployment and maintenance. Every stage means clear ownership, measurable results and full transparency for stakeholders.",
    ),
  });
for (const [key, s] of Object.entries(steps)) {
  psPatch = psPatch.set({
    [`steps[_key=="${key}"].question`]: s.q,
    [`steps[_key=="${key}"].title`]: s.t,
    [`steps[_key=="${key}"].description`]: s.d,
  });
}

// ─── offer ─────────────────────────────────────────────────────────────────
const OFFER_ID = "4811eea1-e571-4be7-8911-db41c38449b3";
const offerProjects = {
  "aplikacje-webowe": lt(
    "Skalowalne aplikacje i platformy webowe dla procesów o znaczeniu krytycznym - wydajne, bezpieczne i gotowe na wzrost.",
    "Scalable web applications and platforms for business-critical processes - performant, secure and ready to grow.",
  ),
  "aplikacje-mobilne": lt(
    "Aplikacje mobilne iOS i Android klasy produkcyjnej - spójne z Waszą strategią i ekosystemem systemów.",
    "Production-grade iOS and Android apps - aligned with your strategy and systems ecosystem.",
  ),
  "ui-ux-design": lt(
    "Projektowanie produktów i interfejsów, które upraszczają złożone procesy i zwiększają adopcję wśród użytkowników.",
    "Product and interface design that simplifies complex processes and drives user adoption.",
  ),
  "aI-i-automatyzacja-procesow": lt(
    "Wdrożenia AI i automatyzacja procesów - od integracji danych po rozwiązania wspierające decyzje i redukcję kosztów operacyjnych.",
    "AI adoption and process automation - from data integration to decision-support solutions and lower operating costs.",
  ),
  "cybersecurity": lt(
    "Audyty, hardening i ochrona systemów oraz danych - zgodność z wymogami regulacyjnymi i standardami bezpieczeństwa.",
    "Audits, hardening and protection of systems and data - aligned with regulatory requirements and security standards.",
  ),
  "transformacja-technologiczna": lt(
    "Modernizacja systemów legacy i migracje do chmury - bez przestojów, z zachowaniem ciągłości działania.",
    "Legacy modernization and cloud migration - with no downtime and full operational continuity.",
  ),
  "outsourcing-programistow": lt(
    "Doświadczone zespoły inżynierskie wpięte w Wasze procesy - z governance, raportowaniem i odpowiedzialnością za jakość.",
    "Experienced engineering teams embedded in your processes - with governance, reporting and accountability for quality.",
  ),
  "akademia-i-szkolenia": lt(
    "Programy szkoleniowe i rozwój kompetencji technologicznych dla zespołów w organizacji.",
    "Training programs and technology skill development for teams across your organization.",
  ),
  "cetus-venture-capital": lt(
    "Wsparcie technologiczne i inwestycyjne dla projektów o wysokim potencjale wzrostu.",
    "Technology and investment support for high-growth-potential ventures.",
  ),
};
let offerPatch = client.patch(OFFER_ID).set({
  description: lt(
    "Kompleksowe rozwiązania IT dla wymagających organizacji. Prowadzimy projekty end-to-end - od strategii i architektury, przez development, po wdrożenie, rozwój i utrzymanie systemów krytycznych dla biznesu.",
    "End-to-end IT solutions for demanding organizations. We run projects from strategy and architecture, through development, to deployment, growth and maintenance of business-critical systems.",
  ),
});
for (const [slug, d] of Object.entries(offerProjects)) {
  offerPatch = offerPatch.set({ [`projects[slug.current=="${slug}"].description`]: d });
}

// ─── faq ───────────────────────────────────────────────────────────────────
const faqItems = [
  {
    id: "77ea1246-9d89-4d57-b404-e486853fd046",
    order: 1,
    t: ls("Jak zapewniacie bezpieczeństwo i poufność danych?", "How do you ensure security and data confidentiality?"),
    d: lt(
      "Pracujemy w oparciu o NDA i umowy powierzenia (DPA), stosujemy dobre praktyki bezpieczeństwa i zgodność z RODO. Ochrona danych i własności intelektualnej klienta jest priorytetem na każdym etapie.",
      "We work under NDAs and data processing agreements (DPA), apply security best practices and GDPR compliance. Protecting client data and intellectual property is a priority at every stage.",
    ),
  },
  {
    id: "552ae99c-796d-4c10-9ef4-fe444b288b26",
    order: 2,
    t: ls("W jakich modelach współpracy pracujecie?", "What engagement models do you offer?"),
    d: lt(
      "Elastycznie: Fixed Price dla jasno zdefiniowanego zakresu, Time & Material oraz Team as a Service (dedykowany zespół) dla długofalowego rozwoju. Model dobieramy do celu i poziomu przewidywalności, jakiego potrzebujecie.",
      "Flexibly: Fixed Price for a well-defined scope, Time & Material, and Team as a Service (a dedicated team) for long-term development. We match the model to your goal and the level of predictability you need.",
    ),
  },
  {
    id: "25ff4b10-7868-45f7-bbeb-55e1feedb989",
    order: 3,
    t: ls("Czy zapewniacie utrzymanie i SLA po wdrożeniu?", "Do you provide maintenance and SLA after go-live?"),
    d: lt(
      "Tak - oferujemy utrzymanie, rozwój i wsparcie z gwarancjami SLA, monitoring oraz aktualizacje, zapewniając ciągłość działania systemów krytycznych.",
      "Yes - we offer maintenance, development and support with SLA guarantees, monitoring and updates, ensuring the continuity of business-critical systems.",
    ),
  },
  {
    id: "94caf04e-c151-481f-ad10-d6ac17b4667c",
    order: 4,
    t: ls("Czy macie doświadczenie z dużymi organizacjami i integracjami?", "Do you have experience with large organizations and integrations?"),
    d: lt(
      "Tak - realizujemy projekty wymagające integracji z istniejącymi systemami (ERP, CRM, API) oraz współpracy z wewnętrznymi zespołami IT i procesami zakupowymi dużych firm.",
      "Yes - we deliver projects that require integration with existing systems (ERP, CRM, APIs) and collaboration with internal IT teams and enterprise procurement processes.",
    ),
  },
];

// ─── homepageModule ────────────────────────────────────────────────────────
const HM_ID = "7d8c0a76-36c8-44b4-8ad4-cae7f62cd1b3";

async function run() {
  await psPatch.commit();
  console.log("✓ processSection updated");
  await offerPatch.commit();
  console.log("✓ offer updated (description + 9 services)");
  for (const f of faqItems) {
    await client.patch(f.id).set({ title: f.t, description: f.d, order: f.order }).commit();
  }
  console.log("✓ faq updated (4 items)");
  await client
    .patch(HM_ID)
    .set({
      description: lt(
        "Dowozimy oprogramowanie, które działa w produkcji - z naciskiem na jakość, bezpieczeństwo i przewidywalność. Bez pustych obietnic: czysty kod, transparentna komunikacja i odpowiedzialność za rezultat.",
        "We deliver software that works in production - with a focus on quality, security and predictability. No empty promises: clean code, transparent communication and accountability for the outcome.",
      ),
    })
    .commit();
  console.log("✓ homepageModule updated");
  console.log("\nDone. Odśwież stronę główną.");
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
