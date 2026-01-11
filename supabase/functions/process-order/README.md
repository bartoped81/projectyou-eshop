# Process Order Edge Function

Tato Supabase Edge Function zpracovává objednávky z e-shopu ProjectYOU.

## Funkcionalita

1. **Vytvoření objednávky** - Uloží údaje objednávky do databáze
2. **Vytvoření položek objednávky** - Uloží jednotlivé kurzy do order_items
3. **Aktualizace kapacity** - Sníží počet volných míst na kurzech
4. **Generování VS** - Vytvoří variabilní symbol ve formátu 99YYYYMMXXX
5. **Generování PDF faktury** - Vytvoří PDF zálohové faktury pomocí pdfMake
6. **Odeslání emailu** - Pošle potvrzovací email s fakturou v příloze

## Instalace

### 1. Nainstalujte Supabase CLI

```bash
npm install -g supabase
```

### 2. Přihlaste se k Supabase

```bash
supabase login
```

### 3. Propojte projekt

```bash
supabase link --project-ref <your-project-ref>
```

### 4. Vytvořte databázové tabulky

Spusťte migraci pro vytvoření tabulek `orders` a `order_items`:

```bash
supabase db push
```

Nebo ručně v Supabase SQL Editor:

```sql
-- Spusťte obsah souboru: /supabase/migrations/create-orders-tables.sql
```

### 5. Nastavte environment variables

V Supabase Dashboard → Project Settings → Edge Functions nastavte:

```
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
```

Pro Gmail app password:
1. Zapněte 2FA na Google účtu
2. Jděte na https://myaccount.google.com/apppasswords
3. Vygenerujte app password pro "Mail"
4. Použijte tento 16-místný kód jako SMTP_PASS

### 6. Deployujte Edge Function

```bash
supabase functions deploy process-order
```

## Použití

### Z frontendu (TypeScript/JavaScript)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const { data, error } = await supabase.functions.invoke('process-order', {
  body: {
    userData: {
      firstName: "Jan",
      lastName: "Novák",
      email: "jan.novak@example.com",
      phone: "777123456",
      street: "Hlavní 123",
      city: "Praha",
      zip: "110 00",
      isCompany: false,
    },
    items: [
      {
        courseDateId: "uuid-kurzu",
        courseTitle: "AI Firemní Akcelerátor",
        courseSlug: "ai-firemni-akcelerator",
        startDate: "2024-03-15T09:00:00Z",
        endDate: "2024-03-15T17:00:00Z",
        location: "Praha",
        quantity: 2,
        pricePerPerson: 15000,
        vatRate: 21,
      }
    ],
    paymentMethod: "invoice",
    totalPriceWithoutVat: 30000,
    totalVat: 6300,
    totalPriceWithVat: 36300,
  }
})

if (error) {
  console.error('Error:', error)
} else {
  console.log('Order created:', data)
  // { success: true, orderId: "uuid", variableSymbol: "99202403001" }
}
```

## Testování lokálně

### 1. Spusťte Supabase lokálně

```bash
supabase start
```

### 2. Spusťte Edge Function lokálně

```bash
supabase functions serve process-order --env-file ./supabase/.env.local
```

### 3. Testujte pomocí curl

```bash
curl -i --location --request POST 'http://localhost:54321/functions/v1/process-order' \
  --header 'Authorization: Bearer <anon-key>' \
  --header 'Content-Type: application/json' \
  --data '{
    "userData": {
      "firstName": "Test",
      "lastName": "User",
      "email": "test@example.com",
      "phone": "777123456",
      "street": "Test 123",
      "city": "Praha",
      "zip": "110 00",
      "isCompany": false
    },
    "items": [{
      "courseDateId": "test-uuid",
      "courseTitle": "Test Course",
      "courseSlug": "test-course",
      "startDate": "2024-03-15T09:00:00Z",
      "endDate": "2024-03-15T17:00:00Z",
      "location": "Praha",
      "quantity": 1,
      "pricePerPerson": 10000,
      "vatRate": 21
    }],
    "paymentMethod": "invoice",
    "totalPriceWithoutVat": 10000,
    "totalVat": 2100,
    "totalPriceWithVat": 12100
  }'
```

## Struktura Response

### Success Response

```json
{
  "success": true,
  "orderId": "550e8400-e29b-41d4-a716-446655440000",
  "variableSymbol": "99202403001"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Failed to create order: ..."
}
```

## Databázové tabulky

### `orders`
- `id` (uuid, PK)
- `first_name`, `last_name`, `email`, `phone`
- `street`, `city`, `zip`
- `is_company`, `company_name`, `ico`, `dic`
- `payment_method` (invoice|qr|card)
- `total_price_without_vat`, `total_vat`, `total_price_with_vat`
- `variable_symbol` (unique)
- `status` (pending|paid|cancelled)
- `created_at`, `updated_at`

### `order_items`
- `id` (uuid, PK)
- `order_id` (FK → orders.id)
- `course_date_id` (FK → course_dates.id)
- `course_title`, `course_slug`
- `start_date`, `end_date`, `location`
- `quantity`, `price_per_person`, `vat_rate`
- `created_at`

## Bezpečnost

- Edge Function používá **SERVICE_ROLE_KEY** pro plný přístup k databázi
- RLS policies zajišťují, že běžní uživatelé nemohou mazat nebo měnit objednávky
- SMTP credentials jsou uloženy jako environment variables (ne v kódu)
- Anon users mohou vytvářet objednávky (guest checkout)
- Authenticated users mohou číst pouze své vlastní objednávky

## TODO

- [ ] Implementovat skutečné odesílání emailů (nodemailer/SendGrid)
- [ ] Přidat Google Drive upload pro faktury
- [ ] Přidat QR kód generování pro SPAYD platby
- [ ] Přidat webhook pro potvrzení platby kartou
- [ ] Přidat retry logiku pro selhání emailu
- [ ] Přidat monitoring a error tracking

## Logs

Pro zobrazení logů z produkce:

```bash
supabase functions logs process-order
```

Pro živé sledování:

```bash
supabase functions logs process-order --follow
```
