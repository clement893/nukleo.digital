import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function PageLoader() {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [loaderHtml, setLoaderHtml] = useState<string | null>(null);
  const [stylesReady, setStylesReady] = useState(false);

  // Don't show loader in admin area
  const isAdminArea = location.startsWith("/admin");

  // If in admin area, show body immediately and don't fetch loaders
  useEffect(() => {
    if (isAdminArea) {
      setIsLoading(false);
      if (!document.body.classList.contains('loaded')) {
        document.body.classList.add('loaded');
      }
    }
  }, [isAdminArea]);

  // Fetch active loaders (only if not in admin area)
  const { data: activeLoaders, isLoading: isLoadingLoaders } = trpc.loaders.getActive.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
    enabled: !isAdminArea, // Don't fetch if in admin area
  });

  useEffect(() => {
    // Don't show loader in admin area - show body immediately
    if (isAdminArea) {
      setIsLoading(false);
      // Make body visible immediately in admin area
      if (!document.body.classList.contains('loaded')) {
        document.body.classList.add('loaded');
      }
      return;
    }

    // Wait for loaders to be fetched
    if (isLoadingLoaders) return;

    if (!activeLoaders || activeLoaders.length === 0) {
      // No active loaders, show body content immediately
      setIsLoading(false);
      document.body.classList.add('loaded');
      return;
    }

    // Select a random loader from active loaders
    const randomLoader = activeLoaders[Math.floor(Math.random() * activeLoaders.length)];
    
    if (randomLoader && randomLoader.cssCode) {
      // Extract and inject CSS styles FIRST
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

      // Set HTML content immediately
      setLoaderHtml(randomLoader.cssCode);
      setStylesReady(true);

      // Hide loader after a delay (e.g., 2 seconds minimum, or when page is ready)
      const minDisplayTime = 2000;
      const startTime = Date.now();

      const checkReady = () => {
        const elapsed = Date.now() - startTime;
        if (document.readyState === "complete" && elapsed >= minDisplayTime) {
          setIsLoading(false);
          // Show body content when loader is done
          document.body.classList.add('loaded');
        } else {
          setTimeout(checkReady, 100);
        }
      };

      // Start checking after minimum display time
      setTimeout(checkReady, minDisplayTime);
    } else {
      setIsLoading(false);
      document.body.classList.add('loaded');
    }

    return () => {
      const styleElement = document.getElementById("page-loader-styles");
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [activeLoaders, isLoadingLoaders, isAdminArea]);

  // Don't show loader in admin area
  if (isAdminArea) {
    return null;
  }

  // Don't show anything if no loaders are active
  if (!isLoadingLoaders && (!activeLoaders || activeLoaders.length === 0)) {
    return null;
  }

  // Show loader container
  if (!loaderHtml) {
    // Still loading loaders, show black background
    return (
      <div
        className="fixed inset-0 z-[9999]"
        style={{
          backgroundColor: '#000000',
          opacity: 1,
          pointerEvents: "all",
        }}
      />
    );
  }

  const htmlContent = loaderHtml.includes("<style>")
    ? loaderHtml.replace(/<style>[\s\S]*?<\/style>/g, "").trim()
    : loaderHtml;

  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "all" : "none",
        transition: "opacity 0.5s ease-out",
        visibility: isLoading ? "visible" : "hidden",
      }}
    >
      {htmlContent && (
        <div
          key={`page-loader-${loaderHtml.substring(0, 50)}`}
          className="fixed inset-0"
          style={{ 
            zIndex: 9999,
            visibility: "visible",
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
}
