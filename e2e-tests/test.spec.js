import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  const testUser = {
    email: `test${Date.now()}@example.com`,
    password: 'TestPassword123!'
  };

  test('complete authentication flow', async ({ page }) => {
    // Enable debug logging
    page.on('console', msg => console.log(msg.text()));
    page.on('request', request => console.log(`>> ${request.method()} ${request.url()}`));
    page.on('response', response => console.log(`<< ${response.status()} ${response.url()}`));
    
    // 1. Registration
    await test.step('Register new user', async () => {
      await page.goto('http://localhost:5173/register');
      await page.waitForLoadState('networkidle');
      
      // Fill form
      await page.locator('input[type="email"]').fill(testUser.email);
      await page.locator('input[type="password"]').first().fill(testUser.password);
      await page.locator('input[type="password"]').last().fill(testUser.password);
      
      // Handle cookie consent if present
      try {
        const cookieConsent = page.locator('button:has-text("Accept")');
        if (await cookieConsent.isVisible()) {
          await cookieConsent.click();
        }
      } catch (e) {
        console.log('No cookie consent found');
      }
      
      // Click register and verify navigation
      await page.getByRole('button', { name: /register/i }).click();
      
      // Wait for either successful navigation or error message
      try {
        await Promise.race([
          page.waitForURL('http://localhost:5173/login', { timeout: 10000 }),
          page.waitForSelector('.error-message', { timeout: 10000 })
        ]);
      } catch (error) {
        console.error('Navigation failed:', error);
        throw error;
      }
      
      // Verify we're on the login page
      await expect(page).toHaveURL('http://localhost:5173/login');
    });
    
    // Add small delay before login
    await page.waitForTimeout(1000);
    
    // 2. Login
    await test.step('Login with registered user', async () => {
      await page.locator('input[type="email"]').fill(testUser.email);
      await page.locator('input[type="password"]').fill(testUser.password);
      
      // Click login and verify navigation
      await page.getByRole('button', { name: /login/i }).click();
      
      // Wait for navigation or error
      try {
        await Promise.race([
          page.waitForURL('http://localhost:5173/', { timeout: 10000 }),
          page.waitForSelector('.error-message', { timeout: 10000 })
        ]);
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
      
      // Verify successful login
      await expect(page).toHaveURL('http://localhost:5173/');
      
      // Verify JWT cookie exists
      const cookies = await page.context().cookies();
      const jwtCookie = cookies.find(c => c.name === 'jwt');
      expect(jwtCookie).toBeDefined();
    });
  });
});





