import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse .env.local manually
const envFile = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
const env = {};
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, "");
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2021-06-07",
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const caseStudy = {
  _type: "caseStudy",
  _id: "caseStudy-winopasja",
  title: {
    _type: "localeString",
    pl: "Winopasja",
    en: "Winopasja",
  },
  slug: {
    _type: "slug",
    current: "winopasja",
  },
  sections: [
    // 1. Hero Section
    {
      _key: "hero1",
      _type: "csHeroSection",
      variant: "default",
      title: {
        _type: "localeString",
        pl: "Winopasja",
        en: "Winopasja",
      },
      category: {
        _type: "localeString",
        pl: "Marketplace e-commerce",
        en: "E-commerce Marketplace",
      },
      description: {
        _type: "localeText",
        pl: "Marketplace, który otworzył cyfrową sprzedaż dla branży winiarskiej. Pierwszy w Polsce tak zaawansowany ekosystem cyfrowy, który pozwala lokalnym winiarniom sprzedawać produkty online w pełnej zgodności z przepisami.",
        en: "A marketplace that opened digital sales for the wine industry. The first such advanced digital ecosystem in Poland, enabling local wineries to sell products online in full compliance with regulations.",
      },
      iframeUrl: "https://winopasja.pl/",
    },

    // 2. Stats Section
    {
      _key: "stats1",
      _type: "csStatsSection",
      variant: "cards",
      items: [
        {
          _key: "stat1",
          value: "1000+",
          label: {
            _type: "localeString",
            pl: "Zarejestrowanych zamówień",
            en: "Registered orders",
          },
          icon: "ShoppingCart",
        },
        {
          _key: "stat2",
          value: "400+",
          label: {
            _type: "localeString",
            pl: "Zrealizowanych transakcji",
            en: "Completed transactions",
          },
          icon: "CreditCard",
        },
        {
          _key: "stat3",
          value: "40+",
          label: {
            _type: "localeString",
            pl: "Winiarni na platformie",
            en: "Wineries on the platform",
          },
          icon: "Wine",
        },
        {
          _key: "stat4",
          value: "0 zł",
          label: {
            _type: "localeString",
            pl: "Inwestycji winiarni w technologię",
            en: "Winery investment in technology",
          },
          icon: "Wallet",
        },
      ],
    },

    // 3. Challenge Section
    {
      _key: "challenge1",
      _type: "csChallengeSection",
      variant: "narrative",
      intro: {
        _type: "localeText",
        pl: "Klient działał w sektorze sprzedaży polskich win i enoturystyki, którego misją było wsparcie polskich, rzemieślniczych winiarni w cyfryzacji sprzedaży. Rynek winiarski w Polsce rozwija się dynamicznie, jednak większość małych producentów nie posiada infrastruktury technologicznej ani zasobów do prowadzenia sprzedaży online zgodnej z regulacjami prawnymi dotyczącymi alkoholu.",
        en: "The client operated in the Polish wine sales and enotourism sector, with a mission to support Polish craft wineries in digitizing their sales. The wine market in Poland is growing dynamically, but most small producers lack the technological infrastructure and resources to conduct online sales compliant with alcohol regulations.",
      },
      bullets: {
        _type: "localeStringArray",
        pl: [
          "Producenci wina nie posiadali sklepów internetowych",
          "Regulacje prawne dotyczące sprzedaży alkoholu utrudniały wdrożenia",
          "Koszty technologiczne były zbyt wysokie dla pojedynczych winiarni",
          "Brakowało centralnej platformy sprzedażowej dla tego rynku",
        ],
        en: [
          "Wine producers did not have online stores",
          "Alcohol sales regulations made implementations difficult",
          "Technology costs were too high for individual wineries",
          "There was no central sales platform for this market",
        ],
      },
      consequence: {
        _type: "localeText",
        pl: "Bez dedykowanego rozwiązania technologicznego projekt nie miałby możliwości skalowania, a model biznesowy klienta nie mógłby funkcjonować. Technologia w tym projekcie nie była dodatkiem do biznesu - była jego warunkiem istnienia.",
        en: "Without a dedicated technological solution, the project would have no way to scale, and the client's business model could not function. Technology in this project was not an addition to the business - it was a condition for its existence.",
      },
    },

    // 4. Scope Section
    {
      _key: "scope1",
      _type: "csScopeSection",
      variant: "grid",
      sectionTitle: {
        _type: "localeString",
        pl: "Zakres projektu",
        en: "Project Scope",
      },
      items: [
        {
          _key: "scope-item1",
          text: {
            _type: "localeString",
            pl: "Marketplace sprzedaży produktów",
            en: "Product sales marketplace",
          },
        },
        {
          _key: "scope-item2",
          text: {
            _type: "localeString",
            pl: "Panel klienta końcowego",
            en: "End customer panel",
          },
        },
        {
          _key: "scope-item3",
          text: {
            _type: "localeString",
            pl: "Panel producenta (winiarni)",
            en: "Producer (winery) panel",
          },
        },
        {
          _key: "scope-item4",
          text: {
            _type: "localeString",
            pl: "Panel administracyjny",
            en: "Admin panel",
          },
        },
        {
          _key: "scope-item5",
          text: {
            _type: "localeString",
            pl: "Moduły marketingowe i enoturystyczne",
            en: "Marketing and enotourism modules",
          },
        },
        {
          _key: "scope-item6",
          text: {
            _type: "localeString",
            pl: "Integracje płatności, kurierów i fakturowania",
            en: "Payment, courier and invoicing integrations",
          },
        },
        {
          _key: "scope-item7",
          text: {
            _type: "localeString",
            pl: "Infrastruktura cloud",
            en: "Cloud infrastructure",
          },
        },
        {
          _key: "scope-item8",
          text: {
            _type: "localeString",
            pl: "Proof of Concept systemu VMS",
            en: "VMS system Proof of Concept",
          },
        },
      ],
      note: {
        _type: "localeText",
        pl: "Dodatkowo przygotowaliśmy Proof of Concept systemu VMS do zarządzania winiarnią, który stanowi bazę pod przyszłe produkty klienta.",
        en: "Additionally, we prepared a Proof of Concept for a VMS system for winery management, which serves as a foundation for future client products.",
      },
    },

    // 5. Modules Section
    {
      _key: "modules1",
      _type: "csModulesSection",
      variant: "alternating",
      sectionTitle: {
        _type: "localeString",
        pl: "Wdrożone funkcjonalności",
        en: "Implemented Features",
      },
      items: [
        {
          _key: "mod1",
          icon: "ShoppingBag",
          title: {
            _type: "localeString",
            pl: "Marketplace sprzedaży wina",
            en: "Wine Sales Marketplace",
          },
          description: {
            _type: "localeStringArray",
            pl: [
              "Centralny sklep z ofertą wielu winiarni",
              "Producenci mogą rozpocząć sprzedaż natychmiast - bez inwestycji w technologię",
              "Szybkie skalowanie liczby partnerów i produktów",
            ],
            en: [
              "Central store with offerings from multiple wineries",
              "Producers can start selling immediately - no technology investment needed",
              "Rapid scaling of partners and products",
            ],
          },
        },
        {
          _key: "mod2",
          icon: "Settings",
          title: {
            _type: "localeString",
            pl: "Panel winiarni (sprzedawcy)",
            en: "Winery Panel (Seller)",
          },
          description: {
            _type: "localeStringArray",
            pl: [
              "Zarządzanie produktami, cenami, stanami magazynowymi",
              "Pełna samodzielność użytkowników w obsłudze sprzedaży",
              "Niskie koszty operacyjne",
            ],
            en: [
              "Product, pricing and inventory management",
              "Full user independence in sales operations",
              "Low operational costs",
            ],
          },
        },
        {
          _key: "mod3",
          icon: "User",
          title: {
            _type: "localeString",
            pl: "Panel klienta końcowego",
            en: "End Customer Panel",
          },
          description: {
            _type: "localeStringArray",
            pl: [
              "Historia zamówień, faktury, status dostawy",
              "Lepsze doświadczenie użytkownika",
              "Mniejsza liczba zapytań do supportu",
            ],
            en: [
              "Order history, invoices, delivery status",
              "Better user experience",
              "Fewer support inquiries",
            ],
          },
        },
        {
          _key: "mod4",
          icon: "Truck",
          title: {
            _type: "localeString",
            pl: "System logistyczny i pakowania",
            en: "Logistics and Packaging System",
          },
          description: {
            _type: "localeStringArray",
            pl: [
              "Uproszczony workflow generowania przesyłek",
              "Integracja z firmami kurierskimi (DPD, OrlenPaczka)",
              "Skrócenie czasu obsługi i redukcja błędów",
            ],
            en: [
              "Simplified shipment generation workflow",
              "Integration with courier companies (DPD, OrlenPaczka)",
              "Reduced handling time and fewer errors",
            ],
          },
        },
        {
          _key: "mod5",
          icon: "Calendar",
          title: {
            _type: "localeString",
            pl: "Moduł enoturystyki i wydarzeń",
            en: "Enotourism and Events Module",
          },
          description: {
            _type: "localeStringArray",
            pl: [
              "Wydarzenia, degustacje, kalendarz atrakcji",
              "Zwiększenie wartości platformy poza sprzedażą produktów",
              "Większe zaangażowanie klientów",
            ],
            en: [
              "Events, tastings, attractions calendar",
              "Increased platform value beyond product sales",
              "Higher customer engagement",
            ],
          },
        },
        {
          _key: "mod6",
          icon: "Tag",
          title: {
            _type: "localeString",
            pl: "Vouchery i rabaty",
            en: "Vouchers and Discounts",
          },
          description: {
            _type: "localeStringArray",
            pl: [
              "System kodów rabatowych i voucherów",
              "Alternatywne narzędzia marketingowe zgodne z regulacjami",
            ],
            en: [
              "Discount codes and voucher system",
              "Alternative marketing tools compliant with regulations",
            ],
          },
        },
        {
          _key: "mod7",
          icon: "Shield",
          title: {
            _type: "localeString",
            pl: "Panel administracyjny",
            en: "Admin Panel",
          },
          description: {
            _type: "localeStringArray",
            pl: [
              "Zarządzanie słownikami, kategoriami, parametrami win",
              "Pełna kontrola nad platformą, producentami i ofertą",
              "Zarządzanie rosnącym ekosystemem z jednego miejsca",
            ],
            en: [
              "Dictionary, category and wine parameter management",
              "Full control over the platform, producers and offerings",
              "Managing a growing ecosystem from one place",
            ],
          },
        },
        {
          _key: "mod8",
          icon: "Database",
          title: {
            _type: "localeString",
            pl: "Panel VMS (produkcja wina)",
            en: "VMS Panel (Wine Production)",
          },
          description: {
            _type: "localeStringArray",
            pl: [
              "System zarządzania produkcją wina",
              "Proof of Concept stanowiący bazę pod przyszłe produkty",
            ],
            en: [
              "Wine production management system",
              "Proof of Concept serving as a base for future products",
            ],
          },
        },
      ],
    },

    // 6. Technologies Section
    {
      _key: "tech1",
      _type: "csTechnologiesSection",
      variant: "badges",
      sectionTitle: {
        _type: "localeString",
        pl: "Technologie użyte w projekcie",
        en: "Technologies Used",
      },
      items: [
        { _key: "t1", name: "Next.js" },
        { _key: "t2", name: "NestJS" },
        { _key: "t3", name: "React Native" },
        { _key: "t4", name: "PostgreSQL" },
        { _key: "t5", name: "Prisma ORM" },
        { _key: "t6", name: "Mantine UI" },
        { _key: "t7", name: "Turborepo" },
        { _key: "t8", name: "Chart.js" },
        { _key: "t9", name: "Leaflet" },
        { _key: "t10", name: "i18next" },
        { _key: "t11", name: "AWS S3" },
        { _key: "t12", name: "Cloudflare" },
        { _key: "t13", name: "PayNow" },
        { _key: "t14", name: "Furgonetka" },
        { _key: "t15", name: "Fakturownia" },
        { _key: "t16", name: "Slack" },
        { _key: "t17", name: "ClickUp" },
        { _key: "t18", name: "Miro" },
      ],
    },

    // 7. Results Section
    {
      _key: "results1",
      _type: "csResultsSection",
      variant: "numbered",
      sectionTitle: {
        _type: "localeString",
        pl: "Efekty i rezultaty",
        en: "Effects and Results",
      },
      items: [
        {
          _key: "r1",
          title: {
            _type: "localeString",
            pl: "Pierwsza w Polsce platforma sprzedaży dla winiarni",
            en: "First wine sales platform in Poland",
          },
          description: {
            _type: "localeText",
            pl: "Uruchomienie pierwszej w Polsce platformy sprzedaży online dedykowanej polskim winiarniom rzemieślniczym.",
            en: "Launch of the first online sales platform in Poland dedicated to Polish craft wineries.",
          },
        },
        {
          _key: "r2",
          title: {
            _type: "localeString",
            pl: "Nowy model biznesowy oparty o prowizję",
            en: "New commission-based business model",
          },
          description: {
            _type: "localeText",
            pl: "Stworzenie skalowalnego źródła przychodów opartego o prowizję od sprzedaży, bez konieczności inwestycji winiarni w technologię.",
            en: "Creating a scalable revenue source based on sales commission, with no technology investment required from wineries.",
          },
        },
        {
          _key: "r3",
          title: {
            _type: "localeString",
            pl: "Cyfryzacja procesów sprzedaży",
            en: "Sales process digitization",
          },
          description: {
            _type: "localeText",
            pl: "Pełna cyfryzacja procesów sprzedaży i obsługi zamówień - od złożenia zamówienia, przez pakowanie, aż po dostawę.",
            en: "Full digitization of sales and order processing - from order placement, through packaging, to delivery.",
          },
        },
        {
          _key: "r4",
          title: {
            _type: "localeString",
            pl: "Fundament pod dalszy rozwój",
            en: "Foundation for further development",
          },
          description: {
            _type: "localeText",
            pl: "Fundament technologiczny pod dalsze projekty (m.in. system VMS) oraz wzmocnienie pozycji klienta jako agregatora rynku winiarskiego.",
            en: "Technological foundation for future projects (including VMS system) and strengthening the client's position as a wine market aggregator.",
          },
        },
      ],
    },

    // 8. Quote Section
    {
      _key: "quote1",
      _type: "csQuoteSection",
      variant: "centered",
      quote: {
        _type: "localeText",
        pl: "Winopasja to dowód na to, że technologia może być demokratyczna - daje małym producentom narzędzia, które dotąd były zarezerwowane tylko dla rynkowych gigantów.",
        en: "Winopasja is proof that technology can be democratic - it gives small producers tools that were previously reserved only for market giants.",
      },
      author: "CetusPro Team",
    },

    // 9. CTA Section
    {
      _key: "cta1",
      _type: "csCtaSection",
      variant: "centered",
      heading: {
        _type: "localeString",
        pl: "Chcesz stworzyć podobne rozwiązanie?",
        en: "Want to create a similar solution?",
      },
      description: {
        _type: "localeText",
        pl: "Skontaktuj się z nami i opowiedz o swoich potrzebach - stworzymy rozwiązanie dopasowane do Twojego biznesu.",
        en: "Contact us and tell us about your needs - we'll create a solution tailored to your business.",
      },
      buttonLabel: {
        _type: "localeString",
        pl: "Skontaktuj się z nami",
        en: "Contact us",
      },
      buttonHref: "/kontakt",
    },
  ],
};

async function seed() {
  console.log("Seeding Winopasja case study...");
  console.log(`Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}`);

  try {
    const result = await client.createOrReplace(caseStudy);
    console.log(`✅ Case study created: ${result._id}`);
    console.log(`   Slug: winopasja`);
    console.log(`   Sections: ${caseStudy.sections.length}`);
    console.log(`   URL: /case-studies/winopasja`);
  } catch (error) {
    console.error("❌ Error seeding:", error.message);
    if (error.statusCode === 403) {
      console.error(
        "   Token lacks write permissions. Generate an Editor token at sanity.io/manage.",
      );
    }
  }
}

seed();
