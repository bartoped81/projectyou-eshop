# 🎨 ProjectYOU Design System

Design systém e-shopu vychází z vizuální identity ProjectYOU (pyou.html).

---

## 📐 Základní principy

1. **Čistý, moderní design** - minimalistický přístup
2. **Výrazné akcenty barev** - modré, tyrkysové, červené, oranžové
3. **Velká typografie** - výrazné nadpisy
4. **Bílé prostory** - dostatek volného místa
5. **Tečka jako akcent** - modrá tečka na konci nadpisů jako značka značky

---

## 🎨 Barvy

### Primární barva - Modrá
```
#2563eb (blue-600) - Hlavní modrá ProjectYOU
```
Použití: CTA tlačítka, akcentní tečka, hlavní odkazy

### Akcentní barvy (Programové lišty)

**Modrá** (Pro organizace)
```
from-blue-600 to-blue-700
Použití: Sekce "Pro organizace"
```

**Tyrkysová** (Pro leadery)
```
from-cyan-500 to-cyan-600
Použití: Sekce "Pro leadery"
```

**Růžová/Červená** (Pro týmy)
```
from-rose-500 to-rose-600
Použití: Sekce "Pro týmy"
```

**Oranžová/Žlutá** (Pro talenty)
```
from-amber-500 to-amber-600
Použití: Sekce "Pro talenty"
```

### Neutrální barvy

**Pozadí:**
- Bílá: `#ffffff`
- Světle šedá: `#f8fafc` (slate-50)
- Středně šedá: `#f3f4f6` (slate-100)

**Text:**
- Tmavá: `#0f172a` (slate-900)
- Střední: `#475569` (slate-600)
- Světlá: `#94a3b8` (slate-400)

---

## ✍️ Typografie

### Fonty

**Primární font: Inter**
```typescript
font-sans // Inter pro většinu textu
```
Použití: Většina textu, nadpisy, tlačítka

**Sekundární font: Urbanist**
```typescript
font-urbanist // Urbanist pro speciální případy
```
Použití: Pouze pro speciální sekce (např. Impro kurz)

### Velikosti

**Hero nadpis (H1):**
```
text-5xl md:text-7xl (48px / 72px)
font-bold
leading-tight
```

**Sekční nadpis (H2):**
```
text-4xl (36px)
font-bold
```

**Podnadpis (H3):**
```
text-2xl nebo text-3xl (24px / 30px)
font-medium nebo font-semibold
```

**Běžný text:**
```
text-base nebo text-lg (16px / 18px)
```

**Malý text:**
```
text-sm nebo text-xs (14px / 12px)
```

---

## 🔘 Komponenty

### Tlačítka

**Primární (CTA):**
```tsx
<button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
  Text tlačítka
</button>
```

**Sekundární:**
```tsx
<button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors">
  Text tlačítka
</button>
```

**Outline:**
```tsx
<button className="px-8 py-4 border-2 border-slate-200 hover:border-blue-600 text-slate-900 font-semibold rounded-lg transition-colors">
  Text tlačítka
</button>
```

### Karty kurzů

```tsx
<div className="bg-white rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-blue-600 transition-all hover:shadow-xl">
  {/* Gradient header s barvou kurzu */}
  <div className="relative h-48 bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center">
    <h3 className="text-2xl font-bold text-white">Název kurzu</h3>
  </div>
  {/* Content */}
  <div className="p-6">
    <p className="text-slate-600 mb-4">Popis kurzu</p>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-bold text-blue-600">24 900 Kč</span>
      <span className="text-sm text-slate-500">bez DPH</span>
    </div>
  </div>
</div>
```

### Programové lišty

4 barevné sekce vedle sebe (desktop) nebo pod sebou (mobile):

```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 shadow-2xl rounded-xl overflow-hidden">
  {/* Modrá */}
  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8">
    {/* Content */}
  </div>
  {/* Tyrkysová */}
  <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-8">
    {/* Content */}
  </div>
  {/* Růžová */}
  <div className="bg-gradient-to-br from-rose-500 to-rose-600 text-white p-8">
    {/* Content */}
  </div>
  {/* Oranžová */}
  <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-8">
    {/* Content */}
  </div>
</div>
```

---

## 📏 Spacing

### Padding

**Sekce:**
```
py-20 (80px vertikální)
```

**Kontejner:**
```
px-4 sm:px-6 lg:px-8
```

**Max width:**
```
max-w-7xl mx-auto (1280px na desktop)
```

### Gap

**Grid:**
```
gap-8 (32px mezi kartami)
gap-12 (48px mezi většími sekcemi)
```

---

## 🎭 Animace a Přechody

### Hover efekty

**Tlačítka:**
```tsx
hover:bg-blue-700 transition-colors
```

**Karty:**
```tsx
hover:shadow-xl hover:border-blue-600 transition-all
```

**Šipky v tlačítkách:**
```tsx
group-hover:translate-x-1 transition-transform
```

### Scale efekt

**Nadpisy v programových lištách:**
```tsx
group-hover:scale-105 transition-transform
```

---

## 🖼️ Obrázky

### Hero sekce

- **Poměr stran:** 16:9 nebo širší
- **Overlay:** Bílý gradient zleva (from-white via-white/60 to-transparent)
- **Opacity:** 40% pro background image

### Karty kurzů

- **Poměr stran:** 2:1 (height: 192px = h-48)
- **Background:** Gradient v barvě kurzu
- **Text:** Bílý, tučný, vycentrovaný

### Lektoři

- **Poměr stran:** 1:1 nebo 3:4
- **Zaoblené rohy:** rounded-2xl (16px)
- **Stín:** shadow-xl

---

## 📱 Responsivita

### Breakpointy

```
sm: 640px  (tablet malý)
md: 768px  (tablet velký)
lg: 1024px (desktop)
xl: 1280px (desktop velký)
```

### Grid layout

**Kurzy:**
```tsx
grid md:grid-cols-3 gap-8
// Mobile: 1 sloupec
// Tablet+: 3 sloupce
```

**About sekce:**
```tsx
grid lg:grid-cols-2 gap-12
// Mobile/Tablet: 1 sloupec
// Desktop: 2 sloupce
```

**Programové lišty:**
```tsx
grid md:grid-cols-2 lg:grid-cols-4 gap-0
// Mobile: 1 sloupec (4 sekce pod sebou)
// Tablet: 2 sloupce (2x2)
// Desktop: 4 sloupce (vedle sebe)
```

---

## 🎯 Speciální prvky ProjectYOU

### 1. Tečka jako akcent

Každý velký nadpis končí modrou tečkou:

```tsx
<h1>
  Náskok díky lidem<span className="text-blue-600">.</span>
</h1>
```

### 2. Hero s video pozadím

```tsx
<section className="relative min-h-[80vh] flex items-end">
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent z-10" />
    <img src="..." className="w-full h-full object-cover opacity-40" />
  </div>
  <div className="relative z-20">
    {/* Content */}
  </div>
</section>
```

### 3. Overlapping sekce

Programové lišty překrývají hero sekci:

```tsx
<section className="relative -mt-32 z-30">
  {/* Lišty */}
</section>
```

### 4. Shadow effects

Velké stíny pro hloubku:

```tsx
shadow-2xl  // Pro programové lišty
shadow-xl   // Pro karty při hover
```

---

## 🔍 Příklady použití

### Kompletní Hero sekce

```tsx
<section className="relative min-h-[80vh] flex items-end pb-20 overflow-hidden bg-slate-100">
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent z-10" />
    <img src="/hero.jpg" alt="Hero" className="w-full h-full object-cover opacity-40" />
  </div>

  <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div className="max-w-3xl">
      <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
        Náskok díky lidem<span className="text-blue-600">.</span>
      </h1>
      <h2 className="text-2xl md:text-3xl font-medium text-slate-700 mb-12">
        Tvoříme s vámi svět, ve kterém lidi baví naplno žít a pracovat.
      </h2>
    </div>
  </div>
</section>
```

### CTA Sekce

```tsx
<section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-bold mb-6">Připraveni na změnu?</h2>
    <p className="text-xl text-blue-100 mb-8">
      Kontaktujte nás a společně najdeme řešení
    </p>
    <Link href="/kontakt" className="inline-flex items-center px-10 py-5 bg-white hover:bg-slate-100 text-blue-600 font-bold text-lg rounded-lg transition-colors shadow-xl">
      Chci vědět více
      <ArrowRight className="ml-2 w-6 h-6" />
    </Link>
  </div>
</section>
```

---

## ✅ Checklist pro nové stránky

Při tvorbě nových stránek ověř:

- [ ] Používáš font Inter (nebo Urbanist pro speciální případy)
- [ ] Každý hlavní nadpis má modrou tečku na konci
- [ ] Tlačítka mají správné hover stavy
- [ ] Obrázky mají rounded-2xl zaoblení
- [ ] Spacing odpovídá systému (py-20 pro sekce)
- [ ] Barvy odpovídají ProjectYOU paletě
- [ ] Responsive grid funguje na všech zařízeních
- [ ] Animace jsou plynulé (transition-colors, transition-all)
- [ ] Karty kurzů mají správný gradient podle typu
- [ ] CTA sekce má modrý gradient pozadí

---

**Design systém je živý dokument. Aktualizuj ho při přidávání nových komponent!** 🎨
