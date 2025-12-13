import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [loaderHtml, setLoaderHtml] = useState<string | null>(null);
  const [stylesReady, setStylesReady] = useState(false);

  // Fetch active loaders
  const { data: activeLoaders } = trpc.loaders.getActive.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!activeLoaders || activeLoaders.length === 0) {
      // No active loaders, hide after a short delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }

    // Select a random loader from active loaders
    const randomLoader = activeLoaders[Math.floor(Math.random() * activeLoaders.length)];
    
    if (randomLoader && randomLoader.cssCode) {
      setLoaderHtml(randomLoader.cssCode);

      // Extract and inject CSS styles
      const styleMatch = randomLoader.cssCode.match(/<style>([\s\S]*?)<\/style>/);
      const cssStyles = styleMatch ? styleMatch[1] : "";

      if (cssStyles) {
        const styleId = "page-loader-styles";
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) {
          existingStyle.remove();
        }

        const styleElement = document.createElement("style");
        styleElement.id = styleId;
        styleElement.textContent = cssStyles;
        document.head.appendChild(styleElement);
      }

      // Wait for styles to be applied
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStylesReady(true);
        });
      });

      // Hide loader after a delay (e.g., 2 seconds minimum, or when page is ready)
      const minDisplayTime = 2000;
      const startTime = Date.now();

      const checkReady = () => {
        const elapsed = Date.now() - startTime;
        if (document.readyState === "complete" && elapsed >= minDisplayTime) {
          setIsLoading(false);
        } else {
          setTimeout(checkReady, 100);
        }
      };

      // Start checking after minimum display time
      setTimeout(checkReady, minDisplayTime);
    } else {
      setIsLoading(false);
    }

    return () => {
      const styleElement = document.getElementById("page-loader-styles");
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [activeLoaders]);

  if (!isLoading || !loaderHtml) return null;

  const htmlContent = loaderHtml.includes("<style>")
    ? loaderHtml.replace(/<style>[\s\S]*?<\/style>/g, "").trim()
    : loaderHtml;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black"
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "all" : "none",
        transition: "opacity 0.5s ease-out",
      }}
    >
      {stylesReady && htmlContent && (
        <div
          key={`page-loader-${stylesReady}`}
          className="absolute inset-0"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
}
