-- =====================================================
-- NAPLNĚNÍ full_html_content PRO VŠECHNY KURZY
-- =====================================================

-- AI FIREMNÍ AKCELERÁTOR
UPDATE public.courses
SET full_html_content = '
<!-- Pro koho je kurz určen -->
<section class="mb-12">
    <h2 class="text-3xl font-bold text-slate-900 mb-6">Pro koho je kurz určen?</h2>
    <p class="text-xl text-slate-600 mb-8">
        Kurz je připraven specificky pro dvě klíčové role ve středních a menších firmách:
    </p>

    <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-3">Majitelé a nejvyšší vedení</h3>
            <p class="text-slate-600">
                Kteří potřebují strategický nadhled, chtějí firmu rozvíjet, ale topí se v každodenní operativě.
            </p>
        </div>
        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-3">Pravá ruka majitele (Implementátoři)</h3>
            <p class="text-slate-600">
                Provozní ředitelé, schopní manažeři nebo nástupci, kteří mají za úkol přinést do firmy inovaci, odmakat zavedení do praxe a naučit to ostatní.
            </p>
        </div>
    </div>

    <div class="bg-slate-100 p-4 rounded-lg border border-slate-200">
        <p class="text-slate-600 text-sm">
            <strong>Poznámka:</strong> Kurz je vhodný i pro ty, kteří AI už používají, ale mají podezření, že využívají jen z malého procenta potenciálu nebo si nejsou jisti, jak s AI pracovat bezpečně.
        </p>
    </div>
</section>

<!-- Struktura kurzu -->
<section class="mb-12">
    <h2 class="text-3xl font-bold text-slate-900 mb-4">Struktura kurzu</h2>
    <p class="text-lg text-slate-600 mb-8">
        Kurz je postaven jako <strong>průchod virtuální společností</strong>. Neřešíme nástroje izolovaně, ale aplikujeme je na životní cyklus zakázky a řízení firmy.
    </p>

    <h3 class="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <span class="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">DEN 1</span>
        Strategická expanze & Růst tržeb
    </h3>

    <div class="space-y-6 mb-8">
        <div class="border-l-4 border-blue-600 pl-6 py-2">
            <h4 class="text-lg font-bold text-slate-900 mb-2">Blok 1: Profesionální AI Řidičák</h4>
            <p class="text-sm text-blue-600 font-medium mb-2">Bezpečnost & Efektivita</p>
            <p class="text-slate-700 italic mb-3">95 % lidí používá AI jako hračku. My z ní uděláme pracovní nástroj.</p>
            <ul class="space-y-2 text-slate-700">
                <li>✓ 7 principů profesionálního promptingu</li>
                <li>✓ Firemní bezpečnost dat</li>
                <li>✓ Odstraňování chyb a halucinací</li>
            </ul>
        </div>

        <div class="border-l-4 border-blue-600 pl-6 py-2">
            <h4 class="text-lg font-bold text-slate-900 mb-2">Blok 2: Strategie & Konzultant v kapse</h4>
            <p class="text-slate-700 mb-3">Přestaňte pracovat VE firmě a začněte pracovat NA firmě.</p>
            <ul class="space-y-2 text-slate-700">
                <li>✓ Strategický audit s AI</li>
                <li>✓ Analýza trhu a konkurence</li>
                <li>✓ Optimalizace procesů</li>
            </ul>
        </div>

        <div class="border-l-4 border-blue-600 pl-6 py-2">
            <h4 class="text-lg font-bold text-slate-900 mb-2">Blok 3: Marketing</h4>
            <p class="text-sm text-blue-600 font-medium mb-2">Povědomí & Chytrý zadavatel</p>
            <ul class="space-y-2 text-slate-700">
                <li>✓ Hloubková profilace zákazníka</li>
                <li>✓ Obsahová strategie a exekuce</li>
                <li>✓ Kontrola kvality dodavatelů</li>
            </ul>
        </div>

        <div class="border-l-4 border-blue-600 pl-6 py-2">
            <h4 class="text-lg font-bold text-slate-900 mb-2">Blok 4: Obchod</h4>
            <p class="text-sm text-blue-600 font-medium mb-2">Pochopení potřeb & Argumentace</p>
            <ul class="space-y-2 text-slate-700">
                <li>✓ Příprava na jednání</li>
                <li>✓ Simulátor vyjednávání</li>
                <li>✓ Personalizace v měřítku</li>
            </ul>
        </div>
    </div>

    <div class="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl p-6 mb-8">
        <h4 class="font-bold text-sm uppercase mb-2">Networkingový speciál (Čtvrtek večer)</h4>
        <h3 class="text-xl font-bold mb-2">AI Lov pokladů & Pivo</h3>
        <p class="text-amber-100 text-sm">
            Neformální týmová hra v ulicích Prahy. Využijete AI v mobilu k řešení úkolů v reálném světě.
        </p>
    </div>

    <h3 class="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <span class="bg-cyan-600 text-white text-sm font-bold px-3 py-1 rounded-full">DEN 2</span>
        Firma na autopilota: Systém, Data & Automatizace
    </h3>

    <div class="space-y-6">
        <div class="border-l-4 border-cyan-600 pl-6 py-2">
            <h4 class="text-lg font-bold text-slate-900 mb-2">Blok 5: Realizace zakázky & Efektivita</h4>
            <ul class="space-y-2 text-slate-700">
                <li>✓ Projektová dokumentace s AI</li>
                <li>✓ Projektová administrativa</li>
                <li>✓ Právní a technická analýza</li>
            </ul>
        </div>

        <div class="border-l-4 border-cyan-600 pl-6 py-2">
            <h4 class="text-lg font-bold text-slate-900 mb-2">Blok 6: AI Leadership</h4>
            <p class="text-sm text-cyan-600 font-medium mb-2">Řízení lidí</p>
            <ul class="space-y-2 text-slate-700">
                <li>✓ Moderní nábor</li>
                <li>✓ Zpětná vazba a hodnocení</li>
                <li>✓ AI Mentoring</li>
            </ul>
        </div>

        <div class="border-l-4 border-cyan-600 pl-6 py-2">
            <h4 class="text-lg font-bold text-slate-900 mb-2">Blok 7: Datová analýza & Finance</h4>
            <ul class="space-y-2 text-slate-700">
                <li>✓ Interaktivní datová analýza</li>
                <li>✓ Finanční modelování</li>
                <li>✓ Automatizace reportingu</li>
            </ul>
        </div>

        <div class="border-l-4 border-cyan-600 pl-6 py-2">
            <h4 class="text-lg font-bold text-slate-900 mb-2">Blok 8: Automatizace</h4>
            <p class="text-sm text-cyan-600 font-medium mb-2">Praktická ukázka</p>
            <ul class="space-y-2 text-slate-700">
                <li>✓ Úvod do no-code automatizace (Make.com)</li>
                <li>✓ Stavba prvního robota</li>
                <li>✓ Kalkulace úspor</li>
            </ul>
        </div>
    </div>
</section>

<!-- Co si odnesete -->
<section class="mb-12">
    <h2 class="text-3xl font-bold text-slate-900 mb-6">Co si odnesete</h2>
    <p class="text-lg text-slate-600 mb-8">
        Neodcházíte jen s vědomostmi. Odnášíte si jistotu a balíček pro okamžitou akci:
    </p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 class="text-lg font-bold text-slate-900 mb-2">Certifikát o složení zkoušky</h3>
            <p class="text-slate-600 text-sm">Důkaz vaší kompetence pro trh práce i interní kariéru.</p>
        </div>

        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 class="text-lg font-bold text-slate-900 mb-2">Databanka promptů</h3>
            <p class="text-slate-600 text-sm">Přístup ke knihovně 100+ příkazů, kterou neustále aktualizujeme.</p>
        </div>

        <div class="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div class="text-xs font-bold text-blue-800 bg-blue-200 rounded px-2 py-1 inline-block mb-2">VIP</div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">1 hodina individuální konzultace</h3>
            <p class="text-slate-600 text-sm">Čas s expertem jen pro vás.</p>
        </div>

        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 class="text-lg font-bold text-slate-900 mb-2">Prezentace pro tým</h3>
            <p class="text-slate-600 text-sm">Hotové podklady pro vaše kolegy nebo šéfa.</p>
        </div>

        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 class="text-lg font-bold text-slate-900 mb-2">Vstup do komunity GrowPORT</h3>
            <p class="text-slate-600 text-sm">Kontakty na lidi, kteří řeší stejné výzvy.</p>
        </div>
    </div>
</section>
'
WHERE slug = 'ai-firemni-akcelerator';

-- APLIKOVANÁ IMPROVIZACE
UPDATE public.courses
SET full_html_content = '
<!-- K čemu je to dobré v byznysu -->
<section class="mb-12">
    <h2 class="text-3xl font-bold text-slate-900 mb-8">K čemu je to dobré v byznysu?</h2>

    <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-slate-50 rounded-xl p-8 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-3">Pohotovost</h3>
            <p class="text-slate-700">
                Naučíte se reagovat s lehkostí i v úplně nepředvídatelných situacích před klientem nebo týmem.
            </p>
        </div>

        <div class="bg-slate-50 rounded-xl p-8 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-3">Storytelling</h3>
            <p class="text-slate-700">
                Přirozeně rozvinete svůj hlas, projev a schopnost vyprávět příběhy, které lidi skutečně strhnou.
            </p>
        </div>

        <div class="bg-slate-50 rounded-xl p-8 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-3">Spolupráce</h3>
            <p class="text-slate-700">
                Poznáte základní principy Ano, a..., které fungují na jevišti i v komunikaci a vztazích v běžném životě.
            </p>
        </div>
    </div>
</section>

<!-- Struktura workshopu -->
<section class="mb-12">
    <h2 class="text-3xl font-bold text-slate-900 mb-4">Struktura workshopu</h2>
    <p class="text-lg text-slate-600 mb-8">
        Jednodenní intenzivní prožitek v našem novém tréninkovém zázemí.
    </p>

    <div class="space-y-4">
        <div class="border-l-4 border-emerald-500 pl-6 py-3">
            <div class="text-emerald-600 font-bold text-sm mb-1">09:30 – 11:00</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Základy Flow</h3>
            <p class="text-slate-700">
                Zbourání vnitřních bariér. Jak vytvořit prostředí, kde chyba je momentem překvapení a humoru.
            </p>
        </div>

        <div class="border-l-4 border-violet-500 pl-6 py-3">
            <div class="text-violet-600 font-bold text-sm mb-1">11:15 – 13:00</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Kreativita</h3>
            <p class="text-slate-700">
                Objevování autentického zdroje nápadů. Reakce na nečekané situace s naprostou lehkostí.
            </p>
        </div>

        <div class="border-l-4 border-amber-500 pl-6 py-3">
            <div class="text-amber-600 font-bold text-sm mb-1">14:00 – 15:45</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Storytelling</h3>
            <p class="text-slate-700">
                Jak zaujmout a udržet pozornost. Vstupování do různých rolí a práce se statusem v komunikaci.
            </p>
        </div>

        <div class="border-l-4 border-emerald-500 pl-6 py-3">
            <div class="text-emerald-600 font-bold text-sm mb-1">16:00 – 17:00</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Aplikace</h3>
            <p class="text-slate-700">
                Přenos zážitků do reálného byznysu. Kotvení nových návyků a reflexe pro tým.
            </p>
        </div>
    </div>
</section>

<!-- Benefity -->
<section class="mb-12">
    <h2 class="text-3xl font-bold text-slate-900 mb-8">Co získáte</h2>

    <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-emerald-50 rounded-xl p-8 border border-emerald-200">
            <h3 class="text-2xl font-bold text-emerald-900 mb-6">Co získáte Vy</h3>
            <ul class="space-y-6">
                <li class="flex gap-4">
                    <div class="shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">✓</div>
                    <div>
                        <h4 class="font-bold text-lg text-slate-900 mb-1">Odvaha a hravost</h4>
                        <p class="text-slate-700 text-sm">
                            Oslabíte svou vnitřní autocenzuru a dovolíte si být kreativnější i v krizových situacích.
                        </p>
                    </div>
                </li>
                <li class="flex gap-4">
                    <div class="shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">✓</div>
                    <div>
                        <h4 class="font-bold text-lg text-slate-900 mb-1">Zářivý projev</h4>
                        <p class="text-slate-700 text-sm">
                            Získáte větší spontaneitu a jistotu v projevu, ať už mluvíte k jednomu nebo ke stu lidí.
                        </p>
                    </div>
                </li>
            </ul>
        </div>

        <div class="bg-violet-50 rounded-xl p-8 border border-violet-200">
            <h3 class="text-2xl font-bold text-violet-900 mb-6">Co získá kolektiv</h3>
            <ul class="space-y-6">
                <li class="flex gap-4">
                    <div class="shrink-0 w-6 h-6 bg-violet-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">✓</div>
                    <div>
                        <h4 class="font-bold text-lg text-slate-900 mb-1">Sdílená radost</h4>
                        <p class="text-slate-700 text-sm">
                            Zažijete radost z toho, když tvoříte příběhy společně a necháte se unášet imaginací.
                        </p>
                    </div>
                </li>
                <li class="flex gap-4">
                    <div class="shrink-0 w-6 h-6 bg-violet-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">✓</div>
                    <div>
                        <h4 class="font-bold text-lg text-slate-900 mb-1">Posílení důvěry</h4>
                        <p class="text-slate-700 text-sm">
                            Nenuceně posílíte vztahy hrou, zážitkem a společnou odvahou vstupovat do nových rolí.
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</section>
'
WHERE slug = 'aplikovana-improvizace';

-- LEDOVÉ DOBRODRUŽSTVÍ
UPDATE public.courses
SET full_html_content = '
<!-- Pro koho je program určen -->
<section class="mb-12">
    <h2 class="text-3xl font-bold text-slate-900 mb-6">Pro koho je program určen?</h2>
    <p class="text-lg text-slate-600 mb-8">
        Program je ideální pro firmy, které hledají autentický rozvoj a chtějí posílit svůj leadership v okamžicích, kdy jde do tuhého.
    </p>

    <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-3">Leadery a Manažery</h3>
            <p class="text-slate-700">
                Kteří potřebují trénovat rozhodování pod tlakem, práci s odporem a umění vést s pokorou a empatií.
            </p>
        </div>

        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 class="text-xl font-bold text-slate-900 mb-3">Týmy a Oddělení</h3>
            <p class="text-slate-700">
                Které chtějí posílit soudržnost, vzájemnou důvěru a schopnost otevřené komunikace v náročných časech.
            </p>
        </div>
    </div>

    <div class="bg-slate-900 rounded-xl p-8 text-white">
        <div class="text-amber-400 text-xs font-bold uppercase mb-2">Příběhový rámec</div>
        <h3 class="text-2xl font-bold mb-4">Polární expedice 1914</h3>
        <p class="text-slate-300 mb-6">
            Stanete se členy posádky Ernesta Shackletona. Váš cíl je zdánlivě nemožný: přejít Antarktidu.
            Ale skutečným cílem je přežít a vrátit se domů jako tým – živí a nezlomení.
        </p>
        <ul class="space-y-3">
            <li class="flex gap-3 text-slate-300">
                <span class="text-sky-400 shrink-0">✓</span>
                <span>Simulace náročných vyjednávání o zdroje (jídlo, podpora)</span>
            </li>
            <li class="flex gap-3 text-slate-300">
                <span class="text-sky-400 shrink-0">✓</span>
                <span>Řešení konfliktů a morálky vyčerpaného týmu</span>
            </li>
            <li class="flex gap-3 text-slate-300">
                <span class="text-sky-400 shrink-0">✓</span>
                <span>Okamžitá zpětná vazba od kolegů</span>
            </li>
        </ul>
    </div>
</section>

<!-- Průběh expedice -->
<section class="mb-12">
    <h2 class="text-3xl font-bold text-slate-900 mb-4">Průběh expedice</h2>
    <p class="text-lg text-slate-600 mb-8">
        Jeden den, který změní váš pohled na vedení lidí.
    </p>

    <div class="space-y-4">
        <div class="bg-white rounded-lg border border-slate-200 p-6">
            <div class="font-mono font-bold text-slate-700 mb-2">09:00 – 09:45</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Úvod do dobrodružství & Dohoda</h3>
            <p class="text-slate-700">
                Start expedice, představení příběhu a vytvoření bezpečného prostoru.
            </p>
        </div>

        <div class="bg-white rounded-lg border border-slate-200 p-6">
            <div class="font-mono font-bold text-slate-700 mb-2">09:45 – 10:15</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Aktivace týmu</h3>
            <p class="text-slate-700">
                První kontakt v týmech a naladění na spolupráci.
            </p>
        </div>

        <div class="bg-sky-50 rounded-lg border-l-4 border-sky-500 p-6">
            <div class="font-mono font-bold text-sky-700 mb-2">10:15 – 11:30</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">První situace v expedici</h3>
            <p class="text-slate-700 mb-3">
                Simulované scénáře pod tlakem. Trénink odvahy.
            </p>
            <ul class="text-sm text-slate-600 space-y-1">
                <li>• Týmová práce v simulovaných scénářích</li>
                <li>• Trénink reagování v momentech tlaku</li>
                <li>• Příprava s facilitátorem a využití AI</li>
            </ul>
        </div>

        <div class="bg-white rounded-lg border border-slate-200 p-6">
            <div class="font-mono font-bold text-slate-700 mb-2">11:30 – 12:45</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Hlubší úroveň výzvy</h3>
            <p class="text-slate-700">
                Pokročilé situace a důraz na zpětnou vazbu. Hodnocení ostatními týmy.
            </p>
        </div>

        <div class="bg-slate-100 rounded-lg p-6 text-center">
            <div class="text-slate-500 text-sm font-medium">12:45 – 13:45 Oběd a polární sdílení</div>
        </div>

        <div class="bg-amber-50 rounded-lg border-l-4 border-amber-500 p-6">
            <div class="font-mono font-bold text-amber-700 mb-2">13:45 – 15:00</div>
            <h3 class="text-xl font-bold text-slate-900 mb-2">Rozšířené vyjednávání</h3>
            <p class="text-slate-700 mb-3">
                Nejnáročnější příběhové situace. Role emocí a očekávání.
            </p>
            <ul class="text-sm text-slate-600 space-y-1">
                <li>• Jak komunikovat nedostatek jídla?</li>
                <li>• Jak motivovat vyčerpané?</li>
                <li>• Reflexe osobního stylu vyjednávání</li>
            </ul>
        </div>

        <div class="bg-slate-800 rounded-lg p-6 text-white">
            <div class="font-mono font-bold text-slate-300 mb-2">15:00 – 17:00</div>
            <h3 class="text-xl font-bold mb-3">Návrat z expedice & Transfer do reality</h3>
            <ul class="space-y-2 text-slate-300 text-sm">
                <li class="flex gap-2"><span class="text-sky-400">→</span> Reflexe zažitého: Co pro mě fungovalo?</li>
                <li class="flex gap-2"><span class="text-sky-400">→</span> Formulace osobních závazků pro každodenní práci</li>
                <li class="flex gap-2"><span class="text-sky-400">→</span> Odnášíte si 1–2 konkrétní kroky na zítra</li>
            </ul>
        </div>
    </div>
</section>

<!-- S čím odcházíte -->
<section class="mb-12">
    <h2 class="text-3xl font-bold text-slate-900 mb-8">S čím odcházíte?</h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
            <h3 class="font-bold text-slate-900 mb-2">Komunikace s klidem</h3>
            <p class="text-sm text-slate-600">
                Schopnost vést těžké rozhovory a dávat zpětnou vazbu i pod tlakem.
            </p>
        </div>

        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
            <h3 class="font-bold text-slate-900 mb-2">Empatie a Respekt</h3>
            <p class="text-sm text-slate-600">
                Praktické dovednosti servant leadershipu – vedení s pokorou.
            </p>
        </div>

        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
            <h3 class="font-bold text-slate-900 mb-2">Polární deník</h3>
            <p class="text-sm text-slate-600">
                Vlastní poznámky a strategie, které jste si během expedice vytvořili.
            </p>
        </div>

        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
            <h3 class="font-bold text-slate-900 mb-2">Konkrétní kroky</h3>
            <p class="text-sm text-slate-600">
                Jasný plán, co zítra uděláte jinak ve svém skutečném týmu.
            </p>
        </div>
    </div>
</section>
'
WHERE slug = 'ledove-dobrodruzstvi';
