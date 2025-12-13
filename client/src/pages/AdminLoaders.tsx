import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Trash2, Eye, Plus, Loader2 } from "lucide-react";
import { AdminHeader } from "@/components/AdminHeader";
import LoaderPreview from "@/components/LoaderPreview";

export default function AdminLoaders() {
  const utils = trpc.useUtils();
  const [previewLoader, setPreviewLoader] = useState<string | null>(null);

  // Fetch all loaders
  const { data: loaders, isLoading, error } = trpc.loaders.getAll.useQuery();

  // Mutations
  const toggleActiveMutation = trpc.loaders.toggleActive.useMutation({
    onSuccess: () => {
      utils.loaders.getAll.invalidate();
    },
  });

  const deleteMutation = trpc.loaders.delete.useMutation({
    onSuccess: () => {
      utils.loaders.getAll.invalidate();
    },
  });

  const handleToggleActive = (id: number) => {
    toggleActiveMutation.mutate({ id });
  };

  const handleDelete = (id: number, name: string) => {
    if (
      confirm(`Êtes-vous sûr de vouloir supprimer le loader "${name}" ?`)
    ) {
      deleteMutation.mutate({ id });
    }
  };

  const handlePreview = (cssCode: string) => {
    setPreviewLoader(cssCode);
  };

  if (isLoading) {
    return (
      <>
        <AdminHeader />
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Chargement des loaders...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminHeader />
        <div className="container mx-auto py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold mb-2">
              Erreur de chargement
            </h3>
            <p className="text-red-600">{error.message}</p>
          </div>
        </div>
      </>
    );
  }

  const activeCount = loaders?.filter((l) => l.isActive).length || 0;
  const inactiveCount = (loaders?.length || 0) - activeCount;

  return (
    <>
      <AdminHeader />
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gestion des Loaders</h1>
            <p className="text-muted-foreground">
              Gérez les animations de chargement qui s'affichent au démarrage
              du site
            </p>
          </div>
          <Button disabled>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un Loader
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total</CardDescription>
              <CardTitle className="text-3xl">{loaders?.length || 0}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Actifs</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {activeCount}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Inactifs</CardDescription>
              <CardTitle className="text-3xl text-gray-400">
                {inactiveCount}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Loaders List */}
        {!loaders || loaders.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Loader2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">
                  Aucun loader disponible
                </h3>
                <p className="text-muted-foreground mb-6">
                  Commencez par ajouter votre premier loader pour personnaliser
                  l'expérience de chargement
                </p>
                <Button disabled>
                  <Plus className="w-4 h-4 mr-2" />
                  Créer mon premier loader
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {loaders.map((loader) => (
              <Card
                key={loader.id}
                className={loader.isActive ? "border-primary" : ""}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{loader.name}</CardTitle>
                        {loader.isActive && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            Actif
                          </span>
                        )}
                      </div>
                      <CardDescription className="text-base">
                        {loader.description || "Aucune description"}
                      </CardDescription>
                      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Ordre: {loader.displayOrder}</span>
                        <span>•</span>
                        <span>
                          Créé le:{" "}
                          {new Date(loader.createdAt).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Active Toggle */}
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={loader.isActive}
                          onCheckedChange={() => handleToggleActive(loader.id)}
                          disabled={toggleActiveMutation.isPending}
                        />
                        <span className="text-sm text-muted-foreground">
                          {loader.isActive ? "Actif" : "Inactif"}
                        </span>
                      </div>

                      {/* Preview Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreview(loader.cssCode)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Prévisualiser
                      </Button>

                      {/* Delete Button */}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(loader.id, loader.name)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {/* Info Card */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="py-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Loader2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Comment ça fonctionne ?
                </h3>
                <p className="text-sm text-blue-800">
                  Les loaders actifs s'affichent en rotation aléatoire au
                  chargement du site. Vous pouvez activer/désactiver chaque
                  loader individuellement et prévisualiser leur rendu avant de
                  les publier.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Modal */}
      {previewLoader && (
        <LoaderPreview
          cssCode={previewLoader}
          isOpen={true}
          onClose={() => setPreviewLoader(null)}
        />
      )}
    </>
  );
}
