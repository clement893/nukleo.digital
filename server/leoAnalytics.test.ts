import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { Context } from "./_core/context";

// Mock context for testing
const createMockContext = (): Context => ({
  req: {} as any,
  res: {} as any,
  user: null,
});

describe("LEO Analytics Router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    caller = appRouter.createCaller(createMockContext());
  });

  it("should track a new LEO session", async () => {
    const sessionId = `test-session-${Date.now()}`;
    
    const result = await caller.leoAnalytics.trackSession({
      sessionId,
      page: "leo",
      messagesCount: 1,
      userAgent: "Mozilla/5.0 (Test)",
      referrer: "https://nukleo.digital",
    });

    expect(result.success).toBe(true);
    expect(result.session).toBeDefined();
    if (result.session) {
      expect(result.session.sessionId).toBe(sessionId);
      expect(result.session.page).toBe("leo");
      expect(result.session.messagesCount).toBe(1);
    }
  });

  it("should update an existing LEO session", async () => {
    const sessionId = `test-session-update-${Date.now()}`;
    
    // Create initial session
    await caller.leoAnalytics.trackSession({
      sessionId,
      page: "leo",
      messagesCount: 1,
    });

    // Update with more messages
    const result = await caller.leoAnalytics.trackSession({
      sessionId,
      page: "leo",
      messagesCount: 3,
    });

    expect(result.success).toBe(true);
    expect(result.session).toBeDefined();
    if (result.session) {
      expect(result.session.messagesCount).toBe(3);
    }
  });

  it("should track email capture in session", async () => {
    const sessionId = `test-session-email-${Date.now()}`;
    
    const result = await caller.leoAnalytics.trackSession({
      sessionId,
      page: "leo",
      messagesCount: 5,
      userEmail: "test@example.com",
      userName: "Test User",
      emailCaptured: true,
    });

    expect(result.success).toBe(true);
    expect(result.session).toBeDefined();
    if (result.session) {
      expect(result.session.userEmail).toBe("test@example.com");
      expect(result.session.userName).toBe("Test User");
      expect(result.session.emailCaptured).toBe(1);
      expect(result.session.emailCapturedAt).toBeDefined();
    }
  });

  it("should get LEO analytics summary", async () => {
    // Create a few test sessions
    const baseSessionId = `analytics-test-${Date.now()}`;
    
    await caller.leoAnalytics.trackSession({
      sessionId: `${baseSessionId}-1`,
      page: "leo",
      messagesCount: 5,
    });

    await caller.leoAnalytics.trackSession({
      sessionId: `${baseSessionId}-2`,
      page: "home",
      messagesCount: 3,
      userEmail: "test@example.com",
      emailCaptured: true,
    });

    const analytics = await caller.leoAnalytics.getAnalytics({ days: 30 });

    expect(analytics).toBeDefined();
    if (analytics) {
      expect(analytics.totalSessions).toBeGreaterThan(0);
      expect(analytics.totalMessages).toBeGreaterThan(0);
      expect(analytics.avgMessagesPerSession).toBeGreaterThan(0);
      expect(analytics.byPage).toBeDefined();
    }
  });

  it("should get all LEO sessions", async () => {
    const sessions = await caller.leoAnalytics.getAllSessions({ limit: 10 });

    expect(Array.isArray(sessions)).toBe(true);
    if (sessions.length > 0) {
      expect(sessions[0]).toHaveProperty("sessionId");
      expect(sessions[0]).toHaveProperty("page");
      expect(sessions[0]).toHaveProperty("messagesCount");
    }
  });
});
