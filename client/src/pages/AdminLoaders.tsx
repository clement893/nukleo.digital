import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Trash2, Eye, Plus } from "lucide-react";

export default function AdminLoaders() {
  const utils = trpc.useUtils();

  // Fetch all loaders
  const { data: loaders, isLoading } = trpc.loaders.getAll.useQuery();

  // Mutations
  const toggleActiveMutation = trpc.loaders.toggleActive.useMutation({
    onSuccess: () => {
      utils.loaders.getAll.invalidate();
      alert("Loader mis à jour : Le statut du loader a été modifié");
    },
    onError: (error) => {
      alert("Erreur : " + error.message);
    },
  });

  const deleteMutation = trpc.loaders.delete.useMutation({
    onSuccess: () => {
      utils.loaders.getAll.invalidate();
      alert("Loader supprimé : Le loader a été supprimé avec succès");
    },
    onError: (error) => {
      alert("Erreur : " + error.message);
    },
  });

  const handleToggleActive = (id: number) => {
    toggleActiveMutation.mutate({ id });
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le loader "${name}" ?`)) {
      deleteMutation.mutate({ id });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Gestion des Loaders</h1>
          <p className="text-muted-foreground">
            Gérez les animations de chargement qui s'affichent au démarrage du site
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un Loader
        </Button>
      </div>

      {/* Active Loaders Count */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Statistiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{loaders?.length || 0}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Actifs</p>
              <p className="text-2xl font-bold text-green-600">
                {loaders?.filter((l) => l.isActive).length || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inactifs</p>
              <p className="text-2xl font-bold text-gray-400">
                {loaders?.filter((l) => !l.isActive).length || 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loaders List */}
      <div className="grid gap-4">
        {loaders?.map((loader) => (
          <Card key={loader.id} className={!loader.isActive ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {loader.name}
                    {loader.isActive && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Actif
                      </span>
                    )}
                  </CardTitle>
                  {loader.description && (
                    <CardDescription className="mt-2">{loader.description}</CardDescription>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {/* Toggle Active */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {loader.isActive ? "Actif" : "Inactif"}
                    </span>
                    <Switch
                      checked={loader.isActive}
                      onCheckedChange={() => handleToggleActive(loader.id)}
                      disabled={toggleActiveMutation.isPending}
                    />
                  </div>

                  {/* Preview Button */}
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>

                  {/* Delete Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(loader.id, loader.name)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ordre d'affichage:</span>
                  <span className="font-medium">{loader.displayOrder}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Créé le:</span>
                  <span className="font-medium">
                    {new Date(loader.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Modifié le:</span>
                  <span className="font-medium">
                    {new Date(loader.updatedAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {loaders?.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Aucun loader disponible</p>
              <Button className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Créer votre premier loader
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
