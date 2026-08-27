import { getLocale, getTranslations } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import LogoWall, { type LogoWallItem } from "./LogoWall";

interface Partner {
  _id: string;
  name?: string;
  logo?: any;
  url?: string;
  logoTone?: string;
}

const QUERY = `*[_type == "partner"] | order(order asc) {
  _id,
  "name": coalesce(name[$locale], name.pl),
  logo,
  url,
  logoTone
}`;

export default async function PartnersSection() {
  const locale = await getLocale();
  const t = await getTranslations("home.partners");

  let partners: Partner[] = [];
  try {
    partners = (await client.fetch<Partner[]>(QUERY, { locale })) ?? [];
  } catch (error) {
    console.error("Error fetching partners:", error);
  }

  if (partners.length === 0) return null;

  const items: LogoWallItem[] = partners.map((p) => ({
    id: p._id,
    name: p.name,
    logo: p.logo,
    url: p.url ?? null,
    darkBackground: p.logoTone === "light",
  }));

  return (
    <section className="section-y relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            - {t("eyebrow")}
          </p>
          <h2 className="section-title mx-auto max-w-4xl text-slate-900">{t("title")}</h2>
        </div>

        <LogoWall items={items} />
      </div>
    </section>
  );
}
