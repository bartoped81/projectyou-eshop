-- =====================================================
-- AKTUALIZACE CENY - Aplikovaná Improvizace
-- =====================================================

UPDATE public.courses
SET price_no_vat = 12900.00
WHERE slug = 'aplikovana-improvizace';

-- Kontrola výsledku
SELECT
    title,
    slug,
    price_no_vat,
    vat_rate,
    (price_no_vat * (1 + vat_rate / 100)) as price_with_vat
FROM public.courses
WHERE slug = 'aplikovana-improvizace';
