import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

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
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                    opacity: Math.random() * 0.7 + 0.3,
                  }}
                />
              ))}
            </div>

            {/* Logo centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/Nukleo_blanc_RVB.svg"
                alt="Logo"
                className="w-48 h-48"
                style={{
                  filter:
                    "drop-shadow(0 0 40px rgba(168, 85, 247, 1)) drop-shadow(0 0 80px rgba(236, 72, 153, 0.8)) drop-shadow(0 0 120px rgba(34, 211, 238, 0.6))",
                }}
              />
            </div>

            {/* Loading text */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <p className="text-white text-2xl font-bold tracking-widest animate-pulse">
                LOADING
              </p>
            </div>
          </div>
        );

      case "minimal-dots":
        return (
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-gray-800 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: "0.6s",
                  }}
                />
              ))}
            </div>
          </div>
        );

      case "gradient-spinner":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <div className="relative w-32 h-32">
              <div
                className="absolute inset-0 rounded-full border-8 border-transparent border-t-white animate-spin"
                style={{ animationDuration: "1s" }}
              />
              <div
                className="absolute inset-2 rounded-full border-8 border-transparent border-t-white/60 animate-spin"
                style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
              />
              <div
                className="absolute inset-4 rounded-full border-8 border-transparent border-t-white/30 animate-spin"
                style={{ animationDuration: "2s" }}
              />
            </div>
          </div>
        );

      case "neon-pulse":
        return (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="relative">
              {/* Neon rings */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border-4 animate-ping"
                  style={{
                    width: `${80 + i * 40}px`,
                    height: `${80 + i * 40}px`,
                    left: `${-i * 20}px`,
                    top: `${-i * 20}px`,
                    borderColor: i % 2 === 0 ? "#00ffff" : "#ff00ff",
                    animationDuration: `${2 + i * 0.5}s`,
                    animationDelay: `${i * 0.2}s`,
                    boxShadow: `0 0 20px ${i % 2 === 0 ? "#00ffff" : "#ff00ff"}`,
                  }}
                />
              ))}
              {/* Center logo */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <img
                  src="/Nukleo_blanc_RVB.svg"
                  alt="Logo"
                  className="w-16 h-16"
                  style={{
                    filter: "drop-shadow(0 0 20px #00ffff)",
                  }}
                />
              </div>
            </div>
          </div>
        );

      case "geometric-morph":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
            <div className="relative w-40 h-40">
              {/* Morphing shapes */}
              <div
                className="absolute inset-0 bg-white/20 animate-spin"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  animationDuration: "3s",
                }}
              />
              <div
                className="absolute inset-4 bg-white/30 animate-spin"
                style={{
                  clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                  animationDuration: "4s",
                  animationDirection: "reverse",
                }}
              />
              <div
                className="absolute inset-8 bg-white/40 rounded-full animate-pulse"
                style={{
                  animationDuration: "2s",
                }}
              />
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
      {renderLoader()}

      {/* ESC hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-sm">
        Cliquez n'importe où ou appuyez sur ESC pour fermer
      </div>
    </div>
  );
}
