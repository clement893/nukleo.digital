import { test, expect } from '@playwright/test';

test.describe('Navigation Principale', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to home page', async ({ page }) => {
    await expect(page).toHaveURL(/\/$/);
  });

  test('should navigate to services page', async ({ page }) => {
    const servicesLink = page.locator('a[href*="/services"], a:has-text("Services")').first();
    
    if (await servicesLink.count() > 0) {
      await servicesLink.click();
      await expect(page).toHaveURL(/\/services/);
    }
  });

  test('should navigate to about page', async ({ page }) => {
    const aboutLink = page.locator('a[href*="/about"], a:has-text("About")').first();
    
    if (await aboutLink.count() > 0) {
      await aboutLink.click();
      await expect(page).toHaveURL(/\/about/);
    }
  });

  test('should navigate to contact page', async ({ page }) => {
    const contactLink = page.locator('a[href*="/contact"], a:has-text("Contact")').first();
    
    if (await contactLink.count() > 0) {
      await contactLink.click();
      await expect(page).toHaveURL(/\/contact/);
    }
  });

  test('should have working mobile menu', async ({ page }) => {
    // Vérifier le menu mobile (ajustez selon votre implémentation)
    const mobileMenuButton = page.locator('button[aria-label*="menu" i], button:has-text("Menu")').first();
    
    if (await mobileMenuButton.count() > 0) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);
      
      // Vérifier que le menu est visible
      const menu = page.locator('nav[aria-label*="main" i], nav:visible').first();
      if (await menu.count() > 0) {
        await expect(menu).toBeVisible();
      }
    }
  });

  test('should maintain language preference', async ({ page }) => {
    // Tester la navigation multilingue si applicable
    const langToggle = page.locator('button[aria-label*="language" i], a[href*="/fr"], a[href*="/en"]').first();
    
    if (await langToggle.count() > 0) {
      await langToggle.click();
      await page.waitForTimeout(500);
      
      // Vérifier que l'URL contient la langue
      const url = page.url();
      expect(url).toMatch(/\/(fr|en)\//);
    }
  });
});

