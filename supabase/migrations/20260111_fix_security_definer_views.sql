-- Fix Security Definer Views
-- This migration changes views from SECURITY DEFINER to SECURITY INVOKER
-- to comply with Supabase security best practices

-- Drop and recreate courses_with_upcoming_dates view with SECURITY INVOKER
DROP VIEW IF EXISTS public.courses_with_upcoming_dates;

CREATE OR REPLACE VIEW public.courses_with_upcoming_dates
WITH (security_invoker = true) AS
SELECT
    c.*,
    COUNT(cd.id) FILTER (WHERE cd.start_date > NOW() AND cd.is_active = true) as upcoming_dates_count,
    MIN(cd.start_date) FILTER (WHERE cd.start_date > NOW() AND cd.is_active = true) as next_date
FROM public.courses c
LEFT JOIN public.course_dates cd ON c.id = cd.course_id
GROUP BY c.id;

-- Drop and recreate available_course_dates view with SECURITY INVOKER
DROP VIEW IF EXISTS public.available_course_dates;

CREATE OR REPLACE VIEW public.available_course_dates
WITH (security_invoker = true) AS
SELECT
    cd.*,
    c.title as course_title,
    c.slug as course_slug,
    c.price_no_vat,
    c.vat_rate,
    (cd.max_capacity - cd.current_booked_count) as available_spots
FROM public.course_dates cd
JOIN public.courses c ON c.id = cd.course_id
WHERE cd.is_active = true
  AND cd.current_booked_count < cd.max_capacity
  AND cd.start_date > NOW();

-- Grant access to authenticated and anon users (since these are public data)
GRANT SELECT ON public.courses_with_upcoming_dates TO anon, authenticated;
GRANT SELECT ON public.available_course_dates TO anon, authenticated;

-- Add comment explaining the security model
COMMENT ON VIEW public.courses_with_upcoming_dates IS
'Public view showing courses with upcoming dates. Uses SECURITY INVOKER to enforce RLS policies.';

COMMENT ON VIEW public.available_course_dates IS
'Public view showing available course dates. Uses SECURITY INVOKER to enforce RLS policies.';
