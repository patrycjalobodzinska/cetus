'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StarGradientButton from '@/app/components/ui/gradientBackground';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Timeline } from '@/app/components/ui/timeline';
import { ArrowRight, Users } from 'lucide-react';
import DecorativeImage from '@/app/components/DecorativeImage';
import PolygonCard from '@/app/components/PolygonCard';

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

  useEffect(() => {
    async function fetchAboutUs() {
      try {
        const query = `*[_type == "aboutUs"][0] {
          title,
          description,
          primaryButtonText,
          primaryButtonLink,
          secondaryButtonText,
          secondaryButtonLink,
          image,
          statValue,
          statLabel,
          statSubLabel
        }`;
        const data = await client.fetch<AboutUsData>(query);
        setAboutUsData(data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych O nas:', error);
      } finally {
        setAboutUsLoading(false);
      }
    }
    fetchAboutUs();
  }, []);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const query = `*[_type == "history"] | order(order asc) {
          _id,
          year,
          title,
          description,
          image,
          order
        }`;
        const data = await client.fetch<HistoryItem[]>(query);
        setHistoryItems(data);
      } catch (error) {
        console.error('Błąd podczas pobierania historii:', error);
      } finally {
        setHistoryLoading(false);
      }
    }
    fetchHistory();
  }, []);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const query = `*[_type == "team"] | order(order asc) {
          _id,
          firstName,
          lastName,
          position,
          image,
          order
        }`;
        const data = await client.fetch<TeamMember[]>(query);
        setTeamMembers(data);
      } catch (error) {
        console.error('Błąd podczas pobierania zespołu:', error);
      } finally {
        setTeamLoading(false);
      }
    }
    fetchTeam();
  }, []);

  const timelineData = historyItems.map((item) => ({
    title: item.year,
    content: (
      <div>
        <h3 className="mb-4 text-xl font-bold text-slate-900 md:text-2xl">
          {item.title}
        </h3>
        <p className="mb-8 text-sm font-normal text-slate-600 md:text-base leading-relaxed">
          {item.description}
        </p>
        {item.image && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src={urlFor(item.image).width(800).height(600).url()}
              alt={item.title}
              className="h-48 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-60 lg:h-72"
            />
          </div>
        )}
      </div>
    ),
  }));

  return (
    <div className="min-h-screen bg-blend-color">



      {aboutUsLoading ? (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600">Ładowanie...</p>
            </div>
          </div>
        </section>
      ) : aboutUsData ? (
        <section className="lg:pt-40 pt-32 flex flex-col justify-between  min-h-[calc(100vh-90px)] ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text and Buttons */}
              <div className="lg:space-y-8 mix-blend-darken space-y-4">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
                  style={{ fontFamily: "var(--font-michroma)" }}
                >
                  {aboutUsData.title}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {aboutUsData.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href={aboutUsData.primaryButtonLink || '/kontakt'}>
                    <StarGradientButton>
                      <span className="flex items-center gap-2">
                        {aboutUsData.primaryButtonText || 'Porozmawiajmy o projekcie'}
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </StarGradientButton>
                  </Link>

                </div>
              </div>

              {/* Right - Image with Overlay */}
              <DecorativeImage
                src={urlFor(aboutUsData.image).width(800).height(600).url()}
                alt={aboutUsData.title}
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
              className="text-4xl md:text-5xl lg:mt-0 mt-12 font-bold text-slate-900 mb-4"
              style={{ fontFamily: "var(--font-michroma)" }}
            >
              Nasza historia
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Zobacz kluczowe momenty naszej podróży i osiągnięcia, które ukształtowały naszą firmę.
            </p>
          </div>

          {historyLoading ? (
            <div className="text-center ">
              <div className="inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600">Ładowanie historii...</p>
            </div>
          ) : historyItems.length > 0 ? (
            <div className="relative w-full overflow-clip">
              <Timeline data={timelineData} />
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">Brak danych do wyświetlenia.</p>
            </div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 flex max-w-7xl mx-auto  border-t border-gray-200">
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
              </div> <div className="max-w-7xl flex flex-col ">
          <div className="">
            <div className="flex items-center justify-center lg:justify-start gap-8 mb-8">

              <div className="text-center lg:text-left">
                <h2
                  className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
                  style={{ fontFamily: "var(--font-michroma)" }}
                >
                  Nasz zespół
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                  Poznaj ludzi, którzy tworzą naszą firmę i codziennie pracują nad najlepszymi rozwiązaniami dla naszych klientów.
                </p>
              </div>
            </div>
          </div>

          {teamLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600">Ładowanie zespołu...</p>
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid items-center justify-center lg:grid-cols-4 md:grid-cols-3   gap-6">
              {teamMembers.map((member) => (
                <PolygonCard
                  key={member._id}
                  imageUrl={urlFor(member.image).width(400).height(400).url()}
                  title={`${member.firstName} ${member.lastName}`}
                  description={member.position}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600">Brak członków zespołu do wyświetlenia.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "var(--font-michroma)" }}
          >
            Chcesz dołączyć do naszej historii?
          </h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Skontaktuj się z nami i dowiedz się, jak możemy pomóc w rozwoju Twojego biznesu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt">
              <StarGradientButton>
                Skontaktuj się z nami
              </StarGradientButton>
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}
