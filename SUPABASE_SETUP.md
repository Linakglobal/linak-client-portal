# Supabase Setup Guide

This guide walks you through setting up Supabase authentication for the LINAK Client Portal.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the project to be set up (usually takes 1-2 minutes)

## 2. Get Your Project Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project.supabase.co`)
   - **Anon Public Key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

## 4. Set Up Database

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `database/setup.sql`
3. Paste and run the SQL to create the `clients` table

## 5. Configure Authentication

1. Go to **Authentication** → **Settings** in Supabase
2. Under **Auth Providers**, enable **Email**
3. Configure **Site URL** to: `http://localhost:3100` (for development)
4. Add **Redirect URLs**: 
   - `http://localhost:3100/dashboard`
   - Your production domain when deploying

## 6. Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3100/login`

3. Use one of the demo accounts:
   - Email: `admin@linak.com`
   - DOB: `1980-12-01`

## Demo Data

The setup script includes these test accounts:

| Email | Date of Birth | Name | Company |
|-------|---------------|------|---------|
| john.doe@example.com | 1985-06-15 | John Doe | ACME Corporation |
| jane.smith@company.com | 1990-03-22 | Jane Smith | Tech Solutions Inc |
| admin@linak.com | 1980-12-01 | LINAK Admin | LINAK A/S |
| test@demo.com | 1995-08-10 | Demo User | Demo Company |

## How the Authentication Works

1. **Client Verification**: The app checks if the email exists in the `clients` table
2. **DOB Matching**: Verifies the date of birth matches the stored value
3. **Supabase Auth**: If verified, sends a magic link via Supabase Auth
4. **Session Management**: User can access the dashboard after verification

## Troubleshooting

### Environment Variables Not Working
- Make sure you restart the development server after changing `.env.local`
- Check that your Supabase URL and key are correct

### Database Connection Issues
- Verify your Supabase project is active
- Check that the `clients` table was created successfully
- Ensure Row Level Security policies are set up correctly

### Magic Link Not Sending
- Check your email provider isn't blocking Supabase emails
- Verify the redirect URLs are correctly configured
- Check Supabase authentication logs for errors

### Demo Mode
If Supabase is not configured, the app falls back to demo mode where any email and DOB combination will work for testing.

## Production Deployment

When deploying to production:

1. Update environment variables with production Supabase credentials
2. Add your production domain to Supabase redirect URLs
3. Update Site URL in Supabase authentication settings
4. Consider setting up custom SMTP for email delivery
5. Review and tighten Row Level Security policies

## Security Notes

- The anon key is safe to use in client-side code
- Row Level Security ensures data isolation
- Magic links provide secure, passwordless authentication
- Date of birth serves as an additional verification layer
