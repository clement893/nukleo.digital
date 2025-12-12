import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  if (!isOpen) return null;

  const renderLoader = () => {
    switch (loaderType) {
      case "current":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-cyan-900">
            {/* Grain texture */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
              <svg width="100%" height="100%">
                <filter id="noise">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5" />
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

      case "kaleidoscope":
        return (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="relative w-96 h-96">
              {/* Kaleidoscope triangles */}
              {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
                <div
                  key={i}
                  className="absolute inset-0 animate-spin"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    animationDuration: "4s",
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  <div
                    className="absolute top-0 left-1/2 w-0 h-0 -translate-x-1/2"
                    style={{
                      borderLeft: "100px solid transparent",
                      borderRight: "100px solid transparent",
                      borderBottom: `200px solid hsl(${rotation}, 80%, 60%)`,
                      opacity: 0.7,
                    }}
                  />
                </div>
              ))}
              {/* Logo centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/Nukleo_blanc_RVB.svg" alt="Logo" className="w-32 h-32" />
              </div>
            </div>
          </div>
        );

      case "liquid":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500">
            {/* Liquid blobs */}
            <div className="absolute inset-0">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-full blur-3xl animate-pulse"
                  style={{
                    width: `${200 + i * 60}px`,
                    height: `${200 + i * 60}px`,
                    background: `radial-gradient(circle, ${
                      i % 3 === 0
                        ? "rgba(168, 85, 247, 0.6)"
                        : i % 3 === 1
                        ? "rgba(236, 72, 153, 0.6)"
                        : "rgba(34, 211, 238, 0.6)"
                    }, transparent)`,
                    left: `${10 + i * 20}%`,
                    top: `${10 + i * 15}%`,
                    animationDuration: `${3 + i}s`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/Nukleo_blanc_RVB.svg" alt="Logo" className="w-40 h-40 relative z-10" />
            </div>
          </div>
        );

      case "matrix":
        return (
          <div className="absolute inset-0 bg-black">
            {/* Matrix rain effect */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 text-green-500 text-sm font-mono opacity-70 animate-pulse whitespace-pre"
                  style={{
                    left: `${i * 2.5}%`,
                    animationDuration: `${1 + Math.random()}s`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  {Array.from({ length: 20 }, () =>
                    Math.random().toString(36).substring(2, 3)
                  ).join("\n")}
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/Nukleo_blanc_RVB.svg"
                alt="Logo"
                className="w-40 h-40 relative z-10"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(34, 211, 238, 1))",
                }}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <p className="text-white text-xl">Preview non disponible</p>
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
