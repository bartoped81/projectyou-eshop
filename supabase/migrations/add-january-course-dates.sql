-- Přidání nových termínů pro kurzy v lednu 2026

-- AI Firemní Akcelerátor - 14.-15.1.2026
INSERT INTO course_dates (
  course_id,
  start_date,
  end_date,
  location,
  max_capacity,
  current_booked_count,
  is_active
)
SELECT
  id,
  '2026-01-14 09:00:00+01'::timestamptz,
  '2026-01-15 17:00:00+01'::timestamptz,
  'Praha - GrowPORT',
  20,
  0,
  true
FROM courses
WHERE slug = 'ai-firemni-akcelerator';

-- AI Firemní Akcelerátor - 28.-29.1.2026
INSERT INTO course_dates (
  course_id,
  start_date,
  end_date,
  location,
  max_capacity,
  current_booked_count,
  is_active
)
SELECT
  id,
  '2026-01-28 09:00:00+01'::timestamptz,
  '2026-01-29 17:00:00+01'::timestamptz,
  'Praha - GrowPORT',
  20,
  0,
  true
FROM courses
WHERE slug = 'ai-firemni-akcelerator';

-- Aplikovaná improvizace - 20.1.2026
INSERT INTO course_dates (
  course_id,
  start_date,
  end_date,
  location,
  max_capacity,
  current_booked_count,
  is_active
)
SELECT
  id,
  '2026-01-20 09:30:00+01'::timestamptz,
  '2026-01-20 17:00:00+01'::timestamptz,
  'Praha - GrowPORT',
  15,
  0,
  true
FROM courses
WHERE slug = 'aplikovana-improvizace';

-- Ledové dobrodružství - 23.1.2026
INSERT INTO course_dates (
  course_id,
  start_date,
  end_date,
  location,
  max_capacity,
  current_booked_count,
  is_active
)
SELECT
  id,
  '2026-01-23 09:00:00+01'::timestamptz,
  '2026-01-23 17:00:00+01'::timestamptz,
  'Praha - GrowPORT',
  20,
  0,
  true
FROM courses
WHERE slug = 'ledove-dobrodruzstvi';
