import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// AI Readiness Assessment table
export const aiAssessments = mysqlTable("ai_assessments", {
  id: int("id").autoincrement().primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

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
  globalScore: int("globalScore").notNull(),
  strategyScore: int("strategyScore").notNull(),
  dataScore: int("dataScore").notNull(),
  technologyScore: int("technologyScore").notNull(),
  talentScore: int("talentScore").notNull(),
  governanceScore: int("governanceScore").notNull(),
  cultureScore: int("cultureScore").notNull(),
  maturityLevel: varchar("maturityLevel", { length: 50 }).notNull(),

  // Responses (JSON)
  responses: text("responses").notNull(),

  // Tracking
  pdfDownloaded: int("pdfDownloaded").default(0).notNull(),
  pdfDownloadedAt: timestamp("pdfDownloadedAt"),
  consultationRequested: int("consultationRequested").default(0).notNull(),
  consultationRequestedAt: timestamp("consultationRequestedAt"),

  // Marketing
  utmSource: varchar("utmSource", { length: 100 }),
  utmMedium: varchar("utmMedium", { length: 100 }),
  utmCampaign: varchar("utmCampaign", { length: 100 }),
});

export type AiAssessment = typeof aiAssessments.$inferSelect;
export type InsertAiAssessment = typeof aiAssessments.$inferInsert;

// Media Assets table for Media Center
export const mediaAssets = mysqlTable("media_assets", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  fileKey: varchar("fileKey", { length: 512 }).notNull(),
  url: varchar("url", { length: 1024 }).notNull(),
  size: int("size").notNull(), // in bytes
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(), // 'logo', 'brand', 'photo', 'screenshot'
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MediaAsset = typeof mediaAssets.$inferSelect;
export type InsertMediaAsset = typeof mediaAssets.$inferInsert;

// Onboarding Progress table
export const onboardingProgress = mysqlTable("onboarding_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  currentStep: int("currentStep").default(0).notNull(), // 0-based step index
  completedSteps: text("completedSteps").notNull(), // JSON array of completed step indices
  isCompleted: int("isCompleted").default(0).notNull(), // 0 or 1 (boolean)
  skipped: int("skipped").default(0).notNull(), // 0 or 1 (boolean)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type OnboardingProgress = typeof onboardingProgress.$inferSelect;
export type InsertOnboardingProgress = typeof onboardingProgress.$inferInsert;