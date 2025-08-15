-- LINAK Client Portal Storage Setup
-- Run this in Supabase SQL Editor to set up storage buckets and policies
-- IDEMPOTENT: Safe to run multiple times

-- Create storage bucket for client documents (idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-documents', 'client-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies to ensure clean state
DROP POLICY IF EXISTS "Clients can upload to own folder" ON storage.objects;
DROP POLICY IF EXISTS "Clients can view own files" ON storage.objects; 
DROP POLICY IF EXISTS "Clients can update own files" ON storage.objects;
DROP POLICY IF EXISTS "Clients can delete own files" ON storage.objects;
DROP POLICY IF EXISTS "Service role full access to client documents" ON storage.objects;
DROP POLICY IF EXISTS "Public can view public assets" ON storage.objects;

-- Create storage policies for client documents bucket
-- Policy: Clients can only access their own folders
CREATE POLICY "Clients can upload to own folder" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'client-documents'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Clients can view own files" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'client-documents'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Clients can update own files" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'client-documents'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Clients can delete own files" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'client-documents'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Service role full access to storage
CREATE POLICY "Service role full access to client documents" ON storage.objects
    FOR ALL USING (
        bucket_id = 'client-documents'
        AND auth.role() = 'service_role'
    );

-- Create bucket for public assets (idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-assets', 'public-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access to public assets
CREATE POLICY "Public can view public assets" ON storage.objects
    FOR SELECT USING (bucket_id = 'public-assets');
