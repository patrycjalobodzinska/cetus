import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ - pytanie i odpowiedź',
  type: 'document',
  description: 'Wspólna pula pytań - te same wpisy pokazują się w FAQ na stronie głównej i na /kontakt.',
  fields: [
    defineField({
      name: 'title',
      title: 'Pytanie',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Odpowiedź',
      type: 'localeText',
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
      title: 'title.pl',
      subtitle: 'description.pl',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'FAQ',
        subtitle: subtitle ? subtitle.substring(0, 60) + '...' : '',
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
