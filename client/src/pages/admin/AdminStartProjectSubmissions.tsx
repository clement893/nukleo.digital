import { useState } from 'react';
import { AdminHeader } from '@/components/AdminHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { Download, Mail, Building, Calendar, DollarSign, FileText, User } from 'lucide-react';

export default function AdminStartProjectSubmissions() {
  const { data: submissions, isLoading, refetch } = trpc.admin.getStartProjectSubmissions.useQuery();
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);

  const exportToCSV = () => {
    if (!submissions || !Array.isArray(submissions) || submissions.length === 0) return;

    const headers = ['ID', 'Name', 'Email', 'Company', 'Project Type', 'Budget', 'Description', 'Created At'];
    const rows = submissions.map(sub => [
      sub.id.toString(),
      sub.name,
      sub.email,
      sub.company,
      sub.projectType,
      sub.budget,
      sub.description.replace(/,/g, ';'), // Replace commas in description
      new Date(sub.createdAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `start-project-submissions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatProjectType = (type: string) => {
    const types: Record<string, string> = {
      'ai-strategy': 'AI Strategy & Consulting',
      'agentic-ai': 'Agentic AI Development',
      'ai-integration': 'AI Integration',
      'ai-training': 'AI Training & Workshops',
      'other': 'Other',
    };
    return types[type] || type;
  };

  const formatBudget = (budget: string) => {
    const budgets: Record<string, string> = {
      '10k-25k': '$10k - $25k',
      '25k-50k': '$25k - $50k',
      '50k-100k': '$50k - $100k',
      '100k+': '$100k+',
      'not-sure': 'Not sure yet',
    };
    return budgets[budget] || budget;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <AdminHeader />
      <div className="container mx-auto py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Start Project Submissions
            </h1>
            <p className="text-lg text-muted-foreground">
              Gérer les demandes de projets soumises via le formulaire Start Project
            </p>
          </div>
          <Button onClick={exportToCSV} disabled={!submissions || submissions.length === 0} className="gap-2">
            <Download className="w-4 h-4" />
            Exporter CSV
          </Button>
        </div>

        {/* Stats */}
        {submissions && submissions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Submissions</CardDescription>
                <CardTitle className="text-3xl">{submissions.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-3xl">
                  {submissions.filter(s => {
                    const subDate = new Date(s.createdAt);
                    const now = new Date();
                    return subDate.getMonth() === now.getMonth() && subDate.getFullYear() === now.getFullYear();
                  }).length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-3xl">
                  {submissions.filter(s => {
                    const subDate = new Date(s.createdAt);
                    const now = new Date();
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return subDate >= weekAgo;
                  }).length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Today</CardDescription>
                <CardTitle className="text-3xl">
                  {submissions.filter(s => {
                    const subDate = new Date(s.createdAt);
                    const today = new Date();
                    return subDate.toDateString() === today.toDateString();
                  }).length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Submissions List */}
        {isLoading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Chargement...</p>
            </CardContent>
          </Card>
        ) : !submissions || submissions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Aucune soumission pour le moment</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions && Array.isArray(submissions) ? submissions.map((submission) => (
              <Card
                key={submission.id}
                className={`cursor-pointer transition-all ${
                  selectedSubmission === submission.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedSubmission(selectedSubmission === submission.id ? null : submission.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 mb-2">
                        <User className="w-5 h-5 text-primary" />
                        {submission.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {submission.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {submission.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(submission.createdAt)}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                        {formatProjectType(submission.projectType)}
                      </span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {formatBudget(submission.budget)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                {selectedSubmission === submission.id && (
                  <CardContent className="pt-0 border-t">
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Project Description
                        </h4>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{submission.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = `mailto:${submission.email}`;
                          }}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )) : null}
          </div>
        )}
      </div>
    </div>
  );
}
