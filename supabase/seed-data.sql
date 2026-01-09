-- =====================================================
-- ProjectYOU E-shop - SEED DATA
-- =====================================================
-- Spusť tento skript PO setup.sql
-- Vloží 3 kurzy s lektory a termíny
-- =====================================================

-- =====================================================
-- KURZ 1: AI Firemní Akcelerátor
-- =====================================================
INSERT INTO public.courses (
    title,
    slug,
    short_description,
    full_html_content,
    price_no_vat,
    vat_rate,
    image_url,
    lecturer_name,
    lecturer_bio,
    lecturer_image_url
) VALUES (
    'AI Firemní Akcelerátor',
    'ai-firemni-akcelerator',
    'Dělejte větší cirkus za méně peněz. Umělá inteligence vašim lidem rozváže ruce, aby stihli to, co dřív trvalo týden, za jedno odpoledne.',
    '<div class="prose max-w-none">
        <h2>O kurzu</h2>
        <p>Máte pocit, že vaše firma naráží na strop? Že byste mohli růst, ale nemáte na to kapacity?</p>
        <p>Tento kurz není o "hraní si s obrázky". Je to mapa vaší firmy, kde krok po kroku ukazujeme, jak AI zapojit do strategie, marketingu, obchodu, realizace i řízení lidí. Odcházíte s hotovým systémem, který v pondělí zavedete.</p>

        <h3>Pro koho je kurz určen</h3>
        <ul>
            <li><strong>Majitelé a nejvyšší vedení</strong> - kteří potřebují strategický nadhled, chtějí firmu rozvíjet, ale topí se v každodenní operativě.</li>
            <li><strong>Pravá ruka majitele (Implementátoři)</strong> - provozní ředitelé, schopní manažeři nebo nástupci, kteří mají za úkol přinést do firmy inovaci.</li>
        </ul>

        <h3>Struktura kurzu - 2 dny</h3>
        <h4>DEN 1: Strategická expanze & Růst tržeb</h4>
        <ul>
            <li><strong>Blok 1: Profesionální AI Řidičák</strong> - 7 principů profesionálního promptingu, firemní bezpečnost dat</li>
            <li><strong>Blok 2: Strategie & Konzultant v kapse</strong> - Strategický audit s AI, analýza trhu</li>
            <li><strong>Blok 3: Marketing</strong> - Obsahová strategie, tvorba vizuálů, personalizace</li>
            <li><strong>Blok 4: Obchod</strong> - Příprava na jednání, simulátor vyjednávání</li>
            <li><strong>Networking večer:</strong> AI Lov pokladů & Pivo (Prague Scavenger Hunt)</li>
        </ul>

        <h4>DEN 2: Firma na autopilota</h4>
        <ul>
            <li><strong>Blok 5: Realizace zakázky</strong> - Projektová administrativa, automatizace</li>
            <li><strong>Blok 6: AI Leadership</strong> - Moderní nábor, zpětná vazba</li>
            <li><strong>Blok 7: Data & Finance</strong> - Interaktivní analýza, finanční modelování</li>
            <li><strong>Blok 8: Automatizace</strong> - Praktická ukázka v Make.com</li>
        </ul>

        <h3>Co si odnesete</h3>
        <ul>
            <li>Certifikát o složení zkoušky</li>
            <li>Databanka 100+ promptů a nástrojů</li>
            <li>1 hodina individuální konzultace</li>
            <li>Prezentace pro váš tým</li>
            <li>Vstup do komunity GrowPORT</li>
        </ul>
    </div>',
    24900.00,
    21.00,
    '/images/courses/aikurz.jpg',
    'Petr Bartoň',
    'Zakladatel vzdělávací agentury ProjectYOU. Expert na implementaci AI do firemních procesů s více než 10letou zkušeností v oblasti digitální transformace. Pomohl desítkám firem zvýšit produktivitu a efektivitu pomocí moderních technologií.',
    '/images/lecturers/petr.jpg'
);

-- Získání ID vloženého kurzu pro termíny
DO $$
DECLARE
    v_ai_course_id UUID;
    v_base_date TIMESTAMPTZ;
    v_counter INTEGER := 0;
BEGIN
    -- Najdeme ID AI kurzu
    SELECT id INTO v_ai_course_id FROM public.courses WHERE slug = 'ai-firemni-akcelerator';

    -- Začínáme od 4.2.2026 9:00
    v_base_date := '2026-02-04 09:00:00+01'::TIMESTAMPTZ;

    -- Generujeme 8 termínů (každé 2 týdny, 4 měsíce = cca 8 termínů)
    FOR v_counter IN 0..7 LOOP
        INSERT INTO public.course_dates (
            course_id,
            start_date,
            end_date,
            location,
            max_capacity,
            current_booked_count,
            is_active
        ) VALUES (
            v_ai_course_id,
            v_base_date + (v_counter * INTERVAL '14 days'),  -- První den 9:00
            v_base_date + (v_counter * INTERVAL '14 days') + INTERVAL '1 day 8 hours',  -- Druhý den 17:00
            'Praha',
            15,
            0,
            true
        );
    END LOOP;
END $$;

-- =====================================================
-- KURZ 2: Aplikovaná Improvizace
-- =====================================================
INSERT INTO public.courses (
    title,
    slug,
    short_description,
    full_html_content,
    price_no_vat,
    vat_rate,
    image_url,
    lecturer_name,
    lecturer_bio,
    lecturer_image_url
) VALUES (
    'Aplikovaná Improvizace',
    'aplikovana-improvizace',
    'Improvizace není nepřipravenost. Je to nejvyšší forma pohotovosti. Naučte se brát změnu jako příležitost, ne jako hrozbu.',
    '<div class="prose max-w-none">
        <h2>O kurzu</h2>
        <p>Improvizace je obzvlášť užitečná v době zrychlujících změn. Rozvíjí kreativitu, spolupráci a jistotu tam, kde končí předem daný scénář.</p>

        <h3>K čemu je to dobré v byznysu?</h3>
        <ul>
            <li><strong>Pohotovost</strong> - Naučíte se reagovat s lehkostí i v úplně nepředvídatelných situacích před klientem nebo týmem.</li>
            <li><strong>Storytelling</strong> - Přirozeně rozvinete svůj hlas, projev a schopnost vyprávět příběhy, které lidi skutečně strhnou.</li>
            <li><strong>Spolupráce</strong> - Poznáte základní principy "Ano, a...", které fungují na jevišti i v komunikaci a vztazích v běžném životě.</li>
        </ul>

        <h3>Struktura workshopu - 1 den</h3>
        <ul>
            <li><strong>09:30 – 11:00: Základy Flow</strong> - Zbourání vnitřních bariér</li>
            <li><strong>11:15 – 13:00: Kreativita</strong> - Objevování autentického zdroje nápadů</li>
            <li><strong>14:00 – 15:45: Storytelling</strong> - Jak zaujmout a udržet pozornost</li>
            <li><strong>16:00 – 17:00: Aplikace</strong> - Přenos zážitků do reálného byznysu</li>
        </ul>

        <h3>Co získáte</h3>
        <ul>
            <li><strong>Vy:</strong> Odvaha a hravost, zářivý projev</li>
            <li><strong>Kolektiv:</strong> Sdílená radost, posílení důvěry</li>
        </ul>
    </div>',
    8900.00,
    21.00,
    '/images/courses/impro.jpg',
    'Géza Prouza',
    'Profesionální improvizátor a kouč s více než 15letou zkušeností. Absolvoval workshopy u předních světových improvizačních škol. Pomáhá firmám rozvíjet kreativitu, spontaneitu a týmovou spolupráci prostřednictvím aplikované improvizace.',
    '/images/lecturers/geza.jpg'
);

-- Termíny pro Aplikovanou Improvizaci
DO $$
DECLARE
    v_impro_course_id UUID;
    v_base_date TIMESTAMPTZ;
    v_counter INTEGER := 0;
BEGIN
    SELECT id INTO v_impro_course_id FROM public.courses WHERE slug = 'aplikovana-improvizace';

    -- Začínáme od 10.2.2026 9:30
    v_base_date := '2026-02-10 09:30:00+01'::TIMESTAMPTZ;

    -- Generujeme 8 termínů (každé 2 týdny)
    FOR v_counter IN 0..7 LOOP
        INSERT INTO public.course_dates (
            course_id,
            start_date,
            end_date,
            location,
            max_capacity,
            current_booked_count,
            is_active
        ) VALUES (
            v_impro_course_id,
            v_base_date + (v_counter * INTERVAL '14 days'),
            v_base_date + (v_counter * INTERVAL '14 days') + INTERVAL '7 hours 30 minutes',  -- Končí v 17:00
            'Praha',
            15,
            0,
            true
        );
    END LOOP;
END $$;

-- =====================================================
-- KURZ 3: Ledové dobrodružství
-- =====================================================
INSERT INTO public.courses (
    title,
    slug,
    short_description,
    full_html_content,
    price_no_vat,
    vat_rate,
    image_url,
    lecturer_name,
    lecturer_bio,
    lecturer_image_url
) VALUES (
    'Ledové dobrodružství',
    'ledove-dobrodruzstvi',
    'Leadership pod bodem mrazu. Když jde do tuhého, teorie nestačí. Zažijte autentický trénink vedení týmu inspirovaný legendární expedicí Ernesta Shackletona.',
    '<div class="prose max-w-none">
        <h2>O programu</h2>
        <p>Když jde do tuhého, teorie nestačí. Zažijte autentický trénink vedení týmu inspirovaný legendární expedicí Ernesta Shackletona.</p>

        <h3>Pro koho je program určen?</h3>
        <ul>
            <li><strong>Leadery a Manažery</strong> - Kteří potřebují trénovat rozhodování pod tlakem, práci s odporem a umění vést s pokorou a empatií.</li>
            <li><strong>Týmy a Oddělení</strong> - Které chtějí posílit soudržnost, vzájemnou důvěru a schopnost otevřené komunikace v náročných časech.</li>
        </ul>

        <h3>Příběhový rámec: Polární expedice 1914</h3>
        <p>Stanete se členy posádky Ernesta Shackletona. Váš cíl je zdánlivě nemožný: přejít Antarktidu. Ale skutečným cílem je přežít a vrátit se domů jako tým – živí a nezlomení.</p>

        <ul>
            <li>Simulace náročných vyjednávání o zdroje (jídlo, podpora)</li>
            <li>Řešení konfliktů a morálky vyčerpaného týmu</li>
            <li>Okamžitá zpětná vazba od kolegů</li>
            <li>20% Hra / 80% Reálný business training</li>
        </ul>

        <h3>Průběh expedice - 1 den</h3>
        <ul>
            <li><strong>09:00 – 09:45:</strong> Úvod do dobrodružství & Dohoda</li>
            <li><strong>09:45 – 10:15:</strong> Aktivace týmu</li>
            <li><strong>10:15 – 11:30:</strong> První situace v expedici - Trénink odvahy</li>
            <li><strong>11:30 – 12:45:</strong> Hlubší úroveň výzvy - Zpětná vazba</li>
            <li><strong>12:45 – 13:45:</strong> Oběd a polární sdílení</li>
            <li><strong>13:45 – 15:00:</strong> Rozšířené vyjednávání - Nejnáročnější situace</li>
            <li><strong>15:00 – 17:00:</strong> Návrat z expedice & Transfer do reality</li>
        </ul>

        <h3>S čím odcházíte?</h3>
        <ul>
            <li>Komunikace s klidem - Schopnost vést těžké rozhovory i pod tlakem</li>
            <li>Empatie a Respekt - Praktické dovednosti servant leadershipu</li>
            <li>Polární deník - Vlastní poznámky a strategie</li>
            <li>Konkrétní kroky - Jasný plán, co zítra uděláte jinak</li>
        </ul>
    </div>',
    12900.00,
    21.00,
    '/images/courses/ledovka.jpg',
    'Tomáš Ptáček',
    'Leadership kouč a facilitátor zážitkových tréninků. Specializuje se na rozvoj vedoucích pracovníků prostřednictvím simulací a her. Má zkušenosti s vedením týmů v extrémních podmínkách a přenáší tyto zkušenosti do firemního prostředí.',
    '/images/lecturers/tomas.jpg'
);

-- Termíny pro Ledové dobrodružství
DO $$
DECLARE
    v_ledovka_course_id UUID;
    v_base_date TIMESTAMPTZ;
    v_counter INTEGER := 0;
BEGIN
    SELECT id INTO v_ledovka_course_id FROM public.courses WHERE slug = 'ledove-dobrodruzstvi';

    -- Začínáme od 14.2.2026 9:00
    v_base_date := '2026-02-14 09:00:00+01'::TIMESTAMPTZ;

    -- Generujeme 8 termínů (každé 2 týdny)
    FOR v_counter IN 0..7 LOOP
        INSERT INTO public.course_dates (
            course_id,
            start_date,
            end_date,
            location,
            max_capacity,
            current_booked_count,
            is_active
        ) VALUES (
            v_ledovka_course_id,
            v_base_date + (v_counter * INTERVAL '14 days'),
            v_base_date + (v_counter * INTERVAL '14 days') + INTERVAL '8 hours',  -- Končí v 17:00
            'Praha',
            15,
            0,
            true
        );
    END LOOP;
END $$;

-- =====================================================
-- SEED DATA COMPLETED
-- =====================================================
-- Vloženo:
-- - 3 kurzy s kompletními informacemi
-- - 3 lektoři s biografiemi
-- - 24 termínů celkem (8 pro každý kurz, každé 2 týdny, 4 měsíce dopředu)
-- =====================================================

-- Ověření vložených dat
SELECT
    c.title,
    c.lecturer_name,
    COUNT(cd.id) as pocet_terminu,
    MIN(cd.start_date) as prvni_termin,
    MAX(cd.start_date) as posledni_termin
FROM public.courses c
LEFT JOIN public.course_dates cd ON c.id = cd.course_id
GROUP BY c.id, c.title, c.lecturer_name
ORDER BY c.title;
