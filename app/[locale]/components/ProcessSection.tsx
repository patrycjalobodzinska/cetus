import { getLocale } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import ProcessSectionView, { type ProcessData } from "./ProcessSectionView";

/**
 * Sekcja "Proces" - dane z Sanity pobierane na serwerze.
 *
 * Wcześniej ten fetch leciał z przeglądarki w `useEffect`: strona najpierw
 * renderowała teksty zapasowe z i18n, potem czekała na odpowiedź Sanity i
 * przerysowywała całą sekcję. To dokładało zapytanie do i tak zajętego wątku
 * przy starcie strony i powodowało przeskok treści. Reszta sekcji na stronie
 * głównej pobiera dane na serwerze - ta jest teraz spójna z nimi.
 */
const QUERY = `*[_type == "processSection"][0] {
  "title": coalesce(title[$locale], title.pl),
  "description": coalesce(description[$locale], description.pl),
  "steps": steps[] {
    _key,
    "stepLabel": coalesce(stepLabel[$locale], stepLabel.pl),
    "title": coalesce(title[$locale], title.pl),
    "description": coalesce(description[$locale], description.pl)
  }
}`;

export default async function ProcessSection() {
  const locale = await getLocale();

  let data: ProcessData | null = null;
  try {
    data = await client.fetch<ProcessData | null>(QUERY, { locale });
  } catch {
    // brak CMS-u nie może wywalić strony - widok ma komplet tekstów z i18n
  }

  return <ProcessSectionView data={data?.steps?.length ? data : null} />;
}
