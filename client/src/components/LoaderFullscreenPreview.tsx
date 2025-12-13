import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface LoaderFullscreenPreviewProps {
  loaderType: string;
  loaderName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function LoaderFullscreenPreview({
  loaderType,
  loaderName,
  isOpen,
  onClose,
}: LoaderFullscreenPreviewProps) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const LOADING_DURATION = 4000; // 4 secondes

  // Extract styles and HTML from loaderType
  useEffect(() => {
    if (!isOpen) {
      setIsReady(false);
      // Remove styles when preview closes
      const styleElement = document.getElementById('loader-preview-styles');
      if (styleElement) {
        styleElement.remove();
      }
      return;
    }

    // Check if loaderType contains HTML/CSS
    if (!loaderType.includes('<div') && !loaderType.includes('<style>')) {
      setIsReady(true);
      return;
    }

    // Extract CSS styles
    const styleMatch = loaderType.match(/<style>([\s\S]*?)<\/style>/);
    const cssStyles = styleMatch ? styleMatch[1] : '';

    // Extract HTML content (without style tags)
    const htmlContent = loaderType.replace(/<style>[\s\S]*?<\/style>/g, '').trim();

    // Inject CSS into document head
    if (cssStyles) {
      // Remove existing style element if any
      const existingStyle = document.getElementById('loader-preview-styles');
      if (existingStyle) {
        existingStyle.remove();
      }

      // Create and inject new style element
      const styleElement = document.createElement('style');
      styleElement.id = 'loader-preview-styles';
      styleElement.textContent = cssStyles;
      document.head.appendChild(styleElement);
    }

    // Store HTML content in data attribute for rendering
    const container = document.getElementById('loader-preview-container');
    if (container && htmlContent) {
      container.innerHTML = htmlContent;
    }

    // Wait a bit to ensure styles are applied, then mark as ready
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => {
      clearTimeout(timer);
      const styleElement = document.getElementById('loader-preview-styles');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [loaderType, isOpen]);

  // Simulate loading progress
  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / LOADING_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onClose();
        }, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Extract HTML content for rendering
  const htmlContent = loaderType.includes('<style>')
    ? loaderType.replace(/<style>[\s\S]*?<\/style>/g, '').trim()
    : '';

  // Render predefined loaders or custom HTML
  const renderLoader = () => {
    // Custom HTML/CSS loader
    if (loaderType.includes('<div') || loaderType.includes('<style>')) {
      if (!isReady) {
        return (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-white">Chargement...</div>
          </div>
        );
      }

      return (
        <div
          id="loader-preview-container"
          className="absolute inset-0"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      );
    }

    // Predefined loaders
    switch (loaderType) {
      case "psychedelic-crazy-arts":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-cyan-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/Nukleo_blanc_RVB.svg"
                alt="Logo"
                className="w-48 h-48 animate-pulse"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(168, 85, 247, 1))",
                }}
              />
            </div>
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white text-2xl font-bold mb-4">LOADING</p>
              <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        );

      case "minimal-dots":
        return (
          <div className="absolute inset-0 bg-white flex items-center justify-center flex-col gap-8">
            <div className="flex gap-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-800 text-lg font-medium mb-3">Chargement...</p>
              <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-800 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center flex-col gap-4">
            <p className="text-white text-xl">Prévisualisation non disponible</p>
            <p className="text-white/60 text-sm">Type: {loaderType}</p>
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black"
      onClick={onClose}
      style={{ cursor: "pointer" }}
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 text-white hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Loader name */}
      <div className="absolute top-4 left-4 z-50 text-white">
        <p className="text-sm opacity-60">Prévisualisation</p>
        <p className="text-xl font-bold">{loaderName}</p>
      </div>

      {/* Loader content */}
      <div className="absolute inset-0">
        {renderLoader()}
      </div>

      {/* ESC hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-sm z-50">
        Fermeture automatique dans {Math.max(0, Math.ceil((100 - progress) / 25))}s • ESC pour fermer
      </div>
    </div>
  );
}
