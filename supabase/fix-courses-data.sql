-- =====================================================
-- OPRAVA DAT KURZŮ - Fotky kurzů a správná jména lektorů
-- =====================================================

-- Oprava AI Firemní Akcelerátor
UPDATE public.courses
SET
    image_url = '/images/courses/aikurz.jpg'
WHERE slug = 'ai-firemni-akcelerator';

-- Oprava Aplikovaná Improvizace
UPDATE public.courses
SET
    lecturer_name = 'Géza Prouza',
    image_url = '/images/courses/impro.jpg',
    lecturer_bio = 'Profesionální improvizátor a kouč s více než 15letou zkušeností. Absolvoval workshopy u předních světových improvizačních škol. Pomáhá firmám rozvíjet kreativitu, spontaneitu a týmovou spolupráci prostřednictvím aplikované improvizace.'
WHERE slug = 'aplikovana-improvizace';

-- Oprava Ledové dobrodružství
UPDATE public.courses
SET
    lecturer_name = 'Tomáš Ptáček',
    image_url = '/images/courses/ledovka.jpg',
    lecturer_bio = 'Leadership kouč a facilitátor zážitkových tréninků. Specializuje se na rozvoj vedoucích pracovníků prostřednictvím simulací a her. Má zkušenosti s vedením týmů v extrémních podmínkách a přenáší tyto zkušenosti do firemního prostředí.'
WHERE slug = 'ledove-dobrodruzstvi';

-- Kontrola výsledku
SELECT
    title,
    slug,
    lecturer_name,
    image_url
FROM public.courses
ORDER BY title;
