import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import HeroCurosora from "../components/HeroCurosora";
import Skiper16 from "../components/OfferWrapper";
import HomeCTASection from "./components/HomeCTASection";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      "aplikacje webowe",
      "aplikacje mobilne",
      "rozwój oprogramowania",
      "UX/UI design",
      "cyberbezpieczeństwo",
      "AI i automatyzacja",
      "outsourcing programistów",
      "transformacja technologiczna",
      "CetusPro",
      "aplikacje na zamówienie"
    ],
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: "/",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t('ogTitle'),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: "/",
    },
  };
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <main className="w-full max-w-7xl">
        <HeroCurosora />
        <Skiper16 />
        <HomeCTASection />
      </main>
    </div>
  );
}
