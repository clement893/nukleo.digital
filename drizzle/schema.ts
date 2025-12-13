import { boolean, integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */

// Define enum for user roles
export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// LEO Contact table for email capture
export const leoContacts = pgTable("leo_contacts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }),
  conversationContext: text("conversationContext"), // Store last message or context
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type LeoContact = typeof leoContacts.$inferSelect;
export type InsertLeoContact = typeof leoContacts.$inferInsert;

// LEO Sessions table for analytics tracking
export const leoSessions = pgTable("leo_sessions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar("sessionId", { length: 64 }).notNull().unique(), // UUID for session
  pageContext: varchar("pageContext", { length: 50 }).notNull(), // home, agencies, services, etc.
  messageCount: integer("messageCount").default(0).notNull(), // Number of messages exchanged
  emailCaptured: integer("emailCaptured").default(0).notNull(), // 0 or 1
  capturedEmail: varchar("capturedEmail", { length: 320 }), // Email if captured
  conversationDuration: integer("conversationDuration"), // Duration in seconds
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type LeoSession = typeof leoSessions.$inferSelect;
export type InsertLeoSession = typeof leoSessions.$inferInsert;

// AI Readiness Assessment table
export const aiAssessments = pgTable("ai_assessments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),

  // User Info
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  jobTitle: varchar("jobTitle", { length: 100 }),
  phone: varchar("phone", { length: 50 }),

  // Context
  companySize: varchar("companySize", { length: 50 }),
  industry: varchar("industry", { length: 100 }),

  // Scores
  globalScore: integer("globalScore").notNull(),
  strategyScore: integer("strategyScore").notNull(),
  dataScore: integer("dataScore").notNull(),
  technologyScore: integer("technologyScore").notNull(),
  talentScore: integer("talentScore").notNull(),
  governanceScore: integer("governanceScore").notNull(),
  cultureScore: integer("cultureScore").notNull(),
  maturityLevel: varchar("maturityLevel", { length: 50 }).notNull(),

  // Responses (JSON)
  responses: text("responses").notNull(),

  // Tracking
  pdfDownloaded: integer("pdfDownloaded").default(0).notNull(),
  pdfDownloadedAt: timestamp("pdfDownloadedAt"),
  consultationRequested: integer("consultationRequested").default(0).notNull(),
  consultationRequestedAt: timestamp("consultationRequestedAt"),

  // Marketing
  utmSource: varchar("utmSource", { length: 100 }),
  utmMedium: varchar("utmMedium", { length: 100 }),
  utmCampaign: varchar("utmCampaign", { length: 100 }),
});

export type AiAssessment = typeof aiAssessments.$inferSelect;
export type InsertAiAssessment = typeof aiAssessments.$inferInsert;

// Media Assets table for Media Center
export const mediaAssets = pgTable("media_assets", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  fileKey: varchar("fileKey", { length: 512 }).notNull(),
  url: varchar("url", { length: 1024 }).notNull(),
  size: integer("size").notNull(), // in bytes
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(), // 'logo', 'brand', 'photo', 'screenshot'
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type MediaAsset = typeof mediaAssets.$inferSelect;
export type InsertMediaAsset = typeof mediaAssets.$inferInsert;

// Agency Leads table for qualification chatbot
export const agencyLeads = pgTable("agency_leads", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email", { length: 320 }).notNull(),
  companyName: varchar("companyName", { length: 255 }),
  agencySize: varchar("agencySize", { length: 50 }), // '1-5', '6-20', '21-50', '50+'
  techNeeds: text("techNeeds"), // JSON array of tech needs
  budget: varchar("budget", { length: 50 }), // '<10k', '10-50k', '50-100k', '100k+'
  urgency: varchar("urgency", { length: 50 }), // 'immediate', '1-3 months', '3-6 months', 'exploring'
  qualificationScore: integer("qualificationScore"), // 0-100 based on answers
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type AgencyLead = typeof agencyLeads.$inferSelect;
export type InsertAgencyLead = typeof agencyLeads.$inferInsert;

// Admin Users table for separate admin authentication
export const adminUsers = pgTable("admin_users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  lastLoginAt: timestamp("lastLoginAt"),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;
