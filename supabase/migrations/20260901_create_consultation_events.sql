-- ==============================================================================
-- Migration: 20260901_create_consultation_events.sql
-- Description: Create public.consultation_events table, indexes, and RLS policies
-- Phase: DATA-05 — Consultation Event Stream & Funnel Analytics
-- ==============================================================================

-- 1. Create consultation_events table
CREATE TABLE IF NOT EXISTS public.consultation_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  question_number INTEGER,
  step_id TEXT,
  client_platform TEXT DEFAULT 'kiosk_web' NOT NULL,
  metadata JSONB DEFAULT '{}'::JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Performance Indexes for Funnel Aggregations and Idempotency
-- Index on (session_id, event_type, question_number) for fast distinct session counting and deduping
CREATE INDEX IF NOT EXISTS idx_consultation_events_session_type_q
ON public.consultation_events(session_id, event_type, question_number);

-- Index on created_at for time-window filtering (today, 7d, 30d, all)
CREATE INDEX IF NOT EXISTS idx_consultation_events_created_at
ON public.consultation_events(created_at DESC);

-- Index on event_type for categorical stage aggregation
CREATE INDEX IF NOT EXISTS idx_consultation_events_event_type
ON public.consultation_events(event_type);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.consultation_events ENABLE ROW LEVEL SECURITY;

-- 4. RLS Security Policies
-- In-store kiosk & customer journey architecture:
-- Persistence is executed server-side via service role key (bypasses RLS for secure background writes).
-- Authenticated admins can SELECT consultation events for dashboard funnel analytics.
-- Anonymous browser clients cannot SELECT, UPDATE, or DELETE records.

DROP POLICY IF EXISTS "Allow authenticated admin read on consultation_events" ON public.consultation_events;
CREATE POLICY "Allow authenticated admin read on consultation_events"
ON public.consultation_events
FOR SELECT
TO authenticated
USING (true);
