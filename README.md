# ProjectYOU E-shop

Moderní e-shop pro vzdělávací agentur ProjectYOU postavený na Next.js, Tailwind CSS a Supabase.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL + Realtime)
- **Icons:** Lucide React
- **Fonts:** Inter, Urbanist (Google Fonts)
- **Language:** TypeScript

## 📋 Prerekvizity

- Node.js 18+ a npm
- Supabase účet (zdarma na [supabase.com](https://supabase.com))

## 🛠️ Instalace a Nastavení

### 1. Instalace závislostí

```bash
npm install
```

### 2. Supabase Setup

#### 2.1 Vytvoření projektu

1. Přihlaš se na [supabase.com](https://supabase.com)
2. Vytvoř nový projekt
3. Počkej, až se databáze inicializuje (cca 2 minuty)

#### 2.2 Spuštění SQL skriptů

1. V Supabase dashboardu jdi na **SQL Editor**
2. Nejdřív spusť `supabase/setup.sql`
   - Tento skript vytvoří všechny tabulky, indexy, triggery a RLS politiky
3. Pak spusť `supabase/seed-data.sql`
   - Tento skript vloží 3 kurzy s lektory a 24 termínů

#### 2.3 Povolení Realtime

1. V Supabase jdi na **Database** → **Replication**
2. Najdi tabulku `course_dates`
3. Zapni **Realtime** pro tuto tabulku
   - To umožní živé sledování změn kapacity kurzů

### 3. Environment Variables

1. Zkopíruj `.env.local.example` na `.env.local`:

```bash
cp .env.local.example .env.local
```

2. Vyplň údaje ze svého Supabase projektu:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tvuj-projekt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tvuj-anon-key
```

**Kde najdeš tyto údaje:**
- V Supabase dashboardu → **Settings** → **API**
- `URL` = Project URL
- `anon/public` = anon key

### 4. Spuštění projektu

```bash
npm run dev
```

Projekt poběží na [http://localhost:3000](http://localhost:3000)

## 📁 Struktura projektu

```
eshop-projekt/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout (fonty, metadata)
│   ├── page.tsx             # Domovská stránka
│   └── globals.css          # Globální styly
├── lib/
│   └── supabase.ts          # Supabase klient + TypeScript typy + helper funkce
├── public/
│   └── images/
│       ├── courses/         # Obrázky kurzů
│       └── lecturers/       # Fotky lektorů
├── supabase/
│   ├── setup.sql            # Databázová struktura (SPUSTIT PRVNÍ!)
│   └── seed-data.sql        # Testovací data (SPUSTIT DRUHÝ!)
├── tailwind.config.ts       # Tailwind konfigurace
├── tsconfig.json            # TypeScript konfigurace
└── package.json
```

## 🗄️ Databázová Architektura

### Tabulky

#### 1. `courses` - Typy kurzů
- Základní informace o kurzu (název, popis, cena)
- Informace o lektorovi (jméno, bio, fotka)
- Full HTML obsah pro detailní stránku

#### 2. `course_dates` - Konkrétní termíny
- FK na `courses`
- Datum začátku a konce
- Lokalita
- Maximální kapacita
- Aktuální počet rezervací
- **Realtime enabled** ⚡

#### 3. `orders` - Objednávky
- Kontaktní údaje zákazníka
- Fakturační údaje (IČO, DIČ volitelné)
- Status: pending / paid / cancelled
- Variabilní symbol
- Způsob platby

#### 4. `order_items` - Položky objednávky
- FK na `orders` a `course_dates`
- Množství
- Cena v době nákupu (pro historii)

### Automatické funkce

- **Triggery** pro aktualizaci `updated_at`
- **Automatická aktualizace** `current_booked_count` při změně objednávky
- **RLS políticas** pro bezpečnost dat

### Views

- `courses_with_upcoming_dates` - Kurzy s počtem nadcházejících termínů
- `available_course_dates` - Pouze dostupné termíny (ne plné)

## 🎨 Design System

### Barvy

- **AI Firemní Akcelerátor:** Indigo/Cyan gradient
- **Aplikovaná Improvizace:** Emerald/Violet gradient
- **Ledové dobrodružství:** Sky/Amber gradient

### Fonty

- **Primary:** Inter (AI kurz, Ledovka)
- **Secondary:** Urbanist (Impro kurz)

## 📦 Seed Data

Projekt obsahuje 3 kurzy:

### 1. AI Firemní Akcelerátor (2 dny)
- **Lektor:** Petr Bartoň
- **Cena:** 24 900 Kč bez DPH
- **Termíny:** Každé 2 týdny od 4.-5.2.2026
- **Kapacita:** 15 osob

### 2. Aplikovaná Improvizace (1 den)
- **Lektor:** Géza Prouza
- **Cena:** 8 900 Kč bez DPH
- **Termíny:** Každé 2 týdny od 10.2.2026
- **Kapacita:** 15 osob

### 3. Ledové dobrodružství (1 den)
- **Lektor:** Tomáš Ptáček
- **Cena:** 12 900 Kč bez DPH
- **Termíny:** Každé 2 týdny od 14.2.2026
- **Kapacita:** 15 osob

Celkem **24 termínů** (8 na každý kurz, pokrývající 4 měsíce dopředu).

## 🔧 Helper Funkce

V `lib/supabase.ts` najdeš připravené funkce:

```typescript
// Získání dat
getCourses()                          // Všechny kurzy
getCourseBySlug(slug)                 // Jeden kurz podle URL
getAvailableCourseDates(courseId)     // Dostupné termíny
getAllAvailableDates()                // Všechny dostupné termíny

// Objednávky
createOrder(orderData)                // Vytvoření objednávky
createOrderItems(items)               // Přidání položek

// Realtime
subscribeToCourseDateChanges(courseId, callback)

// Utility
calculatePriceWithVat(price, vat)    // Cena s DPH
formatPrice(price)                    // Formátování na "25 000 Kč"
formatDate(dateString)                // Český formát data
generateVariableSymbol()              // Generování VS
```

## 🚦 Další kroky

1. **Vytvoř stránky:**
   - `/kurzy` - Seznam všech kurzů
   - `/kurzy/[slug]` - Detail kurzu s výběrem termínu
   - `/objednavka` - Checkout flow
   - `/potvrzeni` - Potvrzení objednávky

2. **Implementuj košík:**
   - Použij React Context nebo Zustand
   - LocalStorage pro perzistenci

3. **Platební brána:**
   - Integrace s platební bránou (GoPay, Stripe, atd.)

4. **Email notifikace:**
   - Potvrzení objednávky
   - Připomenutí termínu kurzu

5. **Admin rozhraní:**
   - Správa kurzů a termínů
   - Přehled objednávek

## 📝 Poznámky

- Všechny ceny jsou **bez DPH** (DPH 21%)
- Fotky lektorů jsou ve složce `public/images/lecturers/`
- SQL skripty jsou připravené pro **produkční použití**
- RLS políticas zajišťují **bezpečnost dat**

## 🤝 Kontakt

Projekt vytvořen pro **ProjectYOU** vzdělávací agenturu.

---

**Happy coding! 🚀**
