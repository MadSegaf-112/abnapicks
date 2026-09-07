-- ==============================================================================
-- PHASE 6H-3 — DATABASE SCHEMA & MIGRATION FOR CUSTOMER SESSION ANALYTICS
-- ==============================================================================
-- Project: ABNA PICKS (Aura AI)
-- Date: August 31, 2026
-- Description: Stores completed customer consultation sessions for future
--              Admin Analytics Dashboard while strictly preserving privacy (Zero PII).
-- ==============================================================================

-- 1. Create customer_sessions table
CREATE TABLE IF NOT EXISTS public.customer_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(64) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed BOOLEAN NOT NULL DEFAULT TRUE,
    client_platform VARCHAR(32) NOT NULL DEFAULT 'kiosk_web',
    
    -- Demographic / Marketing Analytics (Categorical, Privacy-Preserving)
    gender VARCHAR(32),
    age_range VARCHAR(32),
    occupation VARCHAR(64),
    price_range VARCHAR(64),
    
    -- Olfactive Preferences (Raw signals submitted)
    mood VARCHAR(64),
    atmosphere VARCHAR(64),
    scent_families JSONB NOT NULL DEFAULT '[]'::jsonb,
    intensity VARCHAR(32),
    occasion VARCHAR(64),
    
    -- Recommendation Outputs (Deterministic Top 3 Structured Data)
    recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
    top_fragrance_id VARCHAR(128) NOT NULL,
    top_fragrance_name VARCHAR(128) NOT NULL,
    top_fragrance_house VARCHAR(128) NOT NULL,
    top_match_percent INT NOT NULL
);

-- 2. Performance & Analytics Aggregation Indexes
CREATE INDEX IF NOT EXISTS idx_customer_sessions_created_at 
    ON public.customer_sessions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_sessions_gender 
    ON public.customer_sessions(gender);

CREATE INDEX IF NOT EXISTS idx_customer_sessions_age_range 
    ON public.customer_sessions(age_range);

CREATE INDEX IF NOT EXISTS idx_customer_sessions_occupation 
    ON public.customer_sessions(occupation);

CREATE INDEX IF NOT EXISTS idx_customer_sessions_price_range 
    ON public.customer_sessions(price_range);

CREATE INDEX IF NOT EXISTS idx_customer_sessions_top_fragrance_id 
    ON public.customer_sessions(top_fragrance_id);

CREATE INDEX IF NOT EXISTS idx_customer_sessions_client_platform 
    ON public.customer_sessions(client_platform);

-- 3. Row Level Security (RLS) Configuration
ALTER TABLE public.customer_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous / kiosk users to INSERT completed sessions (Write-Only)
DROP POLICY IF EXISTS "Allow anonymous kiosk insertion" ON public.customer_sessions;
CREATE POLICY "Allow anonymous kiosk insertion"
    ON public.customer_sessions
    FOR INSERT
    TO anon, authenticated, service_role
    WITH CHECK (true);

-- Disallow public / anon reads (Prevent customer data scraping)
-- Authenticated admins or service_role can query sessions for admin analytics
DROP POLICY IF EXISTS "Allow authenticated admin read" ON public.customer_sessions;
CREATE POLICY "Allow authenticated admin read"
    ON public.customer_sessions
    FOR SELECT
    TO authenticated, service_role
    USING (true);

-- Deny public UPDATE / DELETE to maintain consultation audit immutability
DROP POLICY IF EXISTS "Allow service_role full management" ON public.customer_sessions;
CREATE POLICY "Allow service_role full management"
    ON public.customer_sessions
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

COMMENT ON TABLE public.customer_sessions IS 'ABNA Picks consultation sessions containing olfactive preferences, demographics, and top 3 recommendations.';
