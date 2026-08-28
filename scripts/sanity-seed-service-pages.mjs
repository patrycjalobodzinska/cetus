import { createClient } from '@sanity/client';
import fs from 'node:fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(
  envFile
    .split('\n')
    .filter(Boolean)
    .map((line) => {
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

const pl = JSON.parse(fs.readFileSync('messages/pl.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

const ls = (plVal, enVal) => ({ _type: 'localeString', pl: plVal || '', en: enVal || plVal || '' });
const lt = (plVal, enVal) => ({ _type: 'localeText', pl: plVal || '', en: enVal || plVal || '' });
const lsa = (plArr = [], enArr = []) => ({
  _type: 'localeStringArray',
  pl: plArr,
  en: enArr.length === plArr.length ? enArr : plArr,
});

const _key = () => Math.random().toString(36).slice(2, 10);

const gridSection = (sectionKey, titlePl, titleEn, descPl, descEn, items) => ({
  _key: _key(),
  _type: 'gridSection',
  sectionKey,
  title: ls(titlePl, titleEn),
  description: lt(descPl, descEn),
  items: items.map((it) => ({
    _key: _key(),
    title: ls(it.titlePl, it.titleEn),
    description: lt(it.descPl, it.descEn),
  })),
});

const tabsSection = (sectionKey, titlePl, titleEn, descPl, descEn, items) => ({
  _key: _key(),
  _type: 'tabsSection',
  sectionKey,
  title: ls(titlePl, titleEn),
  description: lt(descPl, descEn),
  items: items.map((it) => ({
    _key: _key(),
    title: ls(it.titlePl, it.titleEn),
    description: lt(it.descPl, it.descEn),
    applications: lsa(it.appsPl || [], it.appsEn || []),
    effect: lt(it.effectPl || '', it.effectEn || ''),
  })),
});

const stepsSection = (sectionKey, titlePl, titleEn, descPl, descEn, steps) => ({
  _key: _key(),
  _type: 'stepsSection',
  sectionKey,
  title: ls(titlePl, titleEn),
  description: lt(descPl, descEn),
  steps: steps.map((s) => ({
    _key: _key(),
    title: ls(s.titlePl, s.titleEn),
    description: lt(s.descPl, s.descEn),
  })),
});

const checklistSection = (sectionKey, titlePl, titleEn, descPl, descEn, itemsPl, itemsEn) => ({
  _key: _key(),
  _type: 'checklistSection',
  sectionKey,
  title: ls(titlePl, titleEn),
  description: lt(descPl, descEn),
  items: lsa(itemsPl, itemsEn || itemsPl),
});

const caseStudyBlock = (sectionKey, titlePl, titleEn, goalPl, goalEn, solPl, solEn, resultsPl, resultsEn) => ({
  _key: _key(),
  _type: 'caseStudyBlock',
  sectionKey,
  title: ls(titlePl, titleEn),
  goal: lt(goalPl, goalEn),
  solution: lt(solPl, solEn),
  results: lsa(resultsPl, resultsEn || resultsPl),
});

const ctaBlock = (sectionKey, titlePl, titleEn, descPl, descEn, btnPl, btnEn, link, email) => ({
  _key: _key(),
  _type: 'ctaBlock',
  sectionKey,
  title: ls(titlePl, titleEn),
  description: lt(descPl, descEn),
  buttonText: ls(btnPl, btnEn),
  buttonLink: link || '/kontakt',
  email: email || '',
});

// UWAGA (2026-08-28): ten skrypt nie seeduje już trzech podstron:
//  - `ui-ux-design` i `transformacja-technologiczna` zostały zdjęte z oferty,
//  - `fast-prototyping` (następca UX/UI) i przepisana `akademia-i-szkolenia`
//    mają swoją treść w scripts/update-offer-2026-08-28.mjs.
// Bez tego ponowne uruchomienie seeda przywracałoby stare, nieaktualne teksty.

const docs = [];

// =====================================================
// 1) aplikacje-webowe (from translations: webApps)
// =====================================================
{
  const p = pl.webApps; const e = en.webApps;
  const modKeys = ['security', 'payments', 'communication', 'navigation', 'analytics', 'personalization'];
  docs.push({
    _id: 'servicePage-aplikacje-webowe',
    _type: 'servicePage',
    slug: { _type: 'slug', current: 'aplikacje-webowe' },
    title: ls('Aplikacje webowe', 'Web applications'),
    heroTitle: ls(`${p.hero.title} ${p.hero.highlight}${p.hero.subtitle}`, `${e.hero.title} ${e.hero.highlight}${e.hero.subtitle}`),
    heroDescription: lt(p.hero.description, e.hero.description),
    heroButtonText: ls(p.hero.buttonText, e.hero.buttonText),
    heroButtonLink: '/kontakt',
    sections: [
      gridSection('whyFeatures', p.whyFeatures.title, e.whyFeatures.title, p.whyFeatures.subtitle, e.whyFeatures.subtitle,
        ['modernTech', 'responsiveDesign', 'performance', 'security', 'seo', 'support'].map((k) => ({
          titlePl: p.whyFeatures[k].title, titleEn: e.whyFeatures[k].title,
          descPl: p.whyFeatures[k].description, descEn: e.whyFeatures[k].description,
        }))),
      tabsSection('modules', p.modules.title, e.modules.title, '', '',
        modKeys.map((k) => ({
          titlePl: p.modules[k].title, titleEn: e.modules[k].title,
          descPl: '', descEn: '',
          appsPl: [p.modules[k].item1, p.modules[k].item2, p.modules[k].item3, p.modules[k].item4].filter(Boolean),
          appsEn: [e.modules[k].item1, e.modules[k].item2, e.modules[k].item3, e.modules[k].item4].filter(Boolean),
        }))),
      ctaBlock('cta', p.cta.title, e.cta.title, p.cta.description, e.cta.description, p.cta.buttonText, e.cta.buttonText, '/kontakt', 'contact@cetuspro.com'),
    ],
  });
}

// =====================================================
// 2) aplikacje-mobilne (from translations: mobileApps)
// =====================================================
{
  const p = pl.mobileApps; const e = en.mobileApps;
  docs.push({
    _id: 'servicePage-aplikacje-mobilne',
    _type: 'servicePage',
    slug: { _type: 'slug', current: 'aplikacje-mobilne' },
    title: ls('Aplikacje mobilne', 'Mobile apps'),
    heroTitle: ls(p.hero.title, e.hero.title),
    heroDescription: lt(p.hero.description, e.hero.description),
    sections: [
      gridSection('howWeHelp', p.howWeHelp.title, e.howWeHelp.title, '', '',
        p.howWeHelp.services.map((it, i) => ({
          titlePl: it.title, titleEn: e.howWeHelp.services[i]?.title,
          descPl: it.description, descEn: e.howWeHelp.services[i]?.description,
        }))),
      gridSection('whyFeatures', p.whyFeatures.title, e.whyFeatures.title, '', '',
        p.whyFeatures.features.map((it, i) => ({
          titlePl: it.title, titleEn: e.whyFeatures.features[i]?.title,
          descPl: it.description, descEn: e.whyFeatures.features[i]?.description,
        }))),
      gridSection('whyUs', p.whyUs.title, e.whyUs.title, '', '',
        p.whyUs.reasons.map((it, i) => ({
          titlePl: it.title, titleEn: e.whyUs.reasons[i]?.title,
          descPl: it.description, descEn: e.whyUs.reasons[i]?.description,
        }))),
    ],
  });
}

// =====================================================
// 3) aI-i-automatyzacja-procesow (from translations)
// =====================================================
{
  const p = pl.aiAutomation; const e = en.aiAutomation;
  docs.push({
    _id: 'servicePage-ai-i-automatyzacja-procesow',
    _type: 'servicePage',
    slug: { _type: 'slug', current: 'aI-i-automatyzacja-procesow' },
    title: ls('AI i automatyzacja procesów', 'AI and process automation'),
    heroTitle: ls(p.hero.title, e.hero.title),
    heroDescription: lt(p.hero.description, e.hero.description),
    heroButtonText: ls(p.hero.buttonText, e.hero.buttonText),
    heroButtonLink: '/kontakt',
    sections: [
      gridSection('benefits', p.benefits.title, e.benefits.title, p.benefits.subtitle, e.benefits.subtitle,
        p.benefits.items.map((it, i) => ({
          titlePl: it.title, titleEn: e.benefits.items[i]?.title,
          descPl: it.description, descEn: e.benefits.items[i]?.description,
        }))),
      tabsSection('services', p.services.title, e.services.title, '', '',
        p.services.items.map((it, i) => ({
          titlePl: it.title, titleEn: e.services.items[i]?.title,
          descPl: it.description, descEn: e.services.items[i]?.description,
          appsPl: it.applications || [], appsEn: e.services.items[i]?.applications || [],
          effectPl: it.effect, effectEn: e.services.items[i]?.effect,
        }))),
      caseStudyBlock('caseStudy', p.caseStudy.title, e.caseStudy.title,
        p.caseStudy.goal.text, e.caseStudy.goal.text,
        p.caseStudy.solution.text, e.caseStudy.solution.text,
        p.caseStudy.effects.items, e.caseStudy.effects.items),
      stepsSection('process', p.process.title, e.process.title, p.process.compliance, e.process.compliance,
        p.process.steps.map((s, i) => ({
          titlePl: s.title, titleEn: e.process.steps[i]?.title,
          descPl: s.description, descEn: e.process.steps[i]?.description,
        }))),
      ctaBlock('cta', p.cta.title, e.cta.title, p.cta.description, e.cta.description,
        p.cta.buttonText, e.cta.buttonText, '/kontakt', p.cta.email),
    ],
  });
}

// =====================================================
// 5) cybersecurity (extracted from hardcoded JSX)
// =====================================================
docs.push({
  _id: 'servicePage-cybersecurity',
  _type: 'servicePage',
  slug: { _type: 'slug', current: 'cybersecurity' },
  title: ls('Cybersecurity', 'Cybersecurity'),
  heroTitle: ls('Kompleksowa ochrona cybernetyczna dla Twojej firmy', 'Comprehensive cybersecurity protection for your company'),
  heroDescription: lt('Chronimy Twoją firmę przed cyberzagrożeniami dzięki zaawansowanym rozwiązaniom bezpieczeństwa, audytom i ciągłemu monitoringowi.', 'We protect your company from cyber threats with advanced security solutions, audits and continuous monitoring.'),
  heroButtonText: ls('Porozmawiajmy o bezpieczeństwie', "Let's talk about security"),
  heroButtonLink: '/kontakt',
  sections: [
    gridSection('benefits', 'Dlaczego warto wybrać nasze rozwiązania?', 'Why choose our solutions?', 'Kompleksowa ochrona cybernetyczna dostosowana do potrzeb Twojej firmy', 'Comprehensive cybersecurity protection tailored to your company needs', [
      { titlePl: 'Ochrona przed cyberatakami', titleEn: 'Protection against cyber attacks', descPl: 'Kompleksowa ochrona Twojej infrastruktury przed najnowszymi zagrożeniami cybernetycznymi, w tym ransomware, phishing i atakami DDoS.', descEn: 'Comprehensive protection of your infrastructure from the latest cyber threats, including ransomware, phishing and DDoS attacks.' },
      { titlePl: 'Zgodność z przepisami', titleEn: 'Regulatory compliance', descPl: 'Pomagamy spełnić wymagania RODO, ISO 27001 i innych standardów bezpieczeństwa, chroniąc dane osobowe i wrażliwe informacje.', descEn: 'We help meet GDPR, ISO 27001 and other security standards, protecting personal data and sensitive information.' },
      { titlePl: 'Ciągły monitoring', titleEn: 'Continuous monitoring', descPl: '24/7 monitoring bezpieczeństwa z automatycznym wykrywaniem i reagowaniem na incydenty, zapewniający spokój ducha.', descEn: '24/7 security monitoring with automatic incident detection and response, ensuring peace of mind.' },
      { titlePl: 'Szkolenia i świadomość', titleEn: 'Training and awareness', descPl: 'Edukujemy Twój zespół w zakresie najlepszych praktyk bezpieczeństwa, tworząc pierwszą linię obrony przed cyberzagrożeniami.', descEn: 'We educate your team on security best practices, creating the first line of defense against cyber threats.' },
    ]),
    tabsSection('services', 'Nasze usługi', 'Our services', 'Kompleksowa ochrona Twojej firmy przed zagrożeniami cybernetycznymi', 'Comprehensive protection of your company against cyber threats', [
      { titlePl: 'Audyty bezpieczeństwa', titleEn: 'Security audits', descPl: 'Kompleksowa ocena bezpieczeństwa z szczegółowym raportem i rekomendacjami', descEn: 'Comprehensive security assessment with detailed report and recommendations',
        appsPl: ['Analiza infrastruktury IT', 'Przegląd polityk bezpieczeństwa', 'Testy penetracyjne', 'Ocena zgodności z RODO', 'Analiza podatności', 'Rekomendacje poprawy'],
        appsEn: ['IT infrastructure analysis', 'Security policies review', 'Penetration testing', 'GDPR compliance assessment', 'Vulnerability analysis', 'Improvement recommendations'],
        effectPl: 'Kompleksowa ocena bezpieczeństwa z szczegółowym raportem i rekomendacjami', effectEn: 'Comprehensive security assessment with detailed report and recommendations' },
      { titlePl: 'Testy penetracyjne', titleEn: 'Penetration testing', descPl: 'Identyfikacja rzeczywistych podatności przed atakującymi', descEn: 'Identification of real vulnerabilities before attackers',
        appsPl: ['Testy aplikacji webowych', 'Testy aplikacji mobilnych', 'Testy infrastruktury sieciowej', 'Testy socjotechniczne', 'Testy fizycznego bezpieczeństwa', 'Raportowanie i rekomendacje'],
        appsEn: ['Web application testing', 'Mobile application testing', 'Network infrastructure testing', 'Social engineering testing', 'Physical security testing', 'Reporting and recommendations'],
        effectPl: 'Identyfikacja rzeczywistych podatności przed atakującymi', effectEn: 'Identification of real vulnerabilities before attackers' },
      { titlePl: 'Monitoring bezpieczeństwa', titleEn: 'Security monitoring', descPl: 'Ciągła ochrona z automatycznym wykrywaniem zagrożeń', descEn: 'Continuous protection with automatic threat detection',
        appsPl: ['Wykrywanie zagrożeń w czasie rzeczywistym', 'Automatyczne reagowanie na incydenty', 'Analiza logów i zdarzeń', 'Alerty i powiadomienia', 'Raporty bezpieczeństwa', 'Integracja z istniejącymi systemami'],
        appsEn: ['Real-time threat detection', 'Automatic incident response', 'Log and event analysis', 'Alerts and notifications', 'Security reports', 'Integration with existing systems'],
        effectPl: 'Ciągła ochrona z automatycznym wykrywaniem zagrożeń', effectEn: 'Continuous protection with automatic threat detection' },
      { titlePl: 'Zgodność z RODO', titleEn: 'GDPR compliance', descPl: 'Pełna zgodność z przepisami ochrony danych osobowych', descEn: 'Full compliance with personal data protection regulations',
        appsPl: ['Audyt zgodności z RODO', 'Przygotowanie dokumentacji', 'Wdrożenie procedur', 'Szkolenia dla pracowników', 'Wsparcie w raportowaniu incydentów', 'Aktualizacja zgodności'],
        appsEn: ['GDPR compliance audit', 'Documentation preparation', 'Procedure implementation', 'Employee training', 'Incident reporting support', 'Compliance updates'],
        effectPl: 'Pełna zgodność z przepisami ochrony danych osobowych', effectEn: 'Full compliance with personal data protection regulations' },
      { titlePl: 'Szkolenia bezpieczeństwa', titleEn: 'Security training', descPl: 'Zwiększona świadomość i umiejętności zespołu w zakresie bezpieczeństwa', descEn: 'Increased awareness and team skills in the field of security',
        appsPl: ['Świadomość cyberbezpieczeństwa', 'Rozpoznawanie phishingu', 'Bezpieczne hasła i uwierzytelnianie', 'Ochrona danych osobowych', 'Zarządzanie incydentami', 'Najlepsze praktyki bezpieczeństwa'],
        appsEn: ['Cybersecurity awareness', 'Phishing recognition', 'Secure passwords and authentication', 'Personal data protection', 'Incident management', 'Security best practices'],
        effectPl: 'Zwiększona świadomość i umiejętności zespołu w zakresie bezpieczeństwa', effectEn: 'Increased awareness and team skills in the field of security' },
    ]),
    caseStudyBlock('caseStudy', 'Case study', 'Case study', '', '', '', '',
      ['100% zgodność z RODO', '60% redukcja incydentów bezpieczeństwa', '24/7 monitoring wdrożony', 'Szkolenia dla 200+ pracowników'],
      ['100% GDPR compliance', '60% reduction in security incidents', '24/7 monitoring deployed', 'Training for 200+ employees']),
  ],
});

// =====================================================
// 6) outsourcing-programistow
// =====================================================
docs.push({
  _id: 'servicePage-outsourcing-programistow',
  _type: 'servicePage',
  slug: { _type: 'slug', current: 'outsourcing-programistow' },
  title: ls('Outsourcing programistów', 'Developer outsourcing'),
  heroTitle: ls('Outsourcing programistów dla Twojego projektu', 'Developer outsourcing for your project'),
  heroDescription: lt('Wzmocnij swój zespół doświadczonymi specjalistami lub powierz nam cały projekt. Elastycznie, efektywnie, profesjonalnie.', 'Strengthen your team with experienced specialists or entrust us with the entire project. Flexibly, efficiently, professionally.'),
  heroButtonText: ls('Porozmawiajmy o projekcie', "Let's talk about the project"),
  heroButtonLink: '/kontakt',
  sections: [
    gridSection('benefits', 'Korzyści z outsourcingu', 'Outsourcing benefits', '', '', [
      { titlePl: 'Redukcja kosztów', titleEn: 'Cost reduction', descPl: 'Zmniejsz koszty operacyjne nawet o 40% przy zachowaniu najwyższej jakości realizowanych projektów.', descEn: 'Reduce operational costs by up to 40% while maintaining the highest quality of projects delivered.' },
      { titlePl: 'Dostęp do ekspertów', titleEn: 'Access to experts', descPl: 'Współpracuj z doświadczonymi specjalistami z różnych dziedzin IT bez długotrwałego procesu rekrutacji.', descEn: 'Work with experienced specialists from various IT fields without a lengthy recruitment process.' },
      { titlePl: 'Elastyczność i skalowalność', titleEn: 'Flexibility and scalability', descPl: 'Łatwo dostosuj zespół do aktualnych potrzeb projektu - powiększaj lub zmniejszaj bez zobowiązań.', descEn: 'Easily adjust the team to current project needs - scale up or down without commitments.' },
      { titlePl: 'Fokus na biznes', titleEn: 'Focus on business', descPl: 'Skup się na rozwoju biznesu, a my zajmiemy się technicznymi aspektami Twojego projektu.', descEn: 'Focus on business development and we will take care of the technical aspects of your project.' },
    ]),
    gridSection('models', 'Modele współpracy', 'Cooperation models', '', '', [
      { titlePl: 'Outsourcing projektowy', titleEn: 'Project outsourcing', descPl: 'Przekaż nam cały projekt - od analizy wymagań, przez projektowanie i implementację, aż po wdrożenie i wsparcie. Idealne rozwiązanie dla firm, które chcą skupić się na biznesie.', descEn: 'Hand over the entire project to us - from requirements analysis, through design and implementation, to deployment and support. An ideal solution for companies that want to focus on business.' },
      { titlePl: 'IT Staff Augmentation', titleEn: 'IT Staff Augmentation', descPl: 'Uzupełniamy Twój zespół o specjalistów z konkretnymi kompetencjami. Pracują jako integralna część Twojego zespołu, według Twoich procesów i metodologii.', descEn: 'We supplement your team with specialists with specific competencies. They work as an integral part of your team, following your processes and methodologies.' },
      { titlePl: 'Dedicated Team', titleEn: 'Dedicated Team', descPl: 'Otrzymujesz dedykowany zespół, który pracuje wyłącznie nad Twoimi projektami. Pełna kontrola i transparentność przy zachowaniu elastyczności outsourcingu.', descEn: 'You get a dedicated team that works exclusively on your projects. Full control and transparency while maintaining the flexibility of outsourcing.' },
    ]),
    checklistSection('technologies-frontend', 'Technologie: Frontend', 'Technologies: Frontend', '', '',
      ['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript'], ['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript']),
    checklistSection('technologies-backend', 'Technologie: Backend', 'Technologies: Backend', '', '',
      ['Node.js', 'Python', 'Java', '.NET', 'PHP'], ['Node.js', 'Python', 'Java', '.NET', 'PHP']),
    checklistSection('technologies-mobile', 'Technologie: Mobile', 'Technologies: Mobile', '', '',
      ['React Native', 'Flutter', 'iOS Native', 'Android Native'], ['React Native', 'Flutter', 'iOS Native', 'Android Native']),
    checklistSection('technologies-devops', 'Technologie: DevOps & Cloud', 'Technologies: DevOps & Cloud', '', '',
      ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'], ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD']),
  ],
});

// =====================================================
// 9) cetus-venture-capital
// =====================================================
docs.push({
  _id: 'servicePage-cetus-venture-capital',
  _type: 'servicePage',
  slug: { _type: 'slug', current: 'cetus-venture-capital' },
  title: ls('Cetus Venture Capital', 'Cetus Venture Capital'),
  heroTitle: ls('Cetus Venture Capital', 'Cetus Venture Capital'),
  heroDescription: lt('Inwestujemy w obiecujące startupy technologiczne. Nie tylko kapitał - ale także mentoring, kontakty i wsparcie techniczne.', 'We invest in promising technology startups. Not only capital - but also mentoring, contacts and technical support.'),
  heroButtonText: ls('Zgłoś startup', 'Submit a startup'),
  heroButtonLink: '/kontakt',
  sections: [
    gridSection('benefits', 'Co oferujemy', 'What we offer', '', '', [
      { titlePl: 'Kapitał na rozwój', titleEn: 'Capital for growth', descPl: 'Zapewniamy finansowanie dostosowane do etapu rozwoju Twojego startupu - od seed do Series A i dalej.', descEn: 'We provide funding tailored to your startup\'s stage of development - from seed to Series A and beyond.' },
      { titlePl: 'Mentoring i doradztwo', titleEn: 'Mentoring and advisory', descPl: 'Nasz zespół ekspertów wspiera Cię w kluczowych decyzjach biznesowych i technologicznych.', descEn: 'Our team of experts supports you in key business and technology decisions.' },
      { titlePl: 'Sieć kontaktów', titleEn: 'Network of contacts', descPl: 'Zyskujesz dostęp do naszej sieci partnerów, inwestorów i potencjalnych klientów.', descEn: 'You gain access to our network of partners, investors and potential customers.' },
      { titlePl: 'Wsparcie techniczne', titleEn: 'Technical support', descPl: 'Pomagamy w budowie i skalowaniu produktu technologicznego na najwyższym poziomie.', descEn: 'We help build and scale a technology product at the highest level.' },
    ]),
    tabsSection('phases', 'Etapy inwestycji', 'Investment stages', '', '', [
      { titlePl: 'Pre-seed & Seed', titleEn: 'Pre-seed & Seed', descPl: 'Finansowanie na początku drogi - od pomysłu do pierwszych klientów.', descEn: 'Funding at the beginning of the journey - from idea to first customers.',
        appsPl: ['50k - 500k PLN'], appsEn: ['50k - 500k PLN'], effectPl: '', effectEn: '' },
      { titlePl: 'Series A', titleEn: 'Series A', descPl: 'Wsparcie w skalowaniu biznesu i zdobywaniu rynku.', descEn: 'Support in scaling the business and conquering the market.',
        appsPl: ['500k - 5M PLN'], appsEn: ['500k - 5M PLN'], effectPl: '', effectEn: '' },
      { titlePl: 'Growth Stage', titleEn: 'Growth Stage', descPl: 'Kapitał na ekspansję międzynarodową i rozwój zespołu.', descEn: 'Capital for international expansion and team development.',
        appsPl: ['5M+ PLN'], appsEn: ['5M+ PLN'], effectPl: '', effectEn: '' },
    ]),
    gridSection('criteria', 'Kryteria inwestycji', 'Investment criteria', '', '', [
      { titlePl: 'Innowacyjny pomysł', titleEn: 'Innovative idea', descPl: 'Szukamy startupów z unikalnym produktem rozwiązującym realny problem.', descEn: 'We are looking for startups with a unique product solving a real problem.' },
      { titlePl: 'Silny zespół', titleEn: 'Strong team', descPl: 'Inwestujemy w ludzi - zespół z komplementarnymi kompetencjami i pasją.', descEn: 'We invest in people - a team with complementary competencies and passion.' },
      { titlePl: 'Potencjał wzrostu', titleEn: 'Growth potential', descPl: 'Startupy z jasną ścieżką do skalowalności i dużego rynku.', descEn: 'Startups with a clear path to scalability and a large market.' },
      { titlePl: 'Dopasowanie strategiczne', titleEn: 'Strategic fit', descPl: 'Projekty zgodne z naszą specjalizacją technologiczną.', descEn: 'Projects consistent with our technological specialization.' },
    ]),
    gridSection('portfolio', 'Portfolio', 'Portfolio', 'Nasze inwestycje', 'Our investments', [
      { titlePl: 'TechStart AI (Series A)', titleEn: 'TechStart AI (Series A)', descPl: 'Platforma AI do automatyzacji procesów biznesowych', descEn: 'AI platform for business process automation' },
      { titlePl: 'HealthConnect (Seed)', titleEn: 'HealthConnect (Seed)', descPl: 'Aplikacja łącząca pacjentów z lekarzami specjalistami', descEn: 'App connecting patients with specialist doctors' },
      { titlePl: 'EcoDelivery (Pre-seed)', titleEn: 'EcoDelivery (Pre-seed)', descPl: 'Ekologiczna platforma dostaw last-mile', descEn: 'Ecological last-mile delivery platform' },
    ]),
  ],
});

// --- Commit ---
const tx = client.transaction();
for (const d of docs) tx.createOrReplace(d);
const result = await tx.commit();
console.log(`Seeded ${docs.length} service pages:`);
for (const r of result.results) console.log(` - ${r.id}: ${r.operation}`);
