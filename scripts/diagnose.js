#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🔍 Running LINAK Client Portal diagnostic checks...");

// Check for environment variables
console.log("\n📑 Checking environment variables...");
const envExample = fs.readFileSync(
  path.join(process.cwd(), ".env.example"),
  "utf8"
);
const requiredVars =
  envExample.match(/^[A-Z_]+=.*/gm)?.map((line) => line.split("=")[0]) || [];

try {
  const envLocal = fs.readFileSync(
    path.join(process.cwd(), ".env.local"),
    "utf8"
  );
  const missingVars = [];

  requiredVars.forEach((variable) => {
    if (!envLocal.includes(`${variable}=`)) {
      missingVars.push(variable);
    }
  });

  if (missingVars.length > 0) {
    console.log(`❌ Missing environment variables: ${missingVars.join(", ")}`);
  } else {
    console.log("✅ All environment variables are set");
  }
} catch (error) {
  console.log(
    "❌ .env.local file not found. Please create one from .env.example"
  );
}

// Check TypeScript errors
console.log("\n📑 Checking for TypeScript errors...");
try {
  execSync("npx tsc --noEmit", { stdio: "pipe" });
  console.log("✅ TypeScript check passed");
} catch (error) {
  console.log(
    '❌ TypeScript check failed - run "npx tsc --noEmit" for details'
  );
}

// Check for broken routes
console.log("\n📑 Checking Next.js routes...");
const appDir = path.join(process.cwd(), "src/app");
const routes = [];

function scanRoutes(dir) {
  if (!fs.existsSync(dir)) return;

  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);

    if (fs.statSync(fullPath).isDirectory()) {
      if (item === "api") return;

      const pageFile = path.join(fullPath, "page.tsx");
      if (fs.existsSync(pageFile)) {
        const route = fullPath.replace(appDir, "").replace(/\\/g, "/");
        routes.push(route);
      }

      scanRoutes(fullPath);
    }
  });
}

scanRoutes(appDir);

console.log(`Found ${routes.length} routes:`);
routes.forEach((route) => {
  console.log(`  ✅ ${route || "/"}`);
});

// Check for API endpoints
console.log("\n📑 Checking API endpoints...");
const apiDir = path.join(appDir, "api");
const apiRoutes = [];

function scanApiRoutes(dir) {
  if (!fs.existsSync(dir)) return;

  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);

    if (fs.statSync(fullPath).isDirectory()) {
      scanApiRoutes(fullPath);
    } else if (item === "route.ts" || item === "route.js") {
      const route = dir.replace(apiDir, "").replace(/\\/g, "/");
      apiRoutes.push(route || "/");
    }
  });
}

if (fs.existsSync(apiDir)) {
  scanApiRoutes(apiDir);
  console.log(`Found ${apiRoutes.length} API endpoints:`);
  apiRoutes.forEach((route) => {
    console.log(`  ✅ /api${route}`);
  });
} else {
  console.log("❌ No API directory found");
}

// Check for essential files
console.log("\n📑 Checking essential files...");
const essentialFiles = [
  "package.json",
  "next.config.ts",
  "tailwind.config.ts",
  "tsconfig.json",
  "public/robots.txt",
  "public/sitemap.xml",
  "src/app/layout.tsx",
];

essentialFiles.forEach((file) => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - missing`);
  }
});

// Check dependencies
console.log("\n📑 Checking dependencies...");
try {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8")
  );
  const criticalDeps = [
    "next",
    "react",
    "@supabase/supabase-js",
    "tailwindcss",
  ];

  criticalDeps.forEach((dep) => {
    if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
      console.log(`  ✅ ${dep}`);
    } else {
      console.log(`  ❌ ${dep} - missing`);
    }
  });
} catch (error) {
  console.log("  ❌ Could not read package.json");
}

console.log("\n📋 Diagnostic check complete!");
console.log('Run "npm run dev" to start the development server');
