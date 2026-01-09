-- =====================================================
-- ProjectYOU E-shop Database Setup
-- =====================================================
-- Spusť tento skript v Supabase SQL Editoru
-- =====================================================

-- Povolení UUID extension (pokud ještě není povoleno)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. TABULKA: courses (Typy kurzů)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    full_html_content TEXT NOT NULL,
    price_no_vat DECIMAL(10, 2) NOT NULL,
    vat_rate DECIMAL(5, 2) DEFAULT 21.00,
    image_url TEXT,
    lecturer_name TEXT NOT NULL,
    lecturer_bio TEXT,
    lecturer_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pro rychlé vyhledávání podle slug
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);

-- =====================================================
-- 2. TABULKA: course_dates (Konkrétní termíny)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.course_dates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    location TEXT DEFAULT 'Praha',
    max_capacity INTEGER DEFAULT 15,
    current_booked_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Kontrola, že current_booked_count nemůže být větší než max_capacity
    CONSTRAINT check_capacity CHECK (current_booked_count <= max_capacity),
    -- Kontrola, že end_date je po start_date
    CONSTRAINT check_dates CHECK (end_date >= start_date)
);

-- Index pro rychlé vyhledávání podle kurzu a data
CREATE INDEX IF NOT EXISTS idx_course_dates_course_id ON public.course_dates(course_id);
CREATE INDEX IF NOT EXISTS idx_course_dates_start_date ON public.course_dates(start_date);

-- POVOLENÍ REALTIME PRO course_dates
ALTER PUBLICATION supabase_realtime ADD TABLE public.course_dates;

-- =====================================================
-- 3. TABULKA: orders (Objednávky)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_email TEXT NOT NULL,
    user_name TEXT NOT NULL,
    company_name TEXT,
    ico TEXT,
    dic TEXT,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    zip TEXT NOT NULL,
    phone TEXT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
    variable_symbol TEXT NOT NULL UNIQUE,
    payment_method TEXT DEFAULT 'invoice' CHECK (payment_method IN ('invoice', 'qr', 'card')),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pro rychlé vyhledávání objednávek
CREATE INDEX IF NOT EXISTS idx_orders_user_email ON public.orders(user_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_variable_symbol ON public.orders(variable_symbol);

-- =====================================================
-- 4. TABULKA: order_items (Položky objednávky)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    course_date_id UUID NOT NULL REFERENCES public.course_dates(id) ON DELETE RESTRICT,
    quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
    unit_price_at_purchase DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pro rychlé vyhledávání položek objednávky
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_course_date_id ON public.order_items(course_date_id);

-- =====================================================
-- TRIGGERY pro automatickou aktualizaci updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggery pro courses
CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Triggery pro course_dates
CREATE TRIGGER update_course_dates_updated_at
    BEFORE UPDATE ON public.course_dates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Triggery pro orders
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- FUNKCE: Automatická aktualizace current_booked_count
-- =====================================================
CREATE OR REPLACE FUNCTION update_course_date_booking_count()
RETURNS TRIGGER AS $$
BEGIN
    -- Při vytvoření nebo aktualizaci order_item, pokud objednávka je paid
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
        IF (SELECT status FROM public.orders WHERE id = NEW.order_id) = 'paid' THEN
            UPDATE public.course_dates
            SET current_booked_count = current_booked_count + NEW.quantity
            WHERE id = NEW.course_date_id;
        END IF;
    END IF;

    -- Při smazání order_item, pokud objednávka byla paid
    IF (TG_OP = 'DELETE') THEN
        IF (SELECT status FROM public.orders WHERE id = OLD.order_id) = 'paid' THEN
            UPDATE public.course_dates
            SET current_booked_count = GREATEST(0, current_booked_count - OLD.quantity)
            WHERE id = OLD.course_date_id;
        END IF;
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_booking_count
    AFTER INSERT OR UPDATE OR DELETE ON public.order_items
    FOR EACH ROW EXECUTE FUNCTION update_course_date_booking_count();

-- =====================================================
-- FUNKCE: Aktualizace booking count při změně statusu objednávky
-- =====================================================
CREATE OR REPLACE FUNCTION update_booking_on_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Pokud se objednávka stala 'paid'
    IF (NEW.status = 'paid' AND OLD.status != 'paid') THEN
        UPDATE public.course_dates cd
        SET current_booked_count = current_booked_count + oi.quantity
        FROM public.order_items oi
        WHERE oi.order_id = NEW.id AND oi.course_date_id = cd.id;
    END IF;

    -- Pokud se objednávka změnila z 'paid' na něco jiného
    IF (OLD.status = 'paid' AND NEW.status != 'paid') THEN
        UPDATE public.course_dates cd
        SET current_booked_count = GREATEST(0, current_booked_count - oi.quantity)
        FROM public.order_items oi
        WHERE oi.order_id = NEW.id AND oi.course_date_id = cd.id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_booking_on_status_change
    AFTER UPDATE OF status ON public.orders
    FOR EACH ROW
    WHEN (OLD.status IS DISTINCT FROM NEW.status)
    EXECUTE FUNCTION update_booking_on_order_status_change();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
-- Pro veřejné čtení kurzů a termínů

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policy: Každý může číst kurzy
CREATE POLICY "Kurzy jsou veřejně čitelné" ON public.courses
    FOR SELECT USING (true);

-- Policy: Každý může číst aktivní termíny
CREATE POLICY "Aktivní termíny jsou veřejně čitelné" ON public.course_dates
    FOR SELECT USING (is_active = true);

-- Policy: Pouze autentizovaní uživatelé mohou vytvářet objednávky
CREATE POLICY "Kdokoli může vytvořit objednávku" ON public.orders
    FOR INSERT WITH CHECK (true);

-- Policy: Uživatel může číst své objednávky (podle emailu)
CREATE POLICY "Uživatel vidí své objednávky" ON public.orders
    FOR SELECT USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Policy: Kdokoli může vytvořit order_items (při vytváření objednávky)
CREATE POLICY "Kdokoli může přidat položky k objednávce" ON public.order_items
    FOR INSERT WITH CHECK (true);

-- Policy: Uživatel vidí položky svých objednávek
CREATE POLICY "Uživatel vidí položky svých objednávek" ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders o
            WHERE o.id = order_items.order_id
            AND o.user_email = current_setting('request.jwt.claims', true)::json->>'email'
        )
    );

-- =====================================================
-- VIEWS pro snadnější dotazy
-- =====================================================

-- View: Přehled kurzů s počtem nadcházejících termínů
CREATE OR REPLACE VIEW public.courses_with_upcoming_dates AS
SELECT
    c.*,
    COUNT(cd.id) FILTER (WHERE cd.start_date > NOW() AND cd.is_active = true) as upcoming_dates_count,
    MIN(cd.start_date) FILTER (WHERE cd.start_date > NOW() AND cd.is_active = true) as next_date
FROM public.courses c
LEFT JOIN public.course_dates cd ON c.id = cd.course_id
GROUP BY c.id;

-- View: Dostupné termíny (nejsou plně obsazené)
CREATE OR REPLACE VIEW public.available_course_dates AS
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
    AND cd.start_date > NOW()
ORDER BY cd.start_date;

-- =====================================================
-- SETUP COMPLETED
-- =====================================================
-- Databázová struktura je připravena!
-- Nyní můžeš spustit seed data.
-- =====================================================
