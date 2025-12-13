import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import sitemapRouter from "../sitemap";
import { serveStatic, setupVite } from "./vite";
import { initDatabase } from "../init-db";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";
import { logger } from "./logger";
import { initSentry, Sentry } from "./sentry";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import { configureGoogleAuth, requireAdminAuth } from "./googleAuth";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  // Initialize Sentry for error monitoring
  initSentry();
  
  const app = express();
  const server = createServer(app);
  
  // Trust proxy for Railway/production environments
  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }
  
  // Sentry request handler (must be first)
  // Note: Sentry.Handlers is deprecated in newer versions, skip for now
  // if (process.env.SENTRY_DSN) {
  //   app.use(Sentry.Handlers.requestHandler());
  // }
  
  // Compression (gzip/brotli)
  app.use(compression({ level: 9 }));
  
  // Security: Helmet for HTTP headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://fonts.googleapis.com", "https://*.manusvm.computer"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        connectSrc: ["'self'", "https://api.manus.im", "https://*.railway.app", "https://*.manusvm.computer"],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    crossOriginEmbedderPolicy: false, // Allow embedding for OAuth
  }));
  
  // Security: CORS configuration
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://nukleo.digital', 'https://nukleodigital-production.up.railway.app', 'https://www.nukleo.digital']
      : true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  }));
  
  // Security: Rate limiting - General (100 req/15min)
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });
  
  // Security: Rate limiting - Auth (20 req/15min)
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: 'Too many authentication attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Configure cookie parser for admin authentication
  app.use(cookieParser());
  
  // Configure session for Passport with PostgreSQL store
  const PgSession = connectPgSimple(session);
  app.use(session({
    store: new PgSession({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    }),
    secret: process.env.JWT_SECRET || 'nukleo-admin-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax',
    },
  }));
  
  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());
  configureGoogleAuth();
  
  // Google OAuth routes
  app.get('/api/auth/google', authLimiter, passport.authenticate('google', {
    scope: ['profile', 'email'],
  }));
  
  app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/admin/login?error=unauthorized' }),
    (req, res) => {
      // Successful authentication, redirect to admin
      res.redirect('/admin');
    }
  );
  
  // Logout route
  app.post('/api/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.json({ success: true });
    });
  });
  
  // Check auth status
  app.get('/api/auth/me', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  });
  
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Sitemap and robots.txt
  app.use(sitemapRouter);
  // Database initialization endpoint
  app.post("/api/init-db", initDatabase);
  // tRPC API with rate limiting
  app.use("/api/trpc", generalLimiter);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    // Cache static assets aggressively in production
    app.use('/assets', (req, res, next) => {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      next();
    });
    app.use((req, res, next) => {
      // Cache images, fonts, and other static files
      if (req.url.match(/\.(jpg|jpeg|png|gif|webp|svg|woff|woff2|ttf|eot|ico)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      next();
    });
    serveStatic(app);
  }
  
  // Sentry error handler (must be after all routes)
  // Note: Sentry.Handlers is deprecated in newer versions, skip for now
  // if (process.env.SENTRY_DSN) {
  //   app.use(Sentry.Handlers.errorHandler());
  // }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, async () => {
    logger.info(`Server running on http://localhost:${port}/`);
    
    // Seed loaders on startup
    try {
      const { seedLoaders } = await import("../seed-loaders");
      await seedLoaders();
      
      const { seedCreativeLoaders } = await import("../seed-creative-loaders");
      await seedCreativeLoaders();
    } catch (error) {
      logger.error("Failed to seed loaders:", error);
    }
  });
}

startServer().catch(console.error);
