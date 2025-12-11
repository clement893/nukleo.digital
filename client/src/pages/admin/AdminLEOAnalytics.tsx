import { trpc } from '@/lib/trpc';
import { TrendingUp, MessageCircle, CheckCircle, Clock, Users, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLEOAnalytics() {
  const { data, isLoading } = trpc.leoAnalytics.getAnalytics.useQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-muted-foreground">No analytics data available</p>
      </div>
    );
  }

  const { overview, byPage, funnel, timeSeries, recentSessions } = data;

  // Format duration in seconds to readable format
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${minutes}m ${secs}s`;
  };

  // Calculate funnel conversion rates
  const funnelRates = {
    engagementRate: funnel.started > 0 ? (funnel.engaged / funnel.started) * 100 : 0,
    qualificationRate: funnel.engaged > 0 ? (funnel.qualified / funnel.engaged) * 100 : 0,
    conversionRate: funnel.qualified > 0 ? (funnel.converted / funnel.qualified) * 100 : 0,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          LEO Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Track LEO's performance, engagement, and conversion metrics
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-cyan-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Users className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalSessions}</div>
            <p className="text-xs text-muted-foreground">All-time conversations</p>
          </CardContent>
        </Card>

        <Card className="border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.completionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {overview.completedSessions} emails captured
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.avgMessages.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Per conversation</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(overview.avgDuration)}</div>
            <p className="text-xs text-muted-foreground">Per conversation</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance by Page */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-500" />
            Performance by Page
          </CardTitle>
          <CardDescription>Compare engagement and conversion across different pages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Page</th>
                  <th className="text-right py-3 px-4 font-medium">Sessions</th>
                  <th className="text-right py-3 px-4 font-medium">Conversions</th>
                  <th className="text-right py-3 px-4 font-medium">Rate</th>
                  <th className="text-right py-3 px-4 font-medium">Avg Messages</th>
                  <th className="text-right py-3 px-4 font-medium">Avg Duration</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(byPage)
                  .sort((a, b) => b[1].total - a[1].total)
                  .map(([page, stats]) => (
                    <tr key={page} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <span className="font-medium capitalize">{page}</span>
                      </td>
                      <td className="text-right py-3 px-4">{stats.total}</td>
                      <td className="text-right py-3 px-4">{stats.completed}</td>
                      <td className="text-right py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            stats.completionRate >= 50
                              ? 'bg-green-500/10 text-green-500'
                              : stats.completionRate >= 25
                              ? 'bg-yellow-500/10 text-yellow-500'
                              : 'bg-red-500/10 text-red-500'
                          }`}
                        >
                          {stats.completionRate.toFixed(1)}%
                        </span>
                      </td>
                      <td className="text-right py-3 px-4">{stats.avgMessages.toFixed(1)}</td>
                      <td className="text-right py-3 px-4">{formatDuration(stats.avgDuration)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            Conversion Funnel
          </CardTitle>
          <CardDescription>Track user journey from start to conversion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Started */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Started Conversation</span>
                <span className="text-sm text-muted-foreground">{funnel.started} sessions</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-3 rounded-full"
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>

            {/* Engaged */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Engaged (3+ messages)</span>
                <span className="text-sm text-muted-foreground">
                  {funnel.engaged} sessions ({funnelRates.engagementRate.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                  style={{ width: `${funnelRates.engagementRate}%` }}
                ></div>
              </div>
            </div>

            {/* Qualified */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Qualified (5+ messages)</span>
                <span className="text-sm text-muted-foreground">
                  {funnel.qualified} sessions ({funnelRates.qualificationRate.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full"
                  style={{ width: `${funnelRates.qualificationRate}%` }}
                ></div>
              </div>
            </div>

            {/* Converted */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Converted (Email Captured)</span>
                <span className="text-sm text-muted-foreground">
                  {funnel.converted} sessions ({funnelRates.conversionRate.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                  style={{ width: `${funnelRates.conversionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Series Chart (Simple Bar Representation) */}
      {timeSeries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sessions & Conversions (Last 30 Days)</CardTitle>
            <CardDescription>Daily breakdown of LEO activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timeSeries.slice(-14).map((day) => (
                <div key={day.date} className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground w-24">{day.date}</span>
                  <div className="flex-1 flex gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="bg-cyan-500/20 h-6 rounded"
                          style={{ width: `${(day.sessions / Math.max(...timeSeries.map(d => d.sessions))) * 100}%` }}
                        ></div>
                        <span className="text-xs text-muted-foreground">{day.sessions}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="bg-green-500/20 h-6 rounded"
                          style={{ width: `${(day.conversions / Math.max(...timeSeries.map(d => d.conversions))) * 100}%` }}
                        ></div>
                        <span className="text-xs text-muted-foreground">{day.conversions}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-cyan-500/20 rounded"></div>
                <span className="text-xs text-muted-foreground">Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500/20 rounded"></div>
                <span className="text-xs text-muted-foreground">Conversions</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>Latest 50 LEO conversations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Page</th>
                  <th className="text-left py-3 px-4 font-medium">Started</th>
                  <th className="text-right py-3 px-4 font-medium">Messages</th>
                  <th className="text-right py-3 px-4 font-medium">Duration</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-center py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((session) => (
                  <tr key={session.id} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <span className="capitalize text-sm">{session.pageContext}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(session.startedAt).toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-4 text-sm">{session.messageCount || 0}</td>
                    <td className="text-right py-3 px-4 text-sm">
                      {session.conversationDuration ? formatDuration(session.conversationDuration) : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {session.capturedEmail ? (
                        <span className="text-cyan-500">{session.capturedEmail}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {session.emailCaptured === 1 ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                          Converted
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-500">
                          In Progress
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
