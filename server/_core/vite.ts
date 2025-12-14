import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Configure cache headers for different resource types
  // JavaScript and CSS files (with hash in filename) - cache forever
  app.use('/assets/js', express.static(path.join(distPath, 'assets', 'js'), {
    maxAge: '1y',
    immutable: true,
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('Vary', 'Accept-Encoding');
    }
  }));

  app.use('/assets/css', express.static(path.join(distPath, 'assets', 'css'), {
    maxAge: '1y',
    immutable: true,
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('Vary', 'Accept-Encoding');
    }
  }));

  // Fonts - cache forever (WOFF2 files)
  app.use('/fonts', express.static(path.join(distPath, 'fonts'), {
    maxAge: '1y',
    immutable: true,
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('Vary', 'Accept-Encoding');
    }
  }));

  // Images - cache aggressively (WebP, PNG, JPG, SVG)
  app.use('/images', express.static(path.join(distPath, 'images'), {
    maxAge: '1y',
    immutable: false, // Images might be updated
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      // Cache images for 1 year, but allow revalidation
      res.setHeader('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=86400');
      res.setHeader('Vary', 'Accept');
      // Add Content-Type headers for better browser handling
      if (filePath.endsWith('.webp')) {
        res.setHeader('Content-Type', 'image/webp');
      } else if (filePath.endsWith('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml');
      }
    }
  }));

  // Static assets in root (images, favicons, etc.)
  app.use(express.static(distPath, {
    maxAge: '1y',
    immutable: false,
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      
      // JavaScript and CSS with hash - cache forever
      if (filePath.includes('/assets/') && (ext === '.js' || ext === '.css')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.setHeader('Vary', 'Accept-Encoding');
      }
      // Fonts - cache forever
      else if (ext === '.woff2' || ext === '.woff' || ext === '.ttf' || ext === '.otf' || ext === '.eot') {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.setHeader('Vary', 'Accept-Encoding');
      }
      // Images - cache aggressively with revalidation
      else if (ext === '.webp' || ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' || ext === '.svg' || ext === '.ico') {
        res.setHeader('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=86400');
        res.setHeader('Vary', 'Accept');
        // Set proper Content-Type
        if (ext === '.webp') {
          res.setHeader('Content-Type', 'image/webp');
        } else if (ext === '.svg') {
          res.setHeader('Content-Type', 'image/svg+xml');
        } else if (ext === '.ico') {
          res.setHeader('Content-Type', 'image/x-icon');
        }
      }
      // Other static files - moderate caching
      else {
        res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=3600');
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    // Don't cache HTML files - always fetch fresh
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
