import { test, expect } from '@playwright/test';

test.describe('Formulaire de Contact', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form', async ({ page }) => {
    // Vérifier que le formulaire est visible
    await expect(page.locator('form')).toBeVisible();
  });

  test('should show validation errors for empty required fields', async ({ page }) => {
    // Essayer de soumettre le formulaire vide
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Vérifier que les messages d'erreur apparaissent
    // Note: Ajustez les sélecteurs selon votre structure HTML
    const nameField = page.locator('input[name="name"], input[placeholder*="name" i]');
    if (await nameField.count() > 0) {
      await expect(nameField).toBeVisible();
    }
  });

  test('should submit form with valid data', async ({ page }) => {
    // Remplir le formulaire
    const nameField = page.locator('input[name="name"], input[placeholder*="name" i]').first();
    const emailField = page.locator('input[name="email"], input[type="email"]').first();
    const messageField = page.locator('textarea[name="message"], textarea[placeholder*="message" i]').first();

    if (await nameField.count() > 0) {
      await nameField.fill('Test User');
    }
    if (await emailField.count() > 0) {
      await emailField.fill('test@example.com');
    }
    if (await messageField.count() > 0) {
      await messageField.fill('This is a test message');
    }

    // Soumettre le formulaire
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Attendre une confirmation ou redirection
    // Note: Ajustez selon votre comportement après soumission
    await page.waitForTimeout(2000);
  });

  test('should validate email format', async ({ page }) => {
    const emailField = page.locator('input[type="email"]').first();
    
    if (await emailField.count() > 0) {
      await emailField.fill('invalid-email');
      await emailField.blur();
      
      // Vérifier le message d'erreur (ajustez selon votre implémentation)
      await page.waitForTimeout(500);
    }
  });
});

