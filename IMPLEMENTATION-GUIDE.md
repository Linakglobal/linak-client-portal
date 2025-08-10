# 🎯 **LINAK Client Portal - Implementation Guide**

## **Complete Step-by-Step Setup**

### ✅ **COMPLETED - Phase 1: Theme & UI (Streamit Style)**

- [x] Dark theme with red accents implemented
- [x] Modern dashboard layout created
- [x] Data tables with Streamit styling
- [x] Updated navigation with LINAK branding
- [x] Login form with dark theme
- [x] All components using streamit-card, streamit-button classes

### 🔧 **NEXT STEPS - Phase 2: Backend Setup**

#### **Step 1: Supabase Project Setup**

1. Go to [supabase.com](https://supabase.com)
2. Create a new project: "linak-client-portal"
3. Copy the credentials from your Supabase dashboard
4. Update `.env.local` with your actual credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

#### **Step 2: Database Schema Setup**

Run this in your Supabase SQL Editor:

```sql
-- Create clients table
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  email TEXT NOT NULL,
  name TEXT,
  dob DATE,
  phone TEXT,
  country TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create documents table
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  uploaded_at TIMESTAMP DEFAULT NOW(),
  reviewed_at TIMESTAMP,
  reviewer_notes TEXT
);

-- Create applications table
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  application_type TEXT NOT NULL, -- 'visa', 'work_permit', 'residence', etc.
  destination_country TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'approved', 'rejected')),
  submitted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for clients table
CREATE POLICY "Clients can view own data" ON clients
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Clients can update own data" ON clients
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for documents table
CREATE POLICY "Clients can view own documents" ON documents
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM clients WHERE id = documents.client_id
    )
  );

CREATE POLICY "Clients can insert own documents" ON documents
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM clients WHERE id = documents.client_id
    )
  );

-- RLS Policies for applications table
CREATE POLICY "Clients can view own applications" ON applications
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM clients WHERE id = applications.client_id
    )
  );
```

#### **Step 3: Storage Bucket Setup**

Run this in Supabase SQL Editor:

```sql
-- Create storage bucket for client documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-documents', 'client-documents', false);

-- Storage policies
CREATE POLICY "Clients can upload own documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'client-documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Clients can view own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'client-documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Clients can delete own documents" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'client-documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
```

### 🔄 **Phase 3: Authentication Implementation**

#### **Step 4: Authentication Logic**

The authentication files are ready to be implemented:

- `src/lib/supabase/auth.ts` - Authentication functions
- `src/middleware.ts` - Route protection
- Magic link authentication with email + DOB verification

#### **Step 5: API Routes Creation**

Ready to implement:

- `/api/documents/upload` - File upload handling
- `/api/profile` - Profile management
- `/api/applications` - Application management

### 📊 **Phase 4: Feature Implementation**

#### **Step 6: Document Management**

- File upload functionality
- Status tracking
- Document preview
- File management

#### **Step 7: Profile Management**

- Personal information editing
- Avatar upload
- Settings management

#### **Step 8: Application Tracking**

- Visa application management
- Status updates
- Timeline tracking

### 🎨 **Current UI Status (100% Complete)**

#### **Pages Ready:**

- ✅ Homepage with Streamit theme
- ✅ Login page with red accents
- ✅ Dashboard with metrics cards
- ✅ Documents page with data table
- ✅ Navigation with LINAK branding

#### **Components Ready:**

- ✅ streamit-card styling
- ✅ streamit-button styling
- ✅ streamit-input styling
- ✅ streamit-data-table styling
- ✅ Dark theme with red accents

### 🚀 **Next Action Items**

**Immediate (Today):**

1. Create Supabase project and copy credentials
2. Update .env.local with real Supabase credentials
3. Run database schema in Supabase SQL Editor
4. Set up storage bucket

**Phase 2 (Tomorrow):**

1. Implement authentication logic
2. Create API routes for document upload
3. Connect forms to actual database
4. Test end-to-end functionality

**Phase 3 (Day 3):**

1. Add file upload functionality
2. Implement profile management
3. Create application tracking
4. Add error handling and validation

### 💡 **Development Notes**

- All UI components are complete and match Streamit design
- Theme uses dark backgrounds with red accent colors
- Database schema is designed for scalability
- RLS policies ensure data security
- Ready for production deployment after backend setup

### 📝 **Demo Credentials (Current)**

- The portal currently uses demo data
- Login form is styled but not connected to Supabase
- Dashboard shows sample metrics and activities
- Documents page displays demo documents

**Ready to proceed with Supabase setup!** 🎯
