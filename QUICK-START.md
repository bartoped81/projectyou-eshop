# ⚡ Quick Start Guide

## 🚀 5 minut do spuštění

### 1️⃣ Supabase (2 minuty)

```bash
# 1. Jdi na supabase.com a vytvoř nový projekt
# 2. Počkej, až se inicializuje (cca 1-2 min)

# 3. SQL Editor → New Query → zkopíruj a spusť:
supabase/setup.sql

# 4. SQL Editor → New Query → zkopíruj a spusť:
supabase/seed-data.sql

# 5. Settings → API → zkopíruj URL a anon key
```

### 2️⃣ Environment (30 sekund)

```bash
# Vytvoř .env.local
cp .env.local.example .env.local

# Otevři .env.local a vlož údaje ze Supabase
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 3️⃣ Spuštění (1 minuta)

```bash
# Závislosti jsou již nainstalovány!
npm run dev
```

Otevři [http://localhost:3000](http://localhost:3000) ✨

---

## 📋 Checklist

- [ ] Supabase projekt vytvořen
- [ ] `setup.sql` spuštěn (✓ = zelený checkmark v SQL Editoru)
- [ ] `seed-data.sql` spuštěn (✓ = 3 kurzy vloženy)
- [ ] Database → Replication → `course_dates` → Realtime enabled
- [ ] `.env.local` vytvořen a vyplněn
- [ ] `npm run dev` funguje
- [ ] http://localhost:3000 zobrazuje homepage

---

## 🔍 Ověření, že vše funguje

### Test 1: Databáze má data

V Supabase SQL Editoru spusť:

```sql
SELECT title, lecturer_name FROM courses;
```

**Očekávaný výstup:** 3 kurzy (AI Firemní Akcelerátor, Aplikovaná Improvizace, Ledové dobrodružství)

### Test 2: Realtime je zapnutý

1. Supabase → Database → Replication
2. Měl bys vidět `course_dates` se statusem **Enabled**

### Test 3: Next.js projekt běží

```bash
npm run dev
```

Měl bys vidět:
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
```

---

## 🎯 První kroky po spuštění

### Vyzkoušej helper funkce

Vytvoř soubor `app/test/page.tsx`:

```tsx
import { getCourses } from '@/lib/supabase';

export default async function TestPage() {
  const courses = await getCourses();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Test Supabase</h1>
      <pre className="bg-slate-100 p-4 rounded">
        {JSON.stringify(courses, null, 2)}
      </pre>
    </div>
  );
}
```

Otevři http://localhost:3000/test

**Měl bys vidět:** JSON s 3 kurzy 🎉

---

## 📚 Co dál?

### Doporučený postup:

1. **Prohlédni si data** (http://localhost:3000/test)
2. **Přečti si** [README.md](README.md) pro kompletní přehled
3. **Prostuduj** [lib/supabase.ts](lib/supabase.ts) - všechny helper funkce
4. **Začni stavět** stránky:
   - `/kurzy` - seznam kurzů
   - `/kurzy/[slug]` - detail kurzu
   - `/objednavka` - checkout

### Užitečné soubory:

- **README.md** - Kompletní dokumentace
- **PROJEKT-PREHLED.md** - Přehled celého projektu
- **supabase/INSTRUKCE.md** - Detailní Supabase setup
- **lib/supabase.ts** - Helper funkce a TypeScript typy

---

## 🆘 Nejčastější problémy

### ❌ "Missing Supabase environment variables"

**Řešení:**
1. Zkontroluj, že `.env.local` existuje
2. Zkontroluj, že obsahuje obě proměnné
3. Restartuj `npm run dev`

### ❌ "relation 'courses' does not exist"

**Řešení:**
- Nespustil jsi `setup.sql` v Supabase
- Jdi do SQL Editoru a spusť ho

### ❌ Data se nezobrazují

**Řešení:**
1. Zkontroluj konzoli prohlížeče (F12)
2. Zkontroluj Supabase → Logs
3. Ověř, že URL a anon key jsou správně

### ❌ Realtime nefunguje

**Řešení:**
- Database → Replication → najdi `course_dates` → zapni toggle

---

## 💡 Tipy

### Sledování Supabase logů

```
Supabase Dashboard → Logs → Database
```

Uvidíš všechny SQL dotazy v reálném čase

### VS Code Extensions

- **ES7+ React/Redux/React-Native snippets** - rychlé snippety
- **Tailwind CSS IntelliSense** - autocomplete pro Tailwind
- **Prettier** - formátování kódu

### Užitečné příkazy

```bash
# Development server
npm run dev

# Production build (test před nasazením)
npm run build

# Spuštění production buildu
npm start

# Linting
npm run lint
```

---

## 🎨 Design Tokens

### Barvy

```tsx
// Kurz 1: AI Firemní Akcelerátor
<div className="bg-gradient-to-r from-indigo-600 to-cyan-600">

// Kurz 2: Aplikovaná Improvizace
<div className="bg-gradient-to-r from-emerald-500 to-violet-500">

// Kurz 3: Ledové dobrodružství
<div className="bg-gradient-to-r from-sky-400 to-amber-400">
```

### Fonty

```tsx
// Inter (default)
<p className="font-sans">Text</p>

// Urbanist
<p className="font-urbanist">Text</p>
```

---

## ✅ Hotovo!

Máš:
- ✅ Fungující Next.js projekt
- ✅ Supabase databázi s daty
- ✅ Realtime updates
- ✅ TypeScript typy
- ✅ Helper funkce
- ✅ 3 kurzy s 24 termíny

**Teď můžeš začít stavět! 🚀**

---

*Potřebuješ pomoc? Otevři [README.md](README.md) nebo [PROJEKT-PREHLED.md](PROJEKT-PREHLED.md)*
