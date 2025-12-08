import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL;
const SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.warn('[SendGrid] API key not configured');
    return false;
  }

  if (!SENDGRID_FROM_EMAIL) {
    console.warn('[SendGrid] From email not configured');
    return false;
  }

  try {
    await sgMail.send({
      to: options.to,
      from: {
        email: SENDGRID_FROM_EMAIL,
        name: SENDGRID_FROM_NAME || 'Nukleo Digital',
      },
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    });

    console.log(`[SendGrid] Email sent successfully to ${options.to}`);
    return true;
  } catch (error) {
    console.error('[SendGrid] Failed to send email:', error);
    return false;
  }
}

export function generateAssessmentEmail(data: {
  firstName: string;
  lastName: string;
  globalScore: number;
  maturityLevel: string;
  dimensionScores: { label: string; score: number }[];
}): string {
  const { firstName, lastName, globalScore, maturityLevel, dimensionScores } = data;

  const getScoreColor = (score: number) => {
    if (score < 40) return '#ef4444';
    if (score < 70) return '#eab308';
    return '#22c55e';
  };

  const dimensionRows = dimensionScores
    .map(
      (dim) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151; font-weight: 500;">
          ${dim.label}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
          <span style="color: ${getScoreColor(dim.score)}; font-weight: 700; font-size: 18px;">
            ${dim.score}/100
          </span>
        </td>
      </tr>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Readiness Report</title>
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
                Your AI Readiness Report
              </h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                Comprehensive Assessment Results
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 40px 40px 20px;">
              <p style="margin: 0; color: #111827; font-size: 18px; line-height: 1.6;">
                Hi <strong>${firstName} ${lastName}</strong>,
              </p>
              <p style="margin: 16px 0 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
                Thank you for completing the AI Readiness Assessment! Here's your comprehensive report with personalized insights.
              </p>
            </td>
          </tr>

          <!-- Global Score -->
          <tr>
            <td style="padding: 20px 40px;">
              <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); padding: 32px; border-radius: 12px; text-align: center;">
                <p style="margin: 0; color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  Your AI Readiness Score
                </p>
                <p style="margin: 12px 0 0; color: ${getScoreColor(globalScore)}; font-size: 64px; font-weight: 700; line-height: 1;">
                  ${globalScore}<span style="font-size: 24px; color: #9ca3af;">/100</span>
                </p>
                <p style="margin: 12px 0 0; padding: 8px 24px; background-color: ${getScoreColor(globalScore)}20; border: 2px solid ${getScoreColor(globalScore)}40; border-radius: 24px; display: inline-block; color: ${getScoreColor(globalScore)}; font-weight: 700; font-size: 18px;">
                  ${maturityLevel}
                </p>
              </div>
            </td>
          </tr>

          <!-- Dimension Scores -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 20px; color: #111827; font-size: 24px; font-weight: 700;">
                Dimension Breakdown
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                ${dimensionRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 20px 40px 40px;">
              <div style="background-color: #f9fafb; padding: 24px; border-radius: 12px; text-align: center;">
                <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                  Ready to accelerate your AI transformation?
                </p>
                <a href="https://nukleo.digital/contact" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">
                  Schedule a Consultation
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                <strong>Nukleo Digital</strong><br>
                Architects of Your AI Future
              </p>
              <p style="margin: 12px 0 0; color: #9ca3af; font-size: 12px;">
                This email was sent because you completed our AI Readiness Assessment.
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
}
