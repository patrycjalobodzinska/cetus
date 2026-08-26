import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import FAQList from "./FAQList";

interface FAQ {
  _id: string;
  title?: string;
  description?: string;
}

const QUERY = `*[_type == "faq"] | order(order asc) {
  _id,
  "title": coalesce(title[$locale], title.pl),
  "description": coalesce(description[$locale], description.pl)
}`;

export default async function FAQSection() {
  const locale = await getLocale();
  const t = await getTranslations("home.faq");

  let faqs: FAQ[] = [];
  try {
    faqs = (await client.fetch<FAQ[]>(QUERY, { locale })) ?? [];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
  }

  if (faqs.length === 0) return null;

  return (
    <section className="section-y relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Dwie kolumny: po lewej tytuł i wyjście do rozmowy (przykleja się przy
            przewijaniu długiej listy), po prawej same pytania. */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              - FAQ
            </p>
            <h2 className="section-title text-slate-900">{t("title")}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 text-pretty">
              {t("subtitle")}
            </p>

            <div className="mt-8 border-t border-slate-200 pt-8">
              <p className="text-sm font-semibold text-slate-900">{t("contactTitle")}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t("contactLead")}</p>
              <Link
                href={`/${locale}/kontakt`}
                className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors duration-150 ease-out hover:text-blue-600"
              >
                {t("contactCta")}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <FAQList faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
