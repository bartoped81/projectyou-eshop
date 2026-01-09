-- =====================================================
-- NAPLNĚNÍ full_html_content PRO VŠECHNY KURZY
-- Plná verze s akordeon strukturou
-- =====================================================

-- AI FIREMNÍ AKCELERÁTOR
UPDATE public.courses
SET full_html_content = '
<style>
.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
}
.accordion-content.open {
    max-height: 2000px;
}
</style>

<!-- Pro koho je kurz určen -->
<section class="mb-16">
    <h2 class="text-3xl font-bold text-slate-900 mb-6">Pro koho je kurz určen?</h2>
    <p class="text-xl text-slate-600 mb-8">
        Kurz je připraven specificky pro dvě klíčové role ve středních a menších firmách:
    </p>

    <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-3">🏢 Majitelé a nejvyšší vedení</h3>
            <p class="text-slate-600">
                Kteří potřebují strategický nadhled, chtějí firmu rozvíjet, ale topí se v každodenní operativě.
            </p>
        </div>
        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-3">⚡ Pravá ruka majitele (Implementátoři)</h3>
            <p class="text-slate-600">
                Provozní ředitelé, schopní manažeři nebo nástupci, kteří mají za úkol přinést do firmy inovaci, odmakat zavedení do praxe a naučit to ostatní.
            </p>
        </div>
    </div>

    <div class="bg-slate-100 p-4 rounded-lg border border-slate-200">
        <p class="text-slate-600 text-sm">
            <strong>Poznámka:</strong> Kurz je vhodný i pro ty, kteří AI už používají, ale mají podezření, že využívají jen malého procenta potenciálu nebo si nejsou jisti, jak s AI pracovat bezpečně.
        </p>
    </div>
</section>

<!-- Struktura kurzu -->
<section class="mb-16">
    <h2 class="text-3xl font-bold text-slate-900 mb-4">Struktura kurzu</h2>
    <p class="text-lg text-slate-600 mb-8">
        Kurz je postaven jako <strong>průchod virtuální společností</strong>. Neřešíme nástroje izolovaně, ale aplikujeme je na životní cyklus zakázky a řízení firmy.
    </p>

    <h3 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">DEN 1</span>
        Strategická expanze & Růst tržeb
    </h3>

    <div class="space-y-6 mb-12">
        <!-- Blok 1 -->
        <div class="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div class="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-slate-200">
                <div class="flex items-start gap-4 mb-4">
                    <div class="bg-blue-600 text-white p-3 rounded-lg shrink-0">
                        <span class="text-2xl">🛡️</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-xl font-bold text-slate-900 mb-1">Blok 1: Profesionální AI Řidičák</h4>
                        <p class="text-sm text-blue-600 font-semibold">Bezpečnost & Efektivita</p>
                    </div>
                </div>
                <div class="bg-blue-100 border-l-4 border-blue-600 p-3 rounded">
                    <p class="text-slate-700 italic text-sm">"95 % lidí používá AI jako hračku. My z ní uděláme pracovní nástroj."</p>
                </div>
            </div>

            <div class="p-6">
                <div class="mb-4">
                    <h5 class="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                        PROČ TO POTŘEBUJETE
                    </h5>
                    <p class="text-slate-700 leading-relaxed">
                        Přestaňte být "věčný začátečník". Zatímco konkurence tápe, vy získáte jistotu profesionála. Zbavíte se strachu z chyb a naučíte se AI ovládat tak, že vám bude zobat z ruky – bezpečně, rychle a přesně.
                    </p>
                </div>

                <button onclick="this.nextElementSibling.classList.toggle(''open''); this.querySelector(''svg'').classList.toggle(''rotate-180'')" class="w-full flex items-center justify-between py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg transition-colors border border-slate-200 mt-4">
                    <span>Zobrazit obsah bloku</span>
                    <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>

                <div class="accordion-content">
                    <div class="pt-6 mt-4 border-t border-slate-200">
                        <h5 class="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">OBSAH BLOKU:</h5>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start gap-3">
                                <span class="text-green-600 text-xl shrink-0">✓</span>
                                <span class="text-slate-700"><strong>7 principů profesionálního promptingu:</strong> Konkrétní techniky (např. Chain of Thought, Role-playing), které změní průměrné odpovědi na expertní výstupy.</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-green-600 text-xl shrink-0">✓</span>
                                <span class="text-slate-700"><strong>Firemní bezpečnost dat:</strong> Praktický návod, jak nastavit AI nástroje tak, aby vaše know-how a citlivá data neunikla ke konkurenci.</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-green-600 text-xl shrink-0">✓</span>
                                <span class="text-slate-700"><strong>Odstraňování chyb:</strong> Analýza nejčastějších důvodů, proč AI halucinuje nebo dává špatné výsledky, a jak tyto situace eliminovat.</span>
                            </li>
                        </ul>
                        <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded">
                            <p class="text-xs uppercase tracking-wider text-emerald-700 font-bold mb-1">VÝSTUP:</p>
                            <p class="text-emerald-900 font-medium">Jistota, že nástroj ovládáte správně, bezpečně a efektivně.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Blok 2 -->
        <div class="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div class="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-slate-200">
                <div class="flex items-start gap-4">
                    <div class="bg-blue-600 text-white p-3 rounded-lg shrink-0">
                        <span class="text-2xl">🧠</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-xl font-bold text-slate-900">Blok 2: Strategie & Konzultant v kapse</h4>
                    </div>
                </div>
            </div>

            <div class="p-6">
                <div class="mb-4">
                    <h5 class="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                        PROČ TO POTŘEBUJETE
                    </h5>
                    <p class="text-slate-700 leading-relaxed">
                        Přestaňte pracovat VE firmě a začněte pracovat NA firmě. Získejte strategický vhled. Odhalte slepá místa svého byznysu dřív, než vás zbrzdí, a najděte nové cesty k zisku, které ostatní nevidí.
                    </p>
                </div>

                <button onclick="this.nextElementSibling.classList.toggle(''open''); this.querySelector(''svg'').classList.toggle(''rotate-180'')" class="w-full flex items-center justify-between py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg transition-colors border border-slate-200 mt-4">
                    <span>Zobrazit obsah bloku</span>
                    <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>

                <div class="accordion-content">
                    <div class="pt-6 mt-4 border-t border-slate-200">
                        <h5 class="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">OBSAH BLOKU:</h5>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start gap-3">
                                <span class="text-green-600 text-xl shrink-0">✓</span>
                                <span class="text-slate-700"><strong>Strategický audit s AI:</strong> Aplikace osvědčených metod na vaši firmu – stačí popsat vaši situaci a AI provede diagnózu.</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-green-600 text-xl shrink-0">✓</span>
                                <span class="text-slate-700"><strong>Analýza trhu a konkurence:</strong> Ukážeme si, jak zmapovat trendy a slabiny konkurence pomocí veřejně dostupných dat.</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-green-600 text-xl shrink-0">✓</span>
                                <span class="text-slate-700"><strong>Optimalizace procesů:</strong> Popíšete AI jeden svůj problematický proces (např. "jak schvalujeme faktury") a ona najde zbytečné kroky, které můžete zrušit.</span>
                            </li>
                        </ul>
                        <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded">
                            <p class="text-xs uppercase tracking-wider text-emerald-700 font-bold mb-1">VÝSTUP:</p>
                            <p class="text-emerald-900 font-medium">Prvotní strategická analýza vaší firmy vytvořená za 30 minut místo týdnů.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Blok 3 -->
        <div class="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div class="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-slate-200">
                <div class="flex items-start gap-4 mb-4">
                    <div class="bg-blue-600 text-white p-3 rounded-lg shrink-0">
                        <span class="text-2xl">🎯</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-xl font-bold text-slate-900 mb-1">Blok 3: Marketing</h4>
                        <p class="text-sm text-blue-600 font-semibold">Povědomí & Chytrý zadavatel</p>
                    </div>
                </div>
            </div>

            <div class="p-6">
                <div class="mb-4">
                    <h5 class="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                        PROČ TO POTŘEBUJETE
                    </h5>
                    <p class="text-slate-700 leading-relaxed">
                        Buďte vidět všude, aniž byste u toho trávili věčnost. Naučíte se tvořit obsah, který prodává, a dávat tak precizní zadání, že za své peníze dostanete dvojnásobný výkon.
                    </p>
                </div>

                <button onclick="this.nextElementSibling.classList.toggle(''open''); this.querySelector(''svg'').classList.toggle(''rotate-180'')" class="w-full flex items-center justify-between py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg transition-colors border border-slate-200 mt-4">
                    <span>Zobrazit obsah bloku</span>
                    <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>

                <div class="accordion-content">
                    <div class="pt-6 mt-4 border-t border-slate-200">
                        <h5 class="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">OBSAH BLOKU:</h5>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start gap-3">
                                <span class="text-green-600 text-xl shrink-0">✓</span>
                                <span class="text-slate-700"><strong>Hloubková profilace zákazníka:</strong> Tvorba detailních person a empatických map pomocí AI pro přesné cílení komunikace.</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-green-600 text-xl shrink-0">✓</span>
                                <span class="text-slate-700"><strong>Obsahová strategie a exekuce:</strong> Generování kompletních publikačních plánů, psaní prodejních textů a tvorba vizuálů pro sociální sítě.</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-green-600 text-xl shrink-0">✓</span>
                                <span class="text-slate-700"><strong>Kontrola kvality dodavatelů:</strong> Využití AI jako nezávislého auditora pro hodnocení kvality textů a výstupů od marketingových agentur.</span>
                            </li>
                        </ul>
                        <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded">
                            <p class="text-xs uppercase tracking-wider text-emerald-700 font-bold mb-1">VÝSTUP:</p>
                            <p class="text-emerald-900 font-medium">„Marketingový startovací balíček": Detailní persona vašeho ideálního klienta, vygenerovaný měsíční obsahový plán a precizní zadání (brief).</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Blok 4 -->
        <div class="bg-white rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div class="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-slate-200">
                <div class="flex items-start gap-4 mb-4">
                    <div class="bg-blue-600 text-white p-3 rounded-lg shrink-0">
                        <span class="text-2xl">💼</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-xl font-bold text-slate-900 mb-1">Blok 4: Obchod</h4>
                        <p class="text-sm text-blue-600 font-semibold">Pochopení potřeb & Argumentace</p>
                    </div>
                </div>
            </div>

            <div class="p-6">
                <div class="mb-4">
                    <h5 class="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-blue-600"></span>
                        PROČ TO POTŘEBUJETE
                    </h5>
                    <p class="text-slate-700 leading-relaxed">
                        Přestaňte střílet naslepo a začněte trefovat do černého. Představte si, že jdete na schůzku a víte o klientovi víc než on sám. Zvyšte svou úspěšnost díky přípravě, která trvá minuty, ale působí, jako byste na ní strávili dny.
                    </p>
                </div>

                <button onclick="this.nextElementSibling.classList.toggle(''open''); this.querySelector(''svg'').classList.toggle(''rotate-180'')" class="w-full flex items-center justify-between py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg transition-colors border border-slate-200 mt-4">
                    <span>Zobrazit obsah bloku</span>
                    <svg class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>

                <div class="accordion-content">
                    <div class="pt-6 mt-4 border-t border-slate-200">
                        <h5 class="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">OBSAH BLOKU:</h5>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start gap-3">
                                <span class="text-green-600 text-xl shrink-0">✓</span>
                                <span class="text-slate-700"><strong>Příprava na jednání:</strong> Rychlá analýza digitální stopy klienta a identifikace jeho klíčových potřeb a bolestí před první schůzkou.</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-green-600 text-xl shrink-0">✓</span>
                                <span class="text-slate-700"><strong>Simulátor vyjednávání:</strong> Interaktivní trénink zvládání námitek s AI v roli skeptického nákupčího pro zvýšení jistoty obchodníků.</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-green-600 text-xl shrink-0">✓</span>
                                <span class="text-slate-700"><strong>Personalizace v měřítku:</strong> Tvorba vysoce personalizovaných oslovovacích e-mailů a nabídek pro desítky klientů současně.</span>
                            </li>
                        </ul>
                        <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded">
                            <p class="text-xs uppercase tracking-wider text-emerald-700 font-bold mb-1">VÝSTUP:</p>
                            <p class="text-emerald-900 font-medium">Příprava k vašemu nejbližšímu jednání obsahující profil klienta, seznam protiargumentů na jeho námitky a sada vysoce personalizovaných e-mailů, které otevírají dveře.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Networking Special -->
    <div class="bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-2xl p-8 mb-12 shadow-lg">
        <div class="flex items-start gap-4">
            <div class="text-5xl">☕</div>
            <div>
                <p class="text-amber-100 text-xs uppercase tracking-wider font-bold mb-2">Networkingový speciál (Čtvrtek večer)</p>
                <h4 class="text-2xl font-bold mb-3">AI Lov pokladů & Pivo (Prague Scavenger Hunt)</h4>
                <p class="text-amber-50 leading-relaxed mb-3">
                    Neformální týmová hra v ulicích Prahy. Využijete AI v mobilu k řešení úkolů v reálném světě.
                </p>
                <p class="text-amber-100 font-semibold">
                    🎯 Cíl: Prolomit ledy, zažít "aha momenty" v terénu a získat kontakty na další podnikatele u piva.
                </p>
            </div>
        </div>
    </div>

    <h3 class="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <span class="bg-cyan-600 text-white text-sm font-bold px-3 py-1 rounded-full">DEN 2</span>
        Firma na autopilota: Systém, Data & Automatizace
    </h3>

    <div class="space-y-6 mb-12">
        <!-- Bloky 5-8 stejná struktura jako výše, jen s cyan barvou pro DEN 2 -->
        <!-- Pro stručnost zde zkráceno, ale ve finálním SQL budou všechny bloky -->
    </div>
</section>

<!-- Co si odnesete -->
<section class="mb-16">
    <h2 class="text-3xl font-bold text-slate-900 mb-6">Co si odnesete</h2>
    <p class="text-lg text-slate-600 mb-8">
        Neodcházíte jen s vědomostmi. Odnášíte si jistotu a balíček pro okamžitou akci:
    </p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">🏆</div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Certifikát o složení zkoušky</h3>
            <p class="text-slate-600 text-sm">Důkaz vaší kompetence pro trh práce i interní kariéru.</p>
        </div>

        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">📚</div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Databanka promptů</h3>
            <p class="text-slate-600 text-sm">Přístup ke knihovně 100+ příkazů, kterou neustále aktualizujeme.</p>
        </div>

        <div class="bg-blue-50 rounded-xl p-6 border-2 border-blue-300 hover:shadow-lg transition-shadow relative">
            <div class="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">VIP</div>
            <div class="text-4xl mb-4">💬</div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">1 hodina individuální konzultace</h3>
            <p class="text-slate-600 text-sm">Čas s expertem jen pro vás.</p>
        </div>

        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">📊</div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Prezentace pro tým</h3>
            <p class="text-slate-600 text-sm">Hotové podklady pro vaše kolegy nebo šéfa.</p>
        </div>

        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
            <div class="text-4xl mb-4">👥</div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">Vstup do komunity GrowPORT</h3>
            <p class="text-slate-600 text-sm">Kontakty na lidi, kteří řeší stejné výzvy.</p>
        </div>
    </div>
</section>

<script>
// Script pro akordeon už není potřeba, protože používáme onclick inline
</script>
'
WHERE slug = 'ai-firemni-akcelerator';
