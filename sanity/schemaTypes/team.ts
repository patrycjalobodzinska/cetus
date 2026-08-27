import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'team',
  title: 'Zespół - osoba',
  type: 'document',
  description: 'Osoba w sekcji zespołu na /o-nas.',
  fields: [
    defineField({
      name: 'firstName',
      title: 'Imię',
      type: 'string',
      description: 'W galerii zespołu pokazujemy same imiona.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Stanowisko',
      type: 'localeString',
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
      name: 'hidden',
      title: 'Ukryj na stronie',
      type: 'boolean',
      description: 'Jeśli zaznaczone, ta osoba nie będzie widoczna na stronie O nas',
      initialValue: false,
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
      firstName: 'firstName',
      position: 'position.pl',
      media: 'image',
      hidden: 'hidden',
    },
    prepare({ firstName, position, media, hidden }) {
      return {
        title: firstName || 'Bez imienia',
        subtitle: [position, hidden ? 'ukryta na stronie' : null]
          .filter(Boolean)
          .join(' - '),
        media,
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
