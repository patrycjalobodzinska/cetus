/**
 * Seed script for Winopasja case study.
 *
 * Prerequisites:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local (already set: bjy1qdxm)
 *   - SANITY_API_TOKEN with write permissions in .env.local
 *
 * Install deps if missing:
 *   pnpm add -D @sanity/client dotenv tsx
 *
 * Usage:
 *   npx dotenv -e .env.local -- npx tsx scripts/seed-winopasja.ts
 *
 * Or simply set SANITY_API_TOKEN env var and run:
 *   SANITY_API_TOKEN=sk... npx tsx scripts/seed-winopasja.ts
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { randomUUID } from 'crypto'

// Try to load .env.local manually if token not set
if (!process.env.SANITY_API_TOKEN) {
  try {
    const envPath = resolve(process.cwd(), '.env.local')
    const envContent = readFileSync(envPath, 'utf-8')
    for (const line of envContent.split('\n')) {
      const match = line.match(/^([^=]+)=(.*)$/)
      if (match) {
        process.env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '')
      }
    }
  } catch {
    // .env.local not found — rely on env vars being set externally
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bjy1qdxm',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2021-06-07',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function key() {
  return randomUUID().replace(/-/g, '').substring(0, 12)
}

const winopasjaDoc = {
  _id: 'case-study-winopasja',
  _type: 'caseStudy',
  title: {
    pl: 'Winopasja',
    en: 'Winopasja',
  },
  slug: {
    _type: 'slug',
    current: 'winopasja',
  },
  category: {
    pl: 'Rolnictwo & Winiarstwo',
    en: 'Agriculture & Winery',
  },
  sections: [
    // 1. Hero
    {
      _type: 'csHeroSection',
      _key: key(),
      variant: 'split',
      title: {
        pl: 'Winopasja',
        en: 'Winopasja',
      },
      category: {
        pl: 'Rolnictwo & Winiarstwo',
        en: 'Agriculture & Winery',
      },
      description: {
        pl: 'Kompleksowa platforma e-commerce dla polskiego rynku win, łącząca marketplace, panel winiarni, aplikację mobilną klienta oraz moduł enoturystyki w jednym ekosystemie.',
        en: 'A comprehensive e-commerce platform for the Polish wine market, combining a marketplace, winery panel, customer mobile app, and enotourism module in a single ecosystem.',
      },
    },

    // 2. Stats
    {
      _type: 'csStatsSection',
      _key: key(),
      variant: 'cards',
      items: [
        {
          _key: key(),
          value: '400+',
          label: { pl: 'Aktywnych użytkowników', en: 'Active users' },
          icon: 'Users',
        },
        {
          _key: key(),
          value: '400+',
          label: { pl: 'Transakcji miesięcznie', en: 'Transactions monthly' },
          icon: 'TrendingUp',
        },
        {
          _key: key(),
          value: '1000+',
          label: { pl: 'Zamówień obsłużonych', en: 'Orders processed' },
          icon: 'CheckCircle2',
        },
        {
          _key: key(),
          value: '40+',
          label: { pl: 'Współpracujących winiarni', en: 'Partner wineries' },
          icon: 'Shield',
        },
      ],
    },

    // 3. Challenge
    {
      _type: 'csChallengeSection',
      _key: key(),
      variant: 'narrative',
      intro: {
        pl: 'Polski rynek win rozwijał się dynamicznie, jednak brakowało cyfrowego ekosystemu łączącego producentów z konsumentami. Winiarnie musiały korzystać z wielu niezintegrowanych narzędzi, a klienci nie mieli jednego miejsca do odkrywania i zamawiania polskich win.',
        en: 'The Polish wine market was growing rapidly, but lacked a digital ecosystem connecting producers with consumers. Wineries had to use multiple non-integrated tools, and customers had no single place to discover and order Polish wines.',
      },
      bullets: {
        pl: [
          'Brak centralnej platformy łączącej polskie winiarnie i klientów',
          'Rozproszony proces sprzedaży — różne kanały, brak jednolitego UX',
          'Utrudniony dostęp do logistyki i obsługi zamówień dla małych winiarni',
          'Brak narzędzi do enoturystyki i rezerwacji wizyt w winiarniach',
          'Brak aplikacji mobilnej dla klientów chcących kupować wino w każdym miejscu',
        ],
        en: [
          'No central platform connecting Polish wineries and customers',
          'Fragmented sales process — multiple channels, inconsistent UX',
          'Difficult access to logistics and order handling for small wineries',
          'No tools for enotourism and winery visit reservations',
          'No mobile app for customers wanting to buy wine anywhere',
        ],
      },
      consequence: {
        pl: 'Bariery te ograniczały wzrost całego sektora i uniemożliwiały skalowanie lokalnych producentów.',
        en: 'These barriers limited the growth of the entire sector and prevented local producers from scaling.',
      },
    },

    // 4. Scope
    {
      _type: 'csScopeSection',
      _key: key(),
      variant: 'list',
      sectionTitle: {
        pl: 'Zakres projektu',
        en: 'Project scope',
      },
      items: {
        pl: [
          'Marketplace win — wyszukiwanie, filtry, koszyk, płatności',
          'Panel Winiarni — zarządzanie produktami, zamówieniami, profilem',
          'Aplikacja mobilna klienta (React Native)',
          'Integracja logistyczna z firmami kurierskimi',
          'Moduł enoturystyki — rezerwacje wizyt w winiarniach',
          'System voucherów i kart podarunkowych',
          'Integracja z bramką płatności (Przelewy24)',
          'Panel administracyjny platformy',
        ],
        en: [
          'Wine marketplace — search, filters, cart, payments',
          'Winery panel — product, order, and profile management',
          'Customer mobile app (React Native)',
          'Logistics integration with courier companies',
          'Enotourism module — winery visit reservations',
          'Voucher and gift card system',
          'Payment gateway integration (Przelewy24)',
          'Platform administration panel',
        ],
      },
      note: {
        pl: 'Projekt realizowany iteracyjnie w metodologii agile, z regularnymi releasami co 2 tygodnie.',
        en: 'Project delivered iteratively using agile methodology, with regular bi-weekly releases.',
      },
    },

    // 5. Modules
    {
      _type: 'csModulesSection',
      _key: key(),
      variant: 'alternating',
      sectionTitle: {
        pl: 'Kluczowe moduły platformy',
        en: 'Key platform modules',
      },
      items: [
        {
          _key: key(),
          title: { pl: 'Marketplace win', en: 'Wine marketplace' },
          description: {
            pl: [
              'Zaawansowane wyszukiwanie i filtrowanie po regionie, szczepie, cenie, rocznik',
              'Koszyk zakupowy z obsługą wielu winiarni jednocześnie',
              'Integracja z systemem płatności Przelewy24',
              'Recenzje i oceny produktów przez klientów',
            ],
            en: [
              'Advanced search and filtering by region, grape variety, price, vintage',
              'Shopping cart supporting multiple wineries simultaneously',
              'Integration with Przelewy24 payment system',
              'Customer product reviews and ratings',
            ],
          },
        },
        {
          _key: key(),
          title: { pl: 'Panel Winiarni', en: 'Winery Panel' },
          description: {
            pl: [
              'Zarządzanie katalogiem produktów i cenami',
              'Obsługa i śledzenie zamówień w czasie rzeczywistym',
              'Statystyki sprzedaży i raportowanie',
              'Zarządzanie profilem winiarni i treściami marketingowymi',
            ],
            en: [
              'Product catalog and price management',
              'Real-time order handling and tracking',
              'Sales statistics and reporting',
              'Winery profile and marketing content management',
            ],
          },
        },
        {
          _key: key(),
          title: { pl: 'Aplikacja mobilna klienta', en: 'Customer Mobile App' },
          description: {
            pl: [
              'Natywna aplikacja iOS i Android (React Native)',
              'Pełna funkcjonalność marketplace dostępna mobilnie',
              'Powiadomienia push o statusie zamówień',
              'Historia zakupów i ulubione wina',
            ],
            en: [
              'Native iOS and Android app (React Native)',
              'Full marketplace functionality available on mobile',
              'Push notifications for order status updates',
              'Purchase history and favorite wines',
            ],
          },
        },
        {
          _key: key(),
          title: { pl: 'Integracja logistyczna', en: 'Logistics Integration' },
          description: {
            pl: [
              'Automatyczne generowanie etykiet wysyłkowych',
              'Integracja z DPD i InPost',
              'Śledzenie przesyłek dla klientów w czasie rzeczywistym',
              'Obsługa zwrotów i reklamacji',
            ],
            en: [
              'Automatic shipping label generation',
              'Integration with DPD and InPost',
              'Real-time shipment tracking for customers',
              'Returns and complaints handling',
            ],
          },
        },
        {
          _key: key(),
          title: { pl: 'Moduł Enoturystyki', en: 'Enotourism Module' },
          description: {
            pl: [
              'Rezerwacje wizyt, degustacji i eventów w winiarniach',
              'Kalendarz dostępności zarządzany przez winiarnie',
              'System potwierdzeń i przypomnień email/SMS',
              'Recenzje odwiedzonych winiarni',
            ],
            en: [
              'Reservations for visits, tastings, and events at wineries',
              'Availability calendar managed by wineries',
              'Email/SMS confirmation and reminder system',
              'Reviews of visited wineries',
            ],
          },
        },
        {
          _key: key(),
          title: { pl: 'Vouchery i karty podarunkowe', en: 'Vouchers & Gift Cards' },
          description: {
            pl: [
              'Generowanie i sprzedaż voucherów wartościowych i produktowych',
              'System kodów rabatowych dla kampanii marketingowych',
              'Cyfrowe karty podarunkowe z możliwością personalizacji',
              'Śledzenie wykorzystania voucherów',
            ],
            en: [
              'Generation and sale of value and product vouchers',
              'Discount code system for marketing campaigns',
              'Digital gift cards with personalization options',
              'Voucher usage tracking',
            ],
          },
        },
      ],
    },

    // 6. Results
    {
      _type: 'csResultsSection',
      _key: key(),
      variant: 'numbered',
      sectionTitle: {
        pl: 'Rezultaty biznesowe',
        en: 'Business results',
      },
      items: {
        pl: [
          'Ponad 400 aktywnych użytkowników zarejestrowanych w ciągu pierwszych 6 miesięcy działania platformy',
          'Ponad 40 winiarni dołączyło do ekosystemu jako partnerzy sprzedażowi',
          'Ponad 1000 zamówień obsłużonych z automatyczną integracją logistyczną',
          'Skrócenie czasu obsługi zamówienia przez winiarnie o 60% dzięki automatyzacji',
          'Wzrost sprzedaży win online dla partnerskich winiarni średnio o 35%',
          'Uruchomienie modułu enoturystyki z rezerwacjami dla 15+ winiarni w Polsce',
          'Ocena 4.8/5 w sklepach App Store i Google Play po 3 miesiącach od premiery aplikacji',
        ],
        en: [
          'Over 400 active users registered in the first 6 months of platform operation',
          'Over 40 wineries joined the ecosystem as sales partners',
          'Over 1,000 orders processed with automated logistics integration',
          '60% reduction in order processing time for wineries through automation',
          '35% average increase in online wine sales for partner wineries',
          'Enotourism module launched with reservations for 15+ wineries in Poland',
          '4.8/5 rating in App Store and Google Play 3 months after app launch',
        ],
      },
    },

    // 7. Technologies
    {
      _type: 'csTechnologiesSection',
      _key: key(),
      variant: 'circuit',
      sectionTitle: {
        pl: 'Stack technologiczny',
        en: 'Technology stack',
      },
      items: [
        'Next.js',
        'NestJS',
        'React Native',
        'PostgreSQL',
        'Redis',
        'Przelewy24',
        'AWS',
        'Docker',
      ],
    },

    // 8. Quote
    {
      _type: 'csQuoteSection',
      _key: key(),
      variant: 'centered',
      quote: {
        pl: 'Platforma Winopasja zrewolucjonizowała sposób, w jaki docieramy do naszych klientów. Dzięki panelowi winiarni mamy pełną kontrolę nad sprzedażą, a integracja logistyczna oszczędza nam codziennie godziny pracy.',
        en: 'The Winopasja platform revolutionized the way we reach our customers. Thanks to the winery panel, we have full control over sales, and the logistics integration saves us hours of work every day.',
      },
      author: 'Założyciel winiarni partnerskiej Winopasja',
    },

    // 9. CTA
    {
      _type: 'csCtaSection',
      _key: key(),
      variant: 'centered',
      heading: {
        pl: 'Chcesz stworzyć podobne rozwiązanie?',
        en: 'Want to build a similar solution?',
      },
      description: {
        pl: 'Skontaktuj się z nami i opowiedz o swoich potrzebach – stworzymy rozwiązanie dopasowane do Twojego biznesu.',
        en: 'Contact us and tell us about your needs – we will create a solution tailored to your business.',
      },
      buttonLabel: {
        pl: 'Skontaktuj się z nami',
        en: 'Contact us',
      },
      buttonHref: '/kontakt',
    },
  ],
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌  SANITY_API_TOKEN is not set. Add it to .env.local and re-run.')
    process.exit(1)
  }

  console.log('🍷  Seeding Winopasja case study...')
  console.log('   Project:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bjy1qdxm')

  try {
    const result = await client.createOrReplace(winopasjaDoc)
    console.log('✅  Done! Document ID:', result._id)
  } catch (error) {
    console.error('❌  Seed failed:', error)
    process.exit(1)
  }
}

main()
