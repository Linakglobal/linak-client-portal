#!/bin/bash

# LINAK Client Portal - Database Setup Script
# This script sets up the Supabase database schema and policies

echo "🚀 Setting up LINAK Client Portal Database..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it first:"
    echo "   npm install -g supabase"
    echo "   Visit: https://supabase.com/docs/guides/cli"
    exit 1
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found. Please create it with your Supabase credentials."
    exit 1
fi

echo "📋 Creating database tables..."

# Create SQL script for database setup
cat > supabase_setup.sql << 'EOF'
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    dob DATE NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'archived')),
    tags TEXT[],
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES auth.users(id),
    notes TEXT
);

-- Create document_history table for audit trail
CREATE TABLE IF NOT EXISTS document_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
    action VARCHAR(100) NOT NULL,
    old_status VARCHAR(50),
    new_status VARCHAR(50),
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON clients(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_client_id ON documents(client_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_documents_uploaded_at ON documents(uploaded_at);
CREATE INDEX IF NOT EXISTS idx_document_history_document_id ON document_history(document_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for clients table
DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_history ENABLE ROW LEVEL SECURITY;

-- Policies for clients table
DROP POLICY IF EXISTS "Users can view their own client record" ON clients;
CREATE POLICY "Users can view their own client record" ON clients
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own client record" ON clients;
CREATE POLICY "Users can update their own client record" ON clients
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all clients" ON clients;
CREATE POLICY "Service role can manage all clients" ON clients
    FOR ALL USING (auth.role() = 'service_role');

-- Policies for documents table
DROP POLICY IF EXISTS "Users can view their own documents" ON documents;
CREATE POLICY "Users can view their own documents" ON documents
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM clients 
            WHERE clients.id = documents.client_id 
            AND clients.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can insert their own documents" ON documents;
CREATE POLICY "Users can insert their own documents" ON documents
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM clients 
            WHERE clients.id = documents.client_id 
            AND clients.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Service role can manage all documents" ON documents;
CREATE POLICY "Service role can manage all documents" ON documents
    FOR ALL USING (auth.role() = 'service_role');

-- Policies for document_history table
DROP POLICY IF EXISTS "Users can view their document history" ON document_history;
CREATE POLICY "Users can view their document history" ON document_history
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM documents 
            JOIN clients ON clients.id = documents.client_id
            WHERE documents.id = document_history.document_id 
            AND clients.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Service role can manage all document history" ON document_history;
CREATE POLICY "Service role can manage all document history" ON document_history
    FOR ALL USING (auth.role() = 'service_role');

-- Create storage bucket for client documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('client-documents', 'client-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "Users can upload their own documents" ON storage.objects;
CREATE POLICY "Users can upload their own documents" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'client-documents' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = 'documents' AND
        EXISTS (
            SELECT 1 FROM clients 
            WHERE clients.id::text = (storage.foldername(name))[2]
            AND clients.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can view their own documents" ON storage.objects;
CREATE POLICY "Users can view their own documents" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'client-documents' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = 'documents' AND
        EXISTS (
            SELECT 1 FROM clients 
            WHERE clients.id::text = (storage.foldername(name))[2]
            AND clients.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can delete their own documents" ON storage.objects;
CREATE POLICY "Users can delete their own documents" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'client-documents' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = 'documents' AND
        EXISTS (
            SELECT 1 FROM clients 
            WHERE clients.id::text = (storage.foldername(name))[2]
            AND clients.user_id = auth.uid()
        )
    );

-- Insert demo data (optional)
-- Uncomment the following lines to add demo data

/*
-- Demo client (only if not using real authentication)
INSERT INTO auth.users (id, email, email_confirmed_at, created_at, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'demo@linak.com',
    NOW(),
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO clients (id, user_id, email, name, dob, phone, company)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'demo@linak.com',
    'Demo Client',
    '1990-01-15',
    '+1-555-0123',
    'LINAK Demo Corp'
) ON CONFLICT (email) DO NOTHING;

-- Demo documents
INSERT INTO documents (client_id, file_name, original_name, file_path, file_size, content_type, description, status)
VALUES 
(
    '00000000-0000-0000-0000-000000000001',
    'contract_2025.pdf',
    'Service Contract 2025.pdf',
    'documents/00000000-0000-0000-0000-000000000001/contract_2025.pdf',
    1024000,
    'application/pdf',
    'Annual service contract for 2025',
    'approved'
),
(
    '00000000-0000-0000-0000-000000000001',
    'invoice_july.pdf',
    'Invoice July 2025.pdf',
    'documents/00000000-0000-0000-0000-000000000001/invoice_july.pdf',
    512000,
    'application/pdf',
    'Monthly invoice for July 2025',
    'pending'
),
(
    '00000000-0000-0000-0000-000000000001',
    'specs.pdf',
    'Product Specifications.pdf',
    'documents/00000000-0000-0000-0000-000000000001/specs.pdf',
    2048000,
    'application/pdf',
    'Technical product specifications',
    'approved'
);
*/

EOF

echo "✅ Database setup script created: supabase_setup.sql"
echo ""
echo "🔧 Next steps:"
echo "1. Run the SQL script in your Supabase dashboard:"
echo "   - Go to https://supabase.com/dashboard"
echo "   - Open your project"
echo "   - Go to SQL Editor"
echo "   - Copy and paste the contents of supabase_setup.sql"
echo "   - Click 'Run'"
echo ""
echo "2. Or use Supabase CLI (if project is linked):"
echo "   supabase db push"
echo ""
echo "3. Verify the setup:"
echo "   - Check Tables: clients, documents, document_history"
echo "   - Check Storage: client-documents bucket"
echo "   - Check Policies: RLS enabled with proper access controls"
echo ""
echo "📖 For more information, see: https://supabase.com/docs"
