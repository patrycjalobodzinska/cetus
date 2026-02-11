import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'localeStringArray',
  title: 'Lista (PL/EN)',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'pl',
      title: 'Polski',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: { pl: 'pl', en: 'en' },
    prepare({ pl, en }) {
      return {
        title: `PL: ${(pl?.length ?? 0)} • EN: ${(en?.length ?? 0)}`,
      }
    },
  },
})

