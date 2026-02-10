# Komponenty Sekcji

Wydzielone komponenty sekcji do użycia na różnych stronach.

## Dostępne komponenty

### `TechnologiesSection`
Sekcja wyświetlająca technologie w formie kart z kategoriami.

```typescript
import { TechnologiesSection } from '@/app/components/sections';
import { useTechnologies } from '@/lib/sanity/hooks';

const { data: technologies } = useTechnologies();
<TechnologiesSection data={technologies} />
```

### `IndustriesSection`
Sekcja wyświetlająca branże w formie tagów/badge'ów.

```typescript
import { IndustriesSection } from '@/app/components/sections';
import { useIndustries } from '@/lib/sanity/hooks';

const { data: industries } = useIndustries();
<IndustriesSection data={industries} />
```

### `OfferStatsSection`
Sekcja ze statystykami oferty.

```typescript
import { OfferStatsSection } from '@/app/components/sections';
import { useOfferStats } from '@/lib/sanity/hooks';

const { data: stats } = useOfferStats();
<OfferStatsSection data={stats} />
```

### `ProjectsGridSection`
Siatka projektów w formie kart PolygonCard.

```typescript
import { ProjectsGridSection } from '@/app/components/sections';

const projects = [
  { title: 'Aplikacje webowe', description: '...', slug: 'aplikacje-webowe' },
  // ...
];
<ProjectsGridSection projects={projects} />
```

### `AboutHeroSection`
Hero sekcja dla strony "O nas" z obrazem i statystyką.

```typescript
import { AboutHeroSection } from '@/app/components/sections';
import { useAboutUs } from '@/lib/sanity/hooks';

const { data: aboutUs, loading } = useAboutUs(locale);
<AboutHeroSection data={aboutUs} loading={loading} />
```

### `HistoryTimelineSection`
Sekcja z timeline historii firmy.

```typescript
import { HistoryTimelineSection } from '@/app/components/sections';
import { useHistory } from '@/lib/sanity/hooks';

const { data: history, loading } = useHistory(locale);
<HistoryTimelineSection items={history} loading={loading} />
```

### `TeamSection`
Sekcja z członkami zespołu w formie kart.

```typescript
import { TeamSection } from '@/app/components/sections';
import { useTeam } from '@/lib/sanity/hooks';

const { data: team, loading } = useTeam(locale);
<TeamSection members={team} loading={loading} />
```

### `ContactInfoSection`
Sekcja z danymi kontaktowymi (email, telefon, adres).

```typescript
import { ContactInfoSection } from '@/app/components/sections';

<ContactInfoSection />
```

### `HeroSection`
Uniwersalna sekcja hero z tytułem, opisem, obrazem i przyciskami.

```typescript
import { HeroSection } from '@/app/components/sections';

<HeroSection
  title="Tytuł"
  description="Opis"
  image="/path/to/image.jpg"
  badge="Badge tekst"
  primaryButtonText="Główny przycisk"
  primaryButtonLink="/link"
/>
```

### `FeaturesSection`
Sekcja z listą funkcji/cech w formie accordionów.

```typescript
import { FeaturesSection } from '@/app/components/sections';
import { Puzzle, Gauge } from 'lucide-react';

const features = [
  { title: 'Funkcja 1', description: 'Opis...' },
  { title: 'Funkcja 2', description: 'Opis...' },
];
const icons = [Puzzle, Gauge];

<FeaturesSection
  title="Nasze funkcje"
  features={features}
  icons={icons}
/>
```

### `BenefitsSection`
Sekcja z korzyściami w formie kart.

```typescript
import { BenefitsSection } from '@/app/components/sections';
import { RefreshCw, Network } from 'lucide-react';

const benefits = [
  { title: 'Korzyść 1', description: 'Opis...' },
  { title: 'Korzyść 2', description: 'Opis...' },
];
const icons = [RefreshCw, Network];

<BenefitsSection
  title="Korzyści"
  benefits={benefits}
  icons={icons}
/>
```

### `ServicesSection`
Sekcja z usługami z interaktywnym sliderem (desktop) i punktami (mobile).

```typescript
import { ServicesSection } from '@/app/components/sections';
import { MessageSquare, Workflow } from 'lucide-react';

const services = [
  { title: 'Usługa 1', description: '...', applications: [...], effect: '...' },
  { title: 'Usługa 2', description: '...', applications: [...], effect: '...' },
];
const icons = [MessageSquare, Workflow];

<ServicesSection
  title="Nasze usługi"
  services={services}
  icons={icons}
/>
```

### `HowWeHelpSection`
Sekcja "Jak możemy pomóc" z kartami usług.

```typescript
import { HowWeHelpSection } from '@/app/components/sections';
import { Smartphone, Code2 } from 'lucide-react';

const services = [
  { title: 'Usługa 1', description: '...' },
  { title: 'Usługa 2', description: '...' },
];
const icons = [Smartphone, Code2];

<HowWeHelpSection
  title="Jak możemy pomóc"
  services={services}
  icons={icons}
/>
```

## Wspólne właściwości

Większość komponentów sekcji przyjmuje:
- `className?: string` - dodatkowe klasy CSS
- Wszystkie komponenty są responsywne
- Wszystkie komponenty są dostępne (accessibility)

## Przykład użycia

```typescript
'use client';

import { useTechnologies, useIndustries } from '@/lib/sanity/hooks';
import {
  TechnologiesSection,
  IndustriesSection,
  ProjectsGridSection,
} from '@/app/components/sections';

export default function OfferPage() {
  const { data: technologies } = useTechnologies();
  const { data: industries } = useIndustries();

  const projects = [/* ... */];

  return (
    <>
      <ProjectsGridSection projects={projects} />
      <TechnologiesSection data={technologies} />
      <IndustriesSection data={industries} />
    </>
  );
}
```
