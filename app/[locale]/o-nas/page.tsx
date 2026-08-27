'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Timeline } from '@/app/components/ui/timeline';
import { ArrowRight, Users } from 'lucide-react';
import DomeGallery from '@/app/components/DomeGallery';
import TeamMarquee from '@/app/components/TeamMarquee';
import { useLocale, useTranslations } from 'next-intl';
import SectionHeading from '@/app/components/SectionHeading';

interface AboutUsData {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  image: any;
  statValue: string;
  statLabel: string;
  statSubLabel: string;
}

interface HistoryItem {
  _id: string;
  year: string;
  title: string;
  description: string;
  image: any;
  order?: number;
}

interface TeamMember {
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
  image: any;
  order?: number;
}

export default function AboutUsPage() {
  const [aboutUsData, setAboutUsData] = useState<AboutUsData | null>(null);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [aboutUsLoading, setAboutUsLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const locale = useLocale();
  const t = useTranslations('aboutUs');

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    async function fetchAboutUs() {
      try {
        const query = `*[_type == "aboutUs"][0] {
          "title": coalesce(title[$locale], title.pl),
          "description": coalesce(description[$locale], description.pl),
          "primaryButtonText": coalesce(primaryButtonText[$locale], primaryButtonText.pl),
          primaryButtonLink,
          "secondaryButtonText": coalesce(secondaryButtonText[$locale], secondaryButtonText.pl),
          secondaryButtonLink,
          image,
          statValue,
          "statLabel": coalesce(statLabel[$locale], statLabel.pl),
          "statSubLabel": coalesce(statSubLabel[$locale], statSubLabel.pl)
        }`;
        const data = await client.fetch<AboutUsData>(query, { locale });
        setAboutUsData(data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych O nas:', error);
      } finally {
        setAboutUsLoading(false);
      }
    }
    fetchAboutUs();
  }, [locale]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const query = `*[_type == "history"] | order(order asc) {
          _id,
          year,
          "title": coalesce(title[$locale], title.pl),
          "description": coalesce(description[$locale], description.pl),
          image,
          order
        }`;
        const data = await client.fetch<HistoryItem[]>(query, { locale });
        setHistoryItems(data);
      } catch (error) {
        console.error('Błąd podczas pobierania historii:', error);
      } finally {
        setHistoryLoading(false);
      }
    }
    fetchHistory();
  }, [locale]);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const query = `*[_type == "team" && hidden != true] | order(order asc) {
          _id,
          firstName,
          lastName,
          "position": coalesce(position[$locale], position.pl),
          image,
          order
        }`;
        const data = await client.fetch<TeamMember[]>(query, { locale });
        setTeamMembers(data);
      } catch (error) {
        console.error('Błąd podczas pobierania zespołu:', error);
      }
    }
    fetchTeam();
  }, [locale]);

  // Treść kroku historii w tej samej karcie co realizacje i kroki procesu:
  // biała karta, ramka slate-200, rounded-2xl, delikatny cień.
  const timelineData = historyItems.map((item) => ({
    title: item.year,
    content: (
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h3 className="text-lg font-bold leading-snug tracking-tight text-slate-900 sm:text-xl">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {item.description}
        </p>
        {item.image && (
          <div className="mt-6 overflow-hidden rounded-2xl">
            <img
              src={urlFor(item.image).width(1200).height(800).url()}
              alt={item.title}
              className="max-h-[420px] w-full object-cover md:max-h-[480px]"
            />
          </div>
        )}
      </article>
    ),
  }));

  const teamImages = teamMembers.filter((member) => member.image);

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full max-w-7xl">
        {/* ── Hero - ten sam układ i typografia co hero strony głównej ── */}
        <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden bg-gray-100">
          <div className="relative mx-auto flex min-h-[min(100vh,1000px)] w-full max-w-7xl items-center px-4 pb-16 pt-[var(--page-top-offset)] sm:px-6 lg:px-8 lg:pb-24">
            {/* poświaty - jak w hero na home, trzymają się treści */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 top-10 z-0 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/3 z-0 h-[30rem] w-[30rem] rounded-full bg-sky-300/20 blur-3xl"
            />

            {aboutUsLoading ? (
              <div className="relative z-10 grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14">
                <div className="space-y-5">
                  <div className="h-3 w-24 rounded-full bg-slate-200/80" />
                  <div className="h-12 w-full max-w-lg rounded-2xl bg-slate-200/80" />
                  <div className="h-12 w-4/5 max-w-md rounded-2xl bg-slate-200/60" />
                  <div className="h-20 w-full max-w-xl rounded-2xl bg-slate-200/50" />
                </div>
                <div className="aspect-[4/3] w-full rounded-2xl bg-slate-200/60" />
                <span className="sr-only">{t('loading')}</span>
              </div>
            ) : aboutUsData ? (
              <div className="relative z-10 grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-14">
                {/* Tekst */}
                <div className="order-1 flex flex-col items-start text-left">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                    - {t('eyebrow')}
                  </p>
                  <h1
                    className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-[4rem]"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {aboutUsData.title}
                  </h1>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                    {aboutUsData.description}
                  </p>

                  <Link
                    href={aboutUsData.primaryButtonLink || `/${locale}/kontakt`}
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-9 py-4 text-lg font-semibold text-white shadow-md shadow-blue-600/25 transition-[translate,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {aboutUsData.primaryButtonText || t('fallbackButton')}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>

                {/* Zdjęcie + karta ze statystyką w stylu kart z home */}
                <div className="relative order-2">
                  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <img
                      src={urlFor(aboutUsData.image).width(1200).height(900).url()}
                      alt={aboutUsData.title}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>

                  {aboutUsData.statValue && (
                    <div className="absolute -bottom-6 left-4 max-w-[16rem] rounded-2xl border border-gray-100 bg-white p-5 shadow-md sm:left-6">
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600">
                          <Users className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                        <div>
                          <div className="text-3xl font-bold leading-none text-slate-900">
                            {aboutUsData.statValue}
                          </div>
                          {aboutUsData.statLabel && (
                            <div className="mt-1 text-sm font-semibold text-slate-900">
                              {aboutUsData.statLabel}
                            </div>
                          )}
                          {aboutUsData.statSubLabel && (
                            <div className="text-xs text-slate-600">
                              {aboutUsData.statSubLabel}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {/* ── Historia ── */}
        <section className="section-y">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={t('history.eyebrow')}
              title={t('history.title')}
              lead={t('history.description')}
              className="mb-10"
            />

            {historyLoading ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="h-56 rounded-2xl border border-slate-200 bg-white shadow-sm"
                  />
                ))}
                <span className="sr-only">{t('history.loading')}</span>
              </div>
            ) : historyItems.length > 0 ? (
              <div className="relative w-full overflow-visible">
                <Timeline data={timelineData} />
              </div>
            ) : (
              <p className="text-center text-slate-600">{t('history.noData')}</p>
            )}
          </div>
        </section>

        {/* ── Zespół - pełnoekranowa sekcja z galerią, jak Proces na home ── */}
        {teamImages.length > 0 && (
          <section className="section-y relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow={t('team.eyebrow')}
                title={t('team.galleryTitle')}
                lead={t('team.description')}
                className="mb-10"
              />
            </div>

            <div className="w-full">
              {isDesktop ? (
                <DomeGallery
                  images={teamImages.map((member) => ({
                    src: urlFor(member.image).width(400).height(400).quality(75).auto('format').url(),
                    alt:
                      `${member.firstName || ''} ${member.lastName || ''}`.trim() ||
                      t('team.fallbackName'),
                    name: `${member.firstName || ''} ${member.lastName || ''}`.trim() || undefined,
                    description: member.position || undefined,
                  }))}
                  fit={0.8}
                  minRadius={800}
                  maxVerticalRotationDeg={0}
                  segments={24}
                  dragDampening={2}
                  grayscale={false}
                />
              ) : (
                <TeamMarquee
                  images={teamImages.map((member) => ({
                    src: urlFor(member.image).width(300).height(300).quality(75).auto('format').url(),
                    alt:
                      `${member.firstName || ''} ${member.lastName || ''}`.trim() ||
                      t('team.fallbackName'),
                    name: `${member.firstName || ''} ${member.lastName || ''}`.trim() || undefined,
                    description: member.position || undefined,
                  }))}
                  rows={3}
                />
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
