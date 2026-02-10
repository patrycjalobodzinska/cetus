# Plan Refactoringu Stron

## Analiza obecnego stanu

### Zidentyfikowane problemy:
1. **Duplikacja kodu** - podobne sekcje powtarzają się w wielu plikach
2. **Brak wydzielonych komponentów** - duże komponenty z wieloma sekcjami inline
3. **Powtarzające się zapytania Sanity** - każda strona ma własne zapytania
4. **Brak wspólnych typów** - interfejsy duplikowane w wielu plikach
5. **Mieszanie logiki i prezentacji** - fetch i renderowanie w jednym komponencie
6. **Brak wspólnych funkcji pomocniczych** - podobna logika powtarzana

---

## Struktura po refactoringu

```
app/
├── [locale]/
│   ├── page.tsx (Homepage) ✅ - już dobrze zorganizowany
│   ├── oferta/
│   │   ├── page.tsx → refactor
│   │   └── [slug]/
│   │       └── page.tsx → refactor
│   ├── o-nas/
│   │   └── page.tsx → refactor
│   ├── kontakt/
│   │   └── page.tsx → refactor
│   └── case-studies/
│       ├── page.tsx → refactor
│       └── [slug]/
│           └── page.tsx → refactor
│
lib/
├── sanity/
│   ├── queries.ts (NOWY) - wszystkie zapytania GROQ
│   ├── fetchers.ts (NOWY) - funkcje fetch z cache
│   └── types.ts (NOWY) - typy TypeScript dla Sanity
│
types/
├── sanity.ts (NOWY) - wspólne typy Sanity
├── pages.ts (NOWY) - typy dla stron
└── components.ts (NOWY) - typy dla komponentów
│
components/
├── sections/ (NOWY)
│   ├── HeroSection.tsx (NOWY) - uniwersalny hero
│   ├── FeaturesSection.tsx (NOWY) - sekcja features
│   ├── BenefitsSection.tsx (NOWY) - sekcja benefits
│   ├── ServicesSection.tsx (NOWY) - sekcja services
│   ├── ProcessSection.tsx (NOWY) - sekcja procesu
│   ├── ContactInfoSection.tsx (NOWY) - dane kontaktowe
│   └── StatsSection.tsx (NOWY) - statystyki
│
utils/
├── sanity.ts (NOWY) - funkcje pomocnicze Sanity
└── translations.ts (NOWY) - funkcje pomocnicze tłumaczeń
```

---

## Szczegółowy plan refactoringu

### 1. `/app/[locale]/oferta/page.tsx` (PRIORYTET: WYSOKI)

**Obecny stan:**
- 304 linie kodu
- 3 zapytania Sanity w useEffect
- Duplikacja interfejsów
- Mieszanie logiki fetch i renderowania

**Refactor:**
- ✅ Wydzielić zapytania do `lib/sanity/queries.ts`
- ✅ Wydzielić funkcje fetch do `lib/sanity/fetchers.ts`
- ✅ Wydzielić typy do `types/sanity.ts`
- ✅ Wydzielić sekcje:
  - `components/sections/TechnologiesSection.tsx`
  - `components/sections/IndustriesSection.tsx`
  - `components/sections/OfferStatsSection.tsx`
  - `components/sections/ProjectsGridSection.tsx`
- ✅ Stworzyć hook `hooks/useSanityData.ts` dla fetchowania

**Struktura po refactorze:**
```typescript
// page.tsx (max 50 linii)
export default function OfferPage() {
  const { technologies, industries, offerStats, projects } = useOfferPageData();

  return (
    <>
      <PageHeader />
      <ProjectsGridSection projects={projects} />
      <TechnologiesSection data={technologies} />
      <IndustriesSection data={industries} />
      <OfferStatsSection data={offerStats} />
      <CTASection />
    </>
  );
}
```

---

### 2. `/app/[locale]/o-nas/page.tsx` (PRIORYTET: WYSOKI)

**Obecny stan:**
- 365 linii kodu
- 3 zapytania Sanity w useEffect
- Duplikacja logiki fetch
- Sekcje inline

**Refactor:**
- ✅ Wydzielić zapytania do `lib/sanity/queries.ts`
- ✅ Wydzielić funkcje fetch do `lib/sanity/fetchers.ts`
- ✅ Wydzielić sekcje:
  - `components/sections/AboutHeroSection.tsx`
  - `components/sections/HistoryTimelineSection.tsx`
  - `components/sections/TeamSection.tsx`
  - `components/sections/TeamGallerySection.tsx`
- ✅ Stworzyć hook `hooks/useAboutPageData.ts`

**Struktura po refactorze:**
```typescript
// page.tsx (max 40 linii)
export default function AboutUsPage() {
  const { aboutUs, history, team } = useAboutPageData();

  return (
    <>
      <AboutHeroSection data={aboutUs} />
      <HistoryTimelineSection items={history} />
      <TeamSection members={team} />
      <TeamGallerySection members={team} />
      <CTASection />
    </>
  );
}
```

---

### 3. `/app/[locale]/kontakt/page.tsx` (PRIORYTET: ŚREDNI)

**Obecny stan:**
- 196 linii kodu
- 1 zapytanie Sanity
- Sekcje inline
- Hardcoded dane kontaktowe

**Refactor:**
- ✅ Wydzielić zapytanie do `lib/sanity/queries.ts`
- ✅ Wydzielić sekcje:
  - `components/sections/ContactHeroSection.tsx`
  - `components/sections/ContactInfoSection.tsx`
  - `components/sections/ContactFormSection.tsx` (jeśli będzie)
  - `components/sections/FAQSection.tsx` (już istnieje, użyć)
- ✅ Przenieść dane kontaktowe do Sanity lub constants

**Struktura po refactorze:**
```typescript
// page.tsx (max 30 linii)
export default function ContactPage() {
  const faqs = useFAQs();

  return (
    <>
      <ContactHeroSection />
      <ContactInfoSection />
      <FAQSection faqs={faqs} />
    </>
  );
}
```

---

### 4. `/app/[locale]/oferta/aplikacje-mobilne/page.tsx` (PRIORYTET: ŚREDNI)

**Obecny stan:**
- 240 linii kodu
- Wszystko inline
- Brak komponentów sekcji

**Refactor:**
- ✅ Wydzielić sekcje:
  - `components/sections/HeroSection.tsx` (uniwersalny)
  - `components/sections/HowWeHelpSection.tsx`
  - `components/sections/WhyFeaturesSection.tsx`
  - `components/sections/WhyUsSection.tsx`
- ✅ Użyć istniejących komponentów gdzie możliwe

**Struktura po refactorze:**
```typescript
// page.tsx (max 30 linii)
export default function MobileAppsPage() {
  const t = useTranslations('mobileApps');

  return (
    <>
      <HeroSection
        title={t('hero.title')}
        description={t('hero.description')}
        image="..."
      />
      <HowWeHelpSection services={t.raw('howWeHelp.services')} />
      <WhyFeaturesSection features={t.raw('whyFeatures.features')} />
      <WhyUsSection reasons={t.raw('whyUs.reasons')} />
      <CTASection />
    </>
  );
}
```

---

### 5. `/app/[locale]/oferta/aI-i-automatyzacja-procesow/page.tsx` (PRIORYTET: ŚREDNI)

**Obecny stan:**
- 371 linii kodu
- Wszystko inline
- Duplikacja z aplikacje-mobilne

**Refactor:**
- ✅ Wydzielić sekcje (podobnie jak aplikacje-mobilne)
- ✅ Użyć uniwersalnych komponentów sekcji
- ✅ Wydzielić logikę slidera do `hooks/useSlider.ts`

**Struktura po refactorze:**
```typescript
// page.tsx (max 40 linii)
export default function AIAutomationPage() {
  const t = useTranslations('aiAutomation');

  return (
    <>
      <HeroSection {...heroProps} />
      <BenefitsSection items={t.raw('benefits.items')} />
      <ServicesSection items={t.raw('services.items')} />
      <ProcessSection steps={t.raw('process.steps')} />
      <CaseStudySection {...caseStudyProps} />
      <CTASection />
    </>
  );
}
```

---

### 6. `/app/[locale]/case-studies/page.tsx` (PRIORYTET: NISKI)

**Obecny stan:**
- 97 linii kodu
- Już dobrze zorganizowany
- Używa komponentów

**Refactor:**
- ✅ Wydzielić zapytanie do `lib/sanity/queries.ts`
- ✅ Wydzielić funkcję fetch do `lib/sanity/fetchers.ts`
- ✅ Wydzielić Hero Section do komponentu

**Struktura po refactorze:**
```typescript
// page.tsx (max 30 linii)
export default async function CaseStudiesPage({ params }) {
  const { locale } = await params;
  const caseStudies = await fetchCaseStudies(locale);

  return (
    <>
      <CaseStudiesHeroSection />
      <MethodologySection />
      {caseStudies.map(study => (
        <CaseStudyItem key={study._id} caseStudy={study} />
      ))}
      <CTASection />
    </>
  );
}
```

---

### 7. Pozostałe strony oferty (PRIORYTET: NISKI)

**Strony:**
- `/oferta/transformacja-technologiczna/page.tsx`
- `/oferta/outsourcing-programistow/page.tsx`
- `/oferta/cetus-venture-capital/page.tsx`
- `/oferta/akademia-i-szkolenia/page.tsx`
- `/oferta/cybersecurity/page.tsx`
- `/oferta/ui-ux-design/page.tsx`

**Refactor:**
- ✅ Wszystkie powinny używać uniwersalnych komponentów sekcji
- ✅ Wspólny wzorzec: Hero → Features → Benefits → CTA
- ✅ Wydzielić do szablonu `templates/OfferPageTemplate.tsx`

---

## Nowe pliki do utworzenia

### `lib/sanity/queries.ts`
```typescript
export const QUERIES = {
  technologies: `*[_type == "technologies"][0] { ... }`,
  industries: `*[_type == "industries"][0] { ... }`,
  offerStats: `*[_type == "offerStats"][0] { ... }`,
  aboutUs: `*[_type == "aboutUs"][0] { ... }`,
  history: `*[_type == "history"] | order(order asc) { ... }`,
  team: `*[_type == "team" && hidden != true] | order(order asc) { ... }`,
  faqs: `*[_type == "faq"] | order(order asc) { ... }`,
  caseStudies: `*[_type == "caseStudy"] | order(_createdAt desc) { ... }`,
  // ... więcej zapytań
};
```

### `lib/sanity/fetchers.ts`
```typescript
export async function fetchTechnologies(locale: string) {
  return client.fetch<TechnologiesData>(QUERIES.technologies, { locale });
}

export async function fetchIndustries(locale: string) {
  return client.fetch<IndustriesData>(QUERIES.industries, { locale });
}

// ... więcej funkcji fetch
```

### `types/sanity.ts`
```typescript
export interface TechnologiesData {
  title: { pl?: string; en?: string };
  description: { pl?: string; en?: string };
  categories?: TechnologyCategory[];
}

export interface Industry {
  name: { pl?: string; en?: string };
  order?: number;
}

// ... więcej typów
```

### `hooks/useSanityData.ts`
```typescript
export function useTechnologies(locale: string) {
  const [data, setData] = useState<TechnologiesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTechnologies(locale)
      .then(setData)
      .finally(() => setLoading(false));
  }, [locale]);

  return { data, loading };
}

// ... więcej hooków
```

### `components/sections/HeroSection.tsx`
```typescript
interface HeroSectionProps {
  title: string;
  description: string;
  image?: string;
  badge?: string;
  buttons?: Array<{ text: string; link: string }>;
}

export default function HeroSection({ title, description, image, badge, buttons }: HeroSectionProps) {
  return (
    <section className="min-h-screen py-12 flex items-center">
      {/* ... */}
    </section>
  );
}
```

---

## Kolejność implementacji

### Faza 1: Infrastruktura (1-2 dni)
1. ✅ Utworzyć `lib/sanity/queries.ts`
2. ✅ Utworzyć `lib/sanity/fetchers.ts`
3. ✅ Utworzyć `types/sanity.ts`
4. ✅ Utworzyć `hooks/useSanityData.ts`

### Faza 2: Komponenty sekcji (2-3 dni)
1. ✅ Utworzyć `components/sections/HeroSection.tsx`
2. ✅ Utworzyć `components/sections/FeaturesSection.tsx`
3. ✅ Utworzyć `components/sections/BenefitsSection.tsx`
4. ✅ Utworzyć `components/sections/ServicesSection.tsx`
5. ✅ Utworzyć pozostałe sekcje

### Faza 3: Refactor stron (3-4 dni)
1. ✅ Refactor `/oferta/page.tsx`
2. ✅ Refactor `/o-nas/page.tsx`
3. ✅ Refactor `/kontakt/page.tsx`
4. ✅ Refactor `/oferta/aplikacje-mobilne/page.tsx`
5. ✅ Refactor `/oferta/aI-i-automatyzacja-procesow/page.tsx`
6. ✅ Refactor pozostałych stron oferty

### Faza 4: Testy i optymalizacja (1 dzień)
1. ✅ Testowanie wszystkich stron
2. ✅ Optymalizacja wydajności
3. ✅ Sprawdzenie błędów TypeScript
4. ✅ Aktualizacja dokumentacji

---

## Korzyści z refactoringu

1. **Mniejszy kod** - redukcja o ~40-50%
2. **Lepsza czytelność** - każda strona max 50 linii
3. **Łatwiejsze utrzymanie** - zmiany w jednym miejscu
4. **Reużywalność** - komponenty używane w wielu miejscach
5. **Lepsze testowanie** - mniejsze, izolowane komponenty
6. **Lepsze TypeScript** - wspólne typy
7. **Szybszy rozwój** - nowe strony szybciej

---

## Uwagi

- Zachować istniejącą funkcjonalność
- Nie zmieniać API/structure URL
- Zachować wszystkie tłumaczenia
- Testować każdą zmianę przed przejściem dalej
- Commitować po każdej fazie
