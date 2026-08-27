import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Zaufali nam - logotyp klienta',
  type: 'document',
  description: 'Logotyp w pasku "Zaufali nam" na stronie głównej.',
  fields: [
    defineField({
      name: 'name',
      title: 'Nazwa',
      type: 'localeString',
      description: 'Nazwa partnera',
    }),
    defineField({
      name: 'logoTone',
      title: 'Kolorystyka logo',
      type: 'string',
      description:
        'Decyduje o tle kafelka. „Ciemne logo” - jasne (białe) tło, tak wygląda większość logotypów. „Jasne logo” - ciemne tło, dla logotypów z białymi literami, które na białym byłyby niewidoczne.',
      options: {
        list: [
          { title: 'Ciemne logo → jasne tło (domyślne)', value: 'dark' },
          { title: 'Jasne logo → ciemne tło', value: 'light' },
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
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
