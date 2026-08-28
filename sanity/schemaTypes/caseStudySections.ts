import { defineField, defineType, defineArrayMember } from "sanity";

// Chudy, krótki zestaw sekcji case study - jedna sekcja = jeden ekran treści.
// Renderowany przez app/[locale]/case-studies/[slug]/CaseStudyDetail.tsx.

// ─── csHeroSection - nagłówek + makieta ekranów ──────────────────────────────
export const csHeroSection = defineType({
  name: "csHeroSection",
  title: "Hero - nagłówek projektu",
  type: "object",
  fields: [
    defineField({ name: "category", title: "Badge (np. „Case study · Winopasja”)", type: "localeString" }),
    defineField({ name: "title", title: "Tytuł (H1)", type: "localeString" }),
    defineField({ name: "summary", title: "Podtytuł / streszczenie", type: "localeText" }),
    defineField({
      name: "meta",
      title: "Metryka projektu (2-4 pozycje)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Etykieta", type: "localeString" }),
            defineField({ name: "value", title: "Wartość", type: "localeString" }),
          ],
          preview: { select: { title: "value.pl", subtitle: "label.pl" } },
        }),
      ],
    }),
    defineField({ name: "buttonLabel", title: "Etykieta przycisku", type: "localeString" }),
    defineField({ name: "buttonHref", title: "Link przycisku", type: "string", initialValue: "/kontakt" }),
    defineField({
      name: "webImage",
      title: "Zrzut web (ramka przeglądarki)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "phoneImage",
      title: "Zrzut mobile (ramka telefonu)",
      type: "image",
      description:
        "Jedno zdjęcie w dwóch miejscach: w hero tej strony i w telefonie na karcie realizacji na stronie głównej. Wgraj sam zrzut ekranu, bez ramki urządzenia - obudowę i pasek stanu (godzina, zasięg, bateria) dorysowujemy sami. Bez tego pola telefon na karcie po prostu się nie pojawia.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title.pl" },
    prepare({ title }) {
      return { title: `Hero: ${title || "-"}` };
    },
  },
});

// ─── csFeaturesSection - „Co zmieniło wdrożenie” (ekrany + karty) ─────────────
export const csFeaturesSection = defineType({
  name: "csFeaturesSection",
  title: "Realizacja - ekrany + karty wartości",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Nadtytuł (np. „Realizacja”)", type: "localeString" }),
    defineField({ name: "heading", title: "Nagłówek", type: "localeString" }),
    defineField({ name: "screenA", title: "Ekran 1 (lewy-górny)", type: "image", options: { hotspot: true } }),
    defineField({ name: "screenB", title: "Ekran 2 (prawy-dolny)", type: "image", options: { hotspot: true } }),
    defineField({
      name: "items",
      title: "Karty wartości (4 sztuki)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Ikona (lucide-react)", type: "string" }),
            defineField({ name: "title", title: "Tytuł", type: "localeString" }),
            defineField({ name: "text", title: "Opis", type: "localeText" }),
          ],
          preview: { select: { title: "title.pl", subtitle: "text.pl" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading.pl" },
    prepare({ title }) {
      return { title: `Realizacja: ${title || "-"}` };
    },
  },
});

// ─── csMetricsSection - kluczowe liczby ──────────────────────────────────────
export const csMetricsSection = defineType({
  name: "csMetricsSection",
  title: "Metryki - kluczowe liczby",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Liczby (2-4)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Ikona (lucide-react)", type: "string" }),
            defineField({ name: "value", title: "Wartość", type: "string" }),
            defineField({ name: "label", title: "Etykieta", type: "localeString" }),
          ],
          preview: { select: { title: "value", subtitle: "label.pl" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Metryki" };
    },
  },
});

// ─── csAboutSection - „O projekcie” (narracja) ───────────────────────────────
export const csAboutSection = defineType({
  name: "csAboutSection",
  title: "O projekcie - narracja",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Nadtytuł", type: "localeString" }),
    defineField({ name: "heading", title: "Nagłówek", type: "localeString" }),
    defineField({ name: "paragraphs", title: "Akapity", type: "localeStringArray" }),
  ],
  preview: {
    select: { title: "heading.pl" },
    prepare({ title }) {
      return { title: `O projekcie: ${title || "-"}` };
    },
  },
});

// ─── csOutcomeSection - Wyzwanie / Rozwiązanie / Efekt ───────────────────────
export const csOutcomeSection = defineType({
  name: "csOutcomeSection",
  title: "Wyzwanie / Rozwiązanie / Efekt",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Bloki (zwykle 3: Wyzwanie, Rozwiązanie, Efekt)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "tag", title: "Etykieta bloku", type: "localeString" }),
            defineField({ name: "text", title: "Opis", type: "localeText" }),
            defineField({ name: "points", title: "Punkty (bullety)", type: "localeStringArray" }),
          ],
          preview: { select: { title: "tag.pl", subtitle: "text.pl" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Wyzwanie / Rozwiązanie / Efekt" };
    },
  },
});

// ─── csScopeSection - „Co dostarczyliśmy” ────────────────────────────────────
export const csScopeSection = defineType({
  name: "csScopeSection",
  title: "Zakres - co dostarczyliśmy",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Nadtytuł", type: "localeString" }),
    defineField({ name: "heading", title: "Nagłówek", type: "localeString" }),
    defineField({
      name: "items",
      title: "Elementy zakresu",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [defineField({ name: "text", title: "Treść", type: "localeString" })],
          preview: { select: { title: "text.pl" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading.pl" },
    prepare({ title }) {
      return { title: `Zakres: ${title || "-"}` };
    },
  },
});

// ─── csGallerySection - „Zobacz efekt” (galeria z lightboxem) ────────────────
export const csGallerySection = defineType({
  name: "csGallerySection",
  title: "Galeria - zobacz efekt",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Nadtytuł", type: "localeString" }),
    defineField({ name: "heading", title: "Nagłówek", type: "localeString" }),
    defineField({
      name: "images",
      title: "Zrzuty ekranu",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "caption", title: "Podpis", type: "localeString" })],
        }),
      ],
      options: { layout: "grid" },
    }),
  ],
  preview: {
    select: { title: "heading.pl" },
    prepare({ title }) {
      return { title: `Galeria: ${title || "-"}` };
    },
  },
});

// ─── csTechSection - technologie (pigułki) ───────────────────────────────────
export const csTechSection = defineType({
  name: "csTechSection",
  title: "Technologie",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Nagłówek (opcjonalne)", type: "localeString" }),
    defineField({
      name: "items",
      title: "Technologie",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [defineField({ name: "name", title: "Nazwa", type: "string" })],
          preview: { select: { title: "name" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Technologie" };
    },
  },
});
