'use client';

import { useState, useEffect } from 'react';
import StatsPanel from './StatsPanel';
import StarGradientButton from './ui/gradientBackground';
import { client } from '@/sanity/lib/client';

interface HeroData {
  title: string;
  titleHighlight: string;
  titleAfterHighlight?: string;
  titleThirdLine?: string;
  subtitle: string;
  subtitleHighlight: string;
  description: string;
  buttonText: string;
}

export default function HeroCurosora() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHeroData() {
      try {
        const query = `*[_type == "hero"][0] {
          title,
          titleHighlight,
          titleAfterHighlight,
          titleThirdLine,
          subtitle,
          subtitleHighlight,
          description,
          buttonText
        }`;
        const data = await client.fetch<HeroData>(query);
        setHeroData(data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych hero:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <section className="relative overflow-x-hidden max-w-[100vw] w-full flex flex-col items-center justify-start overflow-hidden">
        <div className="mt-36 w-full justify-center container mx-auto pb-12 flex flex-col lg:flex-row items-center relative overflow-x-hidden">
          <div className="flex flex-col z-30 lg:pt-10 xl:pt-0 items-center justify-center relative px-4 lg:pl-10 lg:pr-0">
            <div className="text-center">Ładowanie...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!heroData) {
    return null;
  }

  const subtitleParts = heroData.subtitle.split(heroData.subtitleHighlight);

  return (
    <section className="relative  overflow-x-hidden max-w-[100vw] w-full  flex flex-col items-center justify-start overflow-hidden">


      <div className=" mt-36 w-full justify-center container mx-auto  lg:pb-12 flex flex-col lg:flex-row items-center relative overflow-x-hidden ">

        <div className=" flex flex-col z-30 lg:pt-10 xl:pt-0 items-center justify-center relative px-4 lg:pl-10 lg:pr-0">




          <div className="relative   lg:min-h-[280px] xl:min-h-[320px]">
        <h1
          className="text-4xl lg:text-7xl tracking-tighter text-slate-900 leading-[0.9] font-bold"
          style={{ fontFamily: "var(--font-michroma)" }}
        >
        <div className="flex items-center justify-center gap-4 min-h-[1.2em]">
                 <span>{heroData.title}</span>
               </div>
               <span className="block text-slate-900 min-h-[1.2em] text-center">
                 <span> <span className="text-blue-600">{heroData.titleHighlight}</span> {heroData.titleAfterHighlight || ''}</span>
               </span>

               {heroData.titleThirdLine && (
                 <span className="block text-slate-900 min-h-[1.2em] text-center">
                   <span>{heroData.titleThirdLine}</span>
                 </span>
               )}
             </h1>
          </div>

 <div className=" text-center space-y-2 items-center justify-center flex flex-col max-w-lg relative w-full px-4">
            <h2 className="text-lg lg:text-xl text-slate-600 leading-relaxed">
              <span className="font-bold text-blue-600">{heroData.subtitleHighlight}</span> <br/>
              {subtitleParts[1]?.trim() || heroData.subtitle}
            </h2>


                  <StarGradientButton >
                    {heroData.buttonText}

                  </StarGradientButton>

          </div>

        </div>




      </div>


      <StatsPanel />

</section>
  );
}
