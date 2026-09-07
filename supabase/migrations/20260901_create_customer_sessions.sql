-- ==============================================================================
-- Migration: 20260901_create_customer_sessions.sql
-- Description: Create public.customer_sessions table, indexes, and RLS policies
-- Phase: DATA-01B
-- ==============================================================================

-- 1. Create customer_sessions table
CREATE TABLE IF NOT EXISTS public.customer_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  completed BOOLEAN DEFAULT true NOT NULL,
  client_platform TEXT DEFAULT 'kiosk_web' NOT NULL,

  -- Demographics / Marketing Profile
  gender TEXT,
  age_range TEXT,
  occupation TEXT,
  price_range TEXT,

  -- Olfactive Preferences
  mood TEXT,
  atmosphere TEXT,
  scent_families TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
  intensity TEXT,
  occasion TEXT,

  -- Recommendation Payload
  recommendations JSONB DEFAULT '[]'::JSONB NOT NULL,

  top_fragrance_id TEXT NOT NULL,
  top_fragrance_name TEXT NOT NULL,
  top_fragrance_house TEXT NOT NULL,
  top_match_percent INTEGER NOT NULL
);

-- 2. Create performance indexes for admin analytics
CREATE INDEX IF NOT EXISTS idx_customer_sessions_created_at
ON public.customer_sessions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_sessions_top_fragrance
ON public.customer_sessions(top_fragrance_id);

CREATE INDEX IF NOT EXISTS idx_customer_sessions_gender
ON public.customer_sessions(gender);

CREATE INDEX IF NOT EXISTS idx_customer_sessions_age_range
ON public.customer_sessions(age_range);

CREATE INDEX IF NOT EXISTS idx_customer_sessions_occupation
ON public.customer_sessions(occupation);

CREATE INDEX IF NOT EXISTS idx_customer_sessions_price_range
ON public.customer_sessions(price_range);

-- 3. Enable Row Level Security
ALTER TABLE public.customer_sessions ENABLE ROW LEVEL SECURITY;

-- 4. RLS Security Policies
-- In-store kiosk architecture:
-- Persistence is executed server-side via service role key (bypasses RLS for secure background writes).
-- Authenticated admins can SELECT customer sessions for dashboard analytics.
-- Anonymous browser clients cannot SELECT, UPDATE, or DELETE records.

DROP POLICY IF EXISTS "Allow authenticated admin read" ON public.customer_sessions;
CREATE POLICY "Allow authenticated admin read"
ON public.customer_sessions
FOR SELECT
TO authenticated
USING (true);
