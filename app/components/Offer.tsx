
"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import StarGradientButton from "./ui/gradientBackground";
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import clsx from "clsx";
import { ButtonGradient } from "./ui/button";

interface Project {
  title: string;
  description: string;
  src: string;
  order: number;
  slug?: string
  link?: string;
}

interface OfferData {
  title: string;
  titleHighlight: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  projects: Array<{
    title: string;
    description: string;
    image: any;
    order: number;
    slug?: {
      current: string;
    };
    link?: string;
  }>;
}

const StickyCard_001 = ({
  i,
  title,slug,
  description,
  src,
  progress,
  range,
  targetScale,
}: {
  i: number;
  title: string;
  slug?: string;
  description: string;
  src: string;
  isLast: boolean;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div  style={{
      top: `calc(155px + ${i * 20}px)`,
    }}
      ref={container}
      className={("sticky  h-[400px] w-full mb-12  top-0  flex flex-col items-start justify-start")}
    >
      <div

        className={"relative w-full origin-top overflow-hidden rounded-3xl border bg-white "}
      >
        <div className="flex h-full w-full flex-col">
          <div className="h-1/2 w-full overflow-hidden">
            <img
                src={src}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex h-1/2  cursor-pointer flex-col p-8">
            <h3 className="mb-3 text-2xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
       <Link className="hover:underline text-blue-600 " href={`/oferta/${slug}`}>Dowiedz się więcej</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Skiper16Content = ({
  container,
  scrollYProgress,
  offerData
}: {
  container: React.RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
  offerData: OfferData;
}) => {
  const projects: Project[] = offerData.projects.map((project) => ({
    title: project.title,
    description: project.description,
    src: project.image ? urlFor(project.image).width(800).height(450).url() : '',
    order: project.order,
    slug: project.slug?.current,
    link: project.link,
  }));

  // OBLICZENIA SYNCHRONIZACJI:
  // Lewa sekcja powinna zacząć znikać dopiero, gdy pojawi się ostatnia karta.
  // Zakres scrolla to 0-1. Ostatnia karta zaczyna się w punkcie:
  const lastCardIndex = projects.length - 1;
  const lastCardStartPos = lastCardIndex * (1 / projects.length);

  // Zaczynamy fade-out lewej strony nieco później (np. w 70% drogi ostatniej karty),
  // aby "wyjechała" z ekranu idealnie razem z końcem sekcji.
  const exitStart = lastCardStartPos + (0.3 / projects.length);
console.log(exitStart,lastCardStartPos);
  const leftColumnOpacity = useTransform(scrollYProgress, [exitStart, 1], [1, 0]);
  const leftColumnY = useTransform(scrollYProgress, [exitStart, 1], [0, -100]);
console.log(scrollYProgress);
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      <div ref={container} className="relative">
        <div className="lg:flex  lg:gap-20">

          {/* LEWA KOLUMNA */}
          <div className="relative  flex-1">
            <div
              className="sticky  lg:top-[100px]  flex-col justify-center lg:py-20 pt-10"

            >
              <div className="flex lg:gap-8">
                <div className="shrink-0 lg:flex hidden ">
                <svg width="100" height="700" viewBox="0 0 100 700" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#60a5fa" />
                      <stop offset="100%" stop-color="#1e3a8a" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <path
                    d="M60 20 L35 60 L35 400  60 440 L60 690"
                    stroke="url(#lineGradient)"
                    stroke-width="2"
                    fill="none"
                    filter="url(#glow)"
                  />
                  <rect x="59" y="10" width="10" height="10" fill="#60a5fa" filter="url(#glow)" />
                  <rect x="136" y="620" width="10" height="10" fill="#1e3a8a" transform="rotate(45 20 560)" filter="url(#glow)" />
                </svg>
                </div>

                <div className="ml-8 lg:ml-0">
                  <h2 style={{ fontFamily: "var(--font-michroma)" }} className="mb-3 text-2xl lg:text-5xl font-black tracking-tight text-gray-900 sm:text-6xl">
                    {offerData.title} <br />
                    <span className="text-blue-600">{offerData.titleHighlight}</span>
                  </h2>
                  <p className="max-w-md text-xl md:text-2xl leading-relaxed text-gray-600 lg:mt-16">
                    {offerData.description}
                  </p>
                  <div className="lg:mt-10 mt-4 flex gap-4">
                   {offerData.buttonLink&& offerData.buttonLink !== '' && <Link href={offerData.buttonLink}>
                      <StarGradientButton>{offerData.buttonText}</StarGradientButton>
                    </Link>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PRAWA KOLUMNA */}
          <div className="relative mt-6 lg:mt-0 flex-1 px-4">
            {projects.map((project, i) => {
              const targetScale = 1 - (projects.length - i) * 0.04;
              const startRange = i * (1 / projects.length);

              return (
                <StickyCard_001 slug={project.slug }
                  key={`p_${i}`}
                  i={i}
                  {...project}
                  isLast={i === projects.length - 1}
                  progress={scrollYProgress}
                  range={[startRange, 1]}
                  targetScale={targetScale}
                />
              )
            })}
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

const Skiper16WithScroll = ({
  container,
  offerData
}: {
  container: React.RefObject<HTMLDivElement | null>;
  offerData: OfferData;
}) => {
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return <Skiper16Content container={container} scrollYProgress={scrollYProgress} offerData={offerData} />;
};

const Skiper16 = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [offerData, setOfferData] = useState<OfferData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    async function fetchOfferData() {
      try {
        const query = `*[_type == "offer"][0] {
          title,
          titleHighlight,
          description,
          buttonText,
          buttonLink,
          projects[] | order(order asc) {
            title,
            description,
            image,
            order,
            slug,
            link
          }
        }`;
        const data = await client.fetch<OfferData>(query);
        setOfferData(data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOfferData();
  }, []);

  useEffect(() => {
    if (isMounted && !loading) {
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isMounted, loading]);

  if (!isMounted || loading) return <div className="py-20 text-center">Ładowanie...</div>;
  if (!offerData) return <div className="py-20 text-center">Brak danych</div>;

  return (
    <div ref={container} className="relative">
      {isReady && <Skiper16WithScroll container={container} offerData={offerData} />}
    </div>
  );
};

export { Skiper16, StickyCard_001 };