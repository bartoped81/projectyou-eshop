// Data pro Aplikovaná improvizace - moduly workshopu
export interface ImprovModuleData {
  time: string;
  title: string;
  description: string;
  details: string[];
  color: "emerald" | "violet" | "amber";
}

export const IMPROV_MODULES: ImprovModuleData[] = [
  {
    time: "09:30 – 11:00",
    title: "Základy Flow",
    description: "Zbourání vnitřních bariér. Jak vytvořit prostředí, kde chyba je momentem překvapení a humoru.",
    details: [
      "Odstranění strachu z chyby pomocí aktivit zaměřených na přijetí nečekaného",
      "Trénink spontánní reakce bez předchozího plánování",
      "Vytvoření prostoru pro autentický projev a radost z experimentování",
    ],
    color: "emerald",
  },
  {
    time: "11:15 – 13:00",
    title: "Kreativita",
    description: "Objevování autentického zdroje nápadů. Reakce na nečekané situace s naprostou lehkostí.",
    details: [
      "Nápady vznikají volnou asociací, ne pod tlakem 'musím být kreativní'",
      "Aktivní využití principu 'Ano, a...' pro rozvoj nápadů v týmu",
      "Rychlé rozhodování a důvěra v první instinkt",
    ],
    color: "violet",
  },
  {
    time: "14:00 – 15:45",
    title: "Storytelling",
    description: "Jak zaujmout a udržet pozornost. Vstupování do různých rolí a práce se statusem v komunikaci.",
    details: [
      "Struktura působivého příběhu: začátek, střed, tah",
      "Práce s různými statusy: Jak působit autoritativně nebo naopak mile",
      "Hlasová modulace a neverbální komunikace pro větší autenticitu",
    ],
    color: "amber",
  },
  {
    time: "16:00 – 17:00",
    title: "Aplikace",
    description: "Přenos zážitků do reálného byznysu. Kotvení nových návyků a reflexe pro tým.",
    details: [
      "Konkrétní scénáře z vašeho pracovního prostředí",
      "Facilitovaná reflexe: Co si odnášíte? Co začnete dělat jinak?",
      "Závěrečné sdílení a plán dalších kroků pro tým i jednotlivce",
    ],
    color: "emerald",
  },
];
