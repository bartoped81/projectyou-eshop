# Oprava Supabase Security Warnings

## Problém
Supabase poslal email s varováním o 2 views, které mají `SECURITY DEFINER`:
- `public.courses_with_upcoming_dates`
- `public.available_course_dates`

## Co to znamená?
`SECURITY DEFINER` znamená, že view běží s oprávněními tvůrce (admin), ne s oprávněními uživatele.
To může obejít RLS (Row Level Security) politiky a je potenciální bezpečnostní riziko.

## Řešení

### Možnost 1: Opravit ručně přes Supabase Dashboard (doporučeno)

1. Přihlaste se na [Supabase Dashboard](https://supabase.com/dashboard)
2. Vyberte projekt **projectyou-eshop** (ID: opxtibvlaonembvoxkxs)
3. Jděte na **SQL Editor**
4. Vytvořte nový query a zkopírujte obsah souboru:
   ```
   supabase/migrations/20260111_fix_security_definer_views.sql
   ```
5. Klikněte **Run**

### Možnost 2: Použít Supabase CLI

```bash
# V terminálu ve složce projektu
npx supabase db push
```

**Poznámka:** Pokud CLI říká "Remote database is up to date", použijte Možnost 1 (ručně).

## Co skript dělá?

1. **Odstraní staré views** s SECURITY DEFINER
2. **Vytvoří nové views** s `security_invoker = true`:
   - To znamená, že views běží s oprávněními dotazujícího se uživatele
   - RLS politiky budou správně fungovat

3. **Přidá GRANT oprávnění** pro `anon` a `authenticated` uživatele:
   - Tyto views zobrazují pouze veřejná data (kurzy a termíny)
   - Každý může vidět dostupné kurzy

4. **Přidá komentáře** k views pro dokumentaci

## Ověření opravy

Po spuštění SQL skriptu:

1. Jděte na **Security Advisor** v Supabase dashboardu
2. Měla by zmizet varování o SECURITY DEFINER
3. Aplikace by měla fungovat stejně jako předtím

## Testování

Po aplikaci opravy otestujte:
- ✅ Načtení kurzů na hlavní stránce
- ✅ Detail kurzu s dostupnými termíny
- ✅ Kalendář s událostmi
- ✅ Vytvoření objednávky

Pokud něco nefunguje, kontaktujte support.

## Proč je to bezpečné?

Tyto views zobrazují **pouze veřejná data**:
- Kurzy (title, description, price) - veřejné
- Termíny kurzů (dates, location, capacity) - veřejné
- **Žádné citlivé údaje** (osobní data, platební info)

Proto je bezpečné změnit z SECURITY DEFINER na SECURITY INVOKER.

## Další informace

Více o Supabase security best practices:
https://supabase.com/docs/guides/database/postgres/row-level-security
