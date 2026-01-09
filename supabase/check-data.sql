-- =====================================================
-- KONTROLA DAT V DATABÁZI
-- =====================================================
-- Tento SQL dotaz zkontroluje, jestli jsou v databázi data
-- =====================================================

-- Počet kurzů
SELECT 'Počet kurzů:' as label, COUNT(*) as count FROM public.courses;

-- Seznam kurzů
SELECT
    title,
    slug,
    lecturer_name,
    image_url,
    lecturer_image_url,
    price_no_vat
FROM public.courses
ORDER BY title;

-- Počet termínů
SELECT 'Počet termínů:' as label, COUNT(*) as count FROM public.course_dates;

-- Termíny s názvy kurzů
SELECT
    c.title as kurz,
    cd.start_date,
    cd.end_date,
    cd.location,
    cd.is_active,
    cd.current_booked_count,
    cd.max_capacity
FROM public.course_dates cd
JOIN public.courses c ON c.id = cd.course_id
ORDER BY cd.start_date
LIMIT 20;
