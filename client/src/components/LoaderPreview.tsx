import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoaderPreviewProps {
  cssCode: string;
  isOpen: boolean;
  onClose: () => void;
  loaderName?: string;
}

export default function LoaderPreview({
  cssCode,
  isOpen,
  onClose,
  loaderName,
}: LoaderPreviewProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsReady(false);
      const styleElement = document.getElementById("loader-preview-styles");
      if (styleElement) {
        styleElement.remove();
      }
      return;
    }

    // Extract CSS styles
    const styleMatch = cssCode.match(/<style>([\s\S]*?)<\/style>/);
    const cssStyles = styleMatch ? styleMatch[1] : "";

    // Extract HTML content (without style tags)
    const htmlContent = cssCode.replace(/<style>[\s\S]*?<\/style>/g, "").trim();

    // Inject CSS into document head
    if (cssStyles) {
      const existingStyle = document.getElementById("loader-preview-styles");
      if (existingStyle) {
        existingStyle.remove();
      }

      const styleElement = document.createElement("style");
      styleElement.id = "loader-preview-styles";
      styleElement.textContent = cssStyles;
      document.head.appendChild(styleElement);
    }

    // Wait for styles to be applied
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    });

    return () => {
      const styleElement = document.getElementById("loader-preview-styles");
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [cssCode, isOpen]);

  if (!isOpen) return null;

  const htmlContent = cssCode.includes("<style>")
    ? cssCode.replace(/<style>[\s\S]*?<\/style>/g, "").trim()
    : cssCode;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
      style={{ cursor: "pointer" }}
    >
      <div
        className="relative w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {!isReady ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white">Chargement...</div>
          </div>
        ) : (
          <div
            key={`preview-${isReady}`}
            className="absolute inset-0"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}
        
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 text-white hover:bg-white/10 bg-black/50"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Loader name */}
        {loaderName && (
          <div className="absolute top-4 left-4 z-50 text-white bg-black/50 px-4 py-2 rounded">
            <p className="text-sm opacity-60">Prévisualisation</p>
            <p className="text-lg font-bold">{loaderName}</p>
          </div>
        )}

        {/* Close hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-white/60 text-sm bg-black/50 px-4 py-2 rounded">
          Cliquez n'importe où ou appuyez sur ESC pour fermer
        </div>
      </div>
    </div>
  );
}
