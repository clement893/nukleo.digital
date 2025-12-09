import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL;
const SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME;

if (!SENDGRID_API_KEY) {
  console.error('❌ SENDGRID_API_KEY not configured');
  process.exit(1);
}

if (!SENDGRID_FROM_EMAIL) {
  console.error('❌ SENDGRID_FROM_EMAIL not configured');
  process.exit(1);
}

sgMail.setApiKey(SENDGRID_API_KEY);

const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Email - Nukleo Digital</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 40px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                ✅ SendGrid Test Email
              </h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                Configuration successful!
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0; color: #111827; font-size: 18px; line-height: 1.6;">
                Hi Clément,
              </p>
              <p style="margin: 16px 0 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
                This is a test email to confirm that your SendGrid integration is working correctly for the Nukleo Digital website.
              </p>

              <!-- Success Box -->
              <div style="margin: 32px 0; padding: 24px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; border-left: 4px solid #22c55e;">
                <h3 style="margin: 0 0 12px; color: #166534; font-size: 18px; font-weight: 700;">
                  ✓ Configuration Verified
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #15803d; font-size: 15px; line-height: 1.8;">
                  <li>SendGrid API key is valid</li>
                  <li>Sender email is configured</li>
                  <li>Email delivery is working</li>
                </ul>
              </div>

              <!-- Details -->
              <div style="margin: 32px 0; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
                <h4 style="margin: 0 0 12px; color: #111827; font-size: 16px; font-weight: 600;">
                  Configuration Details:
                </h4>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">From Email:</td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${SENDGRID_FROM_EMAIL}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">From Name:</td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${SENDGRID_FROM_NAME || 'Nukleo Digital'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Timestamp:</td>
                    <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${new Date().toLocaleString('fr-CA', { timeZone: 'America/Toronto' })}</td>
                  </tr>
                </table>
              </div>

              <p style="margin: 24px 0 0; color: #6b7280; font-size: 15px; line-height: 1.6;">
                Your Start Project form is now ready to receive submissions. Each form submission will trigger two emails:
              </p>
              <ol style="margin: 12px 0 0; padding-left: 20px; color: #6b7280; font-size: 15px; line-height: 1.8;">
                <li>Admin notification to <strong>clement@nukleo.com</strong></li>
                <li>Confirmation email to the client</li>
              </ol>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 600;">
                Nukleo Digital
              </p>
              <p style="margin: 8px 0 0; color: #6b7280; font-size: 14px;">
                Architects of Your AI Future
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

async function sendTestEmail() {
  try {
    console.log('📧 Sending test email to clement@nukleo.com...');
    
    await sgMail.send({
      to: 'clement@nukleo.com',
      from: {
        email: SENDGRID_FROM_EMAIL,
        name: SENDGRID_FROM_NAME || 'Nukleo Digital',
      },
      subject: '✅ SendGrid Test - Nukleo Digital Website',
      html: emailHtml,
    });

    console.log('✅ Test email sent successfully!');
    console.log('📬 Check your inbox at clement@nukleo.com');
  } catch (error) {
    console.error('❌ Failed to send test email:', error);
    process.exit(1);
  }
}

sendTestEmail();
