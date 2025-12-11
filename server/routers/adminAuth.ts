import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { verifyAdminPassword, createAdminUser } from "../db";
import jwt from "jsonwebtoken";
import { ENV } from "../_core/env";

const ADMIN_JWT_SECRET = ENV.cookieSecret + "-admin"; // Separate secret for admin tokens
const ADMIN_COOKIE_NAME = "admin_session";

export const adminAuthRouter = router({
  login: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const admin = await verifyAdminPassword(input.username, input.password);
      
      if (!admin) {
        throw new Error("Invalid credentials");
      }

      console.log("[Admin Auth] Login successful for:", admin.username);
      
      // Create JWT token
      const token = jwt.sign(
        { id: admin.id, username: admin.username, email: admin.email },
        ADMIN_JWT_SECRET,
        { expiresIn: "7d" }
      );

      console.log("[Admin Auth] Setting cookie:", ADMIN_COOKIE_NAME);
      
      // Set cookie
      ctx.res.cookie(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: "/",
      });

      return {
        success: true,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
        },
      };
    }),

  logout: publicProcedure.mutation(({ ctx }) => {
    ctx.res.clearCookie(ADMIN_COOKIE_NAME, { path: "/" });
    return { success: true };
  }),

  checkAuth: publicProcedure.query(({ ctx }) => {
    const token = ctx.req.cookies[ADMIN_COOKIE_NAME];
    
    console.log("[Admin Auth] checkAuth called");
    console.log("[Admin Auth] All cookies:", ctx.req.cookies);
    console.log("[Admin Auth] Admin cookie:", token);
    
    if (!token) {
      console.log("[Admin Auth] No token found, returning unauthenticated");
      return { authenticated: false, admin: null };
    }

    try {
      const decoded = jwt.verify(token, ADMIN_JWT_SECRET) as {
        id: number;
        username: string;
        email: string;
      };

      return {
        authenticated: true,
        admin: {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
        },
      };
    } catch (error) {
      return { authenticated: false, admin: null };
    }
  }),

  // Create first admin (should be protected or removed after first use)
  createFirstAdmin: publicProcedure
    .input(
      z.object({
        username: z.string().min(3),
        password: z.string().min(8),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await createAdminUser(input);
        return { success: true };
      } catch (error) {
        console.error("[Admin Auth] Error creating admin:", error);
        throw new Error("Failed to create admin user");
      }
    }),
});
