import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sponsor',
  title: 'Sponsoring - wspierany podmiot',
  type: 'document',
  description: 'Podmiot w sekcji "Dumny sponsor" na stronie głównej.',
  fields: [
    defineField({
      name: 'name',
      title: 'Nazwa',
      type: 'localeString',
      description: 'Nazwa sponsorowanego klubu / zawodnika',
    }),
    defineField({
      name: 'category',
      title: 'Kategoria / etykieta',
      type: 'localeString',
      description: 'Krótka etykieta pod logo, np. "Klub piłkarski", "Boks" (opcjonalne)',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Logo sponsorowanego klubu / zawodnika',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Adres strony / profilu (np. strona klubu, Facebook) - kafelek będzie linkiem',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'], allowRelative: false }),
    }),
    defineField({
      name: 'darkBackground',
      title: 'Ciemne tło kafelka',
      type: 'boolean',
      description: 'Włącz, jeśli logo jest jasne / przeznaczone na ciemne tło (np. białe litery)',
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
      name: 'name.pl',
      category: 'category.pl',
      media: 'logo',
    },
    prepare({ name, category, media }) {
      return {
        title: name || 'Brak nazwy',
        subtitle: category || undefined,
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
