import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'string',
      description: 'Kategoria projektu (np. Rolnictwo & Winiarstwo)',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
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
      type: 'text',
      description: 'Opis rozwiązania',
    }),
    defineField({
      name: 'results',
      title: 'Efekty',
      type: 'array',
      of: [{ type: 'string' }],
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
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Lista',
              type: 'array',
              of: [{ type: 'string' }],
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
              type: 'string',
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
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
