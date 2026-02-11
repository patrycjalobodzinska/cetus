import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'offerStats',
  title: 'Statystyki Oferty',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł sekcji',
      type: 'localeString',
      description: 'Tytuł sekcji statystyk',
    }),
    defineField({
      name: 'description',
      title: 'Opis sekcji',
      type: 'localeText',
      description: 'Opis pod tytułem',
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
              description: 'Wartość statystyki (np. "50+", "95%", "30+", "1M+")',
            }),
            defineField({
              name: 'label',
              title: 'Etykieta',
              type: 'localeString',
              description: 'Etykieta statystyki (np. "Projektów", "Klientów wraca")',
            }),
            defineField({
              name: 'icon',
              title: 'Ikona',
              type: 'string',
              description: 'Nazwa ikony z lucide-react (np. "TrendingUp", "Users", "Target", "Crown")',
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
              value: 'value',
              label: 'label.pl',
            },
            prepare({ value, label }) {
              return {
                title: `${value} - ${label}`,
              }
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
        title: title || 'Statystyki Oferty',
      }
    },
  },
})

