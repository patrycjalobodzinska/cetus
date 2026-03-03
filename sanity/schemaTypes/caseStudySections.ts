import { defineField, defineType, defineArrayMember } from 'sanity'

// ─── csHeroSection ────────────────────────────────────────────────────────────
export const csHeroSection = defineType({
  name: 'csHeroSection',
  title: 'Hero — nagłówek projektu',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Nazwa projektu',
      type: 'localeString',
    }),
    defineField({
      name: 'category',
      title: 'Badge / Kategoria',
      type: 'localeString',
      description: 'Np. „E-commerce", „Rolnictwo & Winiarstwo"',
    }),
    defineField({
      name: 'description',
      title: 'Opis projektu',
      type: 'localeText',
    }),
    defineField({
      name: 'iframeUrl',
      title: 'URL iframe',
      type: 'url',
      description: 'Link do strony projektu — wyświetlany jako interaktywny podgląd po prawej stronie.',
    }),
  ],
  preview: {
    select: { title: 'title.pl', subtitle: 'iframeUrl' },
    prepare({ title, subtitle }) {
      return { title: `Hero: ${title || '—'}`, subtitle: subtitle || 'brak iframe' }
    },
  },
})

// ─── csStatsSection ───────────────────────────────────────────────────────────
export const csStatsSection = defineType({
  name: 'csStatsSection',
  title: 'Stats Section',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Wariant',
      type: 'string',
      options: {
        list: [
          { title: 'Cards — niebieskie karty', value: 'cards' },
          { title: 'Horizontal — liczby w jednej linii', value: 'horizontal' },
        ],
        layout: 'radio',
      },
      initialValue: 'cards',
    }),
    defineField({
      name: 'items',
      title: 'Statystyki',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Wartość', type: 'string' }),
            defineField({ name: 'label', title: 'Etykieta', type: 'localeString' }),
            defineField({ name: 'icon', title: 'Ikona (lucide-react)', type: 'string' }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label.pl' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { subtitle: 'variant' },
    prepare({ subtitle }) {
      return { title: 'Stats Section', subtitle }
    },
  },
})

// ─── csChallengeSection ───────────────────────────────────────────────────────
export const csChallengeSection = defineType({
  name: 'csChallengeSection',
  title: 'Challenge Section',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Wariant',
      type: 'string',
      options: {
        list: [
          { title: 'Narrative — opis + lista bulletów full-width', value: 'narrative' },
          { title: 'Two-column — problem i konsekwencja obok siebie', value: 'two-column' },
        ],
        layout: 'radio',
      },
      initialValue: 'narrative',
    }),
    defineField({ name: 'intro', title: 'Wprowadzenie', type: 'localeText' }),
    defineField({
      name: 'bullets',
      title: 'Lista bulletów',
      type: 'localeStringArray',
    }),
    defineField({ name: 'consequence', title: 'Konsekwencja (opcjonalne)', type: 'localeText' }),
  ],
  preview: {
    select: { subtitle: 'variant' },
    prepare({ subtitle }) {
      return { title: 'Challenge Section', subtitle }
    },
  },
})

// ─── csModulesSection ─────────────────────────────────────────────────────────
export const csModulesSection = defineType({
  name: 'csModulesSection',
  title: 'Modules Section',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Wariant',
      type: 'string',
      options: {
        list: [
          { title: 'Alternating — naprzemienne układy L/P', value: 'alternating' },
          { title: 'Cards — siatka kart 2×N', value: 'cards' },
        ],
        layout: 'radio',
      },
      initialValue: 'alternating',
    }),
    defineField({ name: 'sectionTitle', title: 'Tytuł sekcji (opcjonalne)', type: 'localeString' }),
    defineField({
      name: 'items',
      title: 'Moduły',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Ikona (lucide-react)', type: 'string' }),
            defineField({ name: 'title', title: 'Tytuł modułu', type: 'localeString' }),
            defineField({ name: 'description', title: 'Lista funkcji', type: 'localeStringArray' }),
            defineField({
              name: 'image',
              title: 'Zdjęcie',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: 'title.pl' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { subtitle: 'variant' },
    prepare({ subtitle }) {
      return { title: 'Modules Section', subtitle }
    },
  },
})

// ─── csResultsSection ─────────────────────────────────────────────────────────
export const csResultsSection = defineType({
  name: 'csResultsSection',
  title: 'Results Section',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Wariant',
      type: 'string',
      options: {
        list: [
          { title: 'Numbered — gradient border + numery', value: 'numbered' },
          { title: 'Checklist — proste checkmarki', value: 'checklist' },
          { title: 'Stacked — efekt stackowania (jak usługi)', value: 'stacked' },
        ],
        layout: 'radio',
      },
      initialValue: 'numbered',
    }),
    defineField({ name: 'sectionTitle', title: 'Tytuł sekcji (opcjonalne)', type: 'localeString' }),
    defineField({
      name: 'items',
      title: 'Rezultaty',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Tytuł', type: 'localeString' }),
            defineField({ name: 'description', title: 'Opis (opcjonalne)', type: 'localeText' }),
          ],
          preview: { select: { title: 'title.pl', subtitle: 'description.pl' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { subtitle: 'variant' },
    prepare({ subtitle }) {
      return { title: 'Results Section', subtitle }
    },
  },
})

// ─── csTechnologiesSection ────────────────────────────────────────────────────
export const csTechnologiesSection = defineType({
  name: 'csTechnologiesSection',
  title: 'Technologies Section',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Wariant',
      type: 'string',
      options: {
        list: [
          { title: 'Circuit — poligon z SVG liniami (kilka technologii)', value: 'circuit' },
          { title: 'Badges — tagi/pillsy (kilka technologii)', value: 'badges' },
          { title: 'Karuzela — przewijana w pętli (wiele technologii)', value: 'carousel' },
        ],
        layout: 'radio',
      },
      initialValue: 'circuit',
    }),
    defineField({ name: 'sectionTitle', title: 'Tytuł sekcji (opcjonalne)', type: 'localeString' }),
    defineField({
      name: 'items',
      title: 'Technologie',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Nazwa', type: 'string' }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { hotspot: true },
              description: 'Logo technologii (opcjonalne)',
            }),
          ],
          preview: {
            select: { title: 'name', media: 'logo' },
            prepare({ title, media }) {
              return { title: title || 'Technologia', media }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { subtitle: 'variant' },
    prepare({ subtitle }) {
      return { title: 'Technologies Section', subtitle }
    },
  },
})

// ─── csQuoteSection ───────────────────────────────────────────────────────────
export const csQuoteSection = defineType({
  name: 'csQuoteSection',
  title: 'Quote Section',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Wariant',
      type: 'string',
      options: {
        list: [
          { title: 'Centered — cytat na środku, duża czcionka', value: 'centered' },
          { title: 'Blockquote — wyrównany do lewej z autorem', value: 'blockquote' },
        ],
        layout: 'radio',
      },
      initialValue: 'centered',
    }),
    defineField({ name: 'quote', title: 'Cytat', type: 'localeText' }),
    defineField({ name: 'author', title: 'Autor (opcjonalne)', type: 'string' }),
  ],
  preview: {
    select: { title: 'quote.pl', subtitle: 'variant' },
    prepare({ title, subtitle }) {
      return { title: `Quote: ${title?.substring(0, 40) || '—'}…`, subtitle }
    },
  },
})

// ─── csScopeSection ───────────────────────────────────────────────────────────
export const csScopeSection = defineType({
  name: 'csScopeSection',
  title: 'Scope Section',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Wariant',
      type: 'string',
      options: {
        list: [
          { title: 'List — lista pionowa z ikonami', value: 'list' },
          { title: 'Grid — siatka 2 kolumny z ikonami', value: 'grid' },
        ],
        layout: 'radio',
      },
      initialValue: 'list',
    }),
    defineField({ name: 'sectionTitle', title: 'Tytuł sekcji (opcjonalne)', type: 'localeString' }),
    defineField({
      name: 'items',
      title: 'Elementy zakresu',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Treść', type: 'localeString' }),
          ],
          preview: { select: { title: 'text.pl' } },
        }),
      ],
    }),
    defineField({ name: 'note', title: 'Notatka (opcjonalne)', type: 'localeText' }),
  ],
  preview: {
    select: { subtitle: 'variant' },
    prepare({ subtitle }) {
      return { title: 'Scope Section', subtitle }
    },
  },
})

// ─── csCtaSection ─────────────────────────────────────────────────────────────
export const csCtaSection = defineType({
  name: 'csCtaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Wariant',
      type: 'string',
      options: {
        list: [
          { title: 'Centered — wyśrodkowany', value: 'centered' },
          { title: 'Banner — z tłem gradientowym', value: 'banner' },
        ],
        layout: 'radio',
      },
      initialValue: 'centered',
    }),
    defineField({ name: 'heading', title: 'Nagłówek', type: 'localeString' }),
    defineField({ name: 'description', title: 'Opis (opcjonalne)', type: 'localeText' }),
    defineField({ name: 'buttonLabel', title: 'Etykieta przycisku (opcjonalne)', type: 'localeString' }),
    defineField({ name: 'buttonHref', title: 'Link przycisku', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading.pl', subtitle: 'variant' },
    prepare({ title, subtitle }) {
      return { title: `CTA: ${title || '—'}`, subtitle }
    },
  },
})
