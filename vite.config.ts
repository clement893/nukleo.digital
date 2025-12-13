import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";


const plugins = [react(), tailwindcss(), jsxLocPlugin()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssCodeSplit: true,
    cssMinify: true,
    assetsInlineLimit: 4096,
    reportCompressedSize: false,
    rollupOptions: {
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        manualChunks: (id) => {
          // Vendor chunks - ultra-granular splitting for better caching and smaller initial bundle
          if (id.includes('node_modules')) {
            // React core - split into smaller chunks (critical, load first)
            if (id.includes('react/') && !id.includes('react-dom')) {
              return 'react-core';
            }
            // React DOM - large, split separately
            if (id.includes('react-dom')) {
              // Split react-dom further if possible
              if (id.includes('react-dom/client')) {
                return 'react-dom-client';
              }
              return 'react-dom';
            }
            // Scheduler - separate chunk
            if (id.includes('scheduler')) {
              return 'react-scheduler';
            }
            // Icons - split by usage (lazy load)
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            // Charts - heavy library, separate (lazy load)
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'charts-vendor';
            }
            // tRPC and React Query - split for better caching
            if (id.includes('@trpc')) {
              return 'trpc-vendor';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'react-query-vendor';
            }
            // Animation libraries - lazy load
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            // Router - small, can be in main bundle
            if (id.includes('wouter')) {
              return 'router-vendor';
            }
            // Markdown rendering (used in LEO) - lazy load
            if (id.includes('streamdown') || id.includes('react-markdown')) {
              return 'markdown-vendor';
            }
            // UI components (Radix, etc.) - lazy load
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            // Other node_modules go to vendor chunk
            return 'vendor';
          }
          // Split by page for better lazy loading
          if (id.includes('/pages/admin/')) {
            return 'admin';
          }
          if (id.includes('/pages/services/')) {
            return 'services';
          }
          if (id.includes('/components/radar/')) {
            return 'radar';
          }
          if (id.includes('/components/glossary/')) {
            return 'glossary';
          }
          // LEO components - large, lazy load
          if (id.includes('/components/UniversalLEO') || id.includes('/components/Leo') || id.includes('/pages/Leo')) {
            return 'leo';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
