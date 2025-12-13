import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useRef } from "react";

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
  const [iframeContent, setIframeContent] = useState<string>('');
  const LOADING_DURATION = 4000; // 4 secondes

  // Prepare iframe content with full HTML document
  useEffect(() => {
    if (!isOpen) {
      setIframeContent('');
      return;
    }

    if (!loaderType.includes('<div') && !loaderType.includes('<style>')) {
      setIframeContent('');
      return;
    }

    // Extract styles and HTML
    const styleMatch = loaderType.match(/<style>([\s\S]*?)<\/style>/);
    const styles = styleMatch ? styleMatch[1] : '';
    let htmlContent = loaderType.replace(/<style>[\s\S]*?<\/style>/g, '').trim();

    // Convert relative image paths to absolute URLs for iframe
    const baseUrl = window.location.origin;
    htmlContent = htmlContent.replace(/src="(\/[^"]+)"/g, `src="${baseUrl}$1"`);
    htmlContent = htmlContent.replace(/src='(\/[^']+)'/g, `src='${baseUrl}$1'`);

    // Create a complete HTML document with the loader content
    const fullHTML = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Loader Preview</title>
  ${styles ? `<style>${styles}</style>` : ''}
</head>
<body style="margin: 0; padding: 0; overflow: hidden; width: 100vw; height: 100vh;">
  ${htmlContent}
</body>
</html>`;

    setIframeContent(fullHTML);
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
        // Auto-close after completion
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

  const renderLoader = () => {
    // If loaderType contains HTML/CSS (starts with <div or contains <style>), use iframe
    if (loaderType.includes('<div') || loaderType.includes('<style>')) {
      if (!iframeContent) {
        return (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-white">Chargement du loader...</div>
          </div>
        );
      }

      return (
        <iframe
          srcDoc={iframeContent}
          className="absolute inset-0 w-full h-full border-0"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
            pointerEvents: 'none'
          }}
          sandbox="allow-same-origin"
        />
      );
    }

    switch (loaderType) {
      case "psychedelic-crazy-arts":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-cyan-900">
            {/* Grain texture */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
              <svg width="100%" height="100%">
                <filter id="noise-preview">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise-preview)" opacity="0.5" />
              </svg>
            </div>

            {/* Animated particles */}
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${4 + Math.random() * 8}px`,
                    height: `${4 + Math.random() * 8}px`,
                    background: `radial-gradient(circle, ${
                      i % 3 === 0 ? "rgba(168, 85, 247, 0.8)" : 
                      i % 3 === 1 ? "rgba(236, 72, 153, 0.8)" : 
                      "rgba(34, 211, 238, 0.8)"
                    }, transparent)`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `floatParticle ${3 + Math.random() * 4}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                    boxShadow: `0 0 ${10 + Math.random() * 20}px ${
                      i % 3 === 0 ? "rgba(168, 85, 247, 0.6)" : 
                      i % 3 === 1 ? "rgba(236, 72, 153, 0.6)" : 
                      "rgba(34, 211, 238, 0.6)"
                    }`,
                  }}
                />
              ))}
            </div>

            {/* Hexagons */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    width: `${100 + i * 60}px`,
                    height: `${100 + i * 60}px`,
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    animation: `spin ${8 - i * 2}s linear infinite`,
                    animationDirection: i % 2 === 0 ? "normal" : "reverse",
                  }}
                />
              ))}
            </div>

            {/* Logo centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/Nukleo_blanc_RVB.svg"
                alt="Logo"
                className="w-48 h-48 animate-pulse"
                style={{
                  filter:
                    "drop-shadow(0 0 40px rgba(168, 85, 247, 1)) drop-shadow(0 0 80px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 120px rgba(34, 211, 238, 0.6))",
                  animationDuration: "2s",
                }}
              />
            </div>

            {/* Loading text */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white text-2xl font-bold tracking-widest mb-4 animate-pulse">
                LOADING
              </p>
              <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-white/60 text-sm mt-2">{Math.round(progress)}%</p>
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
                    animationDuration: "0.6s",
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
              <p className="text-gray-500 text-sm mt-2">{Math.round(progress)}%</p>
            </div>
          </div>
        );

      case "gradient-spinner":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center flex-col gap-8">
            <div className="relative w-40 h-40">
              <div
                className="absolute inset-0 rounded-full border-8 border-transparent border-t-white animate-spin"
                style={{ animationDuration: "0.8s" }}
              />
              <div
                className="absolute inset-3 rounded-full border-8 border-transparent border-t-white/70 animate-spin"
                style={{ animationDuration: "1.2s", animationDirection: "reverse" }}
              />
              <div
                className="absolute inset-6 rounded-full border-8 border-transparent border-t-white/40 animate-spin"
                style={{ animationDuration: "1.6s" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-3xl font-bold">{Math.round(progress)}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-white text-xl font-semibold mb-3">Chargement en cours</p>
              <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        );

      case "neon-pulse":
        return (
          <div className="absolute inset-0 bg-black flex items-center justify-center flex-col gap-12">
            <div className="relative w-40 h-40">
              {/* Neon rings */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-full border-4 animate-ping"
                  style={{
                    width: `${60 + i * 40}px`,
                    height: `${60 + i * 40}px`,
                    left: `${50 - (30 + i * 20)}px`,
                    top: `${50 - (30 + i * 20)}px`,
                    borderColor: i % 2 === 0 ? "#00ffff" : "#ff00ff",
                    animationDuration: `${1.5 + i * 0.3}s`,
                    animationDelay: `${i * 0.15}s`,
                    boxShadow: `0 0 30px ${i % 2 === 0 ? "#00ffff" : "#ff00ff"}`,
                  }}
                />
              ))}
              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-cyan-500 animate-pulse flex items-center justify-center"
                  style={{
                    boxShadow: "0 0 40px #00ffff",
                    animationDuration: "1s",
                  }}
                >
                  <span className="text-black text-xl font-bold">{Math.round(progress)}%</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-cyan-400 text-xl font-bold mb-3 tracking-wider">LOADING</p>
              <div className="w-72 h-2 bg-gray-800 rounded-full overflow-hidden border border-cyan-500/50">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 transition-all duration-300"
                  style={{ 
                    width: `${progress}%`,
                    boxShadow: "0 0 20px #00ffff",
                  }}
                />
              </div>
            </div>
          </div>
        );

      case "geometric-morph":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center flex-col gap-12">
            <div className="relative w-48 h-48">
              {/* Morphing shapes */}
              <div
                className="absolute inset-0 bg-white/30 animate-spin"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  animationDuration: "3s",
                  boxShadow: "0 0 40px rgba(255, 255, 255, 0.5)",
                }}
              />
              <div
                className="absolute inset-6 bg-white/40 animate-spin"
                style={{
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  animationDuration: "4s",
                  animationDirection: "reverse",
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.4)",
                }}
              />
              <div
                className="absolute inset-12 bg-white/50 rounded-full animate-pulse"
                style={{
                  animationDuration: "2s",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-3xl font-bold drop-shadow-lg">{Math.round(progress)}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-white text-xl font-semibold mb-3">Transformation en cours</p>
              <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 transition-all duration-300"
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
            <p className="text-white/60 text-sm">Type de loader: {loaderType}</p>
          </div>
        );
    }
  };

  return (
    <>
      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.2); }
          50% { transform: translate(-15px, -60px) scale(0.8); }
          75% { transform: translate(30px, -40px) scale(1.1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
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
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Loader name */}
        <div className="absolute top-4 left-4 z-50 text-white">
          <p className="text-sm opacity-60">Prévisualisation</p>
          <p className="text-xl font-bold">{loaderName}</p>
        </div>

        {/* Loader content */}
        <div className="absolute inset-0" style={{ isolation: 'isolate' }}>
          {renderLoader()}
        </div>

        {/* ESC hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-sm">
          Fermeture automatique dans {Math.max(0, Math.ceil((100 - progress) / 25))}s • Cliquez ou ESC pour fermer
        </div>
      </div>
    </>
  );
}
