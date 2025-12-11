import { adminProcedure, router } from "../_core/trpc";
import { getLeoAnalytics } from "../db";

export const leoAnalyticsRouter = router({
  getAnalytics: adminProcedure.query(async () => {
    const sessions = await getLeoAnalytics();
    
    // Calculate metrics
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.emailCaptured === 1).length;
    const completionRate = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;
    
    // Average messages per session
    const totalMessages = sessions.reduce((sum, s) => sum + (s.messageCount || 0), 0);
    const avgMessages = totalSessions > 0 ? totalMessages / totalSessions : 0;
    
    // Average conversation duration
    const sessionsWithDuration = sessions.filter(s => s.conversationDuration);
    const totalDuration = sessionsWithDuration.reduce((sum, s) => sum + (s.conversationDuration || 0), 0);
    const avgDuration = sessionsWithDuration.length > 0 ? totalDuration / sessionsWithDuration.length : 0;
    
    // By page context
    const byPage: Record<string, {
      total: number;
      completed: number;
      completionRate: number;
      avgMessages: number;
      avgDuration: number;
    }> = {};
    
    sessions.forEach(session => {
      if (!byPage[session.pageContext]) {
        byPage[session.pageContext] = {
          total: 0,
          completed: 0,
          completionRate: 0,
          avgMessages: 0,
          avgDuration: 0,
        };
      }
      
      byPage[session.pageContext].total++;
      if (session.emailCaptured === 1) {
        byPage[session.pageContext].completed++;
      }
    });
    
    // Calculate rates for each page
    Object.keys(byPage).forEach(page => {
      const pageData = byPage[page];
      pageData.completionRate = pageData.total > 0 ? (pageData.completed / pageData.total) * 100 : 0;
      
      const pageSessions = sessions.filter(s => s.pageContext === page);
      const pageMessages = pageSessions.reduce((sum, s) => sum + (s.messageCount || 0), 0);
      pageData.avgMessages = pageSessions.length > 0 ? pageMessages / pageSessions.length : 0;
      
      const pageSessionsWithDuration = pageSessions.filter(s => s.conversationDuration);
      const pageDuration = pageSessionsWithDuration.reduce((sum, s) => sum + (s.conversationDuration || 0), 0);
      pageData.avgDuration = pageSessionsWithDuration.length > 0 ? pageDuration / pageSessionsWithDuration.length : 0;
    });
    
    // Funnel data
    const funnel = {
      started: totalSessions,
      engaged: sessions.filter(s => (s.messageCount || 0) >= 3).length, // 3+ messages
      qualified: sessions.filter(s => (s.messageCount || 0) >= 5).length, // 5+ messages
      converted: completedSessions, // Email captured
    };
    
    // Time series data (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSessions = sessions.filter(s => new Date(s.startedAt) >= thirtyDaysAgo);
    
    // Group by day
    const dailyData: Record<string, { date: string; sessions: number; conversions: number }> = {};
    
    recentSessions.forEach(session => {
      const date = new Date(session.startedAt).toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = { date, sessions: 0, conversions: 0 };
      }
      dailyData[date].sessions++;
      if (session.emailCaptured === 1) {
        dailyData[date].conversions++;
      }
    });
    
    const timeSeriesData = Object.values(dailyData).sort((a, b) => a.date.localeCompare(b.date));
    
    return {
      overview: {
        totalSessions,
        completedSessions,
        completionRate,
        avgMessages,
        avgDuration,
      },
      byPage,
      funnel,
      timeSeries: timeSeriesData,
      recentSessions: sessions.slice(0, 50), // Last 50 sessions
    };
  }),
});
