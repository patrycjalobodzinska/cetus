# Konfiguracja Cache dla Sanity na Vercel

## Co zostało zrobione:

1. **Włączono CDN Sanity w produkcji** - dane są cache'owane przez CDN Sanity
2. **Utworzono endpoint revalidation** - `/api/revalidate` do ręcznego odświeżania cache

## Konfiguracja Webhooka w Sanity:

1. Przejdź do https://www.sanity.io/manage
2. Wybierz swój projekt
3. Settings > API > Webhooks
4. Kliknij "Create webhook"
5. Wypełnij formularz:
   - **Name**: Vercel Revalidation
   - **URL**: `https://twoja-domena.vercel.app/api/revalidate?secret=TWÓJ_SECRET`
   - **Dataset**: production (lub development)
   - **Trigger on**:
     - ✅ Create
     - ✅ Update
     - ✅ Delete
   - **Filter** (opcjonalne, aby revalidować tylko przy zmianach w określonych typach):
     ```
     *[_type == "faq"] ||
     *[_type == "technologies"] ||
     *[_type == "industries"] ||
     *[_type == "offerStats"] ||
     *[_type == "partner"] ||
     *[_type == "homepageModules"] ||
     *[_type == "team"] ||
     *[_type == "caseStudy"] ||
     *[_type == "footer"]
     ```
6. Kliknij "Save"

## Konfiguracja zmiennej środowiskowej w Vercel:

### Krok 1: Wygeneruj secret

Możesz wygenerować secret na kilka sposobów:

**Opcja A - Użyj terminala:**
```bash
openssl rand -base64 32
```

**Opcja B - Użyj Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Opcja C - Użyj online generatora:**
- Przejdź na https://randomkeygen.com/
- Wybierz "CodeIgniter Encryption Keys"
- Skopiuj jeden z wygenerowanych kluczy

**Opcja D - Użyj prostego hasła:**
- Możesz użyć dowolnego bezpiecznego hasła (min. 32 znaki)
- Np: `moja-super-tajna-fraza-do-revalidation-2024`

### Krok 2: Dodaj secret do Vercel

1. Przejdź do projektu w Vercel
2. Settings > Environment Variables
3. Kliknij "Add New"
4. Wypełnij formularz:
   - **Name**: `REVALIDATE_SECRET`
   - **Value**: wklej wygenerowany secret z kroku 1
   - **Environment**: Production, Preview, Development (zaznacz wszystkie)
5. Kliknij "Save"

### Krok 3: Użyj tego samego secret w webhooku Sanity

W URL webhooka użyj tego samego secret:
```
https://twoja-domena.vercel.app/api/revalidate?secret=TWÓJ_WYGENEROWANY_SECRET
```

## Jak to działa:

- **CDN Sanity**: Automatycznie cache'uje dane przez 1 godzinę w produkcji
- **Webhook**: Gdy zmienisz coś w Sanity, webhook automatycznie wywoła revalidation
- **Ręczna revalidation**: Możesz też ręcznie wywołać: `POST /api/revalidate?secret=TWÓJ_SECRET`

## Testowanie:

1. Zmień coś w Sanity
2. Webhook powinien automatycznie wywołać revalidation
3. Sprawdź logi w Vercel, aby zobaczyć czy webhook został wywołany
4. Odśwież stronę - zmiany powinny być widoczne

## Uwagi:

- W development (`useCdn: false`) cache jest wyłączony dla łatwiejszego debugowania
- W produkcji (`useCdn: true`) CDN cache'uje dane przez ~1 godzinę
- Webhook zapewnia natychmiastowe odświeżenie po zmianach w Sanity
