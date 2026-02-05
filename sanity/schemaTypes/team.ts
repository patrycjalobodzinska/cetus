import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'team',
  title: 'Zespół',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'Imię',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      title: 'Nazwisko',
      type: 'string',
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
      lastName: 'lastName',
      position: 'position.pl',
      media: 'image',
    },
    prepare({ firstName, lastName, position, media }) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: position,
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
  ],
})
