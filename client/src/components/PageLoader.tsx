import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

// Preload critical resources during loader display
function preloadResources() {
  // Preload critical images
  const criticalImages = [
    '/Nukleo_blanc_RVB.svg',
    '/leo-avatar.webp',
    '/nukleo-arrow.svg',
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Preload critical fonts if not already loaded
  const fonts = [
    '/fonts/AktivGrotesk-Regular.woff2',
    '/fonts/AktivGrotesk-Medium.woff2',
    '/fonts/AktivGrotesk-Bold.woff2',
  ];
  
  fonts.forEach(font => {
    if (!document.querySelector(`link[href="${font}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = font;
      document.head.appendChild(link);
    }
  });
}

export default function PageLoader() {
  const [location] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [loaderHtml, setLoaderHtml] = useState<string | null>(null);
  const [stylesReady, setStylesReady] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const prevLocationRef = useRef(location);

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

  // Preload resources as soon as component mounts
  useEffect(() => {
    if (!isAdminArea) {
      preloadResources();
    }
  }, [isAdminArea]);

  useEffect(() => {
    // Check if this is a page transition (not first load)
    const locationChanged = prevLocationRef.current !== location;
    const isPageTransition = locationChanged && !isFirstLoad;
    
    // Update previous location ref
    if (locationChanged) {
      prevLocationRef.current = location;
    }

    // Don't show loader in admin area - show body immediately
    if (isAdminArea) {
      setIsLoading(false);
      setIsFirstLoad(false);
      // Make body visible immediately in admin area
      if (!document.body.classList.contains('loaded')) {
        document.body.classList.add('loaded');
      }
      return;
    }

    // For page transitions (not first load), skip the loader and show content immediately
    if (isPageTransition) {
      setIsLoading(false);
      setLoaderHtml(null); // Clear loader HTML on transitions
      document.body.classList.add('loaded');
      return;
    }

    // Wait for loaders to be fetched (only on first load)
    if (isLoadingLoaders) return;

    if (!activeLoaders || activeLoaders.length === 0) {
      // No active loaders, show body content immediately
      setIsLoading(false);
      setIsFirstLoad(false);
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
        // Add CSS to fix logo in center and prevent it from moving - only applies within loader container
        styleElement.textContent = cssStyles + `
          /* Fix logo in center for all loaders - scoped to loader container */
          [data-page-loader] img[src*="Nukleo"], 
          [data-page-loader] img[src*="nukleo"], 
          [data-page-loader] img[src*="logo"], 
          [data-page-loader] img[alt*="Nukleo"], 
          [data-page-loader] img[alt*="nukleo"], 
          [data-page-loader] img[alt*="Logo"],
          [data-page-loader] svg[viewBox*="1451"], 
          [data-page-loader] svg[viewBox*="1781"], 
          [data-page-loader] svg[class*="logo"], 
          [data-page-loader] svg[id*="logo"],
          [data-page-loader] .logo, 
          [data-page-loader] [class*="logo"], 
          [data-page-loader] [id*="logo"], 
          [data-page-loader] [class*="Logo"], 
          [data-page-loader] [id*="Logo"],
          [data-page-loader] object[data*="nukleo"], 
          [data-page-loader] object[data*="logo"],
          [data-page-loader] embed[src*="nukleo"], 
          [data-page-loader] embed[src*="logo"] {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 10001 !important;
            pointer-events: none !important;
            will-change: auto !important;
            animation: none !important;
            transition: none !important;
            margin: 0 !important;
          }
        `;
        document.head.appendChild(styleElement);
      }

      // Set HTML content immediately
      setLoaderHtml(randomLoader.cssCode);
      setStylesReady(true);

      // Preload content while loader is showing
      // Use the loader time to prepare the page content
      const minDisplayTime = 2000;
      const startTime = Date.now();

      // Preload critical resources during loader display
      const preloadPageContent = async () => {
        // Ensure fonts are loaded
        await document.fonts.ready;
        
        // Preload critical components for home page (non-blocking)
        // Normalize path to handle language prefixes
        const normalizedPath = location.replace(/^\/(fr|en)/, '') || '/';
        if (normalizedPath === '/') {
          // Preload Home component in background
          import('../pages/Home').catch(() => {
            // Silently fail - component will load normally if preload fails
          });
        }
      };

      // Start preloading immediately (non-blocking)
      preloadPageContent();

      const checkReady = () => {
        const elapsed = Date.now() - startTime;
        // Wait for minimum time AND page to be ready
        // Hero will be visible immediately when loader disappears
        const isReady = document.readyState === "complete" && elapsed >= minDisplayTime;
        
        if (isReady) {
          setIsLoading(false);
          setIsFirstLoad(false);
          // Show body content immediately - hero should be visible without animations
          document.body.classList.add('loaded');
          // Clear loader HTML to ensure logo disappears
          setLoaderHtml(null);
          // Remove loader styles immediately
          const styleElement = document.getElementById("page-loader-styles");
          if (styleElement) {
            styleElement.remove();
          }
        } else {
          setTimeout(checkReady, 50);
        }
      };

      // Start checking after minimum display time
      setTimeout(checkReady, minDisplayTime);
    } else {
      setIsLoading(false);
      setIsFirstLoad(false);
      document.body.classList.add('loaded');
    }

    return () => {
      // Cleanup: remove styles and ensure loader is hidden
      const styleElement = document.getElementById("page-loader-styles");
      if (styleElement) {
        styleElement.remove();
      }
      // Remove any remaining loader elements from DOM
      document.querySelectorAll('[data-page-loader]').forEach(el => {
        if (el instanceof HTMLElement && el.style.zIndex === '10001') {
          el.remove();
        }
      });
      // Ensure loader is hidden when component unmounts or location changes
      setIsLoading(false);
      setLoaderHtml(null);
    };
  }, [activeLoaders, isLoadingLoaders, isAdminArea, location, isFirstLoad]);

  // Don't show loader in admin area
  if (isAdminArea) {
    return null;
  }

  // Don't show loader if not loading (e.g., during page transitions)
  if (!isLoading) {
    return null;
  }

  // Don't show anything if no loaders are active
  if (!isLoadingLoaders && (!activeLoaders || activeLoaders.length === 0)) {
    return null;
  }

  // Show loader container
  if (!loaderHtml) {
    // Still loading loaders, show black background matching pages
    return (
      <div
        className="fixed inset-0 z-[9999]"
        style={{
          backgroundColor: '#0a0a0a',
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
      data-page-loader
      className="fixed inset-0 z-[9999]"
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "all" : "none",
        transition: isLoading ? "opacity 0.3s ease-out" : "opacity 0.1s ease-in",
        visibility: isLoading ? "visible" : "hidden",
      }}
    >
      {/* Logo blanc fixe au centre - seulement visible quand isLoading est true */}
      {isLoading && (
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] pointer-events-none"
          style={{
            width: '300px',
            height: 'auto',
            opacity: isLoading ? 1 : 0,
            transition: 'opacity 0.2s ease-out',
          }}
        >
          <img 
            src="/Nukleo_blanc_RVB.svg" 
            alt="Nukleo Digital - AI Transformation Agency" 
            width="300"
            height="75"
            fetchPriority="high"
            loading="eager"
            className="w-full h-auto"
          />
        </div>
      )}
      
      {htmlContent && isLoading && (
        <div
          data-page-loader
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
