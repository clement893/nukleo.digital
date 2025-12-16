import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";


import { getLoginUrl } from "./const";
import { ThemeProvider } from "./contexts/ThemeContext";
// CSS is loaded normally - Vite handles optimization and code splitting
// Critical CSS is inlined in index.html to prevent render blocking
// Non-critical CSS (admin) is split into separate chunks
// Note: Vite will extract CSS into separate files and optimize loading
import "./index.css";

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

// Optimize error handling - only log in development
const isDev = process.env.NODE_ENV === 'development';

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    if (isDev) console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    if (isDev) console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Render immediately - optimize for LCP
// Fragment long tasks by yielding to browser between renders
const root = createRoot(rootElement, {
  // Use concurrent features to allow browser to yield
  // This helps fragment long tasks into smaller chunks
  unstable_transitionCallbacks: undefined,
});

// Render with automatic yielding - React 18+ handles this automatically
// The concurrent root allows React to yield to browser during rendering
root.render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" switchable={false}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </trpc.Provider>
);

// Global error handler for chunk loading failures
// This catches any chunk loading errors that might not be handled by lazyWithRetry
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    const error = event.error || event.message;
    const isChunkError = 
      error instanceof TypeError &&
      (error.message?.includes('Failed to fetch dynamically imported module') ||
       error.message?.includes('Loading chunk') ||
       error.message?.includes('Loading CSS chunk') ||
       event.message?.includes('Failed to fetch dynamically imported module') ||
       event.message?.includes('Loading chunk') ||
       event.message?.includes('Loading CSS chunk'));
    
    if (isChunkError) {
      console.warn('[Global Error Handler] Chunk loading failed, reloading page...', error || event.message);
      event.preventDefault(); // Prevent default error handling
      
      // Reload the page to get the latest HTML/chunks
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }, true); // Use capture phase to catch errors early
}

// Optimize LCP - show inline SVG immediately if present
// Use requestIdleCallback to avoid blocking initial render
if (typeof window !== 'undefined') {
  const showInlineSVG = () => {
    const svg = document.getElementById('nukleo-arrow-inline');
    if (svg) {
      svg.style.display = 'block';
    }
  };
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(showInlineSVG, { timeout: 500 });
  } else {
    setTimeout(showInlineSVG, 0);
  }
  
  // Load non-critical fonts lazily after initial render
  // Use a more reliable method that doesn't block rendering
  const loadNonCriticalFonts = () => {
    // Only load if fonts-lazy.css exists and hasn't been loaded
    if (document.querySelector('link[href="/fonts-lazy.css"]')) return;
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/fonts-lazy.css';
    link.media = 'print';
    link.onload = () => { 
      if (link.media === 'print') {
        link.media = 'all';
      }
    };
    link.onerror = () => {
      // Silently fail if fonts-lazy.css doesn't exist
      console.warn('fonts-lazy.css failed to load');
    };
    document.head.appendChild(link);
  };
  
  // Load after a longer delay to ensure it doesn't interfere with LCP
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadNonCriticalFonts, { timeout: 3000 });
  } else {
    setTimeout(loadNonCriticalFonts, 3000);
  }
}
