-- =====================================================================
-- VIDYATRAA DATABASE INITIALIZATION & MIGRATION SCRIPT
-- =====================================================================
-- WARNING: This script drops existing tables and resets the schema.
-- Copy and paste this script directly into the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/dtsnsjojadwrnafpjmec/sql/new
-- =====================================================================

-- 1. Drop existing triggers & functions first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

-- 2. Drop existing tables (in correct dependency order)
DROP TABLE IF EXISTS public.website_signup CASCADE;
DROP TABLE IF EXISTS public.saved_scholarships CASCADE;
DROP TABLE IF EXISTS public.scholarships CASCADE;
DROP TABLE IF EXISTS public.enquiries CASCADE;
DROP TABLE IF EXISTS public.admins CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- ==========================================
-- TABLE CREATION
-- ==========================================

-- 3. Create PROFILES table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    mobile_number TEXT,
    state TEXT,
    category TEXT,
    address TEXT,
    annual_income NUMERIC,
    education_level TEXT,
    academic_marks NUMERIC,
    parent_occupation TEXT,
    special_status TEXT,
    current_course TEXT,
    role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin', 'super_admin')),
    xp INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    board TEXT,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create ADMINS table
CREATE TABLE public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Create SCHOLARSHIPS table
CREATE TABLE public.scholarships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    amount TEXT,
    deadline DATE,
    state TEXT DEFAULT 'All India',
    category TEXT DEFAULT 'All',
    gender_requirement TEXT DEFAULT 'All',
    provider TEXT,
    official_link TEXT,
    requirements TEXT[],
    documents TEXT[],
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Create SAVED_SCHOLARSHIPS table (Join table)
CREATE TABLE public.saved_scholarships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    scholarship_id UUID NOT NULL REFERENCES public.scholarships(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (user_id, scholarship_id)
);

-- 7. Create ENQUIRIES table (Contact submissions)
CREATE TABLE public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    inquiry_type TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Resolved', 'In Progress')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Create WEBSITE_SIGNUP table (Unified Registration)
CREATE TABLE public.website_signup (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- School, UG, PG
    board_course TEXT NOT NULL, -- CBSE, ICSE, etc.
    school_institute TEXT NOT NULL, -- School / Institute Name
    expected_percentage TEXT,
    goal TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) & ACCESS CONTROL
-- ==========================================

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_signup ENABLE ROW LEVEL SECURITY;

-- Helper function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins WHERE user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Allow public/authenticated read of profiles"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Allow users to insert/update their own profile"
    ON public.profiles FOR ALL
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Admins Policies
CREATE POLICY "Allow authenticated read of admins table"
    ON public.admins FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow admin role to edit admins"
    ON public.admins FOR ALL
    TO authenticated
    USING (public.is_admin());

-- Scholarships Policies
CREATE POLICY "Allow public read access to scholarships"
    ON public.scholarships FOR SELECT
    USING (true);

CREATE POLICY "Allow admin role full write access to scholarships"
    ON public.scholarships FOR ALL
    TO authenticated
    USING (public.is_admin());

-- Saved Scholarships Policies
CREATE POLICY "Allow authenticated users to read their own saved scholarships"
    ON public.saved_scholarships FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Allow authenticated users to insert their own saved scholarships"
    ON public.saved_scholarships FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow authenticated users to delete their own saved scholarships"
    ON public.saved_scholarships FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Enquiries Policies
CREATE POLICY "Allow anyone to submit enquiries"
    ON public.enquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow admins full access to enquiries"
    ON public.enquiries FOR ALL
    TO authenticated
    USING (public.is_admin());

-- Website Signup Policies
CREATE POLICY "Allow anyone to insert website signup records"
    ON public.website_signup FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read their own website signup record"
    ON public.website_signup FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Allow admins full access to website signup records"
    ON public.website_signup FOR ALL
    TO authenticated
    USING (public.is_admin());

-- ==========================================
-- TRIGGERS AND FUNCTIONS
-- ==========================================

-- Automatically create a profile for new users who sign up via Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    'student'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger definition
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================================
-- END OF SCRIPT
-- =====================================================================
