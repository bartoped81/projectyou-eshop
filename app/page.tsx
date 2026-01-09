import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - přesně jako v pyou.html */}
      <section className="relative min-h-[85vh] flex items-end pb-24 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          {/* Gradient overlay zleva - přesně jako pyou.html */}
          <div className="absolute inset-0 z-10"
               style={{background: 'linear-gradient(37deg, rgb(255, 255, 255) 12.915%, rgba(255, 255, 255, 0) 52.275%)'}} />
          <img
            src="https://www.projectyou.cz/files/responsive/1920/0/projectyou-241108-0522-web-large.jpg"
            alt="ProjectYOU"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 leading-[1.1] mb-6">
              Náskok díky lidem<span className="text-blue-600">.</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-normal text-slate-700 mb-12 leading-relaxed">
              Tvoříme s vámi svět, ve kterém lidi baví naplno žít a pracovat.
            </h2>
          </div>
        </div>
      </section>

      {/* 4 programové lišty - přesný obsah z pyou.html */}
      <section className="relative -mt-32 z-30 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 shadow-2xl rounded-xl overflow-hidden">
            {/* Pro organizace */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-10 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 group cursor-pointer">
              <h3 className="text-xl font-bold mb-6 group-hover:scale-105 transition-transform duration-300">
                Pro organizace
              </h3>
              <ul className="space-y-3 text-sm text-blue-50/90">
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Tvorba a naplňování strategie</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Inovační programy</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Změnové programy</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Evoluce firemní kultury</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Generace spolu</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Employer Brand</li>
              </ul>
            </div>

            {/* Pro leadery */}
            <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white p-10 hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 group cursor-pointer">
              <h3 className="text-xl font-bold mb-6 group-hover:scale-105 transition-transform duration-300">
                Pro leadery
              </h3>
              <ul className="space-y-3 text-sm text-cyan-50/90">
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; AI Leadership hravě</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Leader na startu</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Leader pro budoucnost</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Gamifikované programy pro leadery</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Leader pro udržitelnost</li>
              </ul>
            </div>

            {/* Pro týmy */}
            <div className="bg-gradient-to-br from-rose-500 to-rose-600 text-white p-10 hover:from-rose-600 hover:to-rose-700 transition-all duration-300 group cursor-pointer">
              <h3 className="text-xl font-bold mb-6 group-hover:scale-105 transition-transform duration-300">
                Pro týmy
              </h3>
              <ul className="space-y-3 text-sm text-rose-50/90">
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Sehraný leadership tým</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Rozjezd nového týmu</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Insights Discovery pro team</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Týmový Gallup - silné stránky</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Výkonné týmy bez hranic</li>
              </ul>
            </div>

            {/* Pro talenty */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-10 hover:from-amber-600 hover:to-amber-700 transition-all duration-300 group cursor-pointer">
              <h3 className="text-xl font-bold mb-6 group-hover:scale-105 transition-transform duration-300">
                Pro talenty
              </h3>
              <ul className="space-y-3 text-sm text-amber-50/90">
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Program X - The Board Challengers</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Story building &amp; telling</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Vyjednávání se stakeholdery</li>
                <li className="hover:text-white hover:translate-x-1 transition-all duration-200">&gt; Tvoje osobní značka a síť</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - přesný text z pyou.html */}
      <section className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://www.projectyou.cz/files/lisky-kolecka.jpg"
                alt="ProjectYOU team"
                className="rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Jsme důvěryhodným partnerem<br />
                pro inovativní rozvoj lidí<span className="text-blue-600">.</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
                V projectYOU podporujeme růst lídrů, týmů a talentů prostřednictvím
                inovativních rozvojových projektů. Pomáháme firmám rozvíjet autentickou
                kulturu, která spojuje lidi. Společně tvoříme budoucnost vašeho úspěchu
                – díky tomu, že posouváte práci s lidmi na novou úroveň.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                Pojďme se potkat
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reference Section - "Těší nás spolupracovat..." */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Těší nás spolupracovat<br />
              na projektech s dopadem<span className="text-blue-600">.</span>
            </h2>
          </div>

          <div className="w-full max-w-4xl mx-auto mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 items-center">
            {/* Loga partnerů - placeholder s lepším designem */}
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300 h-24">
              <span className="text-slate-500 font-bold text-lg">ŠKODA</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300 h-24">
              <span className="text-slate-500 font-bold text-lg">ČEZ</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300 h-24">
              <span className="text-slate-500 font-bold text-lg">Vodafone</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300 h-24">
              <span className="text-slate-500 font-bold text-lg">ECI+</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300 h-24">
              <span className="text-slate-500 font-bold text-lg">PPG</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300 h-24">
              <span className="text-slate-500 font-bold text-lg">Allianz</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300 h-24">
              <span className="text-slate-500 font-bold text-lg">T-Mobile</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300 h-24">
              <span className="text-slate-500 font-bold text-lg">Eurowag</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300 h-24">
              <span className="text-slate-500 font-bold text-lg">KIA</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300 h-24">
              <span className="text-slate-500 font-bold text-lg">Prazdroj</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300 h-24">
              <span className="text-slate-500 font-bold text-lg">Dentsu</span>
            </div>
            <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300 h-24">
              <span className="text-slate-500 font-bold text-lg">Vitesco</span>
            </div>
          </div>
        </div>
      </section>

      {/* Proč s námi? Section - z pyou.html */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight">
                Proč<br />
                s námi?
              </h2>
            </div>

            <div className="space-y-4">
              {/* Accordion Item 1 */}
              <details className="group bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer list-none py-5 px-6 border-b border-blue-400/30 group-open:border-transparent">
                  <span className="text-lg md:text-xl font-semibold">Vtahujeme lidi do hry</span>
                  <ChevronDown className="w-6 h-6 transition-transform duration-300 group-open:rotate-180 flex-shrink-0 ml-4" />
                </summary>
                <div className="py-5 px-6 text-blue-50/90 leading-relaxed">
                  Prožitek vytváří zájem. Proto přinášíme programy založené na příběhu a zážitkovém učení. Postavíme vaše lidi do divadla, aby se v bezpečí dotkli svého nitra. Vtáhneme je do hry, aby mohli odvážně testovat nové formy jednání.
                </div>
              </details>

              {/* Accordion Item 2 */}
              <details className="group bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer list-none py-5 px-6 border-b border-blue-400/30 group-open:border-transparent">
                  <span className="text-lg md:text-xl font-semibold">Jsme posedlí praktičností</span>
                  <ChevronDown className="w-6 h-6 transition-transform duration-300 group-open:rotate-180 flex-shrink-0 ml-4" />
                </summary>
                <div className="py-5 px-6 text-blue-50/90 leading-relaxed">
                  Stavíme na datech, funkčních příkladech a ověřených postupech. Usilujeme o vhled do vašeho přirozeného prostředí. Nasloucháme vám. Díky expertnímu think-tanku máme náročné mentory, kteří jsou kapacitami v odvětví.
                </div>
              </details>

              {/* Accordion Item 3 */}
              <details className="group bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer list-none py-5 px-6 border-b border-blue-400/30 group-open:border-transparent">
                  <span className="text-lg md:text-xl font-semibold">Držíme globální standard</span>
                  <ChevronDown className="w-6 h-6 transition-transform duration-300 group-open:rotate-180 flex-shrink-0 ml-4" />
                </summary>
                <div className="py-5 px-6 text-blue-50/90 leading-relaxed">
                  Trénujeme v Londýně, v Praze i ve Vídni. Inspirujeme se na mezinárodních konferencích. Využíváme světové nástroje. Od Insights® ze Skotska, Strenghtfinder® z USA po leadership simulace z Malmo z budovy, kde vznikl Minecraft.
                </div>
              </details>

              {/* Accordion Item 4 */}
              <details className="group bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer list-none py-5 px-6 border-b border-blue-400/30 group-open:border-transparent">
                  <span className="text-lg md:text-xl font-semibold">Jsme inovační hub</span>
                  <ChevronDown className="w-6 h-6 transition-transform duration-300 group-open:rotate-180 flex-shrink-0 ml-4" />
                </summary>
                <div className="py-5 px-6 text-blue-50/90 leading-relaxed">
                  Propojujeme business vhled, psychologii a didaktiku. Často si vyhrneme rukávy a tvoříme nové věci: užitečné, kvalitní a krásné. Vyvíjíme je od nuly v design sprintech. A iterativně je vylepšujeme díky testování a zpětné vazbě.
                </div>
              </details>

              {/* Accordion Item 5 */}
              <details className="group bg-white/5 hover:bg-white/10 transition-colors duration-300 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer list-none py-5 px-6 border-b border-blue-400/30 group-open:border-transparent">
                  <span className="text-lg md:text-xl font-semibold">Vytváříme pozitivní stopu</span>
                  <ChevronDown className="w-6 h-6 transition-transform duration-300 group-open:rotate-180 flex-shrink-0 ml-4" />
                </summary>
                <div className="py-5 px-6 text-blue-50/90 leading-relaxed">
                  Začínáme s myšlenkou na dopad. Řešení tvoříme tak, aby vedly ke skutečné změně a posunu na individuální, týmové nebo organizační úrovni. A pokud to neumíme, tak vám to řekneme a rádi doporučíme partnery, kteří to zvládnou.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Oblíbené programy Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Oblíbené programy<span className="text-blue-600">.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Leader na startu */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl p-8 group">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Leader na startu</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Na přístupu vedoucího stojí zapojení celého týmu. Vedení lidí je řemeslo a náš program pomáhá lídrům pracovat s lidmi lépe a vědoměji. Inspiruje je k práci na sobě. Pomáhá jim budovat motivované týmy a další lídry.
              </p>
            </div>

            {/* Sehraný Leadership Team */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl p-8 group">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Sehraný Leadership Team</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Vytvořte za několik dní intenzivní spolupráce to, o co jiné týmy marně usilují roky. Buďte vzorem díky jasnému směřování a zdravé týmové kultuře. Prohlubte vzájemnou důvěru, nastavte strategii, vyjasněte si role a týmové principy. A leťte nahoru.
              </p>
            </div>

            {/* Leadership pro budoucnost */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl p-8 group">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Leadership pro budoucnost</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Zapojte lidi s mimořádným přístupem a talentem. Pozvěte je k řešení výzev pro budoucnost firmy. Oni do toho vloží srdce a s pomocí reálných inovačních projektů a naší podpory vám pomohou posunout firmu dopředu a přitom vyrostou.
              </p>
            </div>

            {/* Inovační design sprint 2.0 */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl p-8 group">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Inovační design sprint 2.0</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Překvapivý průlom během 4 dnů? Vymyslet využití AI ve firmě k masivnímu zvýšení produktivity? Vyřešit dlouhodobý problém s retencí nebo onboardingem? Vytvořit kampaň pro mladou generaci? Provedeme vás strhujícím procesem, který akceleruje vaše týmové řešitelské schopnosti.
              </p>
            </div>

            {/* xGeneration */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition-all duration-300 hover:shadow-xl p-8 group">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">xGeneration - spolupráce napříč generacemi</h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                Každá generace má své představy a potřeby, ovlivněné výchovným prostředím i technologiemi. Chcete podpořit vzájemné učení mezi generacemi? Pomozte jim prozkoumat své potřeby, zvýšit respekt a vytvořit prostředí, kde je to společně baví.
              </p>
            </div>

            {/* Umíme toho víc */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl border-2 border-blue-600 hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center justify-center text-center group">
              <h3 className="text-xl md:text-2xl font-bold mb-6">Umíme toho víc...</h3>
              <Link
                href="/prehled-programu"
                className="inline-flex items-center px-6 py-3 bg-white hover:bg-slate-100 text-blue-600 font-semibold rounded-lg transition-all duration-300 group-hover:scale-105"
              >
                Kompletní menu
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Liščí projekty nemají hranice<span className="text-blue-600">.</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            Každá firma je jedinečná, a my věříme, že řešení vašich výzev by mělo být stejně jedinečné. Společně s vámi najdeme příležitosti pro rozvoj a vytvoříme program, který bude nejen poutavý, ale bude mít dopad. Nejde o hotové workshopy, ale o konkrétní odpovědi na vaše potřeby.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group"
          >
            Pojďme se potkat
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
}
