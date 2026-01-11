// Data pro Ledové dobrodružství kurz - převedeno do CourseBlock struktury
export interface LedovkaBlockData {
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

export const LEDOVKA_BLOCKS: LedovkaBlockData[] = [
  {
    icon: "🎯",
    title: "Blok 1: Úvod do dobrodružství & Dohoda",
    subtitle: "09:00 – 09:45",
    why: "Start expedice, představení příběhu a vytvoření bezpečného prostoru. Položíme pevné základy pro efektivní spolupráci v náročných situacích.",
    content: [
      {
        title: "Představení příběhového rámce",
        description: "Uvedení do kontextu polární expedice s cílem trénink asertivity a vyjednávání v realistickém prostředí.",
      },
      {
        title: "Rozdělení do týmů",
        description: "Volba názvu, strategie a nákup zásob v \"polárním obchodě\" - první rozhodnutí pod tlakem.",
      },
      {
        title: "Pravidla spolupráce",
        description: "Domluva na pravidlech bezpečného prostoru, kde lze experimentovat a učit se z chyb.",
      },
    ],
    output: "Týmy jsou připravené, mají svou strategii a cítí se bezpečně experimentovat s náročnými situacemi.",
    color: "blue",
  },
  {
    icon: "⚡",
    title: "Blok 2: Aktivace týmu",
    subtitle: "09:45 – 10:15",
    why: "První kontakt v týmech a naladění na spolupráci. Vytvoříme energii a propojení, které tým potřebuje pro zvládnutí náročných výzev.",
    content: [
      {
        title: "Týmové aktivační cvičení",
        description: "Dynamické aktivity pro prolomení ledu a vytvoření důvěry mezi členy týmu.",
      },
      {
        title: "Naladění na spolupráci",
        description: "Společné hledání stylu komunikace a rozdělení rolí pro efektivní fungování.",
      },
    ],
    output: "Tým je aktivovaný, energizovaný a připravený čelit prvním výzvám expedice.",
    color: "blue",
  },
  {
    icon: "🏔️",
    title: "Blok 3: První situace v expedici",
    subtitle: "10:15 – 11:30",
    quote: "Odvaha není absence strachu, ale rozhodnutí jednat i přes něj.",
    why: "Simulované scénáře pod tlakem. Trénink odvahy v reálných situacích. Naučíte se říkat \"ne\", obhájit své potřeby a stát si za svým názorem.",
    content: [
      {
        title: "Týmová práce v simulacích",
        description: "Realistické scénáře, kde musíte rychle reagovat a dělat rozhodnutí s nedostatečnými informacemi.",
      },
      {
        title: "Trénink asertivity",
        description: "Jak říct \"ne\" nebo obhájit vlastní potřebu v momentech tlaku bez konfliktů.",
      },
      {
        title: "Strategická příprava",
        description: "Využití facilitátora a AI/ChatGPT pro přípravu strategie před náročnými jednáními.",
      },
    ],
    output: "Prakticky procvičené reakce na tlakové situace a odvaha postavit se nepohodlným okamžikům.",
    color: "blue",
  },
  {
    icon: "🎭",
    title: "Blok 4: Hlubší úroveň výzvy",
    subtitle: "11:30 – 12:45",
    why: "Pokročilé situace a důraz na zpětnou vazbu. Učíme se z toho, co funguje, a co ne. Zpětná vazba od ostatních týmů je zrcadlo, které ukazuje vaše slepá místa.",
    content: [
      {
        title: "Sehrávky situací",
        description: "Každý tým sehraje svou situaci (max 7 minut) před ostatními týmy.",
      },
      {
        title: "Peer hodnocení",
        description: "Ostatní týmy hodnotí kvalitu komunikace podle jasných kritérií (0-1000 EUR).",
      },
      {
        title: "Vědomá reflexe",
        description: "Co fungovalo? Co se dá zlepšit? Jak to aplikovat v reálné práci?",
      },
    ],
    output: "Hlubší pochopení vlastního stylu komunikace a konkrétní zpětná vazba od kolegů.",
    color: "blue",
  },
  {
    icon: "🧭",
    title: "Blok 5: Rozšířené vyjednávání",
    subtitle: "13:45 – 15:00",
    quote: "Nejnáročnější rozhovory jsou ty, které odkládáme. Dnes je vedeme.",
    why: "Nejnáročnější příběhové situace. Role emocí a očekávání. Naučíte se pracovat s frustrací, konflikty a nepohodlnými tématy tak, aby výsledek byl pro všechny přijatelný.",
    content: [
      {
        title: "Extrémní scénáře",
        description: "Jak komunikovat nedostatek zdrojů? Jak motivovat vyčerpané lidi? Jak řešit konflikt v týmu?",
      },
      {
        title: "Reflexe osobního stylu",
        description: "Identifikace vašich silných stránek a oblastí pro rozvoj ve vyjednávání.",
      },
      {
        title: "Asertivita v praxi",
        description: "Vědomá práce s tím, co vám pomáhá a co vám brání být asertivní.",
      },
    ],
    output: "Zvládnuté nejnáročnější situace a pochopení, jak vaše emoce ovlivňují schopnost vyjednávat.",
    color: "cyan",
  },
  {
    icon: "🌟",
    title: "Blok 6: Návrat z expedice & Transfer do reality",
    subtitle: "15:00 – 17:00",
    why: "Expedice skončila, ale learning pokračuje. Teď je čas si uvědomit, co jste se naučili, a formulovat konkrétní kroky, které implementujete hned zítra.",
    content: [
      {
        title: "Reflexe zažitého",
        description: "Co pro mě fungovalo? V jakých situacích jsem byl úspěšný? Co mě překvapilo?",
      },
      {
        title: "Osobní závazky",
        description: "Formulace 1-2 konkrétních kroků, na kterých začnete pracovat v následujících týdnech.",
      },
      {
        title: "Transfer do praxe",
        description: "Jak aplikovat principy asertivity a vyjednávání ve vaší každodenní práci.",
      },
    ],
    output: "Odnášíte si 1–2 konkrétní kroky, na kterých začnete pracovat zítra, a jasný plán implementace.",
    color: "cyan",
  },
];
