import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminHeader } from "@/components/AdminHeader";
import { 
  LayoutDashboard, 
  Loader2,
  BarChart3, 
  MessageSquare, 
  Building2,
  Settings,
  ArrowRight
} from "lucide-react";

interface AdminCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
}

function AdminCard({ title, description, icon, href, badge }: AdminCardProps) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                {icon}
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  {title}
                  {badge && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      {badge}
                    </span>
                  )}
                </CardTitle>
                <CardDescription className="mt-1">{description}</CardDescription>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default function AdminHome() {
  const adminSections = [
    {
      title: "Dashboard",
      description: "Vue d'ensemble des statistiques et métriques principales",
      icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
      href: "/admin/dashboard",
    },
    {
      title: "LEO Analytics",
      description: "Statistiques et analyses des interactions avec LEO",
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      href: "/admin/leo-analytics",
    },
    {
      title: "LEO Contacts",
      description: "Gérer les contacts et conversations LEO",
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      href: "/admin/leo-contacts",
    },
    {
      title: "Agency Leads",
      description: "Gérer les leads et demandes des agences",
      icon: <Building2 className="w-6 h-6 text-primary" />,
      href: "/admin/agency-leads",
    },
    {
      title: "Gestion des Loaders",
      description: "Gérer les animations de chargement et leur rotation",
      icon: <Loader2 className="w-6 h-6 text-primary" />,
      href: "/admin/loaders",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <AdminHeader />
      <div className="container mx-auto py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Administration
          </h1>
          <p className="text-xl text-muted-foreground">
            Centre de contrôle pour gérer tous les aspects de Nukleo Digital
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pages Admin</CardDescription>
              <CardTitle className="text-3xl">{adminSections.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Statut</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                En ligne
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Loaders Actifs</CardDescription>
              <CardTitle className="text-3xl">-</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Dernière mise à jour</CardDescription>
              <CardTitle className="text-xl">Aujourd'hui</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Admin Sections Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Sections d'administration</h2>
          {adminSections.map((section) => (
            <AdminCard key={section.href} {...section} />
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 text-muted-foreground mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Besoin d'aide ?</h3>
              <p className="text-sm text-muted-foreground">
                Pour ajouter de nouvelles sections admin, contactez l'équipe de développement ou consultez la documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
