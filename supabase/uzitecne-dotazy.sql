-- =====================================================
-- UŽITEČNÉ SQL DOTAZY
-- =====================================================
-- Zde najdeš ready-to-use dotazy pro práci s databází
-- Zkopíruj je do Supabase SQL Editoru
-- =====================================================

-- =====================================================
-- PŘEHLED DAT
-- =====================================================

-- 1. Základní přehled kurzů s termíny
SELECT
    c.title as "Kurz",
    c.lecturer_name as "Lektor",
    c.price_no_vat as "Cena bez DPH",
    COUNT(cd.id) as "Počet termínů",
    MIN(cd.start_date) as "První termín",
    MAX(cd.start_date) as "Poslední termín"
FROM public.courses c
LEFT JOIN public.course_dates cd ON c.id = cd.course_id
GROUP BY c.id, c.title, c.lecturer_name, c.price_no_vat
ORDER BY c.title;

-- 2. Detail všech termínů s dostupností
SELECT
    c.title as "Kurz",
    cd.start_date as "Začátek",
    cd.end_date as "Konec",
    cd.location as "Místo",
    cd.current_booked_count as "Rezervováno",
    cd.max_capacity as "Kapacita",
    (cd.max_capacity - cd.current_booked_count) as "Volných míst",
    CASE
        WHEN cd.current_booked_count >= cd.max_capacity THEN '❌ Plno'
        WHEN cd.current_booked_count >= cd.max_capacity * 0.8 THEN '⚠️ Téměř plno'
        ELSE '✅ Volno'
    END as "Status"
FROM public.course_dates cd
JOIN public.courses c ON c.id = cd.course_id
WHERE cd.is_active = true
ORDER BY cd.start_date;

-- 3. Pouze dostupné termíny (pomocí VIEW)
SELECT
    course_title as "Kurz",
    start_date as "Datum",
    available_spots as "Volných míst",
    price_no_vat as "Cena bez DPH",
    (price_no_vat * (1 + vat_rate / 100))::NUMERIC(10,2) as "Cena s DPH"
FROM public.available_course_dates
ORDER BY start_date;

-- =====================================================
-- OBJEDNÁVKY
-- =====================================================

-- 4. Přehled všech objednávek
SELECT
    o.created_at as "Vytvořeno",
    o.user_name as "Jméno",
    o.user_email as "Email",
    o.status as "Status",
    o.total_price as "Částka",
    o.payment_method as "Platba",
    o.variable_symbol as "VS",
    COUNT(oi.id) as "Počet položek"
FROM public.orders o
LEFT JOIN public.order_items oi ON oi.order_id = o.id
GROUP BY o.id
ORDER BY o.created_at DESC;

-- 5. Detail konkrétní objednávky (nahraď EMAIL)
SELECT
    o.created_at as "Vytvořeno",
    o.user_name as "Zákazník",
    c.title as "Kurz",
    cd.start_date as "Termín",
    oi.quantity as "Počet osob",
    oi.unit_price_at_purchase as "Cena za osobu",
    (oi.quantity * oi.unit_price_at_purchase) as "Celkem"
FROM public.orders o
JOIN public.order_items oi ON oi.order_id = o.id
JOIN public.course_dates cd ON cd.id = oi.course_date_id
JOIN public.courses c ON c.id = cd.course_id
WHERE o.user_email = 'email@example.com'
ORDER BY o.created_at DESC;

-- =====================================================
-- STATISTIKY
-- =====================================================

-- 6. Celkový přehled tržeb
SELECT
    SUM(total_price) FILTER (WHERE status = 'paid') as "Zaplaceno celkem",
    SUM(total_price) FILTER (WHERE status = 'pending') as "Čeká na platbu",
    COUNT(*) FILTER (WHERE status = 'paid') as "Počet zaplacených",
    COUNT(*) FILTER (WHERE status = 'pending') as "Počet čekajících",
    COUNT(*) FILTER (WHERE status = 'cancelled') as "Zrušených"
FROM public.orders;

-- 7. Tržby podle kurzů
SELECT
    c.title as "Kurz",
    COUNT(DISTINCT oi.order_id) as "Počet objednávek",
    SUM(oi.quantity) as "Celkem osob",
    SUM(oi.quantity * oi.unit_price_at_purchase) as "Tržby"
FROM public.courses c
JOIN public.course_dates cd ON cd.course_id = c.id
JOIN public.order_items oi ON oi.course_date_id = cd.id
JOIN public.orders o ON o.id = oi.order_id
WHERE o.status = 'paid'
GROUP BY c.id, c.title
ORDER BY "Tržby" DESC;

-- 8. Nejoblíbenější termíny
SELECT
    c.title as "Kurz",
    cd.start_date as "Termín",
    cd.current_booked_count as "Rezervováno",
    cd.max_capacity as "Kapacita",
    ROUND((cd.current_booked_count::NUMERIC / cd.max_capacity * 100), 1) as "Obsazenost %"
FROM public.course_dates cd
JOIN public.courses c ON c.id = cd.course_id
WHERE cd.is_active = true
ORDER BY cd.current_booked_count DESC;

-- =====================================================
-- ÚDRŽBA A ADMINISTRACE
-- =====================================================

-- 9. Přidání nového termínu (VZOR - uprav hodnoty!)
INSERT INTO public.course_dates (
    course_id,
    start_date,
    end_date,
    location,
    max_capacity
)
SELECT
    id,
    '2026-06-01 09:00:00+01'::TIMESTAMPTZ,
    '2026-06-01 17:00:00+01'::TIMESTAMPTZ,
    'Praha',
    15
FROM public.courses
WHERE slug = 'ai-firemni-akcelerator';

-- 10. Deaktivace termínu (např. zrušen)
UPDATE public.course_dates
SET is_active = false
WHERE id = 'uuid-terminu';

-- 11. Změna statusu objednávky na "zaplaceno"
UPDATE public.orders
SET status = 'paid'
WHERE variable_symbol = '12345678';
-- Pozor: Tímto se automaticky aktualizuje current_booked_count!

-- 12. Změna kapacity termínu
UPDATE public.course_dates
SET max_capacity = 20
WHERE id = 'uuid-terminu';

-- =====================================================
-- TESTOVÁNÍ
-- =====================================================

-- 13. Vytvoření testovací objednávky
WITH new_order AS (
    INSERT INTO public.orders (
        user_email,
        user_name,
        street,
        city,
        zip,
        phone,
        total_price,
        status,
        variable_symbol,
        payment_method
    ) VALUES (
        'test@example.com',
        'Jan Testovací',
        'Testovací 123',
        'Praha',
        '110 00',
        '+420 123 456 789',
        30129.00,
        'pending',
        (floor(random() * 90000000) + 10000000)::TEXT,
        'invoice'
    )
    RETURNING id
),
first_date AS (
    SELECT id FROM public.course_dates
    WHERE is_active = true
    LIMIT 1
)
INSERT INTO public.order_items (
    order_id,
    course_date_id,
    quantity,
    unit_price_at_purchase
)
SELECT
    new_order.id,
    first_date.id,
    1,
    24900.00
FROM new_order, first_date
RETURNING *;

-- 14. Smazání testovacích dat
DELETE FROM public.orders
WHERE user_email LIKE '%test%' OR user_email LIKE '%example%';

-- =====================================================
-- REPORTY
-- =====================================================

-- 15. Měsíční report objednávek
SELECT
    DATE_TRUNC('month', created_at) as "Měsíc",
    COUNT(*) as "Počet objednávek",
    SUM(total_price) as "Celková částka",
    COUNT(*) FILTER (WHERE status = 'paid') as "Zaplaceno",
    COUNT(*) FILTER (WHERE status = 'pending') as "Čeká",
    COUNT(*) FILTER (WHERE status = 'cancelled') as "Zrušeno"
FROM public.orders
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY "Měsíc" DESC;

-- 16. TOP zákazníci (podle počtu objednávek)
SELECT
    user_email as "Email",
    user_name as "Jméno",
    COUNT(*) as "Počet objednávek",
    SUM(total_price) as "Celková částka"
FROM public.orders
WHERE status = 'paid'
GROUP BY user_email, user_name
ORDER BY "Celková částka" DESC
LIMIT 10;

-- 17. Průměrná obsazenost kurzů
SELECT
    c.title as "Kurz",
    COUNT(cd.id) as "Počet termínů",
    AVG(cd.current_booked_count) as "Průměrná obsazenost",
    AVG((cd.current_booked_count::NUMERIC / cd.max_capacity * 100))::NUMERIC(5,1) as "Průměrná obsazenost %"
FROM public.courses c
JOIN public.course_dates cd ON cd.course_id = c.id
WHERE cd.is_active = true
GROUP BY c.id, c.title;

-- =====================================================
-- CLEANUP A ARCHIVACE
-- =====================================================

-- 18. Archivace starých termínů (deaktivace)
UPDATE public.course_dates
SET is_active = false
WHERE start_date < NOW() - INTERVAL '1 month'
AND is_active = true;

-- 19. Smazání zrušených objednávek starších než 6 měsíců
DELETE FROM public.orders
WHERE status = 'cancelled'
AND created_at < NOW() - INTERVAL '6 months';

-- =====================================================
-- UŽITEČNÉ VIEWS (volitelné - můžeš vytvořit)
-- =====================================================

-- 20. View: Dashboard statistiky
CREATE OR REPLACE VIEW public.dashboard_stats AS
SELECT
    (SELECT COUNT(*) FROM public.courses) as total_courses,
    (SELECT COUNT(*) FROM public.course_dates WHERE is_active = true AND start_date > NOW()) as upcoming_dates,
    (SELECT COUNT(*) FROM public.orders WHERE status = 'pending') as pending_orders,
    (SELECT SUM(total_price) FROM public.orders WHERE status = 'paid') as total_revenue;

-- Použití:
-- SELECT * FROM public.dashboard_stats;

-- =====================================================
-- KONEC
-- =====================================================
-- Tyto dotazy můžeš používat pro:
-- - Monitoring stavu databáze
-- - Generování reportů
-- - Administraci kurzů a termínů
-- - Testování a debugging
-- =====================================================
