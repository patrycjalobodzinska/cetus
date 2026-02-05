import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'localeString',
  title: 'Tekst (PL/EN)',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'pl',
      title: 'Polski',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'pl', subtitle: 'en' },
  },
})
