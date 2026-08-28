import { Clock, Mail, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import ObfuscatedEmail from '@/app/components/ObfuscatedEmail';
import SectionHeading from '@/app/components/SectionHeading';

/**
 * Kontakt w języku wizualnym reszty serwisu po przebudowie: hero z poświatami
 * i tytułem w Michromie (jak /case-studies i /o-nas), potem sekcja z białymi
 * kartami (border-slate-200, rounded-2xl, shadow-sm) i jedna karta domykająca
 * z zaproszeniem na konsultację - bez niebieskiego gradientu, który był
 * jedynym takim elementem na całej stronie.
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  const addressLines = ['ul. Adama Matuszczaka 14', '35-083 Rzeszów', t('country')];
  const mapsHref =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('ul. Adama Matuszczaka 14, 35-083 Rzeszów');

  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <div className="w-full max-w-7xl">
        {/* ── Hero - poświaty jak na home; tło niesie body ── */}
        <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
          <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-[var(--page-top-offset)] sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 top-10 z-0 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/3 z-0 h-[30rem] w-[30rem] rounded-full bg-sky-300/20 blur-3xl"
            />

            <div className="relative z-10 flex flex-col items-center justify-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                - {t('eyebrow')}
              </p>
              <h1
                className="heading-hero text-center tracking-tighter text-slate-900"
                style={{ fontFamily: 'var(--font-michroma)' }}
              >
                <span>{t('title')} </span>
                <span className="text-blue-600">{t('titleHighlight')}</span>
              </h1>

              <p className="mt-8 max-w-xl text-center text-lg leading-relaxed text-slate-600 lg:text-xl">
                {t('subtitle')}
              </p>

              <ObfuscatedEmail
                user="contact"
                domain="cetuspro.com"
                className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-md shadow-blue-600/25 transition-[translate,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <span>{t('writeToUs')}</span>
                <Mail className="h-5 w-5" aria-hidden="true" />
              </ObfuscatedEmail>
            </div>
          </div>
        </section>

        {/* ── Dane kontaktowe ── */}
        <section className="section-y relative">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={t('contactDetails')}
              lead={t('contactDetailsDescription')}
              className="mb-10"
            />

            <div className="grid gap-5 md:grid-cols-3">
              {/* Email */}
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                  <Mail className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-900">
                  {t('email')}
                </h3>
                <ObfuscatedEmail
                  user="contact"
                  domain="cetuspro.com"
                  className="mt-2 block font-semibold text-blue-600 transition-opacity hover:opacity-70"
                />
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {t('emailResponse')}
                </p>
              </article>

              {/* Adres */}
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                  <MapPin className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-900">
                  {t('address')}
                </h3>
                <p className="mt-2 text-slate-600">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-blue-600 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {t('mapLabel')}
                </a>
                <p className="mt-3 text-sm text-slate-500">
                  {t('taxIdLabel')}: {t('taxIdValue')}
                </p>
              </article>

              {/* Godziny */}
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                  <Clock className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-900">
                  {t('hoursLabel')}
                </h3>
                <p className="mt-2 font-semibold text-slate-900">{t('hoursValue')}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {t('hoursNote')}
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ── Bezpłatna konsultacja - karta domykająca stronę ── */}
        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10 md:py-16">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                - {t('consultationEyebrow')}
              </p>
              <h2 className="section-title text-slate-900">{t('freeConsultation')}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                {t('freeConsultationDescription')}
              </p>
              <ObfuscatedEmail
                user="contact"
                domain="cetuspro.com"
                subject="Consultation"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-md shadow-blue-600/25 transition-[translate,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <span>{t('bookConsultation')}</span>
              </ObfuscatedEmail>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
