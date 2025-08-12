# 🔧 LINAK Portal - Environment Files Setup Guide

## Environment Files Overview

You currently have **5 environment files**. Here's what each one is for:

### ✅ **REQUIRED FILES:**

#### 1. `.env.local` (MAIN FILE - This is what you need!)

**Purpose**: Your actual environment variables for development
**Status**: ⚠️ Currently has placeholder values

#### 2. `.env.example` (Template/Reference)

**Purpose**: Template showing what variables are needed
**Status**: ✅ Good reference file

### ❌ **OPTIONAL/CLEANUP FILES:**

#### 3. `.env` (Duplicate - can delete)

**Purpose**: Another set of placeholders
**Status**: 🗑️ Not needed, you can delete this

#### 4. `.env.development.local` (Empty - can delete)

**Purpose**: Development-specific overrides  
**Status**: 🗑️ Empty file, not needed

#### 5. `.env.local.example` (Empty - can delete)

**Purpose**: Another template attempt
**Status**: 🗑️ Empty file, not needed

## 🎯 What You Need to Do:

### Step 1: Clean Up (Optional)

Delete the unnecessary files:

```bash
rm .env
rm .env.development.local
rm .env.local.example
```

### Step 2: Fix Your Main `.env.local` File

Your `.env.local` has some issues. Here's the correct format:

```bash
# LINAK Client Portal - Environment Variables
# Replace with your real Supabase credentials

# === REQUIRED: Supabase Configuration ===
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# === REQUIRED: Admin Configuration ===
ADMIN_EMAILS=admin@linak.com,vyshnav@linak.com

# === REQUIRED: App Configuration ===
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000

# === OPTIONAL: Development Settings ===
NODE_ENV=development
NEXTAUTH_SECRET=linak-client-portal-secret-key-2024

# === OPTIONAL: Analytics (leave empty for now) ===
NEXT_PUBLIC_GA_ID=
SENTRY_DSN=

# === OPTIONAL: Email Service (for future) ===
RESEND_API_KEY=
```

### Step 3: Get Your Real Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create/open your project
3. Go to **Settings** → **API**
4. Copy these 3 values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### Step 4: Update Your `.env.local`

Replace the placeholder values with your real ones from Step 3.

## 🚨 Critical Variables Needed:

### **Must Have (App Won't Work Without These):**

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - For client-side auth
- `SUPABASE_SERVICE_ROLE_KEY` - For server-side operations
- `ADMIN_EMAILS` - Who gets admin access

### **Nice to Have:**

- `NEXTAUTH_URL` - For authentication redirects
- `NEXT_PUBLIC_APP_URL` - For email links
- `RESEND_API_KEY` - For custom emails (optional)

### **Optional/Future:**

- `NEXT_PUBLIC_GA_ID` - Google Analytics
- `SENTRY_DSN` - Error monitoring

## 🧪 Test Your Setup:

After updating `.env.local`, run:

```bash
node scripts/test-supabase.mjs
```

You should see ✅ instead of ⚠️ demo mode warnings.

## 🎉 Summary:

1. **Keep**: `.env.local` (update with real values) + `.env.example` (reference)
2. **Delete**: `.env`, `.env.development.local`, `.env.local.example`
3. **Update**: Replace 3 Supabase placeholder values with real ones
4. **Test**: Run the test script to verify connection

**Once you update `.env.local` with real Supabase credentials, your app will be fully functional!**
