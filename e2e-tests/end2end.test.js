import { test, expect } from '@playwright/test';

test.describe('AI-Health-Image E2E Tests', () => {

  // Generate unique test user
  const testUser = {
    email: `testUser7@example.com`,
    password: 'TestPassword123!'
  };

  test.beforeEach(async ({ page }) => {  // Added name parameter
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
    
    try {
      const cookieButton = page.getByRole('button', { name: 'Accept All Cookies' });
      if (await cookieButton.isVisible({ timeout: 5000 })) {
        await cookieButton.click();
      }
    } catch (error) {
      console.log('Kein Cookie-Banner gefunden');
    }
  });

  test('landing page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/AI-Health-Image/);
  });

  test('navigation flow works correctly', async ({ page }) => {
    // Test Login navigation
    const loginButton = page.getByRole('link', { name: /anmelden/i });
    await loginButton.waitFor({ state: 'visible' });
    await loginButton.click();
    await expect(page).toHaveURL('http://localhost:5173/login');
    await page.waitForLoadState('networkidle');

    // Test Register navigation
    const registerLink = page.getByRole('link', { name: 'Dont have an Account?' });
    await registerLink.waitFor({ state: 'visible' });
    await registerLink.click();
    await expect(page).toHaveURL('http://localhost:5173/register');
  });

  // Test cases
  test('authentication flow', async ({ page }) => {

    // Registration
    await test.step('register new user', async () => {
      await page.goto('http://localhost:5173/register');
      await page.waitForLoadState('networkidle');
  
      // Wait for form with debug logging
      console.log('Waiting for registration form...');
      
      try {
        // Wait for all form elements together with longer timeout
        await Promise.all([
          page.getByLabel(/^email$/i).waitFor({ state: 'visible', timeout: 15000 }),
          page.getByLabel(/^password$/i).waitFor({ state: 'visible', timeout: 15000 }),
          page.getByLabel(/^retype password$/i).waitFor({ state: 'visible', timeout: 15000 })
        ]);
  
        // Fill form with verification
        const emailInput = page.getByLabel(/^email$/i);
        const passwordInput = page.getByLabel(/^password$/i);
        const confirmPasswordInput = page.getByLabel(/^retype password$/i);
  
        await emailInput.fill(testUser.email);
        await passwordInput.fill(testUser.password);
        await confirmPasswordInput.fill(testUser.password);

        // Click register and handle navigation
        const registerButton = page.getByRole('button', { name: /^register$/i });
        await registerButton.waitFor({ state: 'visible' });
        
        // Click and wait for response
        await registerButton.click();
  
        // Verify we reached login page
        await expect(page).toHaveURL('http://localhost:5173/login', { timeout: 5000 });
          
      } catch (error) {
        console.error('Registration step failed:', error);
        // Take screenshot on failure
        await page.screenshot({ path: 'registration-error.png' });
        throw error;
      }
    });

    // Login
    // After registration step in the same file
    await test.step('login with new user', async () => {
      try {
        // Wait for login form with debug
        console.log('Waiting for login form...');

        const emailInput = page.getByLabel(/email/i);
        const passwordInput = page.getByLabel(/password/i);

        await Promise.all([
          emailInput.waitFor({ state: 'visible', timeout: 15000 }),
          passwordInput.waitFor({ state: 'visible', timeout: 15000 })
        ]);

        // Fill form
        await emailInput.fill(testUser.email);
        await passwordInput.fill(testUser.password);

        // Click login with proper error handling
        const loginButton = page.getByRole('button', { name: /login/i });
        await loginButton.waitFor();

        await loginButton.click();

        // Handle both success and error cases
        await Promise.race([
          page.waitForURL('http://localhost:5173/', { timeout: 10000 }),
          page.locator('.error-message').waitFor({ timeout: 10000 })
        ]).catch(error => {
          console.error('Login navigation/error detection failed:', error);
          throw error;
        });

        // Verify successful login
        await expect(page).toHaveURL('http://localhost:5173/', { timeout: 5000 });

        // Verify JWT cookie exists
        const cookies = await page.context().cookies();
        expect(cookies.some(c => c.name === 'jwt')).toBeTruthy();

      } catch (error) {
        console.error('Login step failed:', error);
        await page.screenshot({ path: 'login-error.png' });
        throw error;
      }
    });
  });

  test('login flow', async ({ page }) => {
    try {
        // Test Login navigation
        const loginButton = page.getByRole('link', { name: /anmelden/i });
        await loginButton.waitFor({ state: 'visible' });
        await loginButton.click();
        
        // Wait for login page load
        await expect(page).toHaveURL('http://localhost:5173/login');
        await page.waitForLoadState('networkidle');
        
        // Fill login form
        const emailInput = page.getByLabel(/^email$/i);
        const passwordInput = page.getByLabel(/^password$/i);
        
        await Promise.all([
            emailInput.waitFor({ state: 'visible' }),
            passwordInput.waitFor({ state: 'visible' })
        ]);
        
        await emailInput.fill(testUser.email);
        await passwordInput.fill(testUser.password);
    
        // Click login and handle navigation
        const login = page.getByRole('button', { name: /^login$/i });
        await login.waitFor({ state: 'visible' });
        
        // Click and wait for response
        await login.click();
        
        // Wait for either success or error
        const result = await Promise.race([
            page.waitForURL('http://localhost:5173/', { waitUntil: 'domcontentloaded' })
                .then(() => 'success'),
            page.waitForSelector('.error-message')
                .then(() => 'error')
        ]);

        if (result === 'error') {
            throw new Error('Login failed - Error message displayed');
        }

        // Verify successful login
        await expect(page).toHaveURL('http://localhost:5173/');
        
        // Verify JWT token
        const cookies = await page.context().cookies();
        expect(cookies.some(c => c.name === 'jwt')).toBeTruthy();

    } catch (error) {
        // Take screenshot before throwing
        try {
            await page.screenshot({ 
                path: 'login-error.png',
                fullPage: true 
            });
        } catch (screenshotError) {
            console.error('Failed to take error screenshot:', screenshotError);
        }
        throw error;
    }
  });
});