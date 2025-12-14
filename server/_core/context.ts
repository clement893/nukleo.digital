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

  // First, try to authenticate via OAuth (regular user)
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  // If no regular user, check for admin JWT cookie
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
      } catch (error) {
        // Invalid admin token, continue with user = null
        // Silently fail - don't log to avoid noise
        user = null;
      }
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
