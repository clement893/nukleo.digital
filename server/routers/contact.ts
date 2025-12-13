import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { sendEmail } from '../_core/sendgrid';
import { getDb } from '../db';
import { aiNewsSubscribers } from '../../drizzle/schema';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(1, 'Company is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const contactRouter = router({
  send: publicProcedure
    .input(contactSchema)
    .mutation(async ({ input }) => {
      try {
        // Send email to Nukleo team
        const emailSent = await sendEmail({
          to: process.env.SENDGRID_FROM_EMAIL || 'hello@nukleo.digital',
          subject: `New Contact Form Submission from ${input.firstName} ${input.lastName}`,
          html: generateContactEmail(input),
        });

        if (!emailSent) {
          throw new Error('Failed to send email');
        }

        // Send confirmation email to user
        await sendEmail({
          to: input.email,
          subject: 'Thank you for contacting Nukleo Digital',
          html: generateConfirmationEmail(input.firstName),
        });

        return {
          success: true,
        };
      } catch (error) {
        console.error('Contact form error:', error);
        throw new Error('Failed to send message. Please try again.');
      }
    }),

  subscribe: publicProcedure
    .input(newsletterSchema)
    .mutation(async ({ input }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new Error('Database connection failed');
        }

        // Save to database (ignore duplicate email errors)
        try {
          await db.insert(aiNewsSubscribers).values({
            email: input.email,
            source: 'ai-trend-radar',
          });
        } catch (dbError: any) {
          // If email already exists, that's okay - just continue
          if (!dbError?.message?.includes('unique') && !dbError?.code?.includes('23505')) {
            console.error('Database error:', dbError);
            throw dbError;
          }
        }

        // Send notification to Nukleo team
        const emailSent = await sendEmail({
          to: process.env.SENDGRID_FROM_EMAIL || 'hello@nukleo.digital',
          subject: `New AI News Newsletter Subscription: ${input.email}`,
          html: `
            <h2>New AI News Newsletter Subscription</h2>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Source:</strong> AI Trend Radar</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          `,
        });

        if (!emailSent) {
          console.warn('Failed to send notification email, but subscription was saved to DB');
        }

        // Send welcome email to subscriber
        try {
          await sendEmail({
            to: input.email,
            subject: 'Welcome to Nukleo Digital AI News Newsletter',
            html: generateWelcomeEmail(),
          });
        } catch (emailError) {
          console.warn('Failed to send welcome email:', emailError);
          // Don't fail the subscription if welcome email fails
        }

        return {
          success: true,
        };
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        throw new Error('Failed to subscribe. Please try again.');
      }
    }),
});

function generateContactEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 40px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                New Contact Form Submission
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Name:</strong>
                    <span style="color: #6b7280;">${data.firstName} ${data.lastName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Email:</strong>
                    <a href="mailto:${data.email}" style="color: #8b5cf6; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">Company:</strong>
                    <span style="color: #6b7280;">${data.company}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0;">
                    <strong style="color: #374151; display: block; margin-bottom: 8px;">Message:</strong>
                    <p style="margin: 0; color: #6b7280; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 32px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
                <a href="mailto:${data.email}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">
                  Reply to ${data.firstName}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                Submitted on ${new Date().toLocaleString()}
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

function generateConfirmationEmail(firstName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
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
                Thank You!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #111827; font-size: 18px;">
                Hi <strong>${firstName}</strong>,
              </p>
              <p style="margin: 0 0 20px; color: #6b7280; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to Nukleo Digital! We've received your message and our team will get back to you within 24 hours.
              </p>
              <p style="margin: 0 0 20px; color: #6b7280; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to explore our resources and learn more about how we're helping organizations become AI-native leaders.
              </p>

              <div style="margin: 32px 0; text-align: center;">
                <a href="https://nukleo.digital/resources" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">
                  Explore Resources
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

function generateWelcomeEmail(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Nukleo Digital Newsletter</title>
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
                Welcome to Nukleo Digital!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #111827; font-size: 18px;">
                Thank you for subscribing!
              </p>
              <p style="margin: 0 0 20px; color: #6b7280; font-size: 16px; line-height: 1.6;">
                You're now part of our community of AI-native leaders. Get ready to receive:
              </p>
              <ul style="margin: 0 0 20px; padding-left: 20px; color: #6b7280; font-size: 16px; line-height: 1.8;">
                <li>Latest insights on Agentic AI and automation</li>
                <li>Technical guides and best practices</li>
                <li>Industry analysis and trend reports</li>
                <li>Exclusive invitations to webinars and events</li>
              </ul>

              <div style="margin: 32px 0; text-align: center;">
                <a href="https://nukleo.digital/ai-readiness" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px;">
                  Take the AI Readiness Assessment
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
