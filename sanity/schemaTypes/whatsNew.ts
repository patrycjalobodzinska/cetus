import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'whatsNew',
  title: 'Co u nas (Shorts z FB)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł sekcji',
      type: 'localeString',
      description: 'Nagłówek sekcji, np. "Co u nas". Jeśli puste, użyty zostanie tekst domyślny.',
    }),
    defineField({
      name: 'description',
      title: 'Opis (opcjonalny)',
      type: 'localeText',
    }),
    defineField({
      name: 'reels',
      title: 'Wideo / Reels',
      description:
        'Najnowsze na górze (przeciągnij, aby zmienić kolejność). Wystarczy wkleić link do reela z Facebooka (np. https://www.facebook.com/reel/123...) – wideo osadzi się automatycznie.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'reel',
          fields: [
            defineField({
              name: 'url',
              title: 'Link do reela / wideo (FB)',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({ scheme: ['http', 'https'] }),
            }),
            defineField({
              name: 'caption',
              title: 'Podpis (opcjonalny)',
              type: 'localeString',
            }),
          ],
          preview: {
            select: {
              title: 'caption.pl',
              subtitle: 'url',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Reel',
                subtitle,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Co u nas (Shorts z FB)' }
    },
  },
})
