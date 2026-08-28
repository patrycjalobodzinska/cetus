import { getTranslations } from "next-intl/server";
import { ShieldCheck } from "lucide-react";
import ObfuscatedEmail from "@/app/components/ObfuscatedEmail";
import CookieSettingsButton from "@/app/components/consent/CookieSettingsButton";
import { cloakEmail } from "@/lib/emailCloak";

/**
 * Polityka prywatności.
 *
 * Treść w całości siedzi w `messages/*.json` (namespace `privacyPolicy`), żeby
 * wersja polska i angielska nie rozjechały się przy kolejnej aktualizacji -
 * to dokument, w którym rozjazd między językami jest realnym problemem.
 *
 * Struktura sekcji jest jednolita: nagłówek, akapity, lista, akapity po
 * liście. Dzięki temu dopisanie nowego punktu (na przykład nowego narzędzia
 * analitycznego) to zmiana wyłącznie w tłumaczeniach.
 */

type Section = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  afterParagraphs?: string[];
};

const CONTACT_EMAIL_TOKEN = cloakEmail("contact@cetuspro.com");

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPolicy" });

  // next-intl nie zwraca tablic obiektów przez `t()`, więc sięgamy po nie
  // przez `t.raw` - to jedyny sposób, by trzymać cały dokument w tłumaczeniach.
  const sections = t.raw("sections") as Section[];

  return (
    <div className="min-h-screen">
      <section className="relative">
        <div className="mx-auto max-w-4xl px-4 pt-[var(--page-top-offset)] pb-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <span className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
              <ShieldCheck className="h-8 w-8 text-white" aria-hidden="true" />
            </span>
            <h1
              className="heading-hero tracking-tighter text-slate-900"
              style={{ fontFamily: "var(--font-michroma)" }}>
              {t("title")} <span className="text-blue-600">{t("titleHighlight")}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              {t("subtitle")}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              {t("updatedLabel")}: {t("updatedValue")}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Spis treści - dokument jest długi, a użytkownik zwykle szuka
              jednej konkretnej rzeczy (cookies albo swoich praw). */}
          <nav
            aria-label={t("tocTitle")}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-blue-600">
              {t("tocTitle")}
            </h2>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm font-medium text-slate-700 transition-colors hover:text-blue-600">
                    {index + 1}. {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 space-y-12">
            {sections.map((section, index) => (
              <article key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  <span className="text-blue-600">{index + 1}.</span> {section.title}
                </h2>

                {section.paragraphs?.map((paragraph, i) => (
                  <p key={i} className="mt-4 text-base leading-relaxed text-slate-600">
                    {paragraph}
                  </p>
                ))}

                {section.items && (
                  <ul className="mt-4 space-y-3">
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-base leading-relaxed text-slate-600">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.afterParagraphs?.map((paragraph, i) => (
                  <p key={i} className="mt-4 text-base leading-relaxed text-slate-600">
                    {paragraph}
                  </p>
                ))}

                {/* Dwie sekcje kończą się działaniem, które użytkownik chce
                    wykonać od razu: napisać do nas albo zmienić zgody. */}
                {section.id === "cookies" && <CookieSettingsButton className="mt-6" />}
                {(section.id === "administrator" || section.id === "prawa") && (
                  <ObfuscatedEmail
                    token={CONTACT_EMAIL_TOKEN}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
