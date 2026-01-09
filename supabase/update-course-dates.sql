-- =====================================================
-- AKTUALIZACE TERMÍNŮ KURZŮ
-- =====================================================
-- Smaže staré termíny a vytvoří nové podle požadavků
-- =====================================================

-- Nejdřív smažeme všechny staré termíny
DELETE FROM public.course_dates;

-- =====================================================
-- AI FIREMNÍ AKCELERÁTOR
-- Start: 4-5.2.2026 (dvoudenní kurz)
-- Pak každé 2 týdny, 4 měsíce dopředu (8 termínů)
-- =====================================================
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
-- APLIKOVANÁ IMPROVIZACE
-- Start: 10.2.2026 (jednodenní kurz)
-- Pak každé 2 týdny, 4 měsíce dopředu (8 termínů)
-- =====================================================
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
-- LEDOVÉ DOBRODRUŽSTVÍ
-- Start: 14.2.2026 (JEDNODENNÍ kurz - opraveno!)
-- Pak každé 2 týdny, 4 měsíce dopředu (8 termínů)
-- =====================================================
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
            v_base_date + (v_counter * INTERVAL '14 days') + INTERVAL '8 hours',  -- JEDNODENNÍ - končí v 17:00 stejný den
            'Praha',
            15,
            0,
            true
        );
    END LOOP;
END $$;

-- =====================================================
-- KONTROLA VÝSLEDKU
-- =====================================================
SELECT
    c.title,
    cd.start_date,
    cd.end_date,
    EXTRACT(DAY FROM (cd.end_date - cd.start_date)) as pocet_dni,
    cd.location
FROM public.course_dates cd
JOIN public.courses c ON c.id = cd.course_id
ORDER BY cd.start_date
LIMIT 30;
