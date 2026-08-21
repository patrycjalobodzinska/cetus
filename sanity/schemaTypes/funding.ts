import { defineField, defineType } from 'sanity'

/**
 * Sekcja "Dofinansowanie / Fundusze Europejskie" (perspektywa FE 2021-2027).
 *
 * Obowiazki informacyjne beneficjenta (Rozporzadzenie ogolne 2021/1060, zal. IX
 * oraz Podrecznik wnioskodawcy i beneficjenta - Ksiega Tozsamosci Wizualnej FE):
 *  - oficjalne "zestawienie znakow" (Fundusze Europejskie + flaga UE
 *    "Dofinansowane przez Unie Europejska" [+ barwy RP / logo programu regionalnego]),
 *  - krotki opis projektu: cel/przedmiot, planowane efekty,
 *  - wartosc projektu oraz wysokosc wkladu Unii Europejskiej,
 *  - (zalecane) hasztag #FunduszeUE / #FunduszeEuropejskie.
 *
 * WAZNE: wartosci (tytul projektu, kwoty, nr umowy) musza pochodzic wprost
 * z umowy o dofinansowanie. Nie wolno ich zmyslac.
 */
export default defineType({
  name: 'funding',
  title: 'Dofinansowanie (Fundusze Europejskie)',
  type: 'document',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Opublikowane (widoczne na stronie)',
      description:
        'Zaznacz dopiero, gdy uzupelnisz prawdziwe dane z umowy o dofinansowanie oraz wgrasz oficjalne zestawienie znakow. Gdy wylaczone: strona /dofinansowanie pokazuje stan "w przygotowaniu", a pasek w stopce sie nie wyswietla.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'heading',
      title: 'Naglowek strony',
      type: 'localeString',
    }),
    defineField({
      name: 'intro',
      title: 'Wprowadzenie (opcjonalne)',
      type: 'localeText',
    }),
    defineField({
      name: 'logoLockup',
      title: 'Oficjalne zestawienie znakow (obraz)',
      description:
        'Wgraj plik dostarczony przez instytucje: Fundusze Europejskie + flaga UE "Dofinansowane przez Unie Europejska" (+ ew. barwy RP / logo programu). Preferowany format poziomy, na bialym tle. Ten sam znak pokaze sie w pasku w stopce.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Tekst alternatywny (alt)',
          type: 'string',
          initialValue:
            'Znak Fundusze Europejskie, flaga Unii Europejskiej - Dofinansowane przez Unie Europejska',
        }),
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Projekty',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'fundingProject',
          fields: [
            defineField({
              name: 'name',
              title: 'Tytul projektu',
              description: 'Dokladnie jak w umowie o dofinansowanie.',
              type: 'localeString',
            }),
            defineField({
              name: 'programName',
              title: 'Nazwa programu / dzialania',
              description:
                'Np. "Fundusze Europejskie dla Nowoczesnej Gospodarki 2021-2027, Dzialanie ..." lub program regionalny.',
              type: 'localeString',
            }),
            defineField({
              name: 'fund',
              title: 'Fundusz',
              description: 'Np. Europejski Fundusz Rozwoju Regionalnego (EFRR).',
              type: 'localeString',
            }),
            defineField({
              name: 'contractNumber',
              title: 'Numer umowy o dofinansowanie (opcjonalnie)',
              type: 'string',
            }),
            defineField({
              name: 'objective',
              title: 'Cel / przedmiot projektu',
              type: 'localeText',
            }),
            defineField({
              name: 'effects',
              title: 'Planowane efekty / rezultaty',
              type: 'localeText',
            }),
            defineField({
              name: 'projectValue',
              title: 'Wartosc projektu',
              description: 'Kwota z jednostka, np. "1 234 567,89 zl".',
              type: 'string',
            }),
            defineField({
              name: 'euContribution',
              title: 'Wysokosc wkladu Unii Europejskiej',
              description: 'Kwota dofinansowania z UE, np. "987 654,32 zl".',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'name.pl', subtitle: 'euContribution' },
            prepare({ title, subtitle }) {
              return {
                title: title || '(brak tytulu projektu)',
                subtitle: subtitle ? `Wklad UE: ${subtitle}` : 'brak kwoty wkladu UE',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'hashtags',
      title: 'Hasztagi (zalecane)',
      type: 'string',
      initialValue: '#FunduszeUE #FunduszeEuropejskie',
    }),
    defineField({
      name: 'signalUrl',
      title: 'Link do mechanizmu sygnalizacyjnego (opcjonalnie)',
      description:
        'Adres do zglaszania nieprawidlowosci/naduzyc finansowych, jesli wymagany w Twojej umowie.',
      type: 'url',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Dofinansowanie (Fundusze Europejskie)' }
    },
  },
})
