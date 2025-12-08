import { describe, it, expect } from 'vitest';
import { sendEmail, generateAssessmentEmail } from './_core/sendgrid';

describe('SendGrid Integration', () => {
  it('should have SendGrid credentials configured', () => {
    expect(process.env.SENDGRID_API_KEY).toBeDefined();
    expect(process.env.SENDGRID_FROM_EMAIL).toBeDefined();
    expect(process.env.SENDGRID_FROM_NAME).toBeDefined();
  });

  it('should generate valid assessment email HTML', () => {
    const html = generateAssessmentEmail({
      firstName: 'John',
      lastName: 'Doe',
      globalScore: 75,
      maturityLevel: 'Integrator',
      dimensionScores: [
        { label: 'Strategy', score: 80 },
        { label: 'Data', score: 70 },
      ],
    });

    expect(html).toContain('John Doe');
    expect(html).toContain('75');
    expect(html).toContain('Integrator');
    expect(html).toContain('Strategy');
    expect(html).toContain('Data');
  });

  it('should send test email successfully', async () => {
    const testEmail = process.env.SENDGRID_FROM_EMAIL || 'test@example.com';
    
    const result = await sendEmail({
      to: testEmail,
      subject: 'SendGrid Test - AI Readiness Assessment',
      html: '<p>This is a test email to validate SendGrid configuration.</p>',
    });

    expect(result).toBe(true);
  }, 30000); // 30 second timeout for API call
});
