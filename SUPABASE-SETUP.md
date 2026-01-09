# 🚀 Supabase Konfigurace - Krok za krokem

Tento návod vás provede **kompletní konfigurací Supabase** pro ProjectYOU e-shop.

---

## 📋 Před zahájením

Budete potřebovat:
- ✅ Účet na [supabase.com](https://supabase.com)
- ✅ Přístup k internetu
- ✅ 10-15 minut času

---

## 🎯 Krok 1: Vytvoření Supabase projektu

1. **Přihlaste se na https://supabase.com**
2. Klikněte na **"New project"**
3. Vyplňte údaje projektu:
   - **Name**: `projectyou-eshop` (nebo jakékoli jméno)
   - **Database Password**: Vygenerujte silné heslo (uložte si ho!)
   - **Region**: `Europe (Frankfurt)` (nejblíže ČR)
   - **Pricing Plan**: `Free` (dostačující pro testování)

4. Klikněte na **"Create new project"**
5. ⏳ Počkejte 2-3 minuty, než se projekt vytvoří

---

## 🔑 Krok 2: Zkopírování API klíčů

1. V levém menu klikněte na **⚙️ Settings**
2. Vyberte **API**
3. Najděte následující údaje:

### Project URL
```
https://abcdefghijklmno.supabase.co
```

### anon (public) key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### service_role key (⚠️ NIKDY nesdílejte!)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📝 Krok 3: Nastavení .env.local

1. Otevřete soubor `.env.local` v kořenové složce projektu
2. Nahraďte placeholder hodnoty vašimi skutečnými klíči:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://vase-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=vas_anon_key_zde
SUPABASE_SERVICE_ROLE_KEY=vas_service_role_key_zde
```

**Příklad:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xyzabc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiYzEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjk1MDAwMDAwLCJleHAiOjIwMTA1NzYwMDB9.abcd1234...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiYzEyMyIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2OTUwMDAwMDAsImV4cCI6MjAxMDU3NjAwMH0.wxyz5678...
```

3. **Uložte soubor** (Ctrl+S / Cmd+S)

---

## 🗄️ Krok 4: Vytvoření databázových tabulek

1. V Supabase dashboardu klikněte na **🗄️ SQL Editor** (v levém menu)
2. Klikněte na **"New query"**
3. Otevřete soubor `supabase/setup.sql` ve vašem projektu
4. **Zkopírujte celý obsah** souboru
5. **Vložte** do SQL Editoru v Supabase
6. Klikněte na **"RUN"** (nebo stiskněte Ctrl+Enter)

✅ Měli byste vidět: **"Success. No rows returned"**

To vytvoří:
- ✅ 4 tabulky: `courses`, `course_dates`, `orders`, `order_items`
- ✅ Automatické triggery pro `updated_at` a `current_booked_count`
- ✅ Row Level Security (RLS) policies
- ✅ 2 užitečné views: `available_course_dates`, `order_summary`

---

## 📦 Krok 5: Naplnění testovacími daty

1. Stále v **SQL Editoru** klikněte na **"New query"**
2. Otevřete soubor `supabase/seed-data.sql`
3. **Zkopírujte celý obsah**
4. **Vložte** do SQL Editoru
5. Klikněte na **"RUN"**

✅ Měli byste vidět: **"Success. No rows returned"**

To vytvoří:
- ✅ 3 kurzy (AI Firemní Akcelerátor, Aplikovaná Improvizace, Ledové dobrodružství)
- ✅ 24 termínů (8 termínů pro každý kurz, každé 2 týdny)
- ✅ Testovací data připravená k použití

---

## 🔴 Krok 6: Povolení Realtime

Pro live sledování kapacity kurzů musíte povolit Realtime:

1. V levém menu klikněte na **🗄️ Database**
2. Vyberte **Replication**
3. Najděte tabulku **`course_dates`**
4. **Zapněte přepínač** u této tabulky

Nebo pomocí SQL:

1. Otevřete **SQL Editor**
2. Spusťte tento příkaz:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE course_dates;
```

✅ Realtime je aktivní!

---

## 🔐 Krok 7: Konfigurace Authentication

Supabase Auth je již nastaven! Ale pro produkci doporučujeme:

### Email Templates (volitelné)

1. Klikněte na **🔐 Authentication** → **Email Templates**
2. Upravte šablony pro:
   - **Confirm signup** - Potvrzení registrace
   - **Magic Link** - Přihlášení bez hesla
   - **Change Email Address** - Změna emailu
   - **Reset Password** - Obnovení hesla

### Email Provider (pro produkci)

1. Klikněte na **🔐 Authentication** → **Settings**
2. V sekci **SMTP Settings** nakonfigurujte vlastní SMTP server
3. Výchozí Supabase SMTP má limit 3 emaily/hodinu (jen pro testování!)

---

## 🧪 Krok 8: Testování

### Test 1: Spuštění aplikace

```bash
npm run dev
```

Otevřete: **http://localhost:3000**

### Test 2: Registrace uživatele

1. Klikněte na **"Registrace"** v pravém horním rohu
2. Vyplňte údaje a registrujte se
3. Zkontrolujte email pro potvrzení

### Test 3: Admin přístup

Pro testování admin dashboardu:

1. Otevřete **SQL Editor** v Supabase
2. Spusťte:

```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'vas-email@example.com';
```

3. Odhlaste se a znovu se přihlaste
4. Přejděte na **/admin**

### Test 4: Realtime notifikace

1. Otevřete **2 záložky** s aplikací
2. V jedné záložce otevřete **/admin/objednavky**
3. Vytvořte novou objednávku v druhé záložce
4. ✅ Měli byste vidět notifikaci v první záložce!

---

## 📊 Krok 9: Užitečné SQL dotazy

Pro správu databáze máme připravené užitečné dotazy v `supabase/uzitecne-dotazy.sql`:

### Zobrazit všechny kurzy s volnými místy
```sql
SELECT
  c.title,
  cd.start_date,
  cd.location,
  cd.max_capacity - cd.current_booked_count AS available_spots
FROM courses c
JOIN course_dates cd ON c.id = cd.course_id
WHERE cd.is_active = true
  AND cd.start_date > NOW()
  AND cd.current_booked_count < cd.max_capacity
ORDER BY cd.start_date;
```

### Zobrazit tržby za poslední měsíc
```sql
SELECT
  SUM(total_price) as total_revenue,
  COUNT(*) as order_count
FROM orders
WHERE status = 'paid'
  AND created_at > NOW() - INTERVAL '30 days';
```

**Všech 20 dotazů** najdete v souboru `supabase/uzitecne-dotazy.sql`!

---

## 🔒 Bezpečnostní doporučení

### ⚠️ DŮLEŽITÉ - Produkce

Před nasazením do produkce:

1. **Změňte Database Password** na silné heslo
2. **NIKDY nesdílejte** `SUPABASE_SERVICE_ROLE_KEY`
3. **Nastavte RLS policies** podle vašich potřeb
4. **Používejte vlastní SMTP** místo Supabase výchozího
5. **Povolte 2FA** na vašem Supabase účtu
6. **Zálohujte databázi** pravidelně

### 🔐 Row Level Security (RLS)

Všechny tabulky mají již nastavené RLS policies:

- ✅ **Čtení**: Veřejné pro všechny
- ✅ **Zápis**: Pouze pro přihlášené uživatele
- ✅ **Mazání/Editace**: Pouze pro adminy

Pro úpravu policies:
1. Klikněte na **🗄️ Database** → **Tables**
2. Vyberte tabulku → **RLS Policies**
3. Upravte nebo přidejte nové policies

---

## 🐛 Řešení problémů

### Problém: "Missing Supabase environment variables"

**Řešení**:
1. Zkontrolujte, že `.env.local` existuje
2. Restartujte dev server: `npm run dev`

### Problém: "relation 'courses' does not exist"

**Řešení**:
1. Zkontrolujte, že jste spustili `setup.sql` v SQL Editoru
2. Obnovte stránku v Supabase dashboardu
3. Zkontrolujte v **Database** → **Tables**, zda tabulky existují

### Problém: Email potvrzení nepřichází

**Řešení**:
1. Zkontrolujte SPAM složku
2. Supabase Free tier má limit 3 emaily/hodinu
3. Zkontrolujte v **Authentication** → **Users**, zda je email_confirmed = true

### Problém: Realtime notifikace nefungují

**Řešení**:
1. Zkontrolujte, že jste povolili Realtime pro `course_dates`
2. Obnovte stránku (Ctrl+Shift+R / Cmd+Shift+R)
3. Zkontrolujte konzoli prohlížeče pro WebSocket chyby

---

## 📚 Další kroky

Po úspěšné konfiguraci můžete:

1. ✅ **Upravit kurzy** v admin dashboardu
2. ✅ **Přidat vlastní termíny** kurzů
3. ✅ **Testovat objednávkový proces**
4. ✅ **Customizovat email šablony**
5. ✅ **Nastavit vlastní SMTP**

---

## 🆘 Potřebujete pomoc?

- 📖 [Supabase dokumentace](https://supabase.com/docs)
- 💬 [Supabase Discord](https://discord.supabase.com)
- 📧 [ProjectYOU support](mailto:info@projectyou.cz)

---

## ✅ Checklist - Je vše hotovo?

- [ ] Supabase projekt vytvořen
- [ ] API klíče zkopírovány do `.env.local`
- [ ] `setup.sql` spuštěn úspěšně
- [ ] `seed-data.sql` spuštěn úspěšně
- [ ] Realtime povolen pro `course_dates`
- [ ] Aplikace běží na `http://localhost:3000`
- [ ] Registrace funguje
- [ ] Přihlášení funguje
- [ ] Admin dashboard dostupný
- [ ] Realtime notifikace fungují

**🎉 Gratulujeme! Supabase je plně nakonfigurován a připraven k použití!**
