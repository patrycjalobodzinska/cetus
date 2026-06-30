import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Zaufali nam',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nazwa',
      type: 'localeString',
      description: 'Nazwa partnera',
    }),
    defineField({
      name: 'invertColors',
      title: 'Odwróć kolory (logo na czarno)',
      type: 'boolean',
      description:
        'Domyślnie logo wyświetla się w oryginalnych kolorach. Włącz, jeśli chcesz ujednolicić logo do czerni (np. kolorowe / wielobarwne logo, które ma pasować do reszty).',
      initialValue: false,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Logo partnera',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'localeText',
      description: 'Krótki opis partnera (opcjonalne)',
    }),
    defineField({
      name: 'url',
      title: 'Link',
      type: 'url',
      description: 'Adres strony / profilu klienta (opcjonalny) - jeśli podany, kafelek będzie linkiem',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'], allowRelative: false }),
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
      media: 'logo',
    },
    prepare({ name, media }) {
      return {
        title: name || 'Brak nazwy',
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
