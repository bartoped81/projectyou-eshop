# Nastavení Resend pro produkční emailing

## Aktuální stav
- ✅ Emaily fungují lokálně na `bartoped81@gmail.com`
- ❌ Testovací klíč neumožňuje posílat na jiné adresy
- ❌ Produkce potřebuje ověřenou doménu

## Řešení pro testování s kolegy

### 1. Vytvořit nový Resend účet (nejjednodušší)

1. Jděte na https://resend.com
2. Vytvořte nový účet (nebo se přihlaste)
3. Jděte na **API Keys** a vytvořte nový klíč
4. Zkopírujte klíč a nahraďte v `.env.local`:
   ```
   RESEND_API_KEY=re_NOVY_KLIC
   ```
5. Nový účet má vyšší limity pro testování

**Výhody:**
- Rychlé řešení
- Můžete posílat na více emailů během testování
- Zdarma pro vývoj (100 emailů/den)

### 2. Ověřit doménu projectyou.cz (pro produkci)

Pro produkční nasazení je potřeba ověřit doménu:

#### Krok 1: Přihlaste se na Resend
1. Jděte na https://resend.com/domains
2. Klikněte "Add Domain"
3. Zadejte: `projectyou.cz`

#### Krok 2: Přidejte DNS záznamy
Resend vám poskytne DNS záznamy, které musíte přidat do DNS nastavení domény:

**SPF záznam:**
```
TXT @ "v=spf1 include:_spf.resend.com ~all"
```

**DKIM záznamy:**
```
TXT resend._domainkey "p=..."
CNAME resend._domainkey resend.com
```

**DMARC záznam (volitelné, ale doporučené):**
```
TXT _dmarc "v=DMARC1; p=none; rua=mailto:dmarc@projectyou.cz"
```

#### Krok 3: Počkejte na ověření
- DNS změny trvají 24-48 hodin
- Resend automaticky ověří záznamy
- Po ověření můžete posílat z `@projectyou.cz`

#### Krok 4: Změňte FROM adresu
V `.env.local` a na Vercelu změňte:
```
RESEND_FROM_EMAIL=objednavky@projectyou.cz
```

## Doporučený postup

### Pro vývoj a testování:
1. Vytvořte nový Resend účet
2. Použijte nový API klíč
3. Testujte s kolegy

### Pro produkci:
1. Ověřte doménu `projectyou.cz`
2. Nastavte `from` email jako `objednavky@projectyou.cz`
3. Nasaďte na Vercel s produkčním API klíčem

## Environment variables

### Lokální vývoj (.env.local):
```
RESEND_API_KEY=re_NOVY_KLIC
RESEND_FROM_EMAIL=onboarding@resend.dev  # pro testování
```

### Produkce (Vercel):
```
RESEND_API_KEY=re_PRODUKCNI_KLIC
RESEND_FROM_EMAIL=objednavky@projectyou.cz  # po ověření domény
```

## Limity Resend

### Free tier:
- 3,000 emailů/měsíc
- 100 emailů/den
- Ideální pro testování a malé nasazení

### Paid tier:
- Od $20/měsíc
- 50,000 emailů/měsíc
- Pokročilá analytika

## Troubleshooting

### Emaily končí ve spamu
- Ověřte doménu
- Nastavte SPF, DKIM a DMARC záznamy
- Používejte profesionální `from` adresu (@projectyou.cz)
- Vyhněte se spam slovům v předmětu

### Email se neodeslal
1. Zkontrolujte logy: `Email result:` v konzoli
2. Ověřte API klíč v .env.local
3. Zkontrolujte, že `from` adresa je z ověřené domény

### Email ID je undefined
- Resend vrátilo chybu (zkontrolujte `error` objekt v logu)
- Nejčastější příčiny:
  - Neověřená doména
  - Špatný API klíč
  - Limit emailů překročen
