'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Timeline } from '@/app/components/ui/timeline';
import { ArrowRight, Users, User } from 'lucide-react';
import DecorativeImage from '@/app/components/DecorativeImage';
import PolygonCard from '@/app/components/PolygonCard';
import DomeGallery from '@/app/components/DomeGallery';
import TeamMarquee from '@/app/components/TeamMarquee';
import { useLocale, useTranslations } from 'next-intl';

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
  const [teamLoading, setTeamLoading] = useState(true);
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
      } finally {
        setTeamLoading(false);
      }
    }
    fetchTeam();
  }, [locale]);

  const timelineData = historyItems.map((item) => ({
    title: item.year,
    content: (
      <div>
        <h3 className="heading-3 mb-4 text-slate-900">
          {item.title}
        </h3>
        <p className="mb-8 text-sm font-normal text-slate-600 md:text-base leading-relaxed">
          {item.description}
        </p>
        {item.image && (
          <div className="mt-4">
            <img
              src={urlFor(item.image).width(1200).height(800).url()}
              alt={item.title}
              className="w-full max-h-[520px] md:max-h-[580px] rounded-xl md:rounded-2xl object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        )}
      </div>
    ),
  }));

  return (
    <div className="min-h-screen ">



      {aboutUsLoading ? (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600">{t('loading')}</p>
            </div>
          </div>
        </section>
      ) : aboutUsData ? (
        <section className="pt-[var(--page-top-offset)] flex flex-col justify-between min-h-[calc(100vh-90px)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text and Buttons */}
              <div className="lg:space-y-8 mix-blend-darken space-y-4">
                <h1 className="heading-hero text-slate-900 leading-tight">
                  {aboutUsData.title}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {aboutUsData.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href={aboutUsData.primaryButtonLink || '/kontakt'}>
                    <StarGradientButton>
                      <span className="flex items-center gap-2">
                        {aboutUsData.primaryButtonText || t('fallbackButton')}
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </StarGradientButton>
                  </Link>

                </div>
              </div>

              {/* Right - Image with Overlay */}
              <DecorativeImage
                src={urlFor(aboutUsData.image).width(1200).height(800).url()}
                alt={aboutUsData.title}
                noRadius
                overlay={
                  aboutUsData.statValue
                    ? {
                        value: aboutUsData.statValue,
                        label: aboutUsData.statLabel,
                        subLabel: aboutUsData.statSubLabel,
                        icon: <Users className="w-6 h-6 text-white" />,
                      }
                    : undefined
                }
              />
            </div>
          </div>

        </section>
      ) : null}

      {/* History Timeline Section */}
      <section className=" ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center ">
            <h2
              className="heading-1 lg:mt-0 mt-12 text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              {t('history.title')}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('history.description')}
            </p>
          </div>

          {historyLoading ? (
            <div className="text-center ">
              <div className="inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600">{t('history.loading')}</p>
            </div>
          ) : historyItems.length > 0 ? (
            <div className="relative w-full overflow-visible">
              <Timeline data={timelineData} />
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">{t('history.noData')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24  border-t hidden border-gray-200">
      <div className="shrink-0 hidden lg:flex">
                <svg width="100" height="900" viewBox="0 0 100 900" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="teamLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#1e3a8a" />
                    </linearGradient>
                    <filter id="teamGlow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <path
                    d="M60 20 L35 60 L35 750 L60 780"
                    stroke="url(#teamLineGradient)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#teamGlow)"
                  />
                  <rect x="59" y="10" width="10" height="10" fill="#60a5fa" filter="url(#teamGlow)" />
                  <rect x="54" y="774" width="10" height="10" fill="#1e3a8a"  filter="url(#teamGlow)" />
                </svg>
              </div> <div className=" b flex flex-col ">
          <div className="">
            <div className="flex items-center justify-center lg:justify-start gap-8 mb-8">

              <div className="text-center lg:text-left">
                <h2
                  className="heading-1 text-slate-900 mb-4"
                  style={{ fontFamily: "var(--font-michroma)" }}
                >
                  {t('team.title')}
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                  {t('team.description')}
                </p>
              </div>
            </div>
          </div>

          {teamLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600">{t('team.loading')}</p>
            </div>
          ) : teamMembers.length > 0 ? (
            <>
              <div className="grid items-center justify-center lg:grid-cols-4 md:grid-cols-3 gap-6">
                {teamMembers.map((member) => {
                  const imageUrl = member.image
                    ? urlFor(member.image).width(400).height(400).url()
                    : undefined;
                  return (
                    <PolygonCard
                      key={member._id}
                      imageUrl={imageUrl}
                      title={`${member.firstName || ''} ${member.lastName || ''}`.trim() || t('team.fallbackName')}
                      description={member.position || ''}
                      fallbackIcon={<User className="w-24 h-24 text-gray-400" />}
                    />
                  );
                })}
              </div>

            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">{t('team.noMembers')}</p>
            </div>
          )}
        </div>
      </section>

      <div className="py-20 relative ">

      <div className="absolute top-0  left-0 right-0 h-64 z-0 pointer-events-none bg-gradient-to-b from-transparent to-[#f4f4f4]"></div>
                <div className="bg-[#f4f4f4] w-full" style={{ width: '100vw' , }}>
                  {isDesktop ? (
                    <DomeGallery
                      title={t('team.galleryTitle')}
                      images={teamMembers
                        .filter((member) => member.image)
                        .map((member) => ({
                          src: urlFor(member.image).width(400).height(400).quality(75).auto('format').url(),
                          alt: `${member.firstName || ''} ${member.lastName || ''}`.trim() || t('team.fallbackName'),
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
                      title={t('team.galleryTitle')}
                      images={teamMembers
                        .filter((member) => member.image)
                        .map((member) => ({
                          src: urlFor(member.image).width(300).height(300).quality(75).auto('format').url(),
                          alt: `${member.firstName || ''} ${member.lastName || ''}`.trim() || t('team.fallbackName'),
                          name: `${member.firstName || ''} ${member.lastName || ''}`.trim() || undefined,
                          description: member.position || undefined,
                        }))}
                      rows={3}
                    />
                  )}
                </div>
              </div>
      {/* CTA Section */}
      <section className="pb-24 bg-[#f4f4f4]">
        <div className="max-w-4xl  mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="heading-1 text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            {t('cta.title')}
          </h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt">
              <StarGradientButton>
                {t('cta.buttonText')}
              </StarGradientButton>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}
