/**
 * Porządki w ofercie i O nas (2026-08-28, na życzenie klienta):
 *
 *  1. UX/UI Design → Fast Prototyping - nowa podstrona `fast-prototyping`
 *     z nową treścią, stary dokument `servicePage-ui-ux-design` usunięty
 *     (przekierowanie 301 siedzi w next.config.ts).
 *  2. Transformacja technologiczna - zdjęta z oferty w całości.
 *  3. AI i automatyzacja - bez sekcji „Nasz proces".
 *  4. Outsourcing programistów - bez czterech sekcji „Technologie: ...".
 *  5. CETUSPRO Academy - przepisana: praktyki i staże dla uczniów
 *     i studentów, żadnych otwartych kursów.
 *  6. O nas - usunięty wpis historii z 2024 (razem ze zdjęciem).
 *
 * Uruchomienie:
 *   node scripts/update-offer-2026-08-28.mjs        (zapis)
 *   node scripts/update-offer-2026-08-28.mjs --dry  (tylko podsumowanie)
 */

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
  apiVersion: '2021-06-07',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const DRY = process.argv.includes('--dry');

const ls = (plVal, enVal) => ({ _type: 'localeString', pl: plVal, en: enVal });
const lt = (plVal, enVal) => ({ _type: 'localeText', pl: plVal, en: enVal });
const lsa = (plArr, enArr) => ({ _type: 'localeStringArray', pl: plArr, en: enArr });

let seq = 0;
const _key = () => `k${(seq += 1).toString().padStart(3, '0')}`;

const gridSection = (sectionKey, title, description, items) => ({
  _key: _key(),
  _type: 'gridSection',
  sectionKey,
  title,
  description,
  items: items.map((it) => ({ _key: _key(), title: it.title, description: it.description })),
});

const stepsSection = (sectionKey, title, description, steps) => ({
  _key: _key(),
  _type: 'stepsSection',
  sectionKey,
  title,
  description,
  steps: steps.map((s) => ({ _key: _key(), title: s.title, description: s.description })),
});

const checklistSection = (sectionKey, title, description, items) => ({
  _key: _key(),
  _type: 'checklistSection',
  sectionKey,
  title,
  description,
  items,
});

const ctaBlock = (sectionKey, title, description, buttonText, buttonLink) => ({
  _key: _key(),
  _type: 'ctaBlock',
  sectionKey,
  title,
  description,
  buttonText,
  buttonLink,
  email: '',
});

// =====================================================================
// 1) Fast Prototyping - nowa podstrona
// =====================================================================
const fastPrototyping = {
  _id: 'servicePage-fast-prototyping',
  _type: 'servicePage',
  slug: { _type: 'slug', current: 'fast-prototyping' },
  title: ls('Fast Prototyping', 'Fast Prototyping'),
  heroTitle: ls(
    'Fast Prototyping - klikalny prototyp w kilka dni',
    'Fast Prototyping - a clickable prototype in days'
  ),
  heroDescription: lt(
    'Zamiast miesiąca na specyfikację: w kilka dni dostajesz klikalny prototyp z prawdziwymi ekranami i przepływami. Możesz go pokazać zarządowi, przetestować z użytkownikami i policzyć koszt wdrożenia, zanim powstanie pierwsza linijka kodu.',
    'Instead of a month spent on documentation: in a matter of days you get a clickable prototype with real screens and real flows. Show it to the board, test it with users and price the build - before the first line of code exists.'
  ),
  heroButtonText: ls('Zamów prototyp', 'Request a prototype'),
  heroButtonLink: '/kontakt',
  sections: [
    gridSection(
      'deliverables',
      ls('Co dostajesz', 'What you get'),
      lt(
        'Konkretny zestaw materiałów, na których da się podjąć decyzję - nie prezentacja o metodyce.',
        'A concrete set of deliverables you can decide on - not a deck about methodology.'
      ),
      [
        {
          title: ls('Klikalny prototyp', 'Clickable prototype'),
          description: lt(
            'Działający przepływ w przeglądarce i na telefonie: te same ekrany, przejścia i stany, które zobaczy użytkownik.',
            'A working flow in the browser and on a phone: the same screens, transitions and states a user will see.'
          ),
        },
        {
          title: ls('Projekt interfejsu', 'Interface design'),
          description: lt(
            'Ekrany kluczowe dla procesu, w spójnej stylistyce, z zapasem na rozbudowę o kolejne moduły.',
            'The screens that carry the process, in one consistent style, ready to extend with further modules.'
          ),
        },
        {
          title: ls('Mapa przepływów', 'Flow map'),
          description: lt(
            'Kto co robi i w jakiej kolejności - razem z przypadkami brzegowymi, które zwykle wychodzą dopiero na produkcji.',
            'Who does what and in what order - including the edge cases that usually surface only in production.'
          ),
        },
        {
          title: ls('Lista założeń i ryzyk', 'Assumptions and risks'),
          description: lt(
            'Spisane wprost: co przyjęliśmy, czego jeszcze nie wiemy i co może wywrócić harmonogram.',
            'Written down plainly: what we assumed, what is still unknown and what could break the schedule.'
          ),
        },
        {
          title: ls('Wycena wdrożenia', 'Build estimate'),
          description: lt(
            'Zakres podzielony na etapy, z widełkami kosztu i czasu - materiał pod wniosek budżetowy.',
            'Scope split into stages with cost and time ranges - material you can take into a budget request.'
          ),
        },
        {
          title: ls('Materiał do rozmów', 'Something to show'),
          description: lt(
            'Prototyp działa jako demo dla zarządu, klienta albo inwestora - bez tłumaczenia, „jak to będzie wyglądać".',
            'The prototype doubles as a demo for the board, a client or an investor - no need to explain how it will look.'
          ),
        },
      ]
    ),
    stepsSection(
      'process',
      ls('Jak to przebiega', 'How it runs'),
      lt(
        'Typowy prototyp zamykamy w jednym tygodniu roboczym. Przy większym zakresie dzielimy go na dwa takie przebiegi.',
        'A typical prototype fits into one working week. For a larger scope we split it into two such runs.'
      ),
      [
        {
          title: ls('Dzień 1 - warsztat', 'Day 1 - workshop'),
          description: lt(
            'Kilka godzin z osobami, które znają proces. Wychodzimy z listą użytkowników, celów i twardych ograniczeń.',
            'A few hours with the people who know the process. We leave with a list of users, goals and hard constraints.'
          ),
        },
        {
          title: ls('Dni 2-3 - przepływy i szkielety', 'Days 2-3 - flows and wireframes'),
          description: lt(
            'Układamy ścieżki i szkice ekranów. Na tym etapie zmiany są tanie, więc to moment na spór o zakres.',
            'We lay out the paths and rough screens. Changes are cheap here, so this is the moment to argue about scope.'
          ),
        },
        {
          title: ls('Dni 4-5 - prototyp', 'Days 4-5 - prototype'),
          description: lt(
            'Ekrany dostają docelową szatę graficzną i zostają połączone w klikalny przepływ.',
            'Screens get their final visual design and are wired into a clickable flow.'
          ),
        },
        {
          title: ls('Przegląd i decyzja', 'Review and decision'),
          description: lt(
            'Pokazujemy prototyp, oddajemy wycenę i plan etapów. Możesz wejść w development z nami albo z własnym zespołem - materiały są Twoje.',
            'We walk you through the prototype and hand over the estimate and stage plan. You can build with us or with your own team - the materials are yours.'
          ),
        },
      ]
    ),
    gridSection(
      'when',
      ls('Kiedy to ma sens', 'When it makes sense'),
      lt('', ''),
      [
        {
          title: ls('Nowy produkt', 'A new product'),
          description: lt(
            'Pomysł jest, ale nikt go jeszcze nie widział w działaniu - prototyp weryfikuje go tygodnie przed budżetem na development.',
            'The idea exists but nobody has seen it work - a prototype tests it weeks before the development budget.'
          ),
        },
        {
          title: ls('Duża zmiana w systemie', 'A major change to a system'),
          description: lt(
            'Przebudowa modułu, z którego korzysta cała firma. Prototyp pokazuje skutki zmiany, zanim dotkniemy produkcji.',
            'Rebuilding a module the whole company depends on. The prototype shows the consequences before we touch production.'
          ),
        },
        {
          title: ls('Wniosek o budżet', 'A budget request'),
          description: lt(
            'Decydenci znacznie łatwiej zatwierdzają coś, co mogą kliknąć, niż dokument z wymaganiami.',
            'Decision makers approve something they can click far more easily than a requirements document.'
          ),
        },
        {
          title: ls('Rozmowa z inwestorem', 'An investor conversation'),
          description: lt(
            'Działające demo zamiast slajdów - w kilka dni, na konkretny termin spotkania.',
            'A working demo instead of slides - in days, timed to a specific meeting.'
          ),
        },
        {
          title: ls('Pomysł na AI', 'An AI idea'),
          description: lt(
            'Sprawdzamy na prototypie, gdzie model realnie skraca pracę, a gdzie jest tylko efektem demo.',
            'We use the prototype to check where a model genuinely saves work and where it is only a demo effect.'
          ),
        },
        {
          title: ls('Przetarg lub RFP', 'A tender or RFP'),
          description: lt(
            'Prototyp precyzuje zakres, więc oferty od wykonawców dają się w końcu porównać.',
            'A prototype pins down the scope, so vendor bids finally become comparable.'
          ),
        },
      ]
    ),
    checklistSection(
      'included',
      ls('Co jest w zakresie', 'What is included'),
      lt(
        'Stała cena za przebieg, ustalana po warsztacie wstępnym.',
        'A fixed price per run, agreed after the initial workshop.'
      ),
      lsa(
        [
          'Warsztat z Waszym zespołem i zebranie wymagań',
          'Mapa przepływów i szkielety ekranów',
          'Projekt interfejsu ekranów kluczowych dla procesu',
          'Klikalny prototyp na desktopie i mobile',
          'Lista założeń, ryzyk i pytań otwartych',
          'Wycena wdrożenia z podziałem na etapy',
          'Pliki źródłowe projektu przekazane na Waszą stronę',
        ],
        [
          'A workshop with your team and requirements gathering',
          'Flow map and screen wireframes',
          'Interface design for the screens that carry the process',
          'A clickable prototype on desktop and mobile',
          'A list of assumptions, risks and open questions',
          'A build estimate broken down into stages',
          'Design source files handed over to you',
        ]
      )
    ),
    ctaBlock(
      'cta',
      ls('Zróbmy prototyp Twojego pomysłu', "Let's prototype your idea"),
      lt(
        'Napisz, co chcesz sprawdzić. Odpowiemy, czy da się to zamknąć w jednym przebiegu, ile to kosztuje i kiedy możemy zacząć.',
        'Tell us what you want to test. We will tell you whether it fits into one run, what it costs and when we can start.'
      ),
      ls('Porozmawiajmy', "Let's talk"),
      '/kontakt'
    ),
  ],
};

// =====================================================================
// 2) CETUSPRO Academy - praktyki i staże, nie kursy
// =====================================================================
const academy = {
  _id: 'servicePage-akademia-i-szkolenia',
  _type: 'servicePage',
  slug: { _type: 'slug', current: 'akademia-i-szkolenia' },
  title: ls('CETUSPRO Academy', 'CETUSPRO Academy'),
  heroTitle: ls(
    'CETUSPRO Academy - praktyki i staże dla uczniów i studentów',
    'CETUSPRO Academy - internships for pupils and students'
  ),
  heroDescription: lt(
    'Nie prowadzimy otwartych kursów ani bootcampów. Academy to program praktyk i staży: uczniowie techników i studenci kierunków IT pracują u nas przy realnych projektach, z opiekunem z zespołu i normalnym code review.',
    'We do not run open courses or bootcamps. Academy is an internship and apprenticeship programme: technical-school pupils and IT students work with us on real projects, with a mentor from the team and normal code review.'
  ),
  heroButtonText: ls('Zgłoś się na praktyki', 'Apply for an internship'),
  heroButtonLink: '/kontakt',
  sections: [
    gridSection(
      'what',
      ls('Co to jest', 'What it is'),
      lt(
        'Praktyka w firmie software house, a nie zajęcia w sali. Zadania pochodzą z projektów, które właśnie prowadzimy.',
        'A placement inside a software house, not a classroom. The tasks come from projects we are actually running.'
      ),
      [
        {
          title: ls('Praktyki obowiązkowe', 'Mandatory placements'),
          description: lt(
            'Realizujemy praktyki wymagane programem technikum lub studiów - z dokumentacją i opinią dla szkoły albo uczelni.',
            'We host the placements required by a technical school or university curriculum - with the paperwork and an assessment for the school.'
          ),
        },
        {
          title: ls('Staże wakacyjne', 'Summer internships'),
          description: lt(
            'Dłuższy, płatny udział w projekcie w okresie lipiec-wrzesień, z zakresem ustalanym pod poziom uczestnika.',
            'A longer, paid stint on a project between July and September, with scope matched to the participant.'
          ),
        },
        {
          title: ls('Realny projekt', 'A real project'),
          description: lt(
            'Zadania z backlogu prowadzonego produktu - nie ćwiczenia z podręcznika i nie projekt do szuflady.',
            'Tickets from the backlog of a live product - not textbook exercises, not a throwaway project.'
          ),
        },
        {
          title: ls('Opiekun z zespołu', 'A mentor from the team'),
          description: lt(
            'Konkretna osoba odpowiedzialna za wprowadzenie, cotygodniowe omówienie postępów i odpowiadanie na pytania.',
            'A named person responsible for onboarding, a weekly progress review and answering questions.'
          ),
        },
        {
          title: ls('Code review', 'Code review'),
          description: lt(
            'Kod idzie na review tak samo jak kod całego zespołu. To najszybsza nauka i jednocześnie nasz standard jakości.',
            'Code goes through review exactly like everyone else’s. It is the fastest way to learn and our quality standard at once.'
          ),
        },
        {
          title: ls('Referencje', 'A reference'),
          description: lt(
            'Po zakończeniu wystawiamy zaświadczenie i opis wykonanych zadań - do CV i do rekrutacji u nas.',
            'At the end we issue a certificate and a description of the work done - for a CV and for recruiting with us.'
          ),
        },
      ]
    ),
    gridSection(
      'audience',
      ls('Dla kogo', 'Who it is for'),
      lt('', ''),
      [
        {
          title: ls('Uczniowie techników informatycznych', 'Technical-school pupils'),
          description: lt(
            'Głównie klasy o profilu programistycznym - w ramach praktyk przewidzianych programem nauczania.',
            'Mainly programming-track classes - as part of the placements their curriculum requires.'
          ),
        },
        {
          title: ls('Studenci kierunków IT', 'IT students'),
          description: lt(
            'Informatyka i kierunki pokrewne, od pierwszego roku w górę - praktyki, staż albo praca przy pracy dyplomowej.',
            'Computer science and related fields, from the first year up - a placement, an internship or work tied to a thesis.'
          ),
        },
        {
          title: ls('Uczestnicy naszych wydarzeń', 'People from our events'),
          description: lt(
            'Osoby, które poznaliśmy na hackathonie Vibe The Future lub w programie Cetus Elevate.',
            'People we met at the Vibe The Future hackathon or through the Cetus Elevate programme.'
          ),
        },
      ]
    ),
    checklistSection(
      'clarity',
      ls('Czego u nas nie ma', 'What we do not do'),
      lt(
        'Mówimy to wprost, żeby nikt nie tracił czasu na zapytanie o coś, czego nie prowadzimy.',
        'Stated plainly, so nobody wastes time asking about something we do not offer.'
      ),
      lsa(
        [
          'Otwartych kursów i bootcampów dla wszystkich',
          'Płatnych szkoleń weekendowych',
          'Kursów online i materiałów sprzedawanych na sztuki',
          'Certyfikatów wystawianych za samo uczestnictwo',
        ],
        [
          'Open courses and bootcamps for the general public',
          'Paid weekend training',
          'Online courses or materials sold per seat',
          'Certificates issued for mere attendance',
        ]
      )
    ),
    stepsSection(
      'howToApply',
      ls('Jak się zgłosić', 'How to apply'),
      lt(
        'Rekrutację prowadzimy przez cały rok, ale miejsc na jeden termin jest kilka - warto pisać wcześniej.',
        'We recruit all year round, but each intake has only a few places - it pays to write early.'
      ),
      [
        {
          title: ls('Napisz do nas', 'Write to us'),
          description: lt(
            'Krótka wiadomość: szkoła lub uczelnia, rok, termin praktyk i to, co już potrafisz. Link do GitHuba albo własnego projektu mówi więcej niż list motywacyjny.',
            'A short message: your school or university, year, placement dates and what you can already do. A link to GitHub or your own project says more than a cover letter.'
          ),
        },
        {
          title: ls('Rozmowa', 'A conversation'),
          description: lt(
            'Pół godziny online: o czym chcesz się uczyć, czym się zajmujemy i czy mamy dla Ciebie sensowne zadanie.',
            'Half an hour online: what you want to learn, what we work on and whether we have a task that fits.'
          ),
        },
        {
          title: ls('Ustalenie zakresu', 'Agreeing the scope'),
          description: lt(
            'Wybieramy projekt, opiekuna i wymiar godzin - tak, żeby zmieścił się w planie zajęć.',
            'We pick the project, the mentor and the hours - so it fits around your classes.'
          ),
        },
        {
          title: ls('Start', 'Start'),
          description: lt(
            'Pierwszy dzień to wprowadzenie do projektu i dostępy. Zadania rosną wraz z Twoją samodzielnością.',
            'Day one is a project walkthrough and access setup. Tasks grow as you become more independent.'
          ),
        },
      ]
    ),
    ctaBlock(
      'cta',
      ls('Zgłoś się na praktyki lub staż', 'Apply for a placement or internship'),
      lt(
        'Napisz, kiedy masz termin praktyk i czym chcesz się zajmować. Odpowiadamy w ciągu kilku dni roboczych, także wtedy, gdy nie mamy wolnego miejsca.',
        'Tell us when your placement is due and what you want to work on. We reply within a few working days, including when we have no place left.'
      ),
      ls('Napisz do nas', 'Get in touch'),
      '/kontakt'
    ),
  ],
};

// =====================================================================
async function main() {
  const summary = [];

  const ai = await client.getDocument('servicePage-ai-i-automatyzacja-procesow');
  const aiSections = (ai?.sections || []).filter(
    (s) => !(s._type === 'stepsSection' && (s.title?.pl || '').toLowerCase().includes('nasz proces'))
  );

  const outsourcing = await client.getDocument('servicePage-outsourcing-programistow');
  const outSections = (outsourcing?.sections || []).filter(
    (s) => !(s._type === 'checklistSection' && (s.title?.pl || '').startsWith('Technologie'))
  );

  summary.push(`AI: sekcje ${ai?.sections?.length} → ${aiSections.length}`);
  summary.push(`Outsourcing: sekcje ${outsourcing?.sections?.length} → ${outSections.length}`);
  summary.push('Fast Prototyping: nowy dokument servicePage-fast-prototyping');
  summary.push('Academy: treść nadpisana (praktyki i staże)');
  summary.push('Usuwane: servicePage-ui-ux-design, servicePage-transformacja-technologiczna, historia 2024');

  if (DRY) {
    console.log(summary.join('\n'));
    return;
  }

  const tx = client
    .transaction()
    .createOrReplace(fastPrototyping)
    .createOrReplace(academy)
    .patch('servicePage-ai-i-automatyzacja-procesow', (p) => p.set({ sections: aiSections }))
    .patch('servicePage-outsourcing-programistow', (p) => p.set({ sections: outSections }))
    .delete('servicePage-ui-ux-design')
    .delete('drafts.servicePage-ui-ux-design')
    .delete('servicePage-transformacja-technologiczna')
    .delete('drafts.servicePage-transformacja-technologiczna')
    // wpis historii „2024 - Cybersecurity i standardy bezpieczeństwa" wraz ze zdjęciem
    .delete('435c658f-7c4b-49f3-bbf0-5cee4b871784')
    .delete('drafts.435c658f-7c4b-49f3-bbf0-5cee4b871784');

  await tx.commit();
  console.log(summary.join('\n'));
  console.log('\nZapisane.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
