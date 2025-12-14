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

createRoot(rootElement).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" switchable={false}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </trpc.Provider>
);

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
}
