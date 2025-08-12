# 🚀 LINAK Portal - Real Supabase Setup Guide

## Current Status: Demo Mode ⚠️

Your application is running in **demo mode** with placeholder credentials. To activate real Supabase:

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/login to your account
3. Click **"New Project"**
4. Fill in:
   - **Name**: `linak-client-portal`
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
5. Wait for project creation (2-3 minutes)

## Step 2: Get Your Real Credentials

From your Supabase dashboard:

1. Go to **Settings** → **API**
2. Copy these values:

```bash
# Your real project URL (not the demo one)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co

# Your real anon key (not the demo one)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_real_anon_key_here

# Your real service role key (not the demo one)
SUPABASE_SERVICE_ROLE_KEY=your_real_service_role_key_here
```

## Step 3: Update Your .env.local

Replace the demo credentials in your `.env.local` file with your real ones from Step 2.

## Step 4: Deploy Your Database Schema

In Supabase dashboard:

1. Go to **SQL Editor**
2. Run these files in order:

### A. Main Schema (Required)

```sql
-- Copy and paste contents of: supabase-schema.sql
-- This creates clients, documents tables + RLS policies
```

### B. Storage Setup (Required)

```sql
-- Copy and paste contents of: supabase-storage-setup.sql
-- This creates client-documents bucket + policies
```

### C. Profiles Table (Recommended)

```sql
-- Copy and paste contents of: supabase-profiles-setup.sql
-- This adds user profiles for better role management
```

## Step 5: Configure Authentication

In Supabase dashboard:

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Go to **Authentication** → **URL Configuration**
4. Set **Site URL**: `http://localhost:3000` (for now)
5. Add **Redirect URLs**: `http://localhost:3000/auth/callback`

## Step 6: Test Your Setup

Run the test script:

```bash
npm run test:supabase
# or
node scripts/test-supabase.mjs
```

You should see ✅ instead of ⚠️ errors.

## Step 7: Test Your Application

1. Start your app: `pnpm dev`
2. Go to signup page
3. Try creating an account with email + DOB
4. Check if you receive magic link email
5. Test document upload functionality

## 🎯 Quick Checklist

- [ ] Created real Supabase project
- [ ] Updated .env.local with real credentials
- [ ] Ran supabase-schema.sql in SQL Editor
- [ ] Ran supabase-storage-setup.sql in SQL Editor
- [ ] Ran supabase-profiles-setup.sql in SQL Editor
- [ ] Enabled Email auth provider
- [ ] Set Site URL and redirect URLs
- [ ] Tested connection with test script
- [ ] Tested signup/login flow
- [ ] Tested document upload

## 🆘 Need Help?

If you get stuck:

1. Check Supabase logs in dashboard
2. Run the test script for specific error details
3. Verify all environment variables are correct
4. Make sure you're using the right project URL/keys

**Once you complete these steps, your app will be fully connected to real Supabase! 🎉**
