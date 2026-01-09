-- Update lecturer photos with new headshot images
-- Run this in Supabase SQL Editor

UPDATE courses
SET lecturer_image_url = '/images/lecturers/petr.jpg'
WHERE slug = 'ai-firemni-akcelerator';

UPDATE courses
SET lecturer_image_url = '/images/lecturers/geza.jpg'
WHERE slug = 'aplikovana-improvizace';

UPDATE courses
SET lecturer_image_url = '/images/lecturers/tomas.jpg'
WHERE slug = 'ledove-dobrodruzstvi';

-- Verify the updates
SELECT slug, lecturer_name, lecturer_image_url FROM courses ORDER BY slug;
