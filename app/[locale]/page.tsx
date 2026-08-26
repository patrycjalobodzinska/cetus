import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import HomeSections from "./components/HomeSections";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  const title = t('metadata.title', { defaultValue: 'CetusPro - Nowoczesne rozwiązania IT' });
  const description = t('metadata.description', { defaultValue: 'CetusPro - Tworzymy nowoczesne aplikacje webowe, mobilne i rozwiązania IT.' });
  const ogTitle = t('metadata.ogTitle', { defaultValue: 'CetusPro - Nowoczesne rozwiązania IT i aplikacje webowe' });
  const ogDescription = t('metadata.ogDescription', { defaultValue: 'Tworzymy nowoczesne aplikacje webowe, mobilne i rozwiązania IT.' });

  return {
    title,
    description,
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
      title: ogTitle,
      description: ogDescription,
      url: "/",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: locale === "pl" ? "/" : `/${locale}`,
      languages: {
        pl: "/",
        en: "/en",
        "x-default": "/",
      },
    },
  };
}

export default function Home() {
  return <HomeSections />;
}
