import { useEffect, useState } from "react";

interface LoaderPreviewProps {
  cssCode: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function LoaderPreview({
  cssCode,
  isOpen,
  onClose,
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 px-4 py-2 rounded"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
