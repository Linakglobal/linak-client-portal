#!/bin/bash

echo "🔧 Fixing escaped quotes in JSX files..."

# Function to fix quotes in a file
fix_quotes_in_file() {
    local file="$1"
    echo "Fixing quotes in: $file"
    
    # Fix common quote patterns
    sed -i '' "s/We'll/We\&apos;ll/g" "$file" 2>/dev/null || true
    sed -i '' "s/don't/don\&apos;t/g" "$file" 2>/dev/null || true  
    sed -i '' "s/won't/won\&apos;t/g" "$file" 2>/dev/null || true
    sed -i '' "s/can't/can\&apos;t/g" "$file" 2>/dev/null || true
    sed -i '' "s/isn't/isn\&apos;t/g" "$file" 2>/dev/null || true
    sed -i '' "s/didn't/didn\&apos;t/g" "$file" 2>/dev/null || true
    sed -i '' "s/hasn't/hasn\&apos;t/g" "$file" 2>/dev/null || true
    sed -i '' "s/you're/you\&apos;re/g" "$file" 2>/dev/null || true
    sed -i '' "s/we're/we\&apos;re/g" "$file" 2>/dev/null || true
    sed -i '' "s/they're/they\&apos;re/g" "$file" 2>/dev/null || true
    sed -i '' "s/it's/it\&apos;s/g" "$file" 2>/dev/null || true
    sed -i '' "s/that's/that\&apos;s/g" "$file" 2>/dev/null || true
    sed -i '' "s/what's/what\&apos;s/g" "$file" 2>/dev/null || true
    sed -i '' "s/here's/here\&apos;s/g" "$file" 2>/dev/null || true
    sed -i '' "s/there's/there\&apos;s/g" "$file" 2>/dev/null || true
    
    # Fix possessive forms
    sed -i '' "s/client's/client\&apos;s/g" "$file" 2>/dev/null || true
    sed -i '' "s/user's/user\&apos;s/g" "$file" 2>/dev/null || true
    sed -i '' "s/world's/world\&apos;s/g" "$file" 2>/dev/null || true
    
    # Fix double quotes - be careful with these
    sed -i '' 's/"\\([^"]*\\)">/\&ldquo;\\1\&rdquo;>/g' "$file" 2>/dev/null || true
    
    echo "✅ Fixed quotes in: $file"
}

# List of files that have quote issues
files_to_fix=(
    "src/app/(client-portal)/destinations/page.tsx"
    "src/app/immigration-icons-demo/page.tsx" 
    "src/app/page-content.tsx"
    "src/components/sections/ClientCommunicationHub.tsx"
    "src/components/sections/RefundAlternativesSection.tsx"
    "src/components/sections/enhanced-hero.tsx"
    "src/components/sections/immigration-hero.tsx"
)

# Fix quotes in each file
for file in "${files_to_fix[@]}"; do
    if [ -f "$file" ]; then
        fix_quotes_in_file "$file"
    else
        echo "⚠️  File not found: $file"
    fi
done

echo ""
echo "🎉 Quote fixing complete!"
echo "Running lint check..."

npm run lint --silent 2>&1 | grep -E "(Error|Warning)" | wc -l | xargs echo "Remaining lint issues:"
