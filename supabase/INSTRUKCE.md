# Supabase Setup - Krok za krokem

## 📌 Pořadí spuštění SQL skriptů

**DŮLEŽITÉ:** Skripty musíš spustit v tomto pořadí!

### ✅ Krok 1: setup.sql
Tento skript vytvoří kompletní databázovou strukturu:
- 4 tabulky (courses, course_dates, orders, order_items)
- Indexy pro rychlé vyhledávání
- Triggery pro automatickou aktualizaci dat
- RLS políticas pro bezpečnost
- Views pro snadnější dotazy
- Povolení Realtime pro `course_dates`

**Jak spustit:**
1. V Supabase dashboardu otevři **SQL Editor**
2. Klikni na **New query**
3. Zkopíruj celý obsah `setup.sql`
4. Klikni **Run** (nebo Ctrl/Cmd + Enter)
5. Zkontroluj, že se skript provedl bez chyb

### ✅ Krok 2: seed-data.sql
Tento skript vloží testovací data:
- 3 kurzy s kompletními informacemi
- 3 lektory s biografiemi
- 24 termínů (8 na každý kurz)

**Jak spustit:**
1. V SQL Editoru klikni na **New query**
2. Zkopíruj celý obsah `seed-data.sql`
3. Klikni **Run**
4. Na konci uvidíš přehled vložených dat

## 🔍 Ověření, že vše funguje

Po spuštění obou skriptů spusť tento dotaz:

```sql
SELECT
    c.title as "Název kurzu",
    c.lecturer_name as "Lektor",
    c.price_no_vat as "Cena bez DPH",
    COUNT(cd.id) as "Počet termínů",
    MIN(cd.start_date) as "První termín",
    MAX(cd.start_date) as "Poslední termín"
FROM public.courses c
LEFT JOIN public.course_dates cd ON c.id = cd.course_id
GROUP BY c.id, c.title, c.lecturer_name, c.price_no_vat
ORDER BY c.title;
```

**Očekávaný výstup:**

| Název kurzu | Lektor | Cena bez DPH | Počet termínů | První termín | Poslední termín |
|-------------|--------|--------------|---------------|--------------|-----------------|
| AI Firemní Akcelerátor | Petr Bartoň | 24900.00 | 8 | 2026-02-04 09:00 | 2026-05-26 09:00 |
| Aplikovaná Improvizace | Géza Prouza | 8900.00 | 8 | 2026-02-10 09:30 | 2026-06-02 09:30 |
| Ledové dobrodružství | Tomáš Ptáček | 12900.00 | 8 | 2026-02-14 09:00 | 2026-06-06 09:00 |

## 🔐 RLS (Row Level Security)

Databáze má nastavené bezpečnostní políticas:

### Veřejně přístupné (bez přihlášení):
- ✅ Čtení kurzů (`courses`)
- ✅ Čtení aktivních termínů (`course_dates` kde `is_active = true`)

### Vyžaduje akci uživatele:
- ✅ Vytvoření objednávky (`orders`)
- ✅ Přidání položek do objednávky (`order_items`)
- ✅ Čtení vlastních objednávek (podle emailu)

## 🔴 Realtime

Tabulka `course_dates` má povolenou Realtime funkci.

**Ověření:**
1. V Supabase jdi na **Database** → **Replication**
2. Měl bys vidět `course_dates` s **Enabled** statusem
3. Pokud ne, klikni na tabulku a zapni Realtime

**K čemu to je:**
- Živé sledování změn v kapacitě kurzů
- Když někdo zarezervuje místo, všichni vidí aktuální stav ihned
- Perfekt pro zobrazení "Zbývá X míst" v reálném čase

## 📊 Dostupné Views

### `courses_with_upcoming_dates`
Přehled kurzů s počtem nadcházejících termínů:

```sql
SELECT * FROM public.courses_with_upcoming_dates;
```

### `available_course_dates`
Pouze termíny, které:
- Jsou aktivní
- Mají volná místa
- Ještě nezačaly

```sql
SELECT * FROM public.available_course_dates;
```

## 🧪 Testování funkcí

### Test: Vytvoření objednávky

```sql
-- 1. Vytvoř objednávku
INSERT INTO public.orders (
    user_email,
    user_name,
    street,
    city,
    zip,
    phone,
    total_price,
    status,
    variable_symbol,
    payment_method
) VALUES (
    'test@example.com',
    'Jan Novák',
    'Václavské náměstí 1',
    'Praha',
    '110 00',
    '+420 123 456 789',
    30129.00,
    'pending',
    '12345678',
    'invoice'
) RETURNING id;

-- Použij vrácenou hodnotu ID pro další krok
-- Najdi ID nějakého course_date:
SELECT id FROM public.course_dates LIMIT 1;

-- 2. Přidej položku k objednávce (nahraď UUIDs skutečnými hodnotami)
INSERT INTO public.order_items (
    order_id,
    course_date_id,
    quantity,
    unit_price_at_purchase
) VALUES (
    'uuid-objednavky',
    'uuid-terminu',
    1,
    24900.00
);

-- 3. Zkontroluj, že se current_booked_count NEPŘIČETL (status je pending)
SELECT current_booked_count FROM public.course_dates
WHERE id = 'uuid-terminu';

-- 4. Označ objednávku jako zaplacenou
UPDATE public.orders
SET status = 'paid'
WHERE id = 'uuid-objednavky';

-- 5. Zkontroluj, že se current_booked_count PŘIČETL (automatický trigger!)
SELECT current_booked_count FROM public.course_dates
WHERE id = 'uuid-terminu';
```

## 🆘 Troubleshooting

### Chyba: "permission denied for table courses"
**Řešení:** RLS políticas nejsou správně nastavené. Znovu spusť `setup.sql`.

### Chyba: "relation 'courses' does not exist"
**Řešení:** Nespustil jsi `setup.sql`. Musíš ho spustit PŘED `seed-data.sql`.

### Realtime nefunguje
**Řešení:**
1. Jdi na Database → Replication
2. Najdi `course_dates`
3. Klikni na toggle a zapni Realtime

### Data se nevložila
**Řešení:**
1. Zkontroluj SQL Editor - měly by být zelené checkmarky
2. Pokud jsou červené křížky, přečti si chybovou hlášku
3. Pravděpodobně jsi spustil skripty v obráceném pořadí

## ✨ Hotovo!

Po dokončení tohoto setupu máš:
- ✅ Funkční databázi s 3 kurzy
- ✅ 24 termínů rozvržených na 4 měsíce
- ✅ Automatické triggery pro správu kapacit
- ✅ Bezpečnostní políticas
- ✅ Realtime sledování změn
- ✅ Helper views pro snadné dotazy

Nyní můžeš v Next.js projektu začít pracovat s daty pomocí funkcí v `lib/supabase.ts`! 🚀
