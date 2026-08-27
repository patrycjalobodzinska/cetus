# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dwie potwierdzone grupy decyzyjne, oba w trybie zakupowym:

- **Decydent enterprise** (CTO, dyrektor IT, kierownik projektu w dużej organizacji). Ocenia dostawcę systemów krytycznych: zakres, ryzyka, model współpracy, wiarygodność i zdolność do utrzymania systemu przez lata. Czyta krytycznie, porównuje z innymi software house'ami, potrzebuje dowodów - nie obietnic.
- **Właściciel / zarząd MŚP** bez własnego działu IT. Potrzebuje partnera, który poprowadzi projekt od pomysłu przez wdrożenie po utrzymanie i weźmie odpowiedzialność za dowiezienie. Nie zna języka technicznego; potrzebuje jasnego procesu i przewidywalności.

Kandydaci do pracy i uczestnicy programu Elevate/akademii/hackathonów **nie są** odbiorcą tej strony - żyją na `elevate.cetuspro.com` i w sekcji "Co u nas". Ekosystem talentów jest tu argumentem sprzedażowym, nie ścieżką rekrutacyjną.

## Product Purpose

CetusPro projektuje, buduje, wdraża i utrzymuje dedykowane oprogramowanie oraz systemy krytyczne dla biznesu - od strategii i architektury, przez development, po wieloletni rozwój i utrzymanie. Strona ma doprowadzić decydenta do rozmowy (bezpłatna konsultacja / "Umów spotkanie"): to jest jej mierzalny sukces.

## Positioning

Trzy wyróżniki potwierdzone przez klienta, w tej kolejności ważności:

1. **Własny ekosystem talentów** - Cetus Elevate, akademia, hackathony (Elevate, Academy, Vibe the Future). Firma sama kształci i rekrutuje zespół, co daje jakość kadry i skalowalność zespołu, których konkurent opierający się na rynku rekrutacyjnym nie może uczciwie obiecać.
2. **Pełny cykl życia systemu** - nie projekt zamknięty odbiorem, ale wieloletni rozwój i utrzymanie systemów krytycznych.
3. **Głęboka specjalizacja branżowa** - konkretne domeny z realnymi wdrożeniami i know-how. *Otwarte: klient nie wskazał jeszcze, które branże są tymi wiodącymi. Nie wymyślać listy - dopytać przed użyciem tego argumentu w copy.*

## Operating Context

- Ocena dostawcy jest procesem zespołowym i porównawczym: strona jest czytana obok ofert konkurencji, często na desktopie w kontekście zawodowym, a linki do realizacji krążą wewnątrz organizacji klienta.
- Deklarowany proces współpracy (5 kroków, obecny w `messages/*.json` → `home.process`): Audyt → Roadmapa → Management Projektu → Odbiory → Utrzymanie. To realny opis pracy firmy, nie ozdoba marketingowa - kolejność i sens kroków są produktową prawdą.
- Kontakt: bezpłatna 30-minutowa konsultacja, odpowiedź do 24h, godziny pracy Pn-Pt 9:00-17:00.
- Treść strony jest redagowana w Sanity Studio (`/studio`) przez zespół nietechniczny; seedy w `scripts/*.mjs` są źródłem prawdy dla treści zaseedowanych.

## Capabilities and Constraints

- Next.js 16 (App Router, React 19), Tailwind v4, Sanity v5 jako CMS (`next-sanity`), `next-intl` v4 z routingiem lokalizowanym.
- Dwujęzyczność PL/EN. `pl` jest domyślnym locale. **Każda nowa sekcja musi mieć klucze i18n w `messages/pl.json` + `messages/en.json`, a treść redagowalna - schemat w `sanity/schemaTypes/`. Zero hardkodowanego copy.**
- Istniejące powierzchnie: strona główna, `/oferta` + 9 stron usługowych (aplikacje webowe, mobilne, AI i automatyzacja procesów, cybersecurity, outsourcing programistów, transformacja technologiczna, UI/UX design, akademia i szkolenia), `/o-nas`, `/kontakt`, `/blog` ("Co u nas"), `/case-studies` (Realizacje), `/dofinansowanie`, `/polityka-jakosci`, `/roll-up`.
- Biblioteki animacji już w projekcie i w użyciu: framer-motion, gsap, lenis (smooth scroll), ogl, @use-gesture/react.
- ~50 przekierowań 301 ze starych URL-i oraz nagłówki bezpieczeństwa (HSTS, X-Frame-Options) są utrzymywane w konfiguracji - nowe trasy nie mogą ich zerwać.
- Case studies były historycznie ukrywane/odkrywane w nawigacji i sitemapie; obecny stan sprawdzać w kodzie, nie zakładać.

## Brand Commitments

- Nazwa **CetusPro**, logo (`public/logocetus.png`, `smalllogo.png`, `logo-square.png`), submarka **Cetus Elevate** (`cetus-elevate-logo.png`).
- Kanały: [Facebook](https://www.facebook.com/cetusprocom/), [Instagram](https://www.instagram.com/cetuspro/), [LinkedIn](https://pl.linkedin.com/company/cetuspro).
- Wymogi formalne, których nie wolno usunąć: **NIP 8133850782**, strona **Polityki Jakości**, informacja o **Funduszach Europejskich** (`/dofinansowanie` + stopka). To obowiązek prawny/grantowy, nie decyzja projektowa.
- Voice: bezpośredni zwrot do decydenta ("Ty/Wasza organizacja"), język korzyści i odpowiedzialności zamiast żargonu ("Z chaosu do struktury", "my bierzemy odpowiedzialność za realizację"). Copy używa dywizu, nie pauzy.
- **Typografia nie jest wiążąca.** Obecny zestaw (Michroma na nagłówki, Albert Sans, Space Grotesk, Geist Mono, Architects Daughter) to stan zastany, świadomie *nie* wskazany przez klienta jako nienaruszalny - może zostać zredukowany lub wymieniony przy pracy nad światem wizualnym.

## Evidence on Hand

- **Realizacja Winopasja** (2023) - jedyne w pełni opracowane case study: system dla winiarni (panel winiarni, panel klienta, admin, marketplace, logistyka, VMS, aplikacja mobilna). Zrzuty: `public/winopasja/*.jpg`, treść: `scripts/seed-winopasja.mjs`.
- Zdjęcia zespołu i biura, galerie wydarzeń (Vibe the Future - 17 zdjęć), logotypy klientów/sponsorów w Sanity (`sponsor.ts`, `partner.ts`), rolki wideo (`ReelsMarqueeSection`).
- Statystyki na stronie głównej: 50 zrealizowanych projektów, 30 zadowolonych klientów, 40 ekspertów, 5 lat doświadczenia (`messages/*.json` → `stats`). To jedyne liczby, którymi wolno się posługiwać.
- **Czego nie ma i czego nie wolno wymyślać:** testimoniali z nazwiskami, drugiego case study, cenników, benchmarków wydajności, certyfikatów, nazw klientów enterprise poza tymi realnie obecnymi w CMS.

## Product Principles

1. **Dowód przed obietnicą.** Każda mocna teza (odpowiedzialność, skala, specjalizacja) musi się opierać na realnym dowodzie z `Evidence on Hand`. Brak dowodu = słabsza teza, nie zmyślony dowód.
2. **Jeden odbiorca, dwa poziomy czytania.** Decydent enterprise skanuje ryzyko i wiarygodność; właściciel MŚP potrzebuje prostego procesu. Każda sekcja musi działać dla obu - bez żargonu, ale i bez infantylizacji.
3. **Wszystko prowadzi do rozmowy.** Konsultacja jest jedyną konwersją; sekcja, która nie przybliża do niej ani nie buduje wiarygodności, jest zbędna.
4. **Treść jest redagowalna z założenia.** Jeśli copy nie da się zmienić w Sanity i przetłumaczyć w `messages/`, sekcja nie jest skończona.
5. **Dostępność to warunek odbioru, nie polish.** WCAG jest twardym wymogiem klienta.

## Accessibility & Inclusion

WCAG jako twardy wymóg, potwierdzony przez klienta: kontrast, pełna nawigacja klawiaturą, widoczny focus, poprawna semantyka i `skipToContent` (klucz już istnieje w `messages/`). Dotyczy każdej nowej sekcji od pierwszej wersji, nie osobnego przebiegu na końcu. Dwujęzyczność PL/EN jest częścią tego samego wymogu - `lang` i tłumaczenia muszą być kompletne.
