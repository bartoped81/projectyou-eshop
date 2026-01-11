// Data pro Aplikovaná improvizace kurz - převedeno do CourseBlock struktury
export interface ImprovBlockData {
  icon: string;
  title: string;
  subtitle?: string;
  quote?: string;
  why: string;
  content: Array<{
    title: string;
    description: string;
  }>;
  output: string;
  color: "blue" | "cyan";
}

export const IMPROV_BLOCKS: ImprovBlockData[] = [
  {
    icon: "🌊",
    title: "Blok 1: Základy Flow",
    subtitle: "09:30 – 11:00",
    quote: "Chyba není konec, je to moment překvapení a humoru.",
    why: "Zbourání vnitřních bariér. Naučíte se vytvořit prostředí, kde není co pokazit - jen objevovat. Přestanete se bát improvizace a začnete ji vnímat jako nástroj svobody.",
    content: [
      {
        title: "Odstranění strachu z chyby",
        description: "Aktivity zaměřené na přijetí nečekaného a transformaci chyby na zdroj kreativity.",
      },
      {
        title: "Spontánní reakce",
        description: "Trénink okamžité reakce bez předchozího plánování - důvěra v první instinkt.",
      },
      {
        title: "Autentický projev",
        description: "Vytvoření prostoru pro opravdovost, radost z experimentování a hravost.",
      },
    ],
    output: "Osvobození od strachu z chyby a schopnost reagovat spontánně v jakékoli situaci.",
    color: "blue",
  },
  {
    icon: "💡",
    title: "Blok 2: Kreativita",
    subtitle: "11:15 – 13:00",
    quote: "Nápady nevznikají pod tlakem, vznikají volnou hrou.",
    why: "Objevování autentického zdroje nápadů. Reakce na nečekané situace s naprostou lehkostí. Přestaňte \"vymýšlet\" a začněte \"objevovat\" - nápady jsou všude kolem vás.",
    content: [
      {
        title: "Volná asociace",
        description: "Nápady vznikají volnou asociací, ne pod tlakem 'musím být kreativní' - učíme se myslet divergentně.",
      },
      {
        title: "Princip 'Ano, a...'",
        description: "Aktivní využití základního principu improvizace pro rozvoj nápadů v týmu bez blokování.",
      },
      {
        title: "Rychlé rozhodování",
        description: "Trénink důvěry v první instinkt a schopnosti okamžitého rozhodnutí.",
      },
    ],
    output: "Schopnost generovat nápady bez tlaku a využívat princip 'Ano, a...' v týmové spolupráci.",
    color: "blue",
  },
  {
    icon: "📖",
    title: "Blok 3: Storytelling",
    subtitle: "14:00 – 15:45",
    why: "Jak zaujmout a udržet pozornost. Vstupování do různých rolí a práce se statusem v komunikaci. Naučíte se vyprávět příběhy, které lidi skutečně strhnou.",
    content: [
      {
        title: "Struktura příběhu",
        description: "Základy působivého vyprávění: začátek, který upoutá, střed, který drží napětí, a konec, který rezonuje.",
      },
      {
        title: "Práce se statusem",
        description: "Jak působit autoritativně nebo naopak mile - vědomá práce s postojem a tónem.",
      },
      {
        title: "Neverbální komunikace",
        description: "Hlasová modulace, gesta a mimika pro větší autenticitu a přesvědčivost.",
      },
    ],
    output: "Schopnost vyprávět přesvědčivé příběhy a vědomě pracovat se svým statusem v komunikaci.",
    color: "cyan",
  },
  {
    icon: "🚀",
    title: "Blok 4: Aplikace",
    subtitle: "16:00 – 17:00",
    quote: "Improvizace není jen na jevišti, je to způsob přístupu k životu.",
    why: "Přenos zážitků do reálného byznysu. Kotvení nových návyků a reflexe pro tým. Tento blok zajistí, že si ze dneška odnesete konkrétní nástroje, ne jen zážitek.",
    content: [
      {
        title: "Reálné scénáře",
        description: "Aplikace improvizačních technik na konkrétní situace z vašeho pracovního prostředí.",
      },
      {
        title: "Facilitovaná reflexe",
        description: "Co si odnášíte? Co začnete dělat jinak? Jaké jsou vaše nejsilnější momenty z dnešního dne?",
      },
      {
        title: "Plán implementace",
        description: "Závěrečné sdílení a stanovení konkrétních kroků pro tým i jednotlivce.",
      },
    ],
    output: "Konkrétní akční plán pro aplikaci improvizačních principů ve vašem byznysu a týmu.",
    color: "cyan",
  },
];
