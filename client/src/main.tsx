import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";


import { getLoginUrl } from "./const";
import { ThemeProvider } from "./contexts/ThemeContext";
// CSS is loaded async to avoid render blocking - critical CSS is inlined in index.html
// Defer non-critical CSS loading using requestIdleCallback
if (typeof window !== 'undefined') {
  const loadCSS = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/index.css';
    link.media = 'print';
    link.onload = () => { link.media = 'all'; };
    document.head.appendChild(link);
  };
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadCSS, { timeout: 2000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(loadCSS, 100);
  }
} else {
  // SSR fallback - import normally
  import("./index.css");
}

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
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

// Don't show body content immediately - PageLoader will handle it
// This prevents flash of white/colored content before loader appears
const svg = document.getElementById('nukleo-arrow-inline');
if (svg) {
  svg.style.display = 'block';
}
