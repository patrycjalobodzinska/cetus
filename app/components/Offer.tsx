"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import StarGradientButton from "./ui/gradientBackground";
import { useLocale, useTranslations } from "next-intl";

interface Project {
  title: string;
  description: string;
  src: string;
  order: number;
  slug?: string;
  link?: string;
}

interface OfferData {
  title: string;
  titleHighlight: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  projects: Project[];
}

const POLYGON_CLIP_PATH = "polygon(0% 0px, 20px 0%, 95% 0%, 100% 20px, 100% 80%, 100% 100%, calc(100% - 20px) 100%, 5% 100%, 0% 80%)";

const StickyCard_001 = ({
  i,
  title,
  slug,
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
  const t = useTranslations('common');
  const locale = useLocale();
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      style={{
        top: `calc(155px + ${i * 20}px)`,
      }}
      ref={container}
      className="sticky w-full mb-6 top-0 flex flex-col items-start justify-start"
    >
      <div
        className="p-px w-full rounded-md transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.5) 0%, rgba(147, 197, 253, 0.5) 100%)",
          clipPath: POLYGON_CLIP_PATH
        }}
      >
        <motion.div
          style={{
            clipPath: POLYGON_CLIP_PATH
          }}
          className="relative w-full h-full origin-top overflow-hidden bg-white"
        >
          <div className="flex h-full w-full flex-col">
            {src && (
              <div className="h-1/2 w-full overflow-hidden" style={{ clipPath: POLYGON_CLIP_PATH }}>
                <img src={src} alt={title || ''} className="h-full max-h-[300px] w-full object-cover" />
              </div>
            )}
            <div className="flex h-1/2 cursor-pointer flex-col p-8">
              {title && <h3 className="mb-3 text-2xl font-bold text-gray-900">{title}</h3>}
              {description && <p className="text-gray-600 leading-relaxed text-sm">{description}</p>}
              {slug && (
                <Link className="hover:underline text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:rounded" href={`/${locale}/oferta/${slug}`}>{t('learnMore')}</Link>
              )}
            </div>
          </div>
        </motion.div>
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
  const projects = offerData.projects;

  const lastCardIndex = projects.length - 1;
  const lastCardStartPos = lastCardIndex * (1 / projects.length);
  const exitStart = lastCardStartPos + (0.3 / projects.length);
  const leftColumnOpacity = useTransform(scrollYProgress, [exitStart, 1], [1, 0]);
  const leftColumnY = useTransform(scrollYProgress, [exitStart, 1], [0, -100]);

  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      <div ref={container} className="relative">
        <div className="lg:flex lg:gap-20">
          <motion.div
            style={{ opacity: leftColumnOpacity, y: leftColumnY }}
            className="sticky lg:top-[100px] flex-col justify-center lg:py-20 pt-10 flex-1 self-start"
          >
            <div className="flex lg:gap-8">
              <div className="shrink-0 lg:flex hidden">
                <svg width="100" height="700" viewBox="0 0 100 700" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#1e3a8a" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <path
                    d="M60 20 L35 60 L35 400  60 440 L60 690"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                  />
                  <rect x="59" y="10" width="10" height="10" fill="#60a5fa" filter="url(#glow)" />
                  <rect x="136" y="620" width="10" height="10" fill="#1e3a8a" transform="rotate(45 20 560)" filter="url(#glow)" />
                </svg>
              </div>

              <div className="ml-8 lg:ml-0">
                {(offerData.title || offerData.titleHighlight) && (
                  <h2 style={{ fontFamily: "var(--font-michroma)" }} className="mb-3 text-2xl lg:text-5xl font-black tracking-tight text-gray-900 sm:text-6xl">
                    {offerData.title && <>{offerData.title} <br /></>}
                    {offerData.titleHighlight && <span className="text-blue-600">{offerData.titleHighlight}</span>}
                  </h2>
                )}
                {offerData.description && (
                  <p className="max-w-md text-xl md:text-2xl leading-relaxed text-gray-600 lg:mt-16">
                    {offerData.description}
                  </p>
                )}
                {offerData.buttonText && offerData.buttonLink && offerData.buttonLink !== '' && (
                  <div className="lg:mt-10 mt-4 flex gap-4">
                    <Link href={offerData.buttonLink}>
                      <StarGradientButton>{offerData.buttonText}</StarGradientButton>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="relative mt-6 lg:mt-0 flex-1 px-4 min-h-[200vh]">
            {projects.map((project, i) => {
              const targetScale = 1 - (projects.length - i) * 0.04;
              const startRange = i * (1 / projects.length);

              return (
                <StickyCard_001
                  slug={project.slug}
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
  const t = useTranslations('offer');
  const locale = useLocale();
  const container = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const projectKeys = ['webApps', 'mobileApps', 'uiUx', 'ai', 'cybersecurity', 'transformation', 'outsourcing', 'academy', 'venture'];

  const offerData: OfferData = {
    title: t('title'),
    titleHighlight: t('titleHighlight'),
    description: t('description'),
    buttonText: t('buttonText'),
    buttonLink: t('buttonLink'),
    projects: projectKeys.map((key) => ({
      title: t(`projects.${key}.title`),
      description: t(`projects.${key}.description`),
      slug: t(`projects.${key}.slug`),
      src: t(`projects.${key}.image`),
      order: Number(t(`projects.${key}.order`)),
    })).sort((a, b) => a.order - b.order)
  };

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <div ref={container} className="relative">
      {isReady && <Skiper16WithScroll container={container} offerData={offerData} />}
    </div>
  );
};

export { Skiper16, StickyCard_001 };
