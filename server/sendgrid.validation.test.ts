import { describe, it, expect } from 'vitest';
import { sendEmail } from './_core/sendgrid';

describe('SendGrid Configuration Validation', () => {
  it('should successfully send a test email with configured credentials', async () => {
    const testEmail = {
      to: 'clement@nukleo.com',
      subject: 'SendGrid Configuration Test - Nukleo Digital',
      html: `
        <h1>SendGrid Test Email</h1>
        <p>This is a test email to validate your SendGrid configuration.</p>
        <p>If you receive this email, your SendGrid integration is working correctly!</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `,
    };

    const result = await sendEmail(testEmail);

    expect(result).toBe(true);
  }, 30000); // 30 second timeout for API call
});
