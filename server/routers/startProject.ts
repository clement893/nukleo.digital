import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { sendEmail } from "../_core/sendgrid";
import { getDb } from "../db";
import { startProjectSubmissions } from "../../drizzle/schema";

export const startProjectRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        company: z.string().min(1, "Company is required"),
        projectType: z.string().min(1, "Project type is required"),
        budget: z.string().min(1, "Budget is required"),
        description: z.string().min(1, "Description is required"),
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, company, projectType, budget, description } = input;

      // Email to admin (clement@nukleo.com)
      const adminEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Request</title>
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
                🎯 New Project Request
              </h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                Someone wants to start a project with Nukleo
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 24px; color: #111827; font-size: 24px; font-weight: 700;">
                Contact Information
              </h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">
                      <a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none;">${email}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Company</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${company}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Project Type</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${projectType}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Budget</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 16px;">${budget}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Description</strong>
                    <p style="margin: 8px 0 0; color: #111827; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${description}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                <strong>Nukleo Digital</strong><br>
                Internal Notification System
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

      // Email to client (confirmation)
      const clientEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Project Request</title>
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
                Thank You, ${name.split(' ')[0]}!
              </h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                We've received your project request
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0; color: #111827; font-size: 18px; line-height: 1.6;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="margin: 16px 0 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to Nukleo Digital! We're excited to learn more about your project.
              </p>
              <p style="margin: 16px 0 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
                Our team will review your request and get back to you within <strong>24 hours</strong> to discuss the next steps.
              </p>

              <!-- What's Next -->
              <div style="margin: 32px 0; padding: 24px; background-color: #f9fafb; border-radius: 12px; border-left: 4px solid #8b5cf6;">
                <h3 style="margin: 0 0 12px; color: #111827; font-size: 18px; font-weight: 700;">
                  What happens next?
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 15px; line-height: 1.8;">
                  <li>Our team reviews your project details</li>
                  <li>We'll schedule a discovery call to understand your needs</li>
                  <li>We'll prepare a tailored proposal for your project</li>
                </ul>
              </div>

              <!-- Your Request Summary -->
              <h3 style="margin: 32px 0 16px; color: #111827; font-size: 20px; font-weight: 700;">
                Your Request Summary
              </h3>
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 13px;">Project Type</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 15px;">${projectType}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #6b7280; font-size: 13px;">Budget</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 15px;">${budget}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px;">
                    <strong style="color: #6b7280; font-size: 13px;">Company</strong>
                    <p style="margin: 4px 0 0; color: #111827; font-size: 15px;">${company}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="margin: 32px 0 0; text-align: center;">
                <p style="margin: 0 0 16px; color: #6b7280; font-size: 15px;">
                  In the meantime, feel free to explore our work
                </p>
                <a href="https://nukleo.digital/projects" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px;">
                  View Our Projects
                </a>
              </div>
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
              <p style="margin: 16px 0 0; color: #9ca3af; font-size: 13px;">
                <a href="mailto:hello@nukleo.com" style="color: #8b5cf6; text-decoration: none;">hello@nukleo.com</a>
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

      try {
        // Save to database first
        const db = await getDb();
        if (!db) {
          console.error("[StartProject] Database connection not available");
        } else {
          try {
            const result = await db.insert(startProjectSubmissions).values({
              name,
              email,
              company,
              projectType,
              budget,
              description,
            }).returning({ id: startProjectSubmissions.id });
            console.log(`[StartProject] Successfully saved submission for ${name} (${email})`, result);
          } catch (dbError: any) {
            console.error("[StartProject] Database error:", dbError);
            console.error("[StartProject] Error message:", dbError?.message);
            console.error("[StartProject] Error code:", dbError?.code);
            console.error("[StartProject] Full error:", JSON.stringify(dbError, Object.getOwnPropertyNames(dbError), 2));
            // Continue even if DB save fails - still try to send emails
          }
        }

        // Send email to admin
        const adminEmailSent = await sendEmail({
          to: "clement@nukleo.com",
          subject: `🎯 New Project Request from ${name} (${company})`,
          html: adminEmailHtml,
        });

        // Send confirmation email to client
        const clientEmailSent = await sendEmail({
          to: email,
          subject: "Thank you for your project request - Nukleo Digital",
          html: clientEmailHtml,
        });

        if (!adminEmailSent || !clientEmailSent) {
          console.warn("[StartProject] One or more emails failed to send");
        }

        return {
          success: true,
          message: "Project request submitted successfully",
        };
      } catch (error) {
        console.error("[StartProject] Error:", error);
        throw new Error("Failed to submit project request");
      }
    }),
});
