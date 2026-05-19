import { getLocale } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import RollUpPageView, { type RollUpData } from './RollUpPageView';

const QUERY = `*[_type == "rollUpPage"][0] {
  "heroTitle": coalesce(heroTitle[$locale], heroTitle.pl),
  "heroTitleHighlight": coalesce(heroTitleHighlight[$locale], heroTitleHighlight.pl),
  "heroDescription": coalesce(heroDescription[$locale], heroDescription.pl),
  "stats": stats[] {
    value,
    "label": coalesce(label[$locale], label.pl)
  },
  "sectionTitle": coalesce(sectionTitle[$locale], sectionTitle.pl),
  "sectionTitleHighlight": coalesce(sectionTitleHighlight[$locale], sectionTitleHighlight.pl),
  "sectionSubtitle": coalesce(sectionSubtitle[$locale], sectionSubtitle.pl),
  "businessTitle": coalesce(businessTitle[$locale], businessTitle.pl),
  "businessSubtitle": coalesce(businessSubtitle[$locale], businessSubtitle.pl),
  "businessDescription": coalesce(businessDescription[$locale], businessDescription.pl),
  "businessServices": businessServices[] {
    "title": coalesce(title[$locale], title.pl),
    "description": coalesce(description[$locale], description.pl),
    icon,
    link
  },
  "businessPrimaryButtonText": coalesce(businessPrimaryButtonText[$locale], businessPrimaryButtonText.pl),
  businessPrimaryButtonLink,
  "businessSecondaryButtonText": coalesce(businessSecondaryButtonText[$locale], businessSecondaryButtonText.pl),
  businessSecondaryButtonLink,
  "careerTitle": coalesce(careerTitle[$locale], careerTitle.pl),
  "careerSubtitle": coalesce(careerSubtitle[$locale], careerSubtitle.pl),
  "careerDescription": coalesce(careerDescription[$locale], careerDescription.pl),
  "careerBullets": careerBullets[] {
    "value": coalesce(@[$locale], @.pl)
  }.value,
  "careerCtaText": coalesce(careerCtaText[$locale], careerCtaText.pl),
  careerCtaLink,
  "trustedLabel": coalesce(trustedLabel[$locale], trustedLabel.pl),
  trustedDisplayMode,
  "trustedClients": coalesce(trustedClients[$locale], trustedClients.pl),
  "trustedCards": trustedCards[] {
    name,
    "logoUrl": logo.asset->url,
    url
  }
}`;

const EMPTY: RollUpData = {
  stats: [],
  businessServices: [],
  careerBullets: [],
  trustedCards: [],
};

export default async function RollUpPage() {
  const locale = await getLocale();

  let data: RollUpData = EMPTY;
  try {
    const fetched = await client.fetch<RollUpData | null>(QUERY, { locale });
    if (fetched) {
      data = {
        ...fetched,
        stats: fetched.stats || [],
        businessServices: fetched.businessServices || [],
        careerBullets: (fetched.careerBullets || []).filter(Boolean),
        trustedCards: fetched.trustedCards || [],
      };
    }
  } catch (error) {
    console.error('Error fetching roll-up page:', error);
  }

  return <RollUpPageView data={data} />;
}
