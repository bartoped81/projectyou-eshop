# Nastavení Environment Variables na Vercelu

Po nasazení aplikace na Vercel je **KRITICKY DŮLEŽITÉ** nastavit tyto environment variables v Vercel dashboardu.

## Jak nastavit Environment Variables na Vercelu

1. Přejděte na [Vercel Dashboard](https://vercel.com/dashboard)
2. Vyberte váš projekt
3. Jděte do **Settings** → **Environment Variables**
4. Přidejte následující proměnné:

## Povinné Environment Variables

### Supabase Configuration

```
NEXT_PUBLIC_SUPABASE_URL=https://opxtibvlaonembvoxkxs.supabase.co
```

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9weHRpYnZsYW9uZW1idm94a3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5MzI1OTMsImV4cCI6MjA4MzUwODU5M30.hFkaIgPefU6ZdoqA2iH7PpiEfV-OgUuyKsnnudrVbEc
```

```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9weHRpYnZsYW9uZW1idm94a3hzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzkzMjU5MywiZXhwIjoyMDgzNTA4NTkzfQ.78_a-VGtH_t4o7aMra0VoDBVcX2nCBSn0U3Yq7TXnQI
```

### Resend Email Configuration (volitelné - pro odesílání emailů)

```
RESEND_API_KEY=re_dbvKTq7R_HLQYSMLtna3vyhqs239j7zdq
```

```
RESEND_FROM_EMAIL=onboarding@resend.dev
```

## Důležité poznámky

1. **SUPABASE_SERVICE_ROLE_KEY** - Tato proměnná je KRITICKÁ pro fungování API route `/api/orders`. Bez ní nebude možné vytvářet objednávky.

2. **NEXT_PUBLIC_*** proměnné jsou veřejné a jsou dostupné na klientu
   - Tyto proměnné začínají předponou `NEXT_PUBLIC_`
   - Jsou viditelné v browseru

3. **SUPABASE_SERVICE_ROLE_KEY** je soukromá
   - Tato proměnná NESMÍ začínat `NEXT_PUBLIC_`
   - Je použita pouze na serveru (v API routes)
   - Nikdy ji nesdílejte veřejně

4. Po přidání nebo změně environment variables je nutné:
   - **Redeploy aplikace** na Vercelu
   - Klikněte na "Redeploy" v Vercel dashboardu nebo pushněte nový commit

## Ověření nastavení

Po nastavení environment variables a redeployi:

1. Otevřete aplikaci na Vercelu
2. Zkuste dokončit testovací objednávku
3. Zkontrolujte Developer Console v prohlížeči (F12) pro případné chybové hlášky
4. Pokud vidíte chybu "Missing Supabase configuration", environment variables nejsou správně nastavené

## Co bylo změněno

- ✅ Původní Supabase Edge funkce byla nahrazena Next.js API route
- ✅ API route běží přímo na Vercelu a má přístup k environment variables
- ✅ Zpracování objednávek nyní funguje spolehlivě i v production prostředí
