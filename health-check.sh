#!/bin/bash

echo "🚀 LINAK Client Portal - Health Check Script"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
    fi
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

echo -e "\n${BLUE}📦 Checking Dependencies...${NC}"
npm list --depth=0 > /dev/null 2>&1
print_status $? "Dependencies are installed"

echo -e "\n${BLUE}🔍 Running Linter...${NC}"
npm run lint > /dev/null 2>&1
print_status $? "ESLint checks passed"

echo -e "\n${BLUE}🏗️  Building Project...${NC}"
npm run build > /dev/null 2>&1
print_status $? "Build completed successfully"

echo -e "\n${BLUE}📁 Checking File Structure...${NC}"

# Check key directories
[ -d "src" ] && print_status 0 "src/ directory exists" || print_status 1 "src/ directory missing"
[ -d "src/app" ] && print_status 0 "src/app/ directory exists" || print_status 1 "src/app/ directory missing"
[ -d "src/components" ] && print_status 0 "src/components/ directory exists" || print_status 1 "src/components/ directory missing"
[ -d "src/lib" ] && print_status 0 "src/lib/ directory exists" || print_status 1 "src/lib/ directory missing"

# Check key files
[ -f "src/app/layout.tsx" ] && print_status 0 "Root layout exists" || print_status 1 "Root layout missing"
[ -f "src/app/page.tsx" ] && print_status 0 "Home page exists" || print_status 1 "Home page missing"
[ -f "src/app/login/page.tsx" ] && print_status 0 "Login page exists" || print_status 1 "Login page missing"
[ -f "src/app/dashboard/page.tsx" ] && print_status 0 "Dashboard page exists" || print_status 1 "Dashboard page missing"
[ -f "src/middleware.ts" ] && print_status 0 "Middleware exists" || print_status 1 "Middleware missing"

echo -e "\n${BLUE}⚙️  Checking Configuration...${NC}"
[ -f "tsconfig.json" ] && print_status 0 "TypeScript config exists" || print_status 1 "TypeScript config missing"
[ -f "next.config.ts" ] && print_status 0 "Next.js config exists" || print_status 1 "Next.js config missing"
[ -f "components.json" ] && print_status 0 "Shadcn UI config exists" || print_status 1 "Shadcn UI config missing"
[ -f ".env.example" ] && print_status 0 "Environment example exists" || print_status 1 "Environment example missing"

echo -e "\n${BLUE}🔐 Checking Security...${NC}"
# Check for common security files
[ -f ".gitignore" ] && print_status 0 ".gitignore exists" || print_status 1 ".gitignore missing"

# Check npm audit (but don't fail on low severity)
AUDIT_RESULT=$(npm audit --audit-level moderate 2>/dev/null)
if [ $? -eq 0 ]; then
    print_status 0 "No moderate+ severity vulnerabilities"
else
    print_status 1 "Moderate+ severity vulnerabilities found"
fi

echo -e "\n${BLUE}📚 Checking Documentation...${NC}"
[ -f "README.md" ] && print_status 0 "README.md exists" || print_status 1 "README.md missing"
[ -f "QUICK_SETUP.md" ] && print_status 0 "QUICK_SETUP.md exists" || print_status 1 "QUICK_SETUP.md missing"
[ -f "SUPABASE_SETUP.md" ] && print_status 0 "SUPABASE_SETUP.md exists" || print_status 1 "SUPABASE_SETUP.md missing"

echo -e "\n${GREEN}🎉 Health Check Complete!${NC}"
echo -e "\n${YELLOW}💡 Next Steps:${NC}"
echo "   1. Copy .env.example to .env.local and configure your environment"
echo "   2. Run 'npm run dev' to start the development server"
echo "   3. Visit http://localhost:3100 to see your application"
echo "   4. Check setup guides in QUICK_SETUP.md and SUPABASE_SETUP.md"