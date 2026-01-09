// Hardcoded data lektorů pro MVP
export interface LecturerData {
  name: string;
  bio: string;
  photo: string;
}

export const LECTURERS: Record<string, LecturerData> = {
  "ai-firemni-akcelerator": {
    name: "Petr Bartoň",
    bio: "Petr propojuje více než 18 let zkušeností v managementu a rozvoji lídrů s pragmatickým využitím moderních technologií. Jako bývalý agilní kouč nevnímá AI jako cíl, ale jako klíčový nástroj k odstranění rutiny a uvolnění lidského potenciálu. Prošel dvě dekády byznysu – od startupu přes scale-up až po velkou korporaci. Vedl týmy, budoval firmy, koučoval leadery a učil je, jak přestat 'hasit požáry' a začít skutečně řídit. Dnes staví vzdělávací programy, které dávají smysl: žádná abstraktní teorie, jen techniky, které můžete použít v pondělí ráno.",
    photo: "/images/lecturers/petr.jpg?v=2",
  },
  "aplikovana-improvizace": {
    name: "Géza Prouza",
    bio: "Géza spojuje dvacet let leadershipu z korporací jako Microsoft s dekádou praxe na improvizační scéně. Prošel cestou od technika přes produktového manažera až po kouče executive týmů. Improvizaci nevnímá jako zábavu, ale jako nejpřímější cestu ke schopnosti držet krok s nepředvídatelnou realitou. Na jevišti i v byznysu platí to samé: nejlepší plán funguje jen do první změny. Géza učí lidi pracovat s tím, co přichází – bez skriptu, s důvěrou a lehkostí.",
    photo: "/images/lecturers/geza.jpg",
  },
  "ledove-dobrodruzstvi": {
    name: "Tomáš Ptáček",
    bio: "Tom není teoretik od tabule. S vedením lidí začal už v 16 letech jako skautský vedoucí, kde se naučil, že dobrý leader nezakazuje chyby – vytváří prostor, kde se chyby dají zvládnout. Později vedl týmy v náročných projektech, trénoval manažery ve firmách a vytvářel programy, kde se teorie mění v reflex. Ledové dobrodružství postavil na simulaci reálného tlaku: když se rozhodujete pod časovým stresem, bez dostatku informací a s omezenými zdroji, teprve tam poznáte, jestli dovedete skutečně vést. Ne v prezentaci. V akci.",
    photo: "/images/lecturers/tomas.jpg?v=2",
  },
};

export function getLecturerBySlug(slug: string): LecturerData | null {
  return LECTURERS[slug] || null;
}
