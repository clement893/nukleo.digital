import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import jwt from "jsonwebtoken";
import { ENV } from "./env";

const ADMIN_JWT_SECRET = ENV.cookieSecret + "-admin";
const ADMIN_COOKIE_NAME = "admin_session";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  // Check if user is authenticated via Passport (Google OAuth) and is admin
  const req = opts.req as any;
  if (req.isAuthenticated && req.isAuthenticated() && req.user) {
    const passportUser = req.user;
    const email = passportUser.email?.toLowerCase();
    
    // Check if email is in admin allowed list
    const allowedEmails = ENV.adminAllowedEmails?.split(",").map((e) => e.trim().toLowerCase()) || [];
    if (email && allowedEmails.includes(email)) {
      // User is authenticated via Passport and is an admin
      const now = new Date();
      user = {
        id: passportUser.id || 0,
        openId: passportUser.id || `passport-${email}`,
        email: email,
        name: passportUser.name || passportUser.displayName || null,
        loginMethod: "google" as any,
        role: "admin" as const,
        createdAt: now,
        updatedAt: now,
        lastSignedIn: now,
      } as User;
      console.log(`[Context] Admin authenticated via Passport: ${email} (role: ${user.role})`);
    } else {
      // User is authenticated but not admin - try regular OAuth
      try {
        user = await sdk.authenticateRequest(opts.req);
      } catch (error) {
        user = null;
      }
    }
  } else {
    // Not authenticated via Passport, try regular OAuth
    try {
      user = await sdk.authenticateRequest(opts.req);
    } catch (error) {
      // Authentication is optional for public procedures.
      user = null;
    }
  }

  // If no user yet, check for admin JWT cookie
  if (!user) {
    const adminToken = opts.req.cookies?.[ADMIN_COOKIE_NAME];
    if (adminToken && ADMIN_JWT_SECRET && ADMIN_JWT_SECRET !== "-admin") {
      try {
        const decoded = jwt.verify(adminToken, ADMIN_JWT_SECRET) as {
          id: number;
          username: string;
          email: string;
        };

        // Create a User object with admin role
        // Note: This is a minimal user object for admin authentication
        // The admin user exists in admin_users table, not users table
        const now = new Date();
        user = {
          id: decoded.id,
          openId: `admin-${decoded.id}`, // Synthetic openId for admin
          email: decoded.email || null,
          name: decoded.username || null,
          loginMethod: "admin" as any,
          role: "admin" as const,
          createdAt: now,
          updatedAt: now,
          lastSignedIn: now,
        } as User;
        console.log(`[Context] Admin authenticated via JWT: ${decoded.email} (role: ${user.role})`);
      } catch (error) {
        // Invalid admin token
        console.log(`[Context] Invalid admin token: ${error instanceof Error ? error.message : 'unknown error'}`);
        user = null;
      }
    } else {
      // Log if no admin token found (only for admin routes to avoid noise)
      if (opts.req.path?.includes('/admin') || opts.req.path?.includes('projectsImages')) {
        console.log(`[Context] No admin token found. Cookie present: ${!!adminToken}, Secret configured: ${!!(ADMIN_JWT_SECRET && ADMIN_JWT_SECRET !== "-admin")}`);
      }
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
