-- ==============================================================================
-- Supabase Database Migration: Partner Applications Desk
-- Migration: 20261104_create_partner_applications.sql
-- ==============================================================================

BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create trigger function for updated_at if not already present
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------
-- 1. PARTNER APPLICATIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.partner_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  organization_name text,
  partner_type text NOT NULL DEFAULT 'sub_broker',
  city text,
  client_base_size text,
  aum_range text,
  message text,
  status text NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'approved', 'rejected'
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Trigger for automatic updated_at timestamp
DROP TRIGGER IF EXISTS trigger_partner_applications_updated_at ON public.partner_applications;
CREATE TRIGGER trigger_partner_applications_updated_at
  BEFORE UPDATE ON public.partner_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Performance and query indexes
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON public.partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_partner_applications_created_at ON public.partner_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_partner_applications_email ON public.partner_applications(email);
CREATE INDEX IF NOT EXISTS idx_partner_applications_phone ON public.partner_applications(phone);

-- Enable Row Level Security (RLS)
ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they already exist to ensure idempotency
DROP POLICY IF EXISTS "Public anonymous visitors can submit partner applications" ON public.partner_applications;
DROP POLICY IF EXISTS "Admins have full access to partner applications" ON public.partner_applications;

-- Policy 1: Public anonymous and authenticated visitors can submit partner applications (INSERT only)
CREATE POLICY "Public anonymous visitors can submit partner applications"
  ON public.partner_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy 2: Authenticated admins can view, update, and manage partner applications
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'is_admin') THEN
    EXECUTE '
      CREATE POLICY "Admins have full access to partner applications"
        ON public.partner_applications
        FOR ALL
        TO authenticated
        USING (public.is_admin())
        WITH CHECK (public.is_admin())
    ';
  ELSE
    EXECUTE '
      CREATE POLICY "Admins have full access to partner applications"
        ON public.partner_applications
        FOR ALL
        TO authenticated
        USING (
          coalesce((auth.jwt() -> ''user_metadata'' ->> ''role''), '''') = ''admin'' OR
          coalesce((auth.jwt() ->> ''email''), '''') = ''sharmamuskan8271@gmail.com''
        )
        WITH CHECK (
          coalesce((auth.jwt() -> ''user_metadata'' ->> ''role''), '''') = ''admin'' OR
          coalesce((auth.jwt() ->> ''email''), '''') = ''sharmamuskan8271@gmail.com''
        )
    ';
  END IF;
END $$;

-- Permissions / Grants
GRANT SELECT, INSERT ON public.partner_applications TO anon, authenticated;
GRANT ALL ON public.partner_applications TO service_role;

COMMIT;

