import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'stats',
  title: 'Statystyki (nieużywane na stronie)',
  type: 'document',
  description: 'Nieużywane - żaden komponent nie pobiera tego typu.',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'localeString',
    }),
    defineField({
      name: 'count',
      title: 'Liczba',
      type: 'number',
    }),
    defineField({
      name: 'order',
      title: 'Kolejność',
      type: 'number',
      description: 'Kolejność wyświetlania (1, 2, 3, 4)',
    }),
  ],
  preview: {
    select: {
      title: 'title.pl',
      count: 'count',
    },
    prepare({ title, count }) {
      return {
        title: `${title} - ${count}+`,
      }
    },
  },
  orderings: [
    {
      title: 'Kolejność',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
