import { defineField, defineType } from 'sanity'

const ICON_OPTIONS = [
  { title: 'Kod / Web', value: 'code' },
  { title: 'Smartphone', value: 'smartphone' },
  { title: 'AI / Mózg', value: 'brain' },
  { title: 'Sieć / Systemy', value: 'network' },
  { title: 'Tarcza / Cyber', value: 'shield' },
  { title: 'Teczka / Biznes', value: 'briefcase' },
  { title: 'Czapka / Edukacja', value: 'graduation' },
]

export default defineType({
  name: 'rollUpPage',
  title: 'Strona Roll-up (/roll-up)',
  type: 'document',
  description: 'Landing /roll-up (kod QR z materiałów drukowanych).',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'choose', title: 'Wybór ścieżki' },
    { name: 'business', title: 'Scenariusz: Biznes' },
    { name: 'career', title: 'Scenariusz: Kariera' },
    { name: 'trusted', title: 'Zaufali nam' },
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Tytuł hero',
      type: 'localeString',
      group: 'hero',
      description: 'np. "Technologia, która napędza"',
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Podświetlony fragment tytułu',
      type: 'localeString',
      group: 'hero',
      description: 'np. "Twój biznes"',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Opis pod tytułem',
      type: 'localeText',
      group: 'hero',
    }),
    defineField({
      name: 'stats',
      title: 'Statystyki (3 wartości)',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Wartość (np. 40)', type: 'string' }),
            defineField({ name: 'label', title: 'Etykieta', type: 'localeString' }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label.pl' },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    defineField({
      name: 'sectionTitle',
      title: 'Tytuł sekcji wyboru',
      type: 'localeString',
      group: 'choose',
      description: 'np. "Z czym do nas"',
    }),
    defineField({
      name: 'sectionTitleHighlight',
      title: 'Podświetlony fragment',
      type: 'localeString',
      group: 'choose',
      description: 'np. "przychodzisz?"',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Podtytuł sekcji',
      type: 'localeString',
      group: 'choose',
    }),

    defineField({
      name: 'businessTitle',
      title: 'Tytuł karty Biznes',
      type: 'localeString',
      group: 'business',
    }),
    defineField({
      name: 'businessSubtitle',
      title: 'Podtytuł karty Biznes',
      type: 'localeString',
      group: 'business',
    }),
    defineField({
      name: 'businessDescription',
      title: 'Opis (po rozwinięciu)',
      type: 'localeText',
      group: 'business',
    }),
    defineField({
      name: 'businessServices',
      title: 'Lista usług',
      type: 'array',
      group: 'business',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Tytuł', type: 'localeString' }),
            defineField({ name: 'description', title: 'Opis', type: 'localeString' }),
            defineField({
              name: 'icon',
              title: 'Ikona',
              type: 'string',
              options: { list: ICON_OPTIONS },
            }),
            defineField({
              name: 'link',
              title: 'Link (np. /oferta/aplikacje-webowe)',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'title.pl', subtitle: 'link' },
          },
        },
      ],
    }),
    defineField({
      name: 'businessPrimaryButtonText',
      title: 'Tekst głównego przycisku',
      type: 'localeString',
      group: 'business',
    }),
    defineField({
      name: 'businessPrimaryButtonLink',
      title: 'Link głównego przycisku',
      type: 'string',
      group: 'business',
      initialValue: '/kontakt',
    }),
    defineField({
      name: 'businessSecondaryButtonText',
      title: 'Tekst drugiego przycisku',
      type: 'localeString',
      group: 'business',
    }),
    defineField({
      name: 'businessSecondaryButtonLink',
      title: 'Link drugiego przycisku',
      type: 'string',
      group: 'business',
      initialValue: '/oferta',
    }),

    defineField({
      name: 'careerTitle',
      title: 'Tytuł karty Kariera',
      type: 'localeString',
      group: 'career',
    }),
    defineField({
      name: 'careerSubtitle',
      title: 'Podtytuł karty Kariera',
      type: 'localeString',
      group: 'career',
    }),
    defineField({
      name: 'careerDescription',
      title: 'Opis (po rozwinięciu)',
      type: 'localeText',
      group: 'career',
    }),
    defineField({
      name: 'careerBullets',
      title: 'Bullety',
      type: 'array',
      group: 'career',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'careerCtaText',
      title: 'Tekst przycisku CTA',
      type: 'localeString',
      group: 'career',
    }),
    defineField({
      name: 'careerCtaLink',
      title: 'Link CTA (URL)',
      type: 'url',
      group: 'career',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
    }),

    defineField({
      name: 'trustedLabel',
      title: 'Etykieta',
      type: 'localeString',
      group: 'trusted',
      description: 'np. "Zaufali nam"',
    }),
    defineField({
      name: 'trustedDisplayMode',
      title: 'Tryb wyświetlania',
      type: 'string',
      group: 'trusted',
      options: {
        list: [
          { title: 'Tekst (jedna linia)', value: 'text' },
          { title: 'Karty z logo', value: 'cards' },
        ],
        layout: 'radio',
      },
      initialValue: 'text',
    }),
    defineField({
      name: 'trustedClients',
      title: 'Lista klientów (tekst, jedna linia)',
      type: 'localeString',
      group: 'trusted',
      description: 'Używane gdy tryb = "Tekst". np. "FM Logistic · TÜV NORD · ..."',
      hidden: ({ parent }) => parent?.trustedDisplayMode === 'cards',
    }),
    defineField({
      name: 'trustedCards',
      title: 'Karty klientów (logo)',
      type: 'array',
      group: 'trusted',
      description: 'Używane gdy tryb = "Karty z logo".',
      hidden: ({ parent }) => parent?.trustedDisplayMode !== 'cards',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nazwa klienta',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'url',
              title: 'Link (opcjonalny)',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'url', media: 'logo' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heroTitle.pl' },
    prepare({ title }) {
      return { title: title ? `Roll-up: ${title}` : 'Strona Roll-up' }
    },
  },
})
