// Data pro Ledové dobrodružství kurz
export interface AgendaItem {
  time: string;
  title: string;
  description: string;
  details?: string[];
  accentColor?: "sky" | "amber" | "slate";
  highlighted?: boolean;
}

export const LEDOVKA_AGENDA: AgendaItem[] = [
  {
    time: "09:00 – 09:45",
    title: "Úvod do dobrodružství & Dohoda",
    description: "Start expedice, představení příběhu a vytvoření bezpečného prostoru.",
    details: [
      "Představení příběhového rámce a cíle dne: trénink asertivity a vyjednávání.",
      'Rozdělení do týmů, volba názvu, strategie a nákup zásob v "polárním obchodě".',
      "Domluva na pravidlech spolupráce.",
    ],
  },
  {
    time: "09:45 – 10:15",
    title: "Aktivace týmu",
    description: "První kontakt v týmech a naladění na spolupráci.",
  },
  {
    time: "10:15 – 11:30",
    title: "První situace v expedici",
    description: "Simulované scénáře pod tlakem. Trénink odvahy.",
    details: [
      "Týmová práce v simulovaných scénářích.",
      'Trénink reagování v momentech tlaku: Jak říct „ne" nebo obhájit vlastní potřebu.',
      "Příprava s facilitátorem a využití AI/ChatGPT pro strategii.",
    ],
    accentColor: "sky",
    highlighted: true,
  },
  {
    time: "11:30 – 12:45",
    title: "Hlubší úroveň výzvy",
    description: "Pokročilé situace a důraz na zpětnou vazbu.",
    details: [
      "Sehrávky situací (max 7 minut).",
      "Hodnocení ostatními týmy (0-1000 EUR) podle kvality komunikace.",
      "Vědomá reflexe: Co fungovalo? Co udělat příště lépe?",
    ],
  },
  {
    time: "13:45 – 15:00",
    title: "Rozšířené vyjednávání",
    description: "Nejnáročnější příběhové situace. Role emocí a očekávání.",
    details: [
      "Náročné situace: Jak komunikovat nedostatek jídla? Jak motivovat vyčerpané?",
      "Reflexe osobního stylu vyjednávání.",
      "Vědomá práce s asertivitou: co mi pomáhá, co mi brání.",
    ],
    accentColor: "amber",
    highlighted: true,
  },
];
