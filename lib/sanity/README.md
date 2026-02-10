# Sanity Fetch Utilities

Wspólne funkcje i hooki do pobierania danych z Sanity CMS.

## Struktura

- `queries.ts` - Wszystkie zapytania GROQ
- `fetchers.ts` - Funkcje fetch do użycia w Server Components
- `hooks.ts` - React hooki do użycia w Client Components
- `types.ts` - Typy TypeScript dla danych z Sanity

## Użycie w Server Components

```typescript
import { fetchTechnologies, fetchIndustries } from '@/lib/sanity/fetchers';

export default async function OfferPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const technologies = await fetchTechnologies();
  const industries = await fetchIndustries();

  return (
    // ...
  );
}
```

## Użycie w Client Components

```typescript
'use client';

import { useTechnologies, useIndustries } from '@/lib/sanity/hooks';
import { useLocale } from 'next-intl';

export default function OfferPage() {
  const locale = useLocale();
  const { data: technologies, loading: techLoading } = useTechnologies();
  const { data: industries, loading: industriesLoading } = useIndustries();

  if (techLoading || industriesLoading) {
    return <div>Ładowanie...</div>;
  }

  return (
    // ...
  );
}
```

## Dostępne funkcje fetch

### Server Components (fetchers.ts)
- `fetchTechnologies()` - Technologie
- `fetchIndustries()` - Branże
- `fetchOfferStats()` - Statystyki oferty
- `fetchAboutUs(locale)` - Dane "O nas"
- `fetchHistory(locale)` - Historia firmy
- `fetchTeam(locale)` - Zespół
- `fetchFAQs(locale)` - FAQ
- `fetchPartners(locale)` - Partnerzy
- `fetchHomepageModules(locale)` - Moduły homepage
- `fetchCaseStudies(locale)` - Case studies
- `fetchCaseStudyBySlug(slug, locale)` - Pojedynczy case study
- `fetchCaseStudySlugs()` - Slugi case studies (dla generateStaticParams)
- `fetchFooter(locale)` - Footer
- `fetchFooterOfferProjects(locale)` - Projekty w footerze

### Client Components (hooks.ts)
- `useTechnologies()` - Hook dla technologii
- `useIndustries()` - Hook dla branż
- `useOfferStats()` - Hook dla statystyk
- `useAboutUs(locale)` - Hook dla "O nas"
- `useHistory(locale)` - Hook dla historii
- `useTeam(locale)` - Hook dla zespołu
- `useFAQs(locale)` - Hook dla FAQ
- `usePartners(locale)` - Hook dla partnerów
- `useHomepageModules(locale)` - Hook dla modułów homepage
- `useFooter(locale)` - Hook dla footera
- `useFooterOfferProjects(locale)` - Hook dla projektów w footerze

## Przykład refactoringu

### Przed:
```typescript
'use client';

export default function OfferPage() {
  const [technologies, setTechnologies] = useState(null);

  useEffect(() => {
    async function fetchTechnologies() {
      try {
        const query = `*[_type == "technologies"][0] { ... }`;
        const data = await client.fetch(query);
        setTechnologies(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchTechnologies();
  }, []);

  // ...
}
```

### Po:
```typescript
'use client';

import { useTechnologies } from '@/lib/sanity/hooks';

export default function OfferPage() {
  const { data: technologies, loading } = useTechnologies();

  if (loading) return <div>Ładowanie...</div>;

  // ...
}
```

## Typy

Wszystkie typy są eksportowane z `types.ts`:

```typescript
import type { TechnologiesData, IndustriesData, FAQ } from '@/lib/sanity/types';
```

## Cache

Wszystkie funkcje fetch korzystają z cache CDN Sanity w produkcji (zobacz `sanity/lib/client.ts`).
