import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'localeString',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) => doc?.title?.pl || doc?.title?.en || '',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'localeString',
      description: 'Kategoria projektu (np. Rolnictwo & Winiarstwo)',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'localeText',
      description: 'Krótki opis projektu',
    }),
    defineField({
      name: 'image',
      title: 'Obraz główny',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'solution',
      title: 'Rozwiązanie',
      type: 'localeText',
      description: 'Opis rozwiązania',
    }),
    defineField({
      name: 'results',
      title: 'Efekty',
      type: 'localeStringArray',
      description: 'Lista efektów projektu',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologie',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista użytych technologii',
    }),
    defineField({
      name: 'modules',
      title: 'Moduły',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Ikona',
              type: 'string',
              description: 'Nazwa ikony z lucide-react',
            }),
            defineField({
              name: 'title',
              title: 'Tytuł modułu',
              type: 'localeString',
            }),
            defineField({
              name: 'description',
              title: 'Lista',
              type: 'localeStringArray',
              description: 'Lista funkcji/cech modułu',
            }),
            defineField({
              name: 'image',
              title: 'Zdjęcie',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Zdjęcie modułu',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Statystyki',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Wartość',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Etykieta',
              type: 'localeString',
            }),
            defineField({
              name: 'icon',
              title: 'Ikona',
              type: 'string',
              description: 'Nazwa ikony z lucide-react',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
      subtitle: 'category.pl',
      media: 'image',
    },
  },
})
