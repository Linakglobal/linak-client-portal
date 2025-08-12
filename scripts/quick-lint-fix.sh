#!/bin/bash

# Quick Lint Fixes for LINAK Portal
echo "🔧 Applying Quick Lint Fixes..."

# Fix specific quote issues in key files
echo "Fixing escaped quotes..."

# Fix dashboard page-new.tsx
if grep -q "We'll" src/app/\(client-portal\)/dashboard/page-new.tsx 2>/dev/null; then
  sed -i '' "s/We'll/We\&apos;ll/g" src/app/\(client-portal\)/dashboard/page-new.tsx
fi

echo "✅ Quick fixes applied. Running full fix now..."
