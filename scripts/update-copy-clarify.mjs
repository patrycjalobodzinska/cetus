/**
 * Przegląd redakcyjny treści w Sanity (sierpień 2026).
 *
 * Zakres:
 *  - usunięcie wymyślonych case studies i liczb bez pokrycia (PRODUCT.md: dowód przed obietnicą),
 *  - naprawa martwych linków w ofercie (Venture, literówka w slugu transformacji),
 *  - ujednolicenie liczb ze stroną /oferta (30+ ekspertów),
 *  - poprawki językowe: polskie znaki, kalki z angielskiego, duplikaty, literówki.
 *
 * Backup przed uruchomieniem: node scripts/backup-copy.mjs
 * Cofnięcie:                  node scripts/restore-copy.mjs sanity/backups/<plik>.json
 */
import { createClient } from '@sanity/client';
import fs from 'node:fs';

const env = Object.fromEntries(
  fs.readFileSync('.env.local', 'utf8').split('\n').filter(Boolean).map((line) => {
    const [k, ...v] = line.split('=');
    return [k.trim(), v.join('=').trim().replace(/^"(.*)"$/, '$1')];
  })
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const changes = [];
const note = (msg) => changes.push(msg);

/** Ustawia parę pl/en w polu localeString/localeText, zachowując _type. */
const setLocale = (obj, key, pl, en) => {
  if (!obj[key] || typeof obj[key] !== 'object') obj[key] = { _type: 'localeString' };
  obj[key].pl = pl;
  obj[key].en = en;
};

const byKey = (sections, key) => sections.find((s) => s.sectionKey === key);

const load = (id) => client.fetch(`*[_id==$id][0]`, { id });

// ─── strony usługowe ──────────────────────────────────────────────────────────

const ai = await load('servicePage-ai-i-automatyzacja-procesow');
{
  const services = byKey(ai.sections, 'services');
  const effects = [
    ['Krótszy czas odpowiedzi na zapytania i mniej powtarzalnej pracy w obsłudze klienta.',
     'Faster responses to enquiries and less repetitive work in customer service.'],
    ['Mniej pracy ręcznej i mniej błędów w przepływie danych między systemami.',
     'Less manual work and fewer errors as data moves between systems.'],
    ['Decyzje oparte na danych, z prognozami aktualizowanymi automatycznie.',
     'Decisions based on data, with forecasts updated automatically.'],
    ['Kontrola jakości i odczyt dokumentów bez ręcznego przeglądania.',
     'Quality control and document capture without manual review.'],
    ['Automatyczne porządkowanie dokumentów i zgłoszeń tekstowych.',
     'Automatic sorting of documents and text-based tickets.'],
  ];
  services.items.forEach((item, i) => setLocale(item, 'effect', ...effects[i]));
  // kalki z angielskiego w liście zastosowań
  const apps = {
    'Wsparcie sprzedaży i lead generation': ['Wsparcie sprzedaży i pozyskiwanie leadów', 'Sales support and lead generation'],
    'Workflow management': ['Zarządzanie przepływem pracy', 'Workflow management'],
    'Orchestracja zadań': ['Orkiestracja zadań', 'Task orchestration'],
    'Anomalia detection': ['Wykrywanie anomalii', 'Anomaly detection'],
    'Forecasting i trend analysis': ['Prognozowanie i analiza trendów', 'Forecasting and trend analysis'],
    'Quality control automation': ['Automatyzacja kontroli jakości', 'Quality control automation'],
    'Facial recognition': ['Rozpoznawanie twarzy', 'Facial recognition'],
    'Object detection': ['Detekcja obiektów', 'Object detection'],
    'Summarization i content generation': ['Streszczanie i generowanie treści', 'Summarisation and content generation'],
  };
  for (const item of services.items) {
    if (!item.applications?.pl) continue;
    item.applications.pl.forEach((value, i) => {
      const hit = apps[value];
      if (!hit) return;
      item.applications.pl[i] = hit[0];
      if (item.applications.en?.[i]) item.applications.en[i] = hit[1];
    });
  }
  setLocale(services.items[4], 'title', 'Przetwarzanie języka naturalnego (NLP)', 'Natural language processing (NLP)');

  // wymyślone case study - usuwane w całości
  ai.sections = ai.sections.filter((s) => s.sectionKey !== 'caseStudy');

  const cta = byKey(ai.sections, 'cta');
  cta.email = 'contact@cetuspro.com';
  setLocale(cta, 'title', 'Porozmawiajmy o automatyzacji', "Let's talk about automation");
  setLocale(cta, 'description',
    'Pokażemy, które procesy w Twojej firmie da się zautomatyzować najszybciej i co to realnie zmieni.',
    'We will show which processes in your company can be automated first and what that actually changes.');
  note('AI: 5 wymyślonych wskaźników → efekty jakościowe, usunięte fikcyjne case study, poprawiony e-mail w CTA, spolszczone nazwy zastosowań');
}

const cyber = await load('servicePage-cybersecurity');
{
  const services = byKey(cyber.sections, 'services');
  const rewrite = [
    { effect: ['Lista podatności uszeregowana według ryzyka, z planem naprawy.',
               'A vulnerability list ranked by risk, with a remediation plan.'] },
    { effect: ['Potwierdzone wektory ataku i kolejność ich zamykania.',
               'Confirmed attack vectors and the order in which to close them.'] },
    { effect: ['Incydenty wykrywane i eskalowane, zanim odczują je użytkownicy.',
               'Incidents detected and escalated before users feel them.'] },
    { description: ['Uporządkowana dokumentacja, procedury i umowy powierzenia danych osobowych.',
                    'Documentation, procedures and data processing agreements put in order.'],
      effect: ['Gotowość do kontroli i jasny podział odpowiedzialności za dane.',
               'Readiness for an audit and a clear split of responsibility for data.'] },
    { effect: ['Zespół rozpoznaje phishing i wie, jak zgłosić incydent.',
               'The team recognises phishing and knows how to report an incident.'] },
  ];
  services.items.forEach((item, i) => {
    if (rewrite[i].description) setLocale(item, 'description', ...rewrite[i].description);
    setLocale(item, 'effect', ...rewrite[i].effect);
  });
  cyber.sections = cyber.sections.filter((s) => s.sectionKey !== 'caseStudy');
  note('Cybersecurity: efekt przestał powielać opis (5 kart), usunięte fikcyjne case study, usunięta obietnica „100% zgodność z RODO”');
}

const trans = await load('servicePage-transformacja-technologiczna');
{
  trans.sections = trans.sections.filter((s) => s.sectionKey !== 'caseStudy');
  note('Transformacja: usunięte fikcyjne case study „Firma produkcyjna” (60% / 3x / 99.9%)');
}

const uiux = await load('servicePage-ui-ux-design');
{
  uiux.sections = uiux.sections.filter((s) => s.sectionKey !== 'caseStudy1');
  const why = byKey(uiux.sections, 'whyFeatures');
  // pozycje 0-2 były kopią sekcji „Jak możemy pomóc” - zastąpione realnymi wyróżnikami
  setLocale(why.items[0], 'title', 'Decyzje oparte na badaniach', 'Research-led decisions');
  setLocale(why.items[0], 'description',
    'Zanim powstanie makieta, rozmawiamy z użytkownikami i analizujemy dane z obecnego produktu. Projekt rozwiązuje realny problem, nie założony.',
    'Before the first wireframe we talk to users and analyse data from the current product, so the design solves a real problem, not an assumed one.');
  setLocale(why.items[1], 'title', 'Dostępność zgodna z WCAG', 'WCAG-compliant accessibility');
  setLocale(why.items[1], 'description',
    'Kontrast, nawigacja klawiaturą i poprawna semantyka są częścią projektu od pierwszego ekranu, a nie poprawką na końcu.',
    'Contrast, keyboard navigation and correct semantics are part of the design from the first screen, not a fix at the end.');
  setLocale(why.items[2], 'title', 'Spójny system projektowy', 'A consistent design system');
  setLocale(why.items[2], 'description',
    'Zamiast pojedynczych ekranów dostajesz komponenty i zasady, na których zespół zbuduje kolejne funkcje bez utraty spójności.',
    'Instead of one-off screens you get components and rules your team can build on without losing consistency.');
  setLocale(why.items[4], 'description',
    'Analizujemy zachowania użytkowników po wdrożeniu i poprawiamy te miejsca, w których tracą czas lub rezygnują.',
    'We analyse user behaviour after launch and fix the places where people lose time or drop out.');
  note('UI/UX: usunięte fikcyjne case study (40% wzrost konwersji), 3 zduplikowane karty zastąpione realnymi wyróżnikami (badania, WCAG, design system)');
}

const outsourcing = await load('servicePage-outsourcing-programistow');
{
  const benefits = byKey(outsourcing.sections, 'benefits');
  setLocale(benefits.items[0], 'description',
    'Płacisz za kompetencje wtedy, kiedy są potrzebne - bez kosztów rekrutacji, wdrożenia i utrzymania etatu między projektami.',
    'You pay for skills when you need them, without the cost of recruiting, onboarding and keeping a role filled between projects.');
  const models = byKey(outsourcing.sections, 'models');
  setLocale(models.items[1], 'title', 'Uzupełnienie zespołu', 'Team augmentation');
  setLocale(models.items[2], 'title', 'Dedykowany zespół', 'Dedicated team');
  note('Outsourcing: usunięte „nawet o 40%”, spolszczone nazwy modeli współpracy');
}

const mobile = await load('servicePage-aplikacje-mobilne');
{
  const why = byKey(mobile.sections, 'whyUs') ?? mobile.sections[2];
  setLocale(why.items[0], 'description',
    'Budujemy aplikacje dla e-commerce, logistyki, finansów i ochrony zdrowia - branż, w których liczy się stabilność i zgodność z regulacjami.',
    'We build apps for e-commerce, logistics, finance and healthcare - sectors where stability and compliance matter.');
  note('Aplikacje mobilne: doprecyzowana lista branż (spójna z sekcją „Branże, w których działamy”)');
}

const web = await load('servicePage-aplikacje-webowe');
{
  const cta = byKey(web.sections, 'cta') ?? web.sections.find((s) => s._type === 'ctaBlock');
  if (cta) {
    cta.email = 'contact@cetuspro.com';
    setLocale(cta, 'title', 'Porozmawiajmy o Twoim projekcie', "Let's talk about your project");
    setLocale(cta, 'description',
      'Opowiedz nam o zakresie, a wrócimy z oceną ryzyk, harmonogramem i modelem współpracy.',
      'Tell us about the scope and we will come back with a risk assessment, a timeline and an engagement model.');
  }
  note('Aplikacje webowe: poprawiony e-mail w CTA (kontakt@cetuspro.pl → contact@cetuspro.com), konkretniejsze CTA');
}

// ─── oferta, statystyki, pozostałe dokumenty ─────────────────────────────────

const offer = await load('4811eea1-e571-4be7-8911-db41c38449b3');
{
  offer.projects = offer.projects.filter((p) => p.link !== 'cetus-venture-capital');
  for (const p of offer.projects) {
    for (const loc of ['pl', 'en']) {
      if (p.title?.[loc]) p.title[loc] = p.title[loc].trim();
      if (p.description?.[loc]) p.description[loc] = p.description[loc].replace(/—/g, '-');
    }
  }
  const t = offer.projects.find((p) => /technologicazna|technologiczna/.test(p.link ?? ''));
  if (t) {
    t.link = 'transformacja-technologiczna';
    t.slug = { _type: 'slug', current: 'transformacja-technologiczna' };
    setLocale(t, 'title', 'Transformacja technologiczna', 'Technology transformation');
  }
  note('Oferta: naprawiony martwy link (transformacja -echnologicazna → transformacja-technologiczna), usunięty Cetus Venture Capital (404), przycięte spacje w tytułach');
}

const offerStats = await load('9cbcded1-2538-4525-bda9-827e4912d819');
{
  offerStats.description.pl = 'Tworzymy dedykowane rozwiązania - od aplikacji webowych i mobilnych, przez integracje systemów, po rozwój i utrzymanie.';
  offerStats.description.en = 'We build dedicated solutions - from web and mobile applications, through system integrations, to development and maintenance.';
  note('Oferta (statystyki): literówka „worzymy” → „Tworzymy”, pauzy → dywizy');
}

const experts = await load('074a12b0-9bdf-4262-8045-56420da07092');
{
  experts.count = 30;
  note('Statystyki: 40 → 30 ekspertów (spójność ze stroną /oferta)');
}

const funding = await load('funding');
{
  funding.intro.pl = 'CetusPro realizuje projekty współfinansowane ze środków Unii Europejskiej.';
  note('Dofinansowanie: uzupełnione polskie znaki w treści wstępu');
}

const about = await load('2622ab37-9ff2-4e35-aa22-bc7445bedee5');
{
  about.description.pl =
    'Jesteśmy firmą technologiczną, która wyrosła z pasji do inżynierii oprogramowania. Tworzymy zgrany zespół, który wdrożył na rynek kilka produktów używanych dziś przez ponad milion użytkowników. Pomagamy firmom budować oprogramowanie wysokiej jakości, dzięki któremu zyskują przewagę nad konkurencją. Wierzymy, że technologia to przede wszystkim ludzie, którzy ją tworzą. Cały nasz zespół pracuje na co dzień z produktami w produkcji, więc dużą uwagę przykładamy do analizy potrzeb użytkowników i rynku. Dzięki temu szybko reagujemy na zmiany i sami proponujemy kolejne kroki rozwoju produktu.';
  about.description.en =
    'We are a technology company that grew out of a passion for software engineering. We are a close-knit team that has brought several products to market, used today by more than a million people. We help companies build high-quality software that gives them an edge over the competition. We believe technology is, above all, the people who create it. Our team works with products in production every day, so we pay close attention to user and market needs. That is why we react quickly to change and propose the next steps in a product ourselves.';
  note('O nas: poprawiona gramatyka („cały nas zespół”), liczba użytkowników zgodna z /oferta (ponad milion)');
}

const industries = await load('9b39f981-ce48-4aa1-82cf-0f4cd8caa655');
{
  const map = { 'Sklepy internetowe': ['E-commerce', 'E-commerce'], 'Healthcare': ['Ochrona zdrowia', 'Healthcare'], 'Sports i fitness': ['Sport i fitness', 'Sport and fitness'] };
  for (const item of industries.items ?? []) {
    const hit = map[item.name?.pl];
    if (hit) setLocale(item, 'name', hit[0], hit[1]);
  }
  industries.description.pl = 'Pracowaliśmy w wielu sektorach - poniżej te, w których mamy najwięcej wdrożeń.';
  industries.description.en = 'We have worked across many sectors - below are the ones where we have the most deployments.';
  note('Branże: spolszczone nazwy (Healthcare, Sports i fitness), opis bez obietnicy „każda branża”');
}

const tech = await load('b43242f2-b536-446c-84bc-235f400a2633');
{
  const fix = { ReactJs: 'React', NextJs: 'Next.js', VueJs: 'Vue.js', 'Tailwind Css': 'Tailwind CSS', '.Net': '.NET', 'Node js': 'Node.js', Kubernets: 'Kubernetes' };
  for (const cat of tech.categories ?? []) {
    for (const item of cat.items ?? []) {
      for (const loc of ['pl', 'en']) {
        if (!item.name?.[loc]) continue;
        const v = item.name[loc].trim();
        item.name[loc] = fix[v] ?? v;
      }
    }
  }
  note('Technologie: poprawione nazwy (Kubernets → Kubernetes, Tailwind Css → Tailwind CSS, Node js → Node.js, .Net → .NET)');
}

const hero = await load('5d3487f4-42ed-4d50-90f0-8ea81d675081');
{
  setLocale(hero, 'subtitle',
    'Projektujemy, budujemy i utrzymujemy systemy krytyczne dla dużych organizacji.',
    'We design, build and maintain business-critical systems for large organizations.');
  note('Hero (Sanity): „Sprawdź sam” → zdanie o tym, co firma realnie robi');
}

const academy = await load('servicePage-akademia-i-szkolenia');
{
  const audience = academy.sections.find((s) => s.title?.pl === 'Dla kogo');
  if (audience) {
    // firmy na pierwszym miejscu - to jest odbiorca tej strony
    const idx = audience.items.findIndex((i) => i.title?.pl === 'Firmy i zespoły');
    if (idx > 0) audience.items.unshift(audience.items.splice(idx, 1)[0]);
    setLocale(audience.items[0], 'description',
      'Szkolenia dla zespołów, które wdrażają nowe technologie i potrzebują wspólnego poziomu kompetencji.',
      'Training for teams adopting new technologies that need a shared level of skill.');
  }
  const why = academy.sections[0];
  setLocale(why.items[3], 'title', 'Certyfikat i wsparcie po szkoleniu', 'A certificate and post-training support');
  setLocale(why.items[3], 'description',
    'Po ukończeniu kursu otrzymujesz certyfikat, a zespół - wsparcie we wdrożeniu poznanych narzędzi w swoich projektach.',
    'You receive a certificate after the course, and your team gets support in applying what they learned in their own projects.');
  note('Akademia: sekcja „Dla kogo” zaczyna się od firm, obietnica „pierwszej pracy” zastąpiona wsparciem wdrożeniowym (odbiorcą strony jest firma, nie kandydat)');
}

// ─── zapis ────────────────────────────────────────────────────────────────────

const docs = [ai, cyber, trans, uiux, outsourcing, mobile, web, offer, offerStats, experts, funding, about, industries, tech, hero, academy];
let tx = client.transaction();
for (const doc of docs) tx = tx.createOrReplace(doc);
await tx.commit();

console.log(`Zaktualizowano ${docs.length} dokumentów:\n`);
for (const c of changes) console.log(' -', c);
