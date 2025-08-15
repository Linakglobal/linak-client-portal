-- =============================================
-- LINAK Client Portal Database Schema
-- =============================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- =============================================
-- CLIENTS TABLE
-- =============================================
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text unique not null,
  name text not null,
  dob date not null,
  company text,
  phone text,
  address text,
  account_status text default 'active' check (account_status in ('active', 'inactive', 'suspended')),
  payment_amount numeric(10,2),
  currency text default 'USD',
  payment_status text default 'pending' check (payment_status in ('completed', 'pending', 'overdue')),
  contract_type text,
  start_date date,
  end_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =============================================
-- DOCUMENTS TABLE
-- =============================================
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade not null,
  file_name text not null,
  description text not null,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'rejected', 'approved')),
  file_path text not null,
  file_size bigint,
  mime_type text,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =============================================
-- STORAGE BUCKET
-- =============================================
insert into storage.buckets (id, name, public)
values ('client-documents', 'client-documents', false);

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on clients table
alter table public.clients enable row level security;

-- Policy: Users can only see their own client record
create policy "Users can view own client data" on public.clients
  for select using (auth.uid() = user_id);

-- Policy: Users can update their own client record
create policy "Users can update own client data" on public.clients
  for update using (auth.uid() = user_id);

-- Enable RLS on documents table
alter table public.documents enable row level security;

-- Policy: Users can only see documents for their client record
create policy "Users can view own documents" on public.documents
  for select using (
    client_id in (
      select id from public.clients where user_id = auth.uid()
    )
  );

-- Policy: Users can insert documents for their own client record
create policy "Users can insert own documents" on public.documents
  for insert with check (
    client_id in (
      select id from public.clients where user_id = auth.uid()
    )
  );

-- Policy: Users can update their own documents
create policy "Users can update own documents" on public.documents
  for update using (
    client_id in (
      select id from public.clients where user_id = auth.uid()
    )
  );

-- =============================================
-- STORAGE POLICIES
-- =============================================

-- Policy: Users can upload files to their own folder
create policy "Users can upload own files" on storage.objects
  for insert with check (
    bucket_id = 'client-documents' and
    (storage.foldername(name))[1] in (
      select id::text from public.clients where user_id = auth.uid()
    )
  );

-- Policy: Users can view their own files
create policy "Users can view own files" on storage.objects
  for select using (
    bucket_id = 'client-documents' and
    (storage.foldername(name))[1] in (
      select id::text from public.clients where user_id = auth.uid()
    )
  );

-- Policy: Users can update their own files
create policy "Users can update own files" on storage.objects
  for update using (
    bucket_id = 'client-documents' and
    (storage.foldername(name))[1] in (
      select id::text from public.clients where user_id = auth.uid()
    )
  );

-- Policy: Users can delete their own files
create policy "Users can delete own files" on storage.objects
  for delete using (
    bucket_id = 'client-documents' and
    (storage.foldername(name))[1] in (
      select id::text from public.clients where user_id = auth.uid()
    )
  );

-- =============================================
-- SAMPLE DATA (for testing)
-- =============================================

-- Insert sample clients (you'll need to replace user_id with actual auth.users IDs)
insert into public.clients (
  id,
  user_id,
  email,
  name,
  dob,
  company,
  phone,
  address,
  account_status,
  payment_amount,
  currency,
  payment_status,
  contract_type,
  start_date,
  end_date
) values 
(
  gen_random_uuid(),
  null, -- Replace with actual user_id from auth.users after user signs up
  'john.anderson@linakglobal.com',
  'John Anderson',
  '1985-03-15',
  'Anderson Manufacturing Ltd.',
  '+1 (555) 123-4567',
  '123 Industrial Ave, Manufacturing District, NY 10001',
  'active',
  125000.00,
  'USD',
  'completed',
  'Premium Enterprise',
  '2024-01-15',
  '2025-01-14'
),
(
  gen_random_uuid(),
  null, -- Replace with actual user_id from auth.users after user signs up
  'sarah.wilson@linakglobal.com',
  'Sarah Wilson',
  '1990-07-22',
  'Wilson Automation Systems',
  '+1 (555) 987-6543',
  '456 Tech Boulevard, Innovation Park, CA 94105',
  'active',
  75000.00,
  'USD',
  'completed',
  'Standard Business',
  '2024-03-01',
  '2025-02-28'
),
(
  gen_random_uuid(),
  null, -- Replace with actual user_id from auth.users after user signs up
  'michael.chen@linakglobal.com',
  'Michael Chen',
  '1982-11-08',
  'Chen Industrial Solutions',
  '+1 (555) 456-7890',
  '789 Corporate Drive, Business Center, TX 75001',
  'active',
  200000.00,
  'USD',
  'completed',
  'Platinum Elite',
  '2023-12-01',
  '2024-11-30'
);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to automatically create client record when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Only create client record if email matches existing client template
  if exists (select 1 from public.clients where email = new.email and user_id is null) then
    update public.clients
    set user_id = new.id
    where email = new.email and user_id is null;
  end if;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically link user to client record on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers to automatically update updated_at timestamps
create trigger update_clients_updated_at before update on public.clients
  for each row execute procedure public.update_updated_at_column();

create trigger update_documents_updated_at before update on public.documents
  for each row execute procedure public.update_updated_at_column();

-- =============================================
-- INDEXES for Performance
-- =============================================

create index clients_user_id_idx on public.clients(user_id);
create index clients_email_idx on public.clients(email);
create index documents_client_id_idx on public.documents(client_id);
create index documents_status_idx on public.documents(status);
create index documents_uploaded_at_idx on public.documents(uploaded_at desc);

-- =============================================
-- DEFAMATION REPORTS SYSTEM
-- =============================================

-- Create reports table for storing defamation reports
CREATE TABLE IF NOT EXISTS public.defamation_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_id TEXT NOT NULL,
    post_link TEXT NOT NULL,
    screenshot_url TEXT,
    explanation TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'resolved')),
    reward_amount INTEGER DEFAULT 25000,
    reward_status TEXT DEFAULT 'pending' CHECK (reward_status IN ('pending', 'approved', 'paid')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES auth.users(id),
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create client_status table for tracking client reputation
CREATE TABLE IF NOT EXISTS public.client_status (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id TEXT UNIQUE NOT NULL,
    client_email TEXT NOT NULL,
    status TEXT DEFAULT 'regular' CHECK (status IN ('regular', 'vip', 'express', 'blacklisted')),
    reputation_score INTEGER DEFAULT 100,
    total_reports_submitted INTEGER DEFAULT 0,
    verified_reports INTEGER DEFAULT 0,
    total_rewards_earned INTEGER DEFAULT 0,
    blacklist_reason TEXT,
    blacklisted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create client_rewards table for tracking rewards
CREATE TABLE IF NOT EXISTS public.client_rewards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id TEXT NOT NULL,
    report_id UUID REFERENCES public.defamation_reports(id),
    reward_type TEXT NOT NULL CHECK (reward_type IN ('discount', 'upgrade', 'bonus')),
    reward_value INTEGER NOT NULL,
    reward_description TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'redeemed', 'expired')),
    expires_at TIMESTAMP WITH TIME ZONE,
    redeemed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_defamation_reports_client_id ON public.defamation_reports(client_id);
CREATE INDEX IF NOT EXISTS idx_defamation_reports_status ON public.defamation_reports(status);
CREATE INDEX IF NOT EXISTS idx_defamation_reports_created_at ON public.defamation_reports(created_at);
CREATE INDEX IF NOT EXISTS idx_client_status_client_id ON public.client_status(client_id);
CREATE INDEX IF NOT EXISTS idx_client_status_status ON public.client_status(status);
CREATE INDEX IF NOT EXISTS idx_client_rewards_client_id ON public.client_rewards(client_id);

-- Row Level Security (RLS) policies
ALTER TABLE public.defamation_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_rewards ENABLE ROW LEVEL SECURITY;

-- Policy to allow clients to submit reports (one per post URL per client email)
CREATE POLICY "Users can submit reports" ON public.defamation_reports
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' AND
        NOT EXISTS (
            SELECT 1 FROM public.defamation_reports 
            WHERE client_email = NEW.client_email 
            AND post_link = NEW.post_link
        )
    );

-- Policy to allow clients to view their own reports
CREATE POLICY "Users can view own reports" ON public.defamation_reports
    FOR SELECT USING (
        auth.role() = 'authenticated' AND
        client_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    );

-- Policy for admin to view all reports
CREATE POLICY "Admin can view all reports" ON public.defamation_reports
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE id = auth.uid() 
            AND email IN ('admin@linakmigration.com', 'management@linakmigration.com')
        )
    );

-- Policy for client status
CREATE POLICY "Users can view own status" ON public.client_status
    FOR SELECT USING (
        auth.role() = 'authenticated' AND
        client_email = (SELECT email FROM auth.users WHERE id = auth.uid())
    );

-- Policy for client rewards
CREATE POLICY "Users can view own rewards" ON public.client_rewards
    FOR SELECT USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM public.client_status 
            WHERE client_id = client_rewards.client_id 
            AND client_email = (SELECT email FROM auth.users WHERE id = auth.uid())
        )
    );

-- Function to automatically update client status when report is verified
CREATE OR REPLACE FUNCTION public.update_client_status_on_verified_report()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'verified' AND OLD.status != 'verified' THEN
        -- Update client status
        INSERT INTO public.client_status (client_id, client_email, total_reports_submitted, verified_reports)
        VALUES (NEW.client_id, NEW.client_email, 1, 1)
        ON CONFLICT (client_id) 
        DO UPDATE SET 
            verified_reports = client_status.verified_reports + 1,
            reputation_score = LEAST(client_status.reputation_score + 10, 150),
            updated_at = NOW();
        
        -- Create reward entry
        INSERT INTO public.client_rewards (
            client_id, 
            report_id, 
            reward_type, 
            reward_value, 
            reward_description,
            expires_at
        ) VALUES (
            NEW.client_id,
            NEW.id,
            'discount',
            NEW.reward_amount,
            'Discount for verified defamation report',
            NOW() + INTERVAL '90 days'
        );
        
        -- Check for VIP upgrade eligibility (3+ verified reports)
        IF (SELECT verified_reports FROM public.client_status WHERE client_id = NEW.client_id) >= 3 THEN
            UPDATE public.client_status 
            SET status = 'vip', updated_at = NOW() 
            WHERE client_id = NEW.client_id AND status = 'regular';
            
            -- Add VIP upgrade reward
            INSERT INTO public.client_rewards (
                client_id,
                report_id,
                reward_type,
                reward_value,
                reward_description
            ) VALUES (
                NEW.client_id,
                NEW.id,
                'upgrade',
                0,
                'Free VIP upgrade for community protection'
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER trigger_update_client_status_on_verified_report
    AFTER UPDATE ON public.defamation_reports
    FOR EACH ROW
    EXECUTE FUNCTION public.update_client_status_on_verified_report();

-- RPC function to upsert client submission count
CREATE OR REPLACE FUNCTION public.upsert_client_submission(
    p_client_id TEXT,
    p_client_email TEXT
)
RETURNS void AS $$
BEGIN
    INSERT INTO public.client_status (client_id, client_email, total_reports_submitted)
    VALUES (p_client_id, p_client_email, 1)
    ON CONFLICT (client_id) 
    DO UPDATE SET 
        total_reports_submitted = client_status.total_reports_submitted + 1,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- STORAGE BUCKET FOR DEFAMATION REPORTS
-- =============================================

-- Create storage bucket for defamation report screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('defamation-reports', 'defamation-reports', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for defamation reports
CREATE POLICY "Users can upload defamation screenshots" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'defamation-reports' AND
        auth.role() = 'authenticated'
    );

CREATE POLICY "Public can view defamation screenshots" ON storage.objects
    FOR SELECT USING (bucket_id = 'defamation-reports');

CREATE POLICY "Users can update own screenshots" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'defamation-reports' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete own screenshots" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'defamation-reports' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );
