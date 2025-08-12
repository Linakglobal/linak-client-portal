#!/bin/bash

# LINAK Client Portal - Quick Supabase Deployment Script
# Run this script to check your deployment readiness

echo "🚀 LINAK Client Portal - Supabase Deployment Check"
echo "=================================================="

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ Environment file found"
    
    # Check required environment variables
    echo "📋 Checking environment variables..."
    
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        echo "  ✅ NEXT_PUBLIC_SUPABASE_URL configured"
    else
        echo "  ❌ NEXT_PUBLIC_SUPABASE_URL missing"
    fi
    
    if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
        echo "  ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY configured"
    else
        echo "  ❌ NEXT_PUBLIC_SUPABASE_ANON_KEY missing"
    fi
    
    if grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
        echo "  ✅ SUPABASE_SERVICE_ROLE_KEY configured"
    else
        echo "  ❌ SUPABASE_SERVICE_ROLE_KEY missing"
    fi
    
    if grep -q "ADMIN_EMAILS" .env.local; then
        echo "  ✅ ADMIN_EMAILS configured"
    else
        echo "  ❌ ADMIN_EMAILS missing"
    fi
else
    echo "❌ .env.local not found - create it first!"
fi

echo ""
echo "📁 Checking SQL schema files..."

# Check SQL files
if [ -f "supabase-schema.sql" ]; then
    echo "  ✅ Main schema file found ($(wc -l < supabase-schema.sql) lines)"
else
    echo "  ❌ supabase-schema.sql missing"
fi

if [ -f "supabase-storage-setup.sql" ]; then
    echo "  ✅ Storage setup file found"
else
    echo "  ❌ supabase-storage-setup.sql missing"
fi

if [ -f "supabase-profiles-setup.sql" ]; then
    echo "  ✅ Profiles setup file found"
else
    echo "  ❌ supabase-profiles-setup.sql missing"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Login to your Supabase dashboard"
echo "2. Go to SQL Editor"
echo "3. Run the SQL files in this order:"
echo "   - supabase-schema.sql"
echo "   - supabase-storage-setup.sql"  
echo "   - supabase-profiles-setup.sql"
echo "4. Enable Auth providers in Authentication settings"
echo "5. Test the application!"
echo ""
echo "📖 Check SUPABASE-DEPLOYMENT-CHECKLIST.md for detailed instructions"
