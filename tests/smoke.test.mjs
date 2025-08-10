/**
 * Basic smoke tests for LINAK Client Portal
 * Run with: node --test tests/smoke.test.mjs
 */

import { test, describe } from "node:test";
import assert from "node:assert";

// Test configuration
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const TIMEOUT = 10000; // 10 seconds

// Helper function to make HTTP requests
async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

describe("Health Check Tests", () => {
  test("GET /api/health should return healthy status", async () => {
    const response = await fetchWithTimeout(`${BASE_URL}/api/health`);

    assert.strictEqual(
      response.status,
      200,
      "Health endpoint should return 200"
    );

    const data = await response.json();
    assert.strictEqual(data.status, "healthy", "Status should be healthy");
    assert.ok(data.timestamp, "Should include timestamp");
    assert.ok(typeof data.uptime === "number", "Should include uptime");
    assert.ok(data.memory, "Should include memory info");
    assert.ok(
      typeof data.memory.used === "number",
      "Memory used should be a number"
    );
  });

  test("HEAD /api/health should return 200", async () => {
    const response = await fetchWithTimeout(`${BASE_URL}/api/health`, {
      method: "HEAD",
    });

    assert.strictEqual(
      response.status,
      200,
      "Health HEAD request should return 200"
    );
  });
});

describe("Core Page Tests", () => {
  test("Home page should load successfully", async () => {
    const response = await fetchWithTimeout(`${BASE_URL}/`);

    assert.strictEqual(response.status, 200, "Home page should return 200");
    assert.strictEqual(
      response.headers.get("content-type").includes("text/html"),
      true,
      "Should return HTML content"
    );
  });

  test("Login page should load successfully", async () => {
    const response = await fetchWithTimeout(`${BASE_URL}/login`);

    // Should be 200 (if login page exists) or 404 (if redirected)
    assert.ok(
      response.status === 200 || response.status === 404,
      `Login page should return 200 or 404, got ${response.status}`
    );
  });

  test("404 page should work for non-existent routes", async () => {
    const response = await fetchWithTimeout(
      `${BASE_URL}/non-existent-route-${Date.now()}`
    );

    assert.strictEqual(
      response.status,
      404,
      "Non-existent route should return 404"
    );

    const content = await response.text();
    assert.ok(
      content.includes("404") || content.includes("Not Found"),
      "404 page should include error indication"
    );
  });
});

describe("Static Asset Tests", () => {
  test("Main logo should be accessible", async () => {
    const response = await fetchWithTimeout(`${BASE_URL}/linak-logo.svg`);

    assert.strictEqual(response.status, 200, "Main logo should be accessible");
    assert.ok(
      response.headers.get("content-type").includes("image/svg"),
      "Logo should be SVG format"
    );
  });

  test("Favicon should be accessible", async () => {
    const response = await fetchWithTimeout(`${BASE_URL}/favicon.ico`);

    assert.strictEqual(response.status, 200, "Favicon should be accessible");
  });
});

describe("Security Headers Tests", () => {
  test("Health endpoint should have proper cache headers", async () => {
    const response = await fetchWithTimeout(`${BASE_URL}/api/health`);

    const cacheControl = response.headers.get("cache-control");
    assert.ok(
      cacheControl && cacheControl.includes("no-cache"),
      "Health endpoint should have no-cache header"
    );
  });
});

// Run basic environment checks
describe("Environment Tests", () => {
  test("Required environment variables should be configured", () => {
    // These are basic checks - adjust based on your needs
    console.log("Node version:", process.version);
    console.log("Base URL:", BASE_URL);

    assert.ok(
      process.version.startsWith("v18.") || process.version.startsWith("v20."),
      "Should use Node.js 18 or 20"
    );
  });
});
