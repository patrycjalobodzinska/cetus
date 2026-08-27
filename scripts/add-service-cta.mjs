/**
 * Domyka strony usługowe wezwaniem do rozmowy.
 *
 * Sześć z dziewięciu stron kończyło się listą funkcji albo (do sierpnia 2026)
 * wymyślonym case study - bez żadnego następnego kroku dla czytelnika.
 * PRODUCT.md: konsultacja jest jedyną konwersją, więc każda strona usługi
 * musi się nią kończyć.
 *
 * Cofnięcie: node scripts/restore-copy.mjs sanity/backups/<plik>.json
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

const CTA = {
  'servicePage-cybersecurity': {
    title: ['Sprawdźmy, gdzie jesteście najbardziej narażeni', "Let's find where you are most exposed"],
    description: [
      'Zaczynamy od audytu: dostajesz listę podatności uszeregowaną według ryzyka i plan naprawy z priorytetami.',
      'We start with an audit: you get a vulnerability list ranked by risk and a prioritised remediation plan.',
    ],
    button: ['Umów audyt', 'Book an audit'],
  },
  'servicePage-transformacja-technologiczna': {
    title: ['Porozmawiajmy o Twoim systemie', "Let's talk about your system"],
    description: [
      'Ocenimy stan obecnej infrastruktury i pokażemy, które zmiany dadzą efekt najszybciej - bez przerywania pracy zespołów.',
      'We will assess your current infrastructure and show which changes pay off first - without interrupting how your teams work.',
    ],
    button: ['Umów konsultację', 'Book a consultation'],
  },
  'servicePage-ui-ux-design': {
    title: ['Pokaż nam swój produkt', 'Show us your product'],
    description: [
      'Przejdziemy przez obecny interfejs i wskażemy miejsca, w których użytkownicy tracą czas albo rezygnują.',
      'We will walk through your current interface and point out where users lose time or drop out.',
    ],
    button: ['Umów przegląd UX', 'Book a UX review'],
  },
  'servicePage-aplikacje-mobilne': {
    title: ['Porozmawiajmy o Twojej aplikacji', "Let's talk about your app"],
    description: [
      'Opowiedz o zakresie, a wrócimy z rekomendacją technologii, harmonogramem i modelem współpracy.',
      'Tell us about the scope and we will come back with a technology recommendation, a timeline and an engagement model.',
    ],
    button: ['Umów konsultację', 'Book a consultation'],
  },
  'servicePage-outsourcing-programistow': {
    title: ['Powiedz, kogo potrzebujesz', 'Tell us who you need'],
    description: [
      'Przedstawimy dostępnych inżynierów, ich doświadczenie i model rozliczenia - zwykle w ciągu kilku dni roboczych.',
      'We will present available engineers, their experience and the billing model - usually within a few business days.',
    ],
    button: ['Porozmawiajmy o zespole', "Let's talk about the team"],
  },
  'servicePage-akademia-i-szkolenia': {
    title: ['Zaplanujmy szkolenie dla Twojego zespołu', "Let's plan training for your team"],
    description: [
      'Dopasujemy program do technologii, z których korzystacie, i do poziomu zespołu.',
      'We will tailor the programme to the technologies you use and to your team level.',
    ],
    button: ['Umów rozmowę', 'Book a call'],
  },
};

const docs = [];
for (const [id, copy] of Object.entries(CTA)) {
  const doc = await client.fetch(`*[_id==$id][0]`, { id });
  if (!doc) { console.warn('brak dokumentu', id); continue; }
  if (doc.sections?.some((s) => s.sectionKey === 'cta')) { console.log('CTA już jest:', id); continue; }
  doc.sections.push({
    _key: `cta${id.slice(-8).replace(/[^a-z0-9]/g, '')}`,
    _type: 'ctaBlock',
    sectionKey: 'cta',
    title: { _type: 'localeString', pl: copy.title[0], en: copy.title[1] },
    description: { _type: 'localeText', pl: copy.description[0], en: copy.description[1] },
    buttonText: { _type: 'localeString', pl: copy.button[0], en: copy.button[1] },
    buttonLink: '/kontakt',
    email: 'contact@cetuspro.com',
  });
  docs.push(doc);
}

let tx = client.transaction();
for (const doc of docs) tx = tx.createOrReplace(doc);
await tx.commit();
console.log(`Dodano CTA na ${docs.length} stronach usługowych.`);
