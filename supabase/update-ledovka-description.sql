-- Update Ledové dobrodružství short description
-- Run this in Supabase SQL Editor

UPDATE courses
SET short_description = 'Program je ideální pro firmy, které hledají autentický rozvoj a chtějí posílit svůj leadership v okamžicích, kdy jde do tuhého.'
WHERE slug = 'ledove-dobrodruzstvi';

-- Verify the update
SELECT slug, title, short_description FROM courses WHERE slug = 'ledove-dobrodruzstvi';
