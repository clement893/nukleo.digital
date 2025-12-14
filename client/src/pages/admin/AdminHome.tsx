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
  ArrowRight,
  Mail,
  Volume2,
  Globe,
  Database,
  TrendingUp,
  FileText
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
  // Organiser les sections par catégories
  const adminCategories = [
    {
      title: "📊 Analytics & Tracking",
      description: "Suivi et analyses des performances",
      sections: [
        {
          title: "Dashboard",
          description: "Vue d'ensemble des statistiques et métriques principales",
          icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
          href: "/admin/dashboard",
        },
        {
          title: "Analytics & Tracking",
          description: "Configurer Google Analytics, Facebook Pixel, LinkedIn Insight Tag",
          icon: <TrendingUp className="w-6 h-6 text-primary" />,
          href: "/admin/analytics",
        },
        {
          title: "LEO Analytics",
          description: "Statistiques et analyses des interactions avec LEO",
          icon: <BarChart3 className="w-6 h-6 text-primary" />,
          href: "/admin/leo-analytics",
        },
      ],
    },
    {
      title: "💬 Gestion des Contacts & Leads",
      description: "Gérer les contacts, leads et messages",
      sections: [
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
          title: "Contact Messages",
          description: "Gérer les messages reçus via le formulaire de contact",
          icon: <MessageSquare className="w-6 h-6 text-primary" />,
          href: "/admin/contact-messages",
        },
        {
          title: "Start Project Submissions",
          description: "Gérer les demandes de projets soumises via Start Project",
          icon: <FileText className="w-6 h-6 text-primary" />,
          href: "/admin/start-project-submissions",
        },
        {
          title: "AI News Subscribers",
          description: "Gérer les abonnés à la newsletter AI News",
          icon: <Mail className="w-6 h-6 text-primary" />,
          href: "/admin/ai-news-subscribers",
        },
        {
          title: "Témoignages",
          description: "Synchroniser les témoignages depuis la plateforme interne",
          icon: <MessageSquare className="w-6 h-6 text-primary" />,
          href: "/admin/testimonials",
        },
      ],
    },
    {
      title: "⚙️ Configuration & Paramètres",
      description: "Paramètres du site et configuration",
      sections: [
        {
          title: "Visibilité des Pages",
          description: "Contrôler quelles pages sont accessibles sur le site",
          icon: <Globe className="w-6 h-6 text-primary" />,
          href: "/admin/page-visibility",
        },
        {
          title: "Gestion des Loaders",
          description: "Gérer les animations de chargement et leur rotation",
          icon: <Loader2 className="w-6 h-6 text-primary" />,
          href: "/admin/loaders",
        },
        {
          title: "Gestion des Sons",
          description: "Personnaliser les sons interactifs de l'interface",
          icon: <Volume2 className="w-6 h-6 text-primary" />,
          href: "/admin/sounds",
        },
      ],
    },
    {
      title: "🔧 Outils de Développement",
      description: "Outils techniques et migrations",
      sections: [
        {
          title: "Migration DB",
          description: "Créer les tables nécessaires (page_visibility, analytics)",
          icon: <Database className="w-6 h-6 text-primary" />,
          href: "/admin/run-migration",
        },
        {
          title: "Migration Loaders",
          description: "Sanitiser les loaders HTML pour l'accessibilité et le SEO",
          icon: <Database className="w-6 h-6 text-primary" />,
          href: "/admin/loader-migration",
        },
      ],
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
              <CardTitle className="text-3xl">
                {adminCategories.reduce((sum, cat) => sum + cat.sections.length, 0)}
              </CardTitle>
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
              <CardDescription>Catégories</CardDescription>
              <CardTitle className="text-3xl">{adminCategories.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Dernière mise à jour</CardDescription>
              <CardTitle className="text-xl">Aujourd'hui</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Admin Sections by Category */}
        <div className="space-y-8">
          {adminCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.sections.map((section) => (
                  <AdminCard key={section.href} {...section} />
                ))}
              </div>
            </div>
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
