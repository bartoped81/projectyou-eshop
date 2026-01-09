// Data pro AI Firemní Akcelerátor kurz
export interface CourseBlockData {
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

export const AI_COURSE_BLOCKS: CourseBlockData[] = [
  // DEN 1 - Blocks 1-4 (blue)
  {
    icon: "🛡️",
    title: "Blok 1: Profesionální AI Řidičák",
    subtitle: "Bezpečnost & Efektivita",
    quote: "95 % lidí používá AI jako hračku. My z ní uděláme pracovní nástroj.",
    why: "Přestaňte být \"věčný začátečník\". Zatímco konkurence tápe, vy získáte jistotu profesionála. Zbavíte se strachu z chyb a naučíte se AI ovládat tak, že vám bude zobat z ruky – bezpečně, rychle a přesně.",
    content: [
      {
        title: "7 principů profesionálního promptingu",
        description: "Konkrétní techniky (např. Chain of Thought, Role-playing), které změní průměrné odpovědi na expertní výstupy.",
      },
      {
        title: "Firemní bezpečnost dat",
        description: "Praktický návod, jak nastavit AI nástroje tak, aby vaše know-how a citlivá data neunikla ke konkurenci.",
      },
      {
        title: "Odstraňování chyb",
        description: "Analýza nejčastějších důvodů, proč AI halucinuje nebo dává špatné výsledky, a jak tyto situace eliminovat.",
      },
    ],
    output: "Jistota, že nástroj ovládáte správně, bezpečně a efektivně.",
    color: "blue",
  },
  {
    icon: "🧠",
    title: "Blok 2: Strategie & Konzultant v kapse",
    why: "Přestaňte pracovat VE firmě a začněte pracovat NA firmě. Získejte strategický vhled. Odhalte slepá místa svého byznysu dřív, než vás zbrzdí, a najděte nové cesty k zisku, které ostatní nevidí.",
    content: [
      {
        title: "Strategický audit s AI",
        description: "Aplikace osvědčených metod na vaši firmu – stačí popsat vaši situaci a AI provede diagnózu.",
      },
      {
        title: "Analýza trhu a konkurence",
        description: "Ukážeme si, jak zmapovat trendy a slabiny konkurence pomocí veřejně dostupných dat.",
      },
      {
        title: "Optimalizace procesů",
        description: "Popíšete AI jeden svůj problematický proces (např. \"jak schvalujeme faktury\") a ona najde zbytečné kroky, které můžete zrušit.",
      },
    ],
    output: "Prvotní strategická analýza vaší firmy vytvořená za 30 minut místo týdnů.",
    color: "blue",
  },
  {
    icon: "🎯",
    title: "Blok 3: Marketing",
    subtitle: "Povědomí & Chytrý zadavatel",
    why: "Buďte vidět všude, aniž byste u toho trávili věčnost. Naučíte se tvořit obsah, který prodává, a dávat tak precizní zadání, že za své peníze dostanete dvojnásobný výkon.",
    content: [
      {
        title: "Hloubková profilace zákazníka",
        description: "Tvorba detailních person a empatických map pomocí AI pro přesné cílení komunikace.",
      },
      {
        title: "Obsahová strategie a exekuce",
        description: "Generování kompletních publikačních plánů, psaní prodejních textů a tvorba vizuálů pro sociální sítě.",
      },
      {
        title: "Kontrola kvality dodavatelů",
        description: "Využití AI jako nezávislého auditora pro hodnocení kvality textů a výstupů od marketingových agentur.",
      },
    ],
    output: "Marketingový startovací balíček: Detailní persona vašeho ideálního klienta, vygenerovaný měsíční obsahový plán a precizní zadání (brief).",
    color: "blue",
  },
  {
    icon: "💼",
    title: "Blok 4: Obchod",
    subtitle: "Pochopení potřeb & Argumentace",
    why: "Přestaňte střílet naslepo a začněte trefovat do černého. Představte si, že jdete na schůzku a víte o klientovi víc než on sám. Zvyšte svou úspěšnost díky přípravě, která trvá minuty, ale působí, jako byste na ní strávili dny.",
    content: [
      {
        title: "Příprava na jednání",
        description: "Rychlá analýza digitální stopy klienta a identifikace jeho klíčových potřeb a bolestí před první schůzkou.",
      },
      {
        title: "Simulátor vyjednávání",
        description: "Interaktivní trénink zvládání námitek s AI v roli skeptického nákupčího pro zvýšení jistoty obchodníků.",
      },
      {
        title: "Personalizace v měřítku",
        description: "Tvorba vysoce personalizovaných oslovovacích e-mailů a nabídek pro desítky klientů současně.",
      },
    ],
    output: "Příprava k vašemu nejbližšímu jednání obsahující profil klienta, seznam protiargumentů na jeho námitky a sada vysoce personalizovaných e-mailů, které otevírají dveře.",
    color: "blue",
  },
  // DEN 2 - Blocks 5-8 (cyan)
  {
    icon: "⚡",
    title: "Blok 5: Realizace zakázky & Efektivita (Delivery)",
    why: "Dodejte slíbené dřív, než klient dopije kávu. Zbavte se chaosu v projektech a byrokracie, která brzdí váš tým. Získáte systém, díky kterému budou zakázky protékat firmou hladce, bez chyb a bez stresu.",
    content: [
      {
        title: "Automatizace standardních postupů",
        description: "Ukážeme si, jak jednoduše nadiktovat postup práce a nechat AI, ať okamžitě vytvoří přehledný checklist pro vaše lidi. Zajistíte tak, že se zakázka zrealizuje správně, i když u toho nebudete.",
      },
      {
        title: "Projektová administrativa",
        description: "Automatizace tvorby zápisů z porad, zadávání úkolů a hlídání termínů pro hladký průběh zakázek.",
      },
      {
        title: "Právní a technická analýza",
        description: "Okamžitá kontrola smluv a technické dokumentace pro rychlejší rozhodování a úsporu nákladů na právní služby.",
      },
    ],
    output: "Transformátor porad - Prompt, do kterého vložíte surový přepis nebo audio z porady, a on vám okamžitě vygeneruje profesionální zápis pro klienta, seznam úkolů pro tým (kdo-co-do kdy) a termíny do kalendáře.",
    color: "cyan",
  },
  {
    icon: "👥",
    title: "Blok 6: AI Leadership (Řízení lidí)",
    why: "Staňte se šéfem, kterého lidé následují, ne jen poslouchají. Uvolněte si ruce od administrativy a věnujte se tomu nejdůležitějšímu – svým lidem. Naučte se vést tým s empatií podpořenou daty a řešit konflikty dřív, než vzniknou.",
    content: [
      {
        title: "Moderní nábor",
        description: "Tvorba atraktivních inzerátů a strukturovaný onboarding nových zaměstnanců bez prázdných frází.",
      },
      {
        title: "Zpětná vazba a hodnocení",
        description: "Formulace konstruktivního a motivujícího hodnocení zaměstnanců s podporou AI.",
      },
      {
        title: "AI Mentoring",
        description: "Využití AI jako stínového kouče pro přípravu na náročné personální rozhovory a řešení konfliktů.",
      },
    ],
    output: "Manažerský HR Asistent: Hotový inzerát, který přitáhne talenty, struktura pro efektivní hodnotící pohovor a scénář pro vyřešení konkrétního konfliktu, který vás v týmu aktuálně pálí.",
    color: "cyan",
  },
  {
    icon: "📊",
    title: "Blok 7: Datová analýza & Finance",
    why: "Vyměňte dojmy za tvrdá data a křišťálovou kouli za přesné predikce. Nechte AI, ať vám ukáže, kde vám utíkají peníze a kde leží skrytý zisk. Rozhodujte se s jistotou finančního ředitele.",
    content: [
      {
        title: "Interaktivní datová analýza",
        description: "Naučíme vás \"mluvit\" s daty. Na vzorových souborech si ukážeme, jak najít trendy, aniž byste uměli složité vzorce.",
      },
      {
        title: "Finanční modelování",
        description: "Jak se ptát AI na scénáře \"co kdyby\" (např. \"co když zvedneme ceny o 10 %?\") a získat rychlou predikci.",
      },
      {
        title: "Automatizace reportingu",
        description: "Ukázka, jak přeměnit surová data na přehledný manažerský report na jedno kliknutí.",
      },
    ],
    output: "Interaktivní model, který vám na počkání spočítá dopady vašich rozhodnutí (scénáře co když), a šablona pro automatický manažerský report, který převede data z tabulek do srozumitelné češtiny.",
    color: "cyan",
  },
  {
    icon: "🚀",
    title: "Blok 8: Automatizace (Praktická ukázka)",
    why: "Nechte roboty dělat práci robotů, vy se věnujte byznysu. Představte si firmu, která běží sama, i když vy spíte. Postavte si svého prvního digitálního kolegu, který nikdy neonemocní, nedělá chyby a pracuje 24/7 zadarmo.",
    content: [
      {
        title: "Úvod do no-code automatizace",
        description: "Praktická ukázka v nástroji Make.com – jak propojit e-mail, AI a tabulky bez znalosti programování.",
      },
      {
        title: "Stavba prvního robota",
        description: "Společně postavíme funkční scénář (např. automatické třídění e-mailů nebo monitoring novinek), který si odnesete domů.",
      },
      {
        title: "Kalkulace úspor",
        description: "Reálná ukázka, kolik času a peněz ušetří konkrétní automatizace ve vaší firmě.",
      },
    ],
    output: "Reálně běžící automatizace (v Make.com), kterou si odnášíte nastavenou v počítači, spolu s kalkulací úspor, která prokáže návratnost investice do tohoto kurzu.",
    color: "cyan",
  },
];
