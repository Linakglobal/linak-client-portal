#!/usr/bin/env node

/**
 * LINAK Client Portal - Supabase Connection Test
 *
 * This script tests the Supabase connection and configuration
 * for the LINAK Client Portal application.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Simple env parser
function loadEnv() {
  const env = {};
  try {
    const envContent = readFileSync(".env.local", "utf8");
    const lines = envContent.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
        const [key, ...valueParts] = trimmed.split("=");
        env[key.trim()] = valueParts.join("=").trim();
      }
    }
  } catch (error) {
    log("⚠️  Could not read .env.local file", colors.yellow);
  }
  return env;
}

async function testSupabaseConnection() {
  log("\n🚀 LINAK Portal - Supabase Connection Test", colors.cyan);
  log("=".repeat(50), colors.blue);

  // Load environment variables
  const env = loadEnv();
  const supabaseUrl =
    env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey =
    env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  log("\n📋 Environment Configuration:", colors.yellow);
  log(
    `   SUPABASE_URL: ${supabaseUrl || "NOT SET"}`,
    supabaseUrl ? colors.green : colors.red
  );
  log(
    `   ANON_KEY: ${
      supabaseAnonKey ? "***" + supabaseAnonKey.slice(-4) : "NOT SET"
    }`,
    supabaseAnonKey ? colors.green : colors.red
  );
  log(
    `   SERVICE_ROLE: ${
      serviceRoleKey ? "***" + serviceRoleKey.slice(-4) : "NOT SET"
    }`,
    serviceRoleKey ? colors.green : colors.red
  );

  // Check if using placeholder values
  const isPlaceholder =
    !supabaseUrl ||
    supabaseUrl.includes("placeholder") ||
    supabaseUrl.includes("your-project-id") ||
    supabaseUrl === "https://your-project-ref.supabase.co";

  if (isPlaceholder) {
    log("\n⚠️  Demo Mode Active", colors.yellow);
    log("   Using placeholder Supabase credentials.", colors.yellow);
    log(
      "   The application will run in demo mode with mock data.",
      colors.yellow
    );
    log("\n✅ Demo Mode Status: READY", colors.green);
    return;
  }

  // Test Supabase connection
  log("\n🔌 Testing Supabase Connection...", colors.blue);

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Test basic connection
    const { error } = await supabase
      .from("clients")
      .select("count", { count: "exact", head: true });

    if (error) {
      log(`❌ Connection Error: ${error.message}`, colors.red);

      if (error.message.includes('relation "clients" does not exist')) {
        log("\n📝 Database Setup Required:", colors.yellow);
        log(
          '   The "clients" table does not exist in your database.',
          colors.yellow
        );
        log(
          "   Please run the database setup script or create tables manually.",
          colors.yellow
        );
      }

      return;
    }

    log("✅ Supabase Connection: SUCCESS", colors.green);

    // Test Auth
    log("\n🔐 Testing Authentication...", colors.blue);
    const { error: authError } = await supabase.auth.getSession();

    if (authError) {
      log(`❌ Auth Error: ${authError.message}`, colors.red);
    } else {
      log("✅ Authentication Service: READY", colors.green);
    }

    // Test Storage
    log("\n📁 Testing Storage...", colors.blue);
    const { data: buckets, error: storageError } =
      await supabase.storage.listBuckets();

    if (storageError) {
      log(`❌ Storage Error: ${storageError.message}`, colors.red);
    } else {
      log(`✅ Storage Service: READY`, colors.green);
      if (buckets && buckets.length > 0) {
        log(
          `   Available buckets: ${buckets.map((b) => b.name).join(", ")}`,
          colors.green
        );
      }
    }
  } catch (error) {
    log(`❌ Unexpected Error: ${error.message}`, colors.red);
  }

  log("\n🎯 Connection Test Complete!", colors.cyan);
}

// Database schema validation
async function validateDatabaseSchema() {
  log("\n📊 Database Schema Validation", colors.magenta);

  const env = loadEnv();
  const supabaseUrl =
    env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
    log("   Skipping schema validation (demo mode)", colors.yellow);
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const tables = ["clients", "documents"];

  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select("*").limit(1);

      if (error) {
        if (error.message.includes("does not exist")) {
          log(`❌ Table "${table}": MISSING`, colors.red);
        } else {
          log(`⚠️  Table "${table}": ERROR - ${error.message}`, colors.yellow);
        }
      } else {
        log(`✅ Table "${table}": EXISTS`, colors.green);
      }
    } catch (err) {
      log(
        `❌ Table "${table}": VALIDATION FAILED - ${err.message}`,
        colors.red
      );
    }
  }
}

// Main execution
async function main() {
  try {
    await testSupabaseConnection();
    await validateDatabaseSchema();

    log("\n🏁 All tests completed!", colors.bright);
    process.exit(0);
  } catch (error) {
    log(`\n💥 Test failed: ${error.message}`, colors.red);
    process.exit(1);
  }
}

// Run the test
main();
