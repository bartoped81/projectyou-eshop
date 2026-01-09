# 📋 ProjectYOU E-shop - Kompletní přehled

## ✅ Co je hotové

### 1. Next.js Projekt (HOTOVO ✓)
- ✅ Next.js 15 s App Router
- ✅ TypeScript konfigurace
- ✅ Tailwind CSS s custom theme
- ✅ Fonty: Inter + Urbanist (Google Fonts)
- ✅ Barevná paleta ProjectYOU (Indigo/Cyan/Emerald/Violet/Sky/Amber)
- ✅ ESLint konfigurace
- ✅ Základní homepage s demo obsahem

### 2. Supabase Databáze (HOTOVO ✓)

#### Kompletní SQL skripty připravené k použití:

**📄 `supabase/setup.sql`** (SPUSTIT PRVNÍ)
- 4 tabulky s relacemi
- Indexy pro optimální výkon
- Triggery pro automatickou aktualizaci
- RLS políticas pro bezpečnost
- 2 Views pro snadné dotazy
- Realtime povoleno pro `course_dates`

**📄 `supabase/seed-data.sql`** (SPUSTIT DRUHÝ)
- 3 kurzy s kompletními informacemi
- 3 lektoři s biografiemi a fotkami
- 24 termínů (8 na každý kurz, každé 2 týdny, 4 měsíce dopředu)

### 3. Supabase Integrace (HOTOVO ✓)

**📄 `lib/supabase.ts`**
- TypeScript typy pro všechny tabulky
- 10+ helper funkcí připravených k použití
- Realtime subscription funkce
- Utility pro formátování cen a dat
- Generátor variabilních symbolů

### 4. Dokumentace (HOTOVO ✓)
- ✅ `README.md` - Kompletní návod k projektu
- ✅ `supabase/INSTRUKCE.md` - Detailní Supabase setup
- ✅ `.env.local.example` - Template pro environment variables

### 5. Assets (HOTOVO ✓)
- ✅ Fotky lektorů (3 ks) → `public/images/lecturers/`
- ✅ Obrázky kurzů (3 ks) → `public/images/courses/`
- ✅ Reference materiály → `_reference/`

---

## 📊 Databázová struktura

### Tabulky

```
courses (Typy kurzů)
├── id (UUID)
├── title, slug, short_description
├── full_html_content
├── price_no_vat, vat_rate
├── image_url
├── lecturer_name, lecturer_bio, lecturer_image_url
└── created_at, updated_at

course_dates (Konkrétní termíny) [REALTIME ⚡]
├── id (UUID)
├── course_id → courses.id
├── start_date, end_date
├── location, max_capacity
├── current_booked_count (auto-update!)
├── is_active
└── created_at, updated_at

orders (Objednávky)
├── id (UUID)
├── user_email, user_name
├── company_name, ico, dic (optional)
├── street, city, zip, phone
├── total_price
├── status (pending/paid/cancelled)
├── variable_symbol, payment_method
└── created_at, updated_at

order_items (Položky objednávky)
├── id (UUID)
├── order_id → orders.id
├── course_date_id → course_dates.id
├── quantity, unit_price_at_purchase
└── created_at
```

### Automatické funkce
- ✅ Automatická aktualizace `updated_at` při změně
- ✅ Automatická aktualizace `current_booked_count` při změně objednávky
- ✅ Aktualizace počtu rezervací při změně statusu objednávky na "paid"

---

## 🎓 Seed Data - 3 Kurzy

### 1️⃣ AI Firemní Akcelerátor
- **Lektor:** Petr Bartoň
- **Délka:** 2 dny (čtvrtek 9:00 - pátek 17:00)
- **Cena:** 24 900 Kč bez DPH (30 129 Kč s DPH)
- **První termín:** 4.-5. 2. 2026
- **Termíny:** Každé 2 týdny (8× celkem)
- **Kapacita:** 15 osob
- **Fotka lektora:** `/images/lecturers/petr.jpg`
- **Fotka kurzu:** `/images/courses/aikurz.jpg`

### 2️⃣ Aplikovaná Improvizace
- **Lektor:** Géza Prouza
- **Délka:** 1 den (9:30 - 17:00)
- **Cena:** 8 900 Kč bez DPH (10 769 Kč s DPH)
- **První termín:** 10. 2. 2026
- **Termíny:** Každé 2 týdny (8× celkem)
- **Kapacita:** 15 osob
- **Fotka lektora:** `/images/lecturers/geza.jpg`
- **Fotka kurzu:** `/images/courses/impro.jpg`

### 3️⃣ Ledové dobrodružství
- **Lektor:** Tomáš Ptáček
- **Délka:** 1 den (9:00 - 17:00)
- **Cena:** 12 900 Kč bez DPH (15 609 Kč s DPH)
- **První termín:** 14. 2. 2026
- **Termíny:** Každé 2 týdny (8× celkem)
- **Kapacita:** 15 osob
- **Fotka lektora:** `/images/lecturers/tomas.jpg`
- **Fotka kurzu:** `/images/courses/ledovka.jpg`

---

## 🚀 Jak začít

### Krok 1: Supabase Setup
1. Vytvoř projekt na [supabase.com](https://supabase.com)
2. V SQL Editoru spusť `supabase/setup.sql`
3. Pak spusť `supabase/seed-data.sql`
4. Zkopíruj URL a Anon Key do `.env.local`

### Krok 2: Spuštění projektu
```bash
npm run dev
```

### Krok 3: Co dál?
Teď můžeš začít budovat:
- Stránku s přehledem kurzů
- Detail kurzu s výběrem termínu
- Košík a checkout
- Platební integraci
- Admin rozhraní

---

## 📂 Soubory k spuštění v Supabase

### 1. setup.sql (PRVNÍ!)
Najdeš ho v: `supabase/setup.sql`

**Co dělá:**
- Vytvoří všechny tabulky
- Nastaví indexy a vztahy
- Přidá triggery
- Nastaví RLS políticas
- Povolí Realtime

**Jak spustit:**
1. Supabase Dashboard → SQL Editor
2. New Query
3. Zkopíruj celý `setup.sql`
4. Run

### 2. seed-data.sql (DRUHÝ!)
Najdeš ho v: `supabase/seed-data.sql`

**Co dělá:**
- Vloží 3 kurzy
- Vloží 24 termínů
- Vloží informace o lektorech

**Jak spustit:**
1. SQL Editor → New Query
2. Zkopíruj celý `seed-data.sql`
3. Run

---

## 🔑 Environment Variables

Vytvoř `.env.local` (podle `.env.local.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://tvuj-projekt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tvuj-dlouhy-klic
```

Kde najdeš:
- Supabase Dashboard → Settings → API
- Project URL = NEXT_PUBLIC_SUPABASE_URL
- anon/public key = NEXT_PUBLIC_SUPABASE_ANON_KEY

---

## 💡 Helper Funkce (připravené k použití)

```typescript
// Import
import { getCourses, getCourseBySlug, ... } from '@/lib/supabase';

// Získání všech kurzů
const courses = await getCourses();

// Získání kurzu podle URL
const course = await getCourseBySlug('ai-firemni-akcelerator');

// Dostupné termíny kurzu
const dates = await getAvailableCourseDates(courseId);

// Vytvoření objednávky
const order = await createOrder({
  user_email: 'email@example.com',
  user_name: 'Jan Novák',
  // ... další údaje
});

// Realtime sledování kapacity
subscribeToCourseDateChanges(courseId, (payload) => {
  console.log('Změna kapacity!', payload);
});

// Formátování
formatPrice(24900) // "24 900 Kč"
formatDate('2026-02-04') // "4. února 2026, 09:00"
calculatePriceWithVat(24900, 21) // 30129
```

---

## 🎨 Design Guide

### Barvy kurzů
```css
/* AI Firemní Akcelerátor */
gradient: from-indigo-600 to-cyan-600

/* Aplikovaná Improvizace */
gradient: from-emerald-500 to-violet-500

/* Ledové dobrodružství */
gradient: from-sky-400 to-amber-400
```

### Fonty
```tsx
// Primary (většina textu)
className="font-sans" // Inter

// Secondary (Impro kurz)
className="font-urbanist" // Urbanist
```

---

## ✨ Featury databáze

### Realtime Updates ⚡
```typescript
// Automaticky sleduj změny v kapacitě kurzu
const channel = subscribeToCourseDateChanges(courseId, (payload) => {
  // Refresh UI když se změní current_booked_count
  console.log('Nová kapacita:', payload.new.current_booked_count);
});

// Cleanup
channel.unsubscribe();
```

### Automatická aktualizace kapacity
Když se objednávka změní na `status = 'paid'`:
1. Automaticky se přičte `quantity` k `current_booked_count`
2. Trigger to udělá sám
3. Realtime notifikuje všechny aktivní klienty

### Row Level Security
- ✅ Kdokoli může číst kurzy a termíny
- ✅ Kdokoli může vytvořit objednávku
- ✅ Uživatel vidí pouze své objednávky
- ❌ Nelze měnit cizí objednávky

---

## 📦 Instalované balíčky

```json
{
  "next": "^15.1.4",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "@supabase/supabase-js": "^2.47.10",
  "lucide-react": "^0.468.0",
  "typescript": "^5",
  "tailwindcss": "^3.4.1"
}
```

---

## 🎯 Co můžeš stavět dál

### Frontend stránky
- [ ] `/` - Homepage s featured kurzy
- [ ] `/kurzy` - Přehled všech kurzů
- [ ] `/kurzy/[slug]` - Detail kurzu
- [ ] `/objednavka` - Checkout
- [ ] `/kosik` - Košík
- [ ] `/potvrzeni/[id]` - Potvrzení objednávky

### Komponenty
- [ ] CourseCard - Karta kurzu
- [ ] CourseDatePicker - Výběr termínu
- [ ] Cart - Košík
- [ ] CheckoutForm - Formulář objednávky
- [ ] RealtimeCapacity - Živé sledování kapacity

### Integrace
- [ ] Platební brána (GoPay, Stripe)
- [ ] Email notifikace (Resend, SendGrid)
- [ ] Admin dashboard (Next.js + Supabase Auth)

---

## 📝 Poznámky

- Všechny SQL skripty jsou **production-ready**
- Databáze má **plnou bezpečnost** (RLS políticas)
- **Realtime** funguje out-of-the-box
- Fotky jsou **optimalizované** pro web
- TypeScript typy jsou **kompletní**

---

## 🆘 Potřebuješ pomoc?

1. Přečti si `README.md`
2. Přečti si `supabase/INSTRUKCE.md`
3. Zkontroluj konzoli prohlížeče
4. Zkontroluj Supabase logs (Dashboard → Logs)

---

**Projekt je připravený k použití! Můžeš začít stavět e-shop. 🚀**

*Vytvořeno pro ProjectYOU vzdělávací agenturu*
