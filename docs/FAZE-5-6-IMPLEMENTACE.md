# Fáze 5-6: Košík a Backend Logic - Implementační Dokumentace

## Přehled

Tato dokumentace popisuje implementaci košíku, checkout procesu a backend logiky pro e-shop ProjectYOU.

## Fáze 5: Košík a Checkout Logic ✅

### 1. State Management (CartContext)

**Soubor**: [lib/cart-context.tsx](../lib/cart-context.tsx)

**Implementované funkce**:
- ✅ Globální state pro košík pomocí React Context
- ✅ Persistence v localStorage
- ✅ Výpočet cen bez DPH, DPH a celkem s DPH
- ✅ Operace: `addItem`, `removeItem`, `updateQuantity`, `clearCart`

**Interface CartItem**:
```typescript
interface CartItem {
  courseDateId: string;
  courseTitle: string;
  courseSlug: string;
  startDate: string;
  endDate: string;
  location: string;
  quantity: number;
  pricePerPerson: number;
  vatRate: number; // 21% pro standardní kurzy
}
```

**Výpočty DPH**:
```typescript
// Cena bez DPH
totalPriceWithoutVat = sum(pricePerPerson * quantity)

// DPH
totalVat = sum((pricePerPerson * quantity * vatRate) / 100)

// Celkem s DPH
totalPriceWithVat = totalPriceWithoutVat + totalVat
```

### 2. Stránka Košíku

**Soubor**: [app/kosik/page.tsx](../app/kosik/page.tsx)
**URL**: `/kosik`

**Funkce**:
- ✅ Tabulkový přehled položek v košíku
- ✅ Ovládání množství (+/- tlačítka)
- ✅ Odstranění jednotlivých položek
- ✅ Vyprázdnění celého košíku
- ✅ Rekapitulace s rozpisem DPH
- ✅ Prázdný košík state s odkazem na kurzy

**Layout**:
- Levá strana (2/3): Tabulka s položkami
- Pravá strana (1/3): Sticky rekapitulace s CTA

### 3. Checkout Stránka

**Soubor**: [app/objednavka/page.tsx](../app/objednavka/page.tsx)
**URL**: `/objednavka`

**Funkce**:
- ✅ Formulář s react-hook-form + zod validací
- ✅ Osobní údaje (jméno, příjmení, email, telefon)
- ✅ Adresa (ulice, město, PSČ)
- ✅ Volba "Nakupuji na firmu" → zobrazí firemní pole
- ✅ Výběr platební metody (faktura, QR, karta)
- ✅ Rekapitulace objednávky v sidebaru
- ✅ Simulace platby kartou (modal)

**Validační schema**:
```typescript
const checkoutSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  street: z.string().min(3),
  city: z.string().min(2),
  zip: z.string().regex(/^\d{3}\s?\d{2}$/),
  isCompany: z.boolean(),
  companyName: z.string().optional(),
  ico: z.string().optional(),
  dic: z.string().optional(),
});
```

**Platební metody**:
1. **Zálohová faktura** - Defaultní metoda, faktura v emailu
2. **QR kód** - Pro okamžitou platbu bankovní aplikací
3. **Platba kartou** - Simulace platební brány (test: 1111 1111 1111 1111)

### 4. Success Stránka

**Soubor**: [app/platba/uspech/page.tsx](../app/platba/uspech/page.tsx)
**URL**: `/platba/uspech`

**Funkce**:
- ✅ Potvrzení úspěšné objednávky
- ✅ Informace o dalších krocích
- ✅ Odkazy zpět na homepage a katalog

---

## Fáze 6: Backend Logic ✅

### 1. Supabase Edge Function

**Soubor**: [supabase/functions/process-order/index.ts](../supabase/functions/process-order/index.ts)
**Endpoint**: `https://<project-ref>.supabase.co/functions/v1/process-order`

**Funkce Edge Function**:
1. ✅ Přijme JSON payload z frontendu
2. ✅ Vytvoří záznam v tabulce `orders`
3. ✅ Vytvoří záznamy v tabulce `order_items`
4. ✅ Aktualizuje kapacitu kurzů (`course_dates.available_spots`)
5. ✅ Vygeneruje variabilní symbol (formát: 99YYYYMMXXX)
6. ✅ Vygeneruje PDF fakturu pomocí pdfMake
7. ✅ Připraveno pro odeslání emailu s fakturou (nodemailer)
8. ✅ Vrátí úspěšnou response nebo error

**Request Payload**:
```typescript
{
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    zip: string;
    isCompany: boolean;
    companyName?: string;
    ico?: string;
    dic?: string;
  };
  items: CartItem[];
  paymentMethod: "invoice" | "qr" | "card";
  totalPriceWithoutVat: number;
  totalVat: number;
  totalPriceWithVat: number;
}
```

**Response**:
```typescript
// Success
{
  success: true;
  orderId: string;
  variableSymbol: string;
}

// Error
{
  success: false;
  error: string;
}
```

### 2. Databázové Tabulky

**Migrace**: [supabase/migrations/create-orders-tables.sql](../supabase/migrations/create-orders-tables.sql)

#### Tabulka `orders`

```sql
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  zip TEXT NOT NULL,
  is_company BOOLEAN DEFAULT FALSE,
  company_name TEXT,
  ico TEXT,
  dic TEXT,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('invoice', 'qr', 'card')),
  total_price_without_vat NUMERIC(10, 2) NOT NULL,
  total_vat NUMERIC(10, 2) NOT NULL,
  total_price_with_vat NUMERIC(10, 2) NOT NULL,
  variable_symbol TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### Tabulka `order_items`

```sql
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  course_date_id UUID NOT NULL REFERENCES public.course_dates(id),
  course_title TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_per_person NUMERIC(10, 2) NOT NULL,
  vat_rate NUMERIC(5, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### Indexy

```sql
CREATE INDEX idx_orders_email ON public.orders(email);
CREATE INDEX idx_orders_variable_symbol ON public.orders(variable_symbol);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_course_date_id ON public.order_items(course_date_id);
```

### 3. RLS (Row Level Security) Policies

**Orders Table**:
- ✅ Service role: plný přístup
- ✅ Authenticated users: čtení vlastních objednávek
- ✅ Anon users: vytváření objednávek (guest checkout)

**Order Items Table**:
- ✅ Service role: plný přístup
- ✅ Authenticated users: čtení vlastních položek objednávek
- ✅ Anon users: vytváření položek objednávek

### 4. PDF Generování

**Knihovna**: pdfMake
**Implementace**: [supabase/functions/process-order/index.ts](../supabase/functions/process-order/index.ts) (funkce `generateInvoicePDF`)

**Design faktury**:
- ✅ Hlavička s logem ProjectYOU
- ✅ Číslo faktury a variabilní symbol
- ✅ Údaje dodavatele a odběratele
- ✅ Tabulka položek s cenami
- ✅ Rozpis DPH a celková částka
- ✅ Platební údaje (VS, číslo účtu, splatnost)
- ✅ Barevné zvýraznění (modrá #2563eb)

### 5. Email Notifikace

**Připraveno pro**: nodemailer nebo email service (SendGrid, Mailgun)
**Implementace**: [supabase/functions/process-order/index.ts](../supabase/functions/process-order/index.ts) (funkce `sendOrderConfirmationEmail`)

**Obsah emailu**:
- Potvrzení objednávky
- Variabilní symbol
- Celková částka
- Způsob platby
- PDF faktura v příloze

**Environment Variables**:
```
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

---

## Deployment

### 1. Databázová Migrace

```bash
# Připojte se k projektu
supabase link --project-ref <your-project-ref>

# Spusťte migraci
supabase db push
```

Nebo ručně v Supabase SQL Editor:
```sql
-- Zkopírujte a spusťte obsah souboru:
-- supabase/migrations/create-orders-tables.sql
```

### 2. Deploy Edge Function

```bash
# Přihlaste se
supabase login

# Deployujte funkci
supabase functions deploy process-order
```

### 3. Nastavení Environment Variables

V Supabase Dashboard → Project Settings → Edge Functions:

```
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

Pro Gmail:
1. Zapněte 2FA na Google účtu
2. Vygenerujte App Password na https://myaccount.google.com/apppasswords
3. Použijte 16-místný kód jako SMTP_PASS

### 4. Testování

```bash
# Lokální testování
supabase start
supabase functions serve process-order --env-file ./supabase/.env.local

# Curl test
curl -i --location --request POST 'http://localhost:54321/functions/v1/process-order' \
  --header 'Authorization: Bearer <anon-key>' \
  --header 'Content-Type: application/json' \
  --data '<test-payload>'
```

---

## Flow Diagram

```
1. User fills checkout form
   ↓
2. Frontend validates data (react-hook-form + zod)
   ↓
3. For card payment: show modal → simulate payment
   ↓
4. Frontend calls supabase.functions.invoke('process-order')
   ↓
5. Edge Function:
   - Creates order in DB
   - Creates order items
   - Updates course capacity
   - Generates variable symbol
   - Generates PDF invoice
   - Sends email with PDF
   ↓
6. Frontend receives response
   ↓
7. Clear cart
   ↓
8. Redirect to /platba/uspech
```

---

## Soubory

### Frontend
- ✅ `/lib/cart-context.tsx` - Cart state management
- ✅ `/components/cart-badge.tsx` - Header cart icon with badge
- ✅ `/components/term-selection.tsx` - Course term selection with "Add to cart"
- ✅ `/app/kosik/page.tsx` - Shopping cart page
- ✅ `/app/objednavka/page.tsx` - Checkout page
- ✅ `/app/platba/uspech/page.tsx` - Success confirmation page

### Backend
- ✅ `/supabase/functions/process-order/index.ts` - Edge Function
- ✅ `/supabase/functions/process-order/README.md` - Edge Function docs
- ✅ `/supabase/migrations/create-orders-tables.sql` - Database schema
- ✅ `/supabase/.env.local.example` - Environment variables template

### Documentation
- ✅ `/docs/FAZE-5-6-IMPLEMENTACE.md` - Tento soubor

---

## TODO / Další kroky

### Kritické
- [ ] Nastavit skutečné SMTP credentials v Supabase Dashboard
- [ ] Otestovat celý flow end-to-end v produkci
- [ ] Implementovat skutečné odesílání emailů (nahradit console.log)

### Nice to have
- [ ] Google Drive upload pro faktury
- [ ] QR kód generování pro SPAYD platby
- [ ] Webhook pro potvrzení platby kartou
- [ ] Admin dashboard pro správu objednávek
- [ ] Email templates (HTML místo plain text)
- [ ] Retry logika pro selhání emailu
- [ ] Monitoring a error tracking (Sentry)
- [ ] Rate limiting pro Edge Function
- [ ] Backup faktury do S3/R2

---

## Kontakt

Pro dotazy nebo problémy vytvořte issue nebo kontaktujte vývojový tým.

**Verze**: 1.0
**Datum**: 2026-01-10
**Autor**: Claude Sonnet 4.5
