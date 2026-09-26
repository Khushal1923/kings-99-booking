-- ==============================================================================
-- KINGS 99 RESTAURANT & VILLA — SUPABASE SCHEMA & RLS SETUP SCRIPT
-- Copy and run this script in your Supabase SQL Editor (https://app.supabase.com)
-- ==============================================================================

-- 1. VILLAS TABLE
CREATE TABLE IF NOT EXISTS public.villas (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tag TEXT,
  tagline TEXT,
  price NUMERIC DEFAULT 0,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INT4 DEFAULT 0,
  max_guests INT4 DEFAULT 2,
  bedrooms INT4 DEFAULT 1,
  bathrooms INT4 DEFAULT 1,
  sqm INT4 DEFAULT 100,
  cover_image TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  amenities JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  villa_id TEXT NOT NULL,
  villa_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  check_in TEXT NOT NULL,
  check_out TEXT NOT NULL,
  guests INT4 DEFAULT 1,
  total_price NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'PENDING',
  booking_type TEXT DEFAULT 'ONLINE',
  payment_mode TEXT,
  payment_status TEXT,
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DINING BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.dining_bookings (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  guests INT4 DEFAULT 2,
  notes TEXT,
  status TEXT DEFAULT 'PENDING',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BLOCKED DATES TABLE
CREATE TABLE IF NOT EXISTS public.blocked_dates (
  id TEXT PRIMARY KEY,
  villa_id TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RESTAURANT TABLE
CREATE TABLE IF NOT EXISTS public.restaurant (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  categories JSONB DEFAULT '[]'::jsonb,
  ambiance_gallery JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CMS TABLE
CREATE TABLE IF NOT EXISTS public.cms (
  id TEXT PRIMARY KEY DEFAULT 'main',
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. USER ROLES TABLE (Maps Auth Users to Admin/Staff Role)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ADMIN', 'STAFF', 'admin', 'staff')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Helper function to check if a user is an ADMIN without RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE id = user_id AND LOWER(role) = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

REVOKE EXECUTE ON FUNCTION public.is_admin(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO authenticated;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.villas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dining_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- VILLAS Policies: Everyone can SELECT, only Admin users can INSERT/UPDATE/DELETE
CREATE POLICY "Public Read Villas" ON public.villas FOR SELECT USING (true);
CREATE POLICY "Admin Write Villas" ON public.villas FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- BOOKINGS Policies: Public can Insert pending bookings, Authenticated users can Read, Create, Update, Admin can Delete
CREATE POLICY "Public Insert Bookings" ON public.bookings FOR INSERT WITH CHECK (
  (status = 'PENDING' OR status IS NULL) AND
  (booking_type = 'ONLINE' OR booking_type IS NULL) AND
  (payment_status = 'PENDING' OR payment_status IS NULL OR payment_status = 'UNPAID')
);
CREATE POLICY "Auth Read Bookings" ON public.bookings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth Insert Bookings" ON public.bookings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth Update Bookings" ON public.bookings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Delete Bookings" ON public.bookings FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- DINING BOOKINGS Policies: Public can Insert pending dining reservations, Authenticated users can Read, Create, Update, Admin can Delete
CREATE POLICY "Public Insert Dining Bookings" ON public.dining_bookings FOR INSERT WITH CHECK (status = 'PENDING' OR status IS NULL);
CREATE POLICY "Auth Read Dining Bookings" ON public.dining_bookings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth Insert Dining Bookings" ON public.dining_bookings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth Update Dining Bookings" ON public.dining_bookings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Delete Dining Bookings" ON public.dining_bookings FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- BLOCKED DATES Policies: Everyone can SELECT, only Admin users can write
CREATE POLICY "Public Read Blocked Dates" ON public.blocked_dates FOR SELECT USING (true);
CREATE POLICY "Admin Write Blocked Dates" ON public.blocked_dates FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- RESTAURANT Policies: Everyone can SELECT, only Admin users can write
CREATE POLICY "Public Read Restaurant" ON public.restaurant FOR SELECT USING (true);
CREATE POLICY "Admin Write Restaurant" ON public.restaurant FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- GALLERY Policies: Everyone can SELECT, only Admin users can write
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Admin Write Gallery" ON public.gallery FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- CMS Policies: Everyone can SELECT, only Admin users can write
CREATE POLICY "Public Read CMS" ON public.cms FOR SELECT USING (true);
CREATE POLICY "Admin Write CMS" ON public.cms FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- USER ROLES Policies: Authenticated users can read user roles, Admin manages user roles
CREATE POLICY "Auth Read User Roles" ON public.user_roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin Write User Roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Grant API access to public tables
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- ==============================================================================
-- REALTIME SUBSCRIPTION SETTINGS
-- ==============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.dining_bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.villas;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blocked_dates;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.restaurant;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gallery;

-- ==============================================================================
-- STORAGE BUCKET CREATION (FOR RESORT MEDIA & UPLOADS)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('resort-media', 'resort-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Resort Media" ON storage.objects
FOR SELECT USING (bucket_id = 'resort-media');

CREATE POLICY "Admin Upload Resort Media" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'resort-media' AND public.is_admin(auth.uid()));

CREATE POLICY "Admin Delete Resort Media" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'resort-media' AND public.is_admin(auth.uid()));
