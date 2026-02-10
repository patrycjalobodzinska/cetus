# Typy TypeScript

Centralne miejsce dla wszystkich typów i interfejsów używanych w aplikacji.

## Struktura

```
types/
├── common.ts      # Wspólne typy (Locale, LocaleString, itp.)
├── components.ts  # Typy dla komponentów UI
├── pages.ts       # Typy dla stron i danych stron
├── sections.ts    # Typy dla komponentów sekcji
├── index.ts       # Eksport wszystkich typów
└── README.md      # Ta dokumentacja
```

## Kategorie typów

### `common.ts`
Wspólne typy używane w całej aplikacji:
- `Locale` - typ dla języka ('pl' | 'en')
- `LocaleString` - obiekt z tłumaczeniami dla różnych języków
- `LocaleStringArray` - tablica stringów z tłumaczeniami
- `ButtonConfig` - konfiguracja przycisku
- `ImageOverlay` - overlay dla obrazów z ikoną i tekstem

### `components.ts`
Typy dla komponentów UI:
- `PolygonCardProps` - props dla komponentu PolygonCard
- `PolygonAccordionProps` - props dla komponentu PolygonAccordion
- `CTASectionProps` - props dla komponentu CTASection
- `DecorativeImageProps` - props dla komponentu DecorativeImage
- `StarGradientButtonProps` - props dla komponentu StarGradientButton
- `DomeGalleryProps` - props dla komponentu DomeGallery
- `ItemDef` - definicja elementu w galerii
- `ImageItem` - typ dla elementu obrazu (string lub obiekt)
- `StickyCardProps` - props dla sticky card w sekcji Offer

### `pages.ts`
Typy dla danych stron:
- `Project` - projekt/oferta
- `OfferData` - dane sekcji oferty
- `Module` - moduł/usługa
- `Service` - usługa z aplikacjami i efektem
- `Benefit` - korzyść
- `Feature` - funkcja/cecha
- `ProcessStep` - krok procesu
- `ContactInfo` - informacje kontaktowe

### `sections.ts`
Typy dla komponentów sekcji:
- `HeroSectionProps` - props dla sekcji hero
- `TechnologiesSectionProps` - props dla sekcji technologii
- `IndustriesSectionProps` - props dla sekcji branż
- `OfferStatsSectionProps` - props dla sekcji statystyk oferty
- `ProjectsGridSectionProps` - props dla siatki projektów
- `AboutHeroSectionProps` - props dla hero sekcji "O nas"
- `HistoryTimelineSectionProps` - props dla timeline historii
- `TeamSectionProps` - props dla sekcji zespołu
- `FeaturesSectionProps` - props dla sekcji funkcji
- `BenefitsSectionProps` - props dla sekcji korzyści
- `ServicesSectionProps` - props dla sekcji usług
- `HowWeHelpSectionProps` - props dla sekcji "Jak możemy pomóc"

## Użycie

### Import pojedynczych typów
```typescript
import type { Project, OfferData } from '@/types/pages';
import type { PolygonCardProps } from '@/types/components';
```

### Import wszystkich typów
```typescript
import type { Project, PolygonCardProps, HeroSectionProps } from '@/types';
```

### Przykład użycia w komponencie
```typescript
'use client';

import type { PolygonCardProps } from '@/types/components';

export default function MyComponent({ title, description }: PolygonCardProps) {
  // ...
}
```

## Uwagi

- Wszystkie typy są eksportowane jako `type`, nie `interface`, aby umożliwić użycie `import type`
- Typy Sanity są w `lib/sanity/types.ts` i nie są duplikowane tutaj
- Typy są organizowane tematycznie, nie alfabetycznie
- Wszystkie typy mają dokumentację w komentarzach JSDoc (gdy to możliwe)

## Dodawanie nowych typów

1. Określ kategorię typu (common/components/pages/sections)
2. Dodaj typ do odpowiedniego pliku
3. Eksportuj typ w `index.ts`
4. Zaktualizuj tę dokumentację jeśli potrzeba
