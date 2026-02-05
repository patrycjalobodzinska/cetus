import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'history',
  title: 'Historia',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Rok',
      type: 'string',
      description: 'Rok wydarzenia (np. "2020")',
    }),
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'localeString',
      description: 'Tytuł wydarzenia',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'localeText',
      description: 'Opis wydarzenia',
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Kolejność',
      type: 'number',
      description: 'Kolejność wyświetlania (mniejsza liczba = wyżej)',
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      year: 'year',
      title: 'title.pl',
      subtitle: 'description.pl',
      media: 'image',
    },
    prepare({ year, title, subtitle, media }) {
      return {
        title: `${year || ''} - ${title || 'Brak tytułu'}`,
        subtitle: subtitle ? subtitle.substring(0, 60) + '...' : '',
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Kolejność',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Rok (rosnąco)',
      name: 'yearAsc',
      by: [{ field: 'year', direction: 'asc' }],
    },
    {
      title: 'Rok (malejąco)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
})
