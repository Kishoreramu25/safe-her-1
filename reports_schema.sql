-- Run this in your Supabase SQL Editor to create the reports table
-- We drop the table first to ensure a clean state and avoid "column does not exist" errors from old versions
DROP TABLE IF EXISTS public.reports CASCADE;

CREATE TABLE public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    reporter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    platform TEXT,
    category TEXT,
    incident_description TEXT,
    victim_details JSONB,
    suspect_info JSONB,
    evidence_urls TEXT[],
    risk_score INT DEFAULT 0,
    status TEXT DEFAULT 'new'
);

-- Enable RLS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own reports
CREATE POLICY "Users can insert their own reports" ON public.reports
    FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- Allow users to view their own reports
CREATE POLICY "Users can view their own reports" ON public.reports
    FOR SELECT USING (auth.uid() = reporter_id);

-- Allow officials to view all reports
CREATE POLICY "Officials can view all reports" ON public.reports
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'official'
        )
    );

-- IMPORTANT: RUN THIS TO CREATE THE STORAGE BUCKET FOR EVIDENCE
-- This resolves the "Bucket not found" error
INSERT INTO storage.buckets (id, name, public) 
VALUES ('evidence', 'evidence', true)
ON CONFLICT (id) DO NOTHING;

-- STORAGE POLICIES
-- 1. Allow authenticated users to upload evidence
CREATE POLICY "Allow authenticated uploads" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'evidence' 
        AND auth.role() = 'authenticated'
    );

-- 2. Allow public to view evidence (since it's a public report flow)
CREATE POLICY "Allow public select" ON storage.objects
    FOR SELECT USING (bucket_id = 'evidence');

