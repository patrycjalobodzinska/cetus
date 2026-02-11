import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'technologies',
  title: 'Technologie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł sekcji',
      type: 'localeString',
      description: 'Tytuł sekcji (np. "Nowoczesne narzędzia i frameworki")',
    }),
    defineField({
      name: 'description',
      title: 'Opis sekcji',
      type: 'localeText',
      description: 'Opis pod tytułem',
    }),
    defineField({
      name: 'categories',
      title: 'Kategorie technologii',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Nazwa kategorii',
              type: 'localeString',
              description: 'Nazwa kategorii (np. "Frontend", "Backend")',
            }),
            defineField({
              name: 'items',
              title: 'Lista technologii',
              type: 'localeStringArray',
              description: 'Lista technologii w danej kategorii',
            }),
            defineField({
              name: 'order',
              title: 'Kolejność',
              type: 'number',
              description: 'Kolejność wyświetlania',
            }),
          ],
          preview: {
            select: {
              title: 'title.pl',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
    },
    prepare({ title }) {
      return {
        title: title || 'Technologie',
      }
    },
  },
})

