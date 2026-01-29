-- Přidání termínů Aplikované improvizace na červenec 2026
-- Každé pondělí 9:30-17:00 v Říčanech

-- 6.7.2026
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
  '2026-07-06 09:30:00+02'::timestamptz,
  '2026-07-06 17:00:00+02'::timestamptz,
  'Říčany',
  15,
  0,
  true
FROM courses
WHERE slug = 'aplikovana-improvizace';

-- 13.7.2026
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
  '2026-07-13 09:30:00+02'::timestamptz,
  '2026-07-13 17:00:00+02'::timestamptz,
  'Říčany',
  15,
  0,
  true
FROM courses
WHERE slug = 'aplikovana-improvizace';

-- 20.7.2026
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
  '2026-07-20 09:30:00+02'::timestamptz,
  '2026-07-20 17:00:00+02'::timestamptz,
  'Říčany',
  15,
  0,
  true
FROM courses
WHERE slug = 'aplikovana-improvizace';

-- 27.7.2026
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
  '2026-07-27 09:30:00+02'::timestamptz,
  '2026-07-27 17:00:00+02'::timestamptz,
  'Říčany',
  15,
  0,
  true
FROM courses
WHERE slug = 'aplikovana-improvizace';
