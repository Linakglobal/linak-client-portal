import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page returns a 200 status
    const response = await page.waitForResponse('http://localhost:3000/');
    expect(response.status()).toBe(200);
    
    // Check for key text that should be present on the homepage
    await expect(page).toHaveTitle(/Linak Client Portal/i);
    
    // Verify the page has loaded with expected content
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load login page successfully', async ({ page }) => {
    await page.goto('/login');
    
    // Check that the page returns a 200 status  
    const response = await page.waitForResponse('http://localhost:3000/login');
    expect(response.status()).toBe(200);
    
    // Check for key text that should be present on login page
    await expect(page).toHaveTitle(/Login/i);
    
    // Look for login-specific elements
    await expect(page.locator('body')).toBeVisible();
    
    // Should contain some form of login interface
    const hasLoginButton = await page.locator('button').filter({ hasText: /log.*in/i }).count();
    const hasSignInButton = await page.locator('button').filter({ hasText: /sign.*in/i }).count();
    const hasLoginForm = await page.locator('form').count();
    
    // At least one of these should be present on a login page
    expect(hasLoginButton + hasSignInButton + hasLoginForm).toBeGreaterThan(0);
  });
});
