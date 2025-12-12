import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ENV } from "./env";

// Configure Google OAuth Strategy
export function configureGoogleAuth() {
  if (!ENV.googleClientId || !ENV.googleClientSecret) {
    console.warn("[Google Auth] Missing credentials, Google OAuth disabled");
    return;
  }

  const allowedEmails = ENV.adminAllowedEmails?.split(",").map((e) => e.trim().toLowerCase()) || [];
  
  if (allowedEmails.length === 0) {
    console.warn("[Google Auth] No allowed emails configured");
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: ENV.googleClientId,
        clientSecret: ENV.googleClientSecret,
        callbackURL: `${ENV.baseUrl}/api/auth/google/callback`,
      },
      (accessToken, refreshToken, profile, done) => {
        // Extract email from profile
        const email = profile.emails?.[0]?.value?.toLowerCase();
        
        if (!email) {
          return done(null, false, { message: "No email found in Google profile" });
        }

        // Check if email is in allowed list
        if (!allowedEmails.includes(email)) {
          console.log(`[Google Auth] Unauthorized email attempt: ${email}`);
          return done(null, false, { message: "Email not authorized" });
        }

        // Create admin user object
        const adminUser = {
          id: profile.id,
          email,
          name: profile.displayName,
          picture: profile.photos?.[0]?.value,
        };

        console.log(`[Google Auth] Successful login: ${email}`);
        return done(null, adminUser);
      }
    )
  );

  // Serialize user to session
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  // Deserialize user from session
  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });

  console.log("[Google Auth] Configured successfully");
}

// Middleware to check if user is authenticated admin
export function requireAdminAuth(req: any, res: any, next: any) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized - Admin login required" });
}
