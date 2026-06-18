import { defineField, defineType, defineArrayMember } from "sanity";

// ─── bpHeroSection ────────────────────────────────────────────────────────────
export const bpHeroSection = defineType({
  name: "bpHeroSection",
  title: "Hero - nagłówek wpisu",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Wariant",
      type: "string",
      options: {
        list: [
          { title: "Centered - tytuł na środku", value: "centered" },
          { title: "Cover - duże zdjęcie tła + tytuł na nim", value: "cover" },
          { title: "Split - tekst po lewej, zdjęcie po prawej", value: "split" },
        ],
        layout: "radio",
      },
      initialValue: "centered",
    }),
    defineField({
      name: "title",
      title: "Tytuł wpisu",
      type: "localeString",
    }),
    defineField({
      name: "category",
      title: "Badge / Kategoria",
      type: "localeString",
    }),
    defineField({
      name: "excerpt",
      title: "Krótki opis / Lead",
      type: "localeText",
    }),
    defineField({
      name: "image",
      title: "Zdjęcie nagłówka",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title.pl", subtitle: "variant", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: `Hero: ${title || "-"}`, subtitle, media };
    },
  },
});

// ─── bpRichTextSection ────────────────────────────────────────────────────────
export const bpRichTextSection = defineType({
  name: "bpRichTextSection",
  title: "Tekst sformatowany",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Wariant",
      type: "string",
      options: {
        list: [
          { title: "Standard - max 65ch (czytelny)", value: "standard" },
          { title: "Wide - szerszy układ", value: "wide" },
        ],
        layout: "radio",
      },
      initialValue: "standard",
    }),
    defineField({
      name: "contentPl",
      title: "Treść (PL)",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normalny", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Cytat", value: "blockquote" },
          ],
          lists: [
            { title: "Lista punktowana", value: "bullet" },
            { title: "Lista numerowana", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Pogrubienie", value: "strong" },
              { title: "Kursywa", value: "em" },
              { title: "Kod", value: "code" },
              { title: "Podkreślenie", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", title: "URL", type: "url" },
                  {
                    name: "blank",
                    title: "Otwórz w nowej karcie",
                    type: "boolean",
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "contentEn",
      title: "Treść (EN)",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", title: "URL", type: "url" },
                  {
                    name: "blank",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { subtitle: "variant" },
    prepare({ subtitle }) {
      return { title: "Tekst sformatowany", subtitle };
    },
  },
});

// ─── bpImageSection ───────────────────────────────────────────────────────────
export const bpImageSection = defineType({
  name: "bpImageSection",
  title: "Zdjęcie",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Wariant",
      type: "string",
      options: {
        list: [
          { title: "Contained - dopasowane do kolumny tekstu", value: "contained" },
          { title: "Wide - szeroki układ", value: "wide" },
          { title: "Full-bleed - na całą szerokość ekranu", value: "full" },
        ],
        layout: "radio",
      },
      initialValue: "contained",
    }),
    defineField({
      name: "image",
      title: "Zdjęcie",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "caption",
      title: "Podpis (opcjonalne)",
      type: "localeString",
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "localeString",
    }),
  ],
  preview: {
    select: { title: "caption.pl", subtitle: "variant", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Zdjęcie", subtitle, media };
    },
  },
});

// ─── bpQuoteSection ───────────────────────────────────────────────────────────
export const bpQuoteSection = defineType({
  name: "bpQuoteSection",
  title: "Cytat",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Wariant",
      type: "string",
      options: {
        list: [
          { title: "Centered - duża czcionka na środku", value: "centered" },
          { title: "Blockquote - z lewej z paskiem koloru", value: "blockquote" },
        ],
        layout: "radio",
      },
      initialValue: "centered",
    }),
    defineField({ name: "quote", title: "Treść cytatu", type: "localeText" }),
    defineField({ name: "author", title: "Autor", type: "string" }),
    defineField({ name: "role", title: "Stanowisko / rola", type: "localeString" }),
  ],
  preview: {
    select: { title: "quote.pl", subtitle: "author" },
    prepare({ title, subtitle }) {
      return {
        title: `Cytat: ${title?.substring(0, 40) || "-"}…`,
        subtitle,
      };
    },
  },
});

// ─── bpGallerySection ─────────────────────────────────────────────────────────
export const bpGallerySection = defineType({
  name: "bpGallerySection",
  title: "Galeria zdjęć",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Wariant",
      type: "string",
      options: {
        list: [
          { title: "Grid - siatka 2 lub 3 kolumny", value: "grid" },
          { title: "Carousel - karuzela", value: "carousel" },
          { title: "Masonry - asymetryczna siatka", value: "masonry" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
    defineField({
      name: "sectionTitle",
      title: "Tytuł sekcji (opcjonalne)",
      type: "localeString",
    }),
    defineField({
      name: "items",
      title: "Zdjęcia",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Zdjęcie",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "caption",
              title: "Podpis",
              type: "localeString",
            }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "localeString",
            }),
          ],
          preview: { select: { title: "caption.pl", media: "image" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { subtitle: "variant" },
    prepare({ subtitle }) {
      return { title: "Galeria", subtitle };
    },
  },
});

// ─── bpCodeSection ────────────────────────────────────────────────────────────
export const bpCodeSection = defineType({
  name: "bpCodeSection",
  title: "Blok kodu",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Język",
      type: "string",
      options: {
        list: [
          { title: "Tekst", value: "text" },
          { title: "JavaScript", value: "javascript" },
          { title: "TypeScript", value: "typescript" },
          { title: "JSX/TSX", value: "tsx" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "JSON", value: "json" },
          { title: "Bash", value: "bash" },
          { title: "Python", value: "python" },
          { title: "SQL", value: "sql" },
        ],
      },
      initialValue: "text",
    }),
    defineField({
      name: "filename",
      title: "Nazwa pliku (opcjonalne)",
      type: "string",
    }),
    defineField({
      name: "code",
      title: "Kod",
      type: "text",
      rows: 12,
    }),
  ],
  preview: {
    select: { title: "filename", subtitle: "language" },
    prepare({ title, subtitle }) {
      return { title: title || "Blok kodu", subtitle };
    },
  },
});

// ─── bpVideoSection ───────────────────────────────────────────────────────────
export const bpVideoSection = defineType({
  name: "bpVideoSection",
  title: "Wideo (embed)",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "URL wideo (YouTube / Vimeo)",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Podpis (opcjonalne)",
      type: "localeString",
    }),
    defineField({
      name: "title",
      title: "Tytuł (a11y)",
      type: "localeString",
    }),
  ],
  preview: {
    select: { title: "title.pl", subtitle: "url" },
    prepare({ title, subtitle }) {
      return { title: `Wideo: ${title || "-"}`, subtitle };
    },
  },
});

// ─── bpListSection ────────────────────────────────────────────────────────────
export const bpListSection = defineType({
  name: "bpListSection",
  title: "Lista",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Wariant",
      type: "string",
      options: {
        list: [
          { title: "Bullet - punkty", value: "bullet" },
          { title: "Numbered - numery", value: "numbered" },
          { title: "Checklist - checkmarki", value: "checklist" },
        ],
        layout: "radio",
      },
      initialValue: "bullet",
    }),
    defineField({
      name: "sectionTitle",
      title: "Tytuł sekcji (opcjonalne)",
      type: "localeString",
    }),
    defineField({
      name: "items",
      title: "Elementy listy",
      type: "localeStringArray",
    }),
  ],
  preview: {
    select: { title: "sectionTitle.pl", subtitle: "variant" },
    prepare({ title, subtitle }) {
      return { title: title || "Lista", subtitle };
    },
  },
});

// ─── bpCalloutSection ─────────────────────────────────────────────────────────
export const bpCalloutSection = defineType({
  name: "bpCalloutSection",
  title: "Callout (wyróżnione info)",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Ton wizualny",
      type: "string",
      options: {
        list: [
          { title: "Info (niebieski)", value: "info" },
          { title: "Success (zielony)", value: "success" },
          { title: "Warning (żółty)", value: "warning" },
          { title: "Tip (fioletowy)", value: "tip" },
        ],
        layout: "radio",
      },
      initialValue: "info",
    }),
    defineField({ name: "title", title: "Tytuł", type: "localeString" }),
    defineField({ name: "body", title: "Treść", type: "localeText" }),
  ],
  preview: {
    select: { title: "title.pl", subtitle: "tone" },
    prepare({ title, subtitle }) {
      return { title: `Callout: ${title || "-"}`, subtitle };
    },
  },
});

// ─── bpCtaSection ─────────────────────────────────────────────────────────────
export const bpCtaSection = defineType({
  name: "bpCtaSection",
  title: "CTA",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Wariant",
      type: "string",
      options: {
        list: [
          { title: "Centered - wyśrodkowany", value: "centered" },
          { title: "Banner - z gradientowym tłem", value: "banner" },
        ],
        layout: "radio",
      },
      initialValue: "centered",
    }),
    defineField({ name: "heading", title: "Nagłówek", type: "localeString" }),
    defineField({
      name: "description",
      title: "Opis (opcjonalne)",
      type: "localeText",
    }),
    defineField({
      name: "buttonLabel",
      title: "Etykieta przycisku",
      type: "localeString",
    }),
    defineField({
      name: "buttonHref",
      title: "Link przycisku",
      type: "string",
      initialValue: "/kontakt",
    }),
  ],
  preview: {
    select: { title: "heading.pl", subtitle: "variant" },
    prepare({ title, subtitle }) {
      return { title: `CTA: ${title || "-"}`, subtitle };
    },
  },
});

// ─── bpButtonSection ──────────────────────────────────────────────────────────
export const bpButtonSection = defineType({
  name: "bpButtonSection",
  title: "Przycisk z linkiem",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Styl",
      type: "string",
      options: {
        list: [
          { title: "Primary – niebieski, wypełniony", value: "primary" },
          { title: "Secondary – ciemny", value: "secondary" },
          { title: "Outline – obramowanie", value: "outline" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
    defineField({
      name: "align",
      title: "Wyrównanie",
      type: "string",
      options: {
        list: [
          { title: "Do lewej", value: "left" },
          { title: "Wyśrodkowany", value: "center" },
          { title: "Do prawej", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "center",
    }),
    defineField({
      name: "buttonLabel",
      title: "Tekst przycisku",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonHref",
      title: "Link (np. https://elevate.cetuspro.com albo /kontakt)",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "blank",
      title: "Otwórz w nowej karcie",
      type: "boolean",
      description: "Zalecane dla linków zewnętrznych.",
      initialValue: true,
    }),
    defineField({
      name: "image",
      title: "Logo / grafika nad przyciskiem (opcjonalne)",
      type: "image",
      description: "Np. logo strony, do której prowadzi przycisk. Wyświetli się nad przyciskiem.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "buttonLabel.pl", subtitle: "buttonHref", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: `Przycisk: ${title || "-"}`, subtitle, media };
    },
  },
});
