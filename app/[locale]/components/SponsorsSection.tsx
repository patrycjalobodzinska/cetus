import { getLocale, getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import LogoWall, { type LogoWallItem } from "./LogoWall";

interface Sponsor {
  _id: string;
  name?: string;
  category?: string;
  logo?: any;
  link?: string;
  darkBackground?: boolean;
}

const QUERY = `*[_type == "sponsor"] | order(order asc) {
  _id,
  "name": coalesce(name[$locale], name.pl),
  "category": coalesce(category[$locale], category.pl),
  logo,
  link,
  darkBackground
}`;

export default async function SponsorsSection() {
  const locale = await getLocale();
  const t = await getTranslations("home.sponsors");

  let sponsors: Sponsor[] = [];
  try {
    sponsors = (await client.fetch<Sponsor[]>(QUERY, { locale })) ?? [];
  } catch (error) {
    console.error("Error fetching sponsors:", error);
  }

  if (sponsors.length === 0) return null;

  const items: LogoWallItem[] = sponsors.map((s) => ({
    id: s._id,
    name: s.name,
    logo: s.logo,
    url: s.link ?? null,
    caption: s.category ?? null,
    darkBackground: s.darkBackground === true,
  }));

  return (
    <section className="section-y relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            - {t("eyebrow")}
          </p>
          <h2 className="section-title mx-auto max-w-4xl text-slate-900">{t("title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 text-pretty">
            {t("lead")}
          </p>
        </div>

        <LogoWall items={items} />
      </div>
    </section>
  );
}
