import { useState, useEffect } from "react";
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

// Composant pour la prévisualisation miniature
function LoaderMiniPreview({ cssCode, loaderId }: { cssCode: string; loaderId: number }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Extract CSS styles
    const styleMatch = cssCode.match(/<style>([\s\S]*?)<\/style>/);
    const cssStyles = styleMatch ? styleMatch[1] : "";

    // Inject CSS into document head with unique ID
    if (cssStyles) {
      const styleId = `loader-mini-preview-${loaderId}`;
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }

      const styleElement = document.createElement("style");
      styleElement.id = styleId;
      // Scale down the loader and fix logo position
      styleElement.textContent = cssStyles + `
        /* Scale down loader for mini preview */
        #loader-mini-container-${loaderId} {
          transform: scale(0.3);
          transform-origin: center center;
        }
        /* Fix logo in center for mini preview */
        #loader-mini-container-${loaderId} img[src*="Nukleo"], 
        #loader-mini-container-${loaderId} img[src*="nukleo"], 
        #loader-mini-container-${loaderId} img[src*="logo"],
        #loader-mini-container-${loaderId} img[alt*="Nukleo"],
        #loader-mini-container-${loaderId} img[alt*="nukleo"],
        #loader-mini-container-${loaderId} img[alt*="Logo"],
        #loader-mini-container-${loaderId} svg[class*="logo"],
        #loader-mini-container-${loaderId} svg[id*="logo"],
        #loader-mini-container-${loaderId} .logo,
        #loader-mini-container-${loaderId} [class*="logo"],
        #loader-mini-container-${loaderId} [id*="logo"] {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          z-index: 1 !important;
        }
      `;
      document.head.appendChild(styleElement);
    }

    // Wait for styles to be applied
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    });

    return () => {
      const styleElement = document.getElementById(`loader-mini-preview-${loaderId}`);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [cssCode, loaderId]);

  const htmlContent = cssCode.includes("<style>")
    ? cssCode.replace(/<style>[\s\S]*?<\/style>/g, "").trim()
    : cssCode;

  return (
    <div className="relative w-full h-48 bg-black rounded-lg overflow-hidden border border-gray-800">
      <div
        id={`loader-mini-container-${loaderId}`}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          width: "333%",
          height: "333%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0.3)",
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-white/50 text-xs">Chargement...</div>
        </div>
      )}
    </div>
  );
}

export default function AdminLoaders() {
  const utils = trpc.useUtils();
  const [previewLoader, setPreviewLoader] = useState<{ cssCode: string; name: string } | null>(null);

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

  const handlePreview = (cssCode: string, name: string) => {
    setPreviewLoader({ cssCode, name });
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loaders.map((loader) => (
              <Card
                key={loader.id}
                className={loader.isActive ? "border-primary" : ""}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <CardTitle className="text-xl">{loader.name}</CardTitle>
                    {loader.isActive && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Actif
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-base mb-4">
                    {loader.description || "Aucune description"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Mini Preview */}
                  <div className="mb-4">
                    <LoaderMiniPreview cssCode={loader.cssCode} loaderId={loader.id} />
                  </div>
                  
                  {/* Metadata */}
                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Ordre: {loader.displayOrder}</span>
                    <span>•</span>
                    <span>
                      Créé le:{" "}
                      {new Date(loader.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-3 pt-4 border-t">
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

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {/* Preview Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreview(loader.cssCode, loader.name)}
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
                </CardContent>
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
          cssCode={previewLoader.cssCode}
          loaderName={previewLoader.name}
          isOpen={true}
          onClose={() => setPreviewLoader(null)}
        />
      )}
    </>
  );
}
