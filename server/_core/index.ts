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
import { getDb } from "../db";
import postgres from "postgres";

/**
 * Vérifie si un port est disponible pour l'écoute.
 * 
 * @param port - Le numéro de port à vérifier
 * @returns Promise qui se résout à true si le port est disponible, false sinon
 */
function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

/**
 * Trouve un port disponible en commençant par le port de départ.
 * 
 * @param startPort - Le port de départ (défaut: 3000)
 * @returns Promise qui se résout au numéro de port disponible
 * @throws Error si aucun port disponible n'est trouvé dans la plage (20 ports)
 * 
 * @example
 * const port = await findAvailablePort(3000); // Cherche un port disponible à partir de 3000
 */
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
  // Track requests and user context
  if (process.env.SENTRY_DSN) {
    app.use((req, res, next) => {
      Sentry.setUser({
        ip_address: req.ip,
      });
      Sentry.setContext('request', {
        method: req.method,
        url: req.url,
        headers: {
          'user-agent': req.get('user-agent'),
        },
      });
      next();
    });
  }
  
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
  const googleAuthConfigured = configureGoogleAuth();
  
  // Google OAuth routes - only register if Google Auth is configured
  if (googleAuthConfigured) {
    app.get('/api/auth/google', authLimiter, (req, res, next) => {
      console.log(`[Google Auth] OAuth request initiated from: ${req.get('referer') || 'unknown'}`);
      passport.authenticate('google', {
        scope: ['profile', 'email'],
      })(req, res, next);
    });
    
    app.get('/api/auth/google/callback',
      (req, res, next) => {
        console.log(`[Google Auth] Callback received with code: ${req.query.code ? 'present' : 'missing'}`);
        console.log(`[Google Auth] Callback error: ${req.query.error || 'none'}`);
        passport.authenticate('google', { 
          failureRedirect: '/admin/login?error=unauthorized',
          failureFlash: false,
        }, (err, user, info) => {
          if (err) {
            console.error('[Google Auth] Authentication error:', err);
            return res.redirect(`/admin/login?error=${encodeURIComponent(err.message || 'authentication_failed')}`);
          }
          if (!user) {
            console.error('[Google Auth] Authentication failed:', info);
            return res.redirect(`/admin/login?error=${encodeURIComponent(info?.message || 'unauthorized')}`);
          }
          req.logIn(user, (loginErr) => {
            if (loginErr) {
              console.error('[Google Auth] Login error:', loginErr);
              return res.redirect(`/admin/login?error=${encodeURIComponent(loginErr.message || 'login_failed')}`);
            }
            console.log(`[Google Auth] User logged in successfully: ${user.email}`);
            return res.redirect('/admin');
          });
        })(req, res, next);
      }
    );
  } else {
    // Return helpful error if Google Auth is not configured
    app.get('/api/auth/google', (req, res) => {
      res.status(503).json({ 
        error: 'Google OAuth is not configured',
        message: 'Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables'
      });
    });
    
    app.get('/api/auth/google/callback', (req, res) => {
      res.status(503).json({ 
        error: 'Google OAuth is not configured',
        message: 'Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables'
      });
    });
  }
  
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
  
  // development mode uses Vite, production mode uses static files
  // IMPORTANT: serveStatic must be BEFORE API routes to ensure assets are served correctly
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    // serveStatic now handles all cache headers internally
    serveStatic(app);
  }
  
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Sitemap and robots.txt
  app.use(sitemapRouter);
  // Database initialization endpoint
  app.post("/api/init-db", initDatabase);
  
  // Temporary endpoint to enable projects page (can be removed after use)
  app.post("/api/enable-projects", async (req, res) => {
    try {
      const { enableProjectsPage } = await import("../enable-projects-page");
      await enableProjectsPage();
      res.json({ success: true, message: "Projects pages enabled successfully" });
    } catch (error: any) {
      console.error("[API] Error enabling projects pages:", error);
      res.status(500).json({ error: error.message || "Failed to enable projects pages" });
    }
  });
  // Redirect /en to home page
  app.get("/en", (req, res) => {
    res.redirect(301, "/");
  });
  app.get("/en/", (req, res) => {
    res.redirect(301, "/");
  });
  
  // Sentry error handler (must be after all routes)
  // Capture unhandled errors and send to Sentry
  if (process.env.SENTRY_DSN) {
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      Sentry.captureException(err);
      next(err);
    });
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, async () => {
    logger.info(`Server running on http://localhost:${port}/`);
    
    // Initialize database tables on startup
    if (process.env.DATABASE_URL) {
      try {
        console.log("[Server] Initializing database tables...");
        const mockReq = {
          body: {},
        } as any;
        const mockRes = {
          status: (code: number) => ({
            json: (data: any) => {
              if (code === 200) {
                console.log("[Server] ✅ Database tables initialized successfully");
              } else {
                console.error("[Server] ⚠️ Database initialization failed:", data);
              }
            },
          }),
          json: (data: any) => {
            console.log("[Server] ✅ Database tables initialized successfully");
          },
        } as any;
        await initDatabase(mockReq, mockRes);
      } catch (error) {
        console.error("[Server] ⚠️ Failed to initialize database:", error);
      }
    }
    
    // Seed loaders on startup
    try {
      const { seedLoaders } = await import("../seed-loaders");
      await seedLoaders();
      
      const { seedCreativeLoaders } = await import("../seed-creative-loaders");
      await seedCreativeLoaders();
      
      const { seedCrazyLoaders } = await import("../seed-crazy-loaders");
      await seedCrazyLoaders();
      
      // Initialize radar tables if they don't exist
      try {
        if (process.env.DATABASE_URL) {
          const client = postgres(process.env.DATABASE_URL);
          
          // Check if radar_technologies table exists
          const tableCheck = await client`
            SELECT EXISTS (
              SELECT FROM information_schema.tables 
              WHERE table_schema = 'public' 
              AND table_name = 'radar_technologies'
            ) as exists;
          `;
          
          const tableExists = Array.isArray(tableCheck) && tableCheck.length > 0 && tableCheck[0]?.exists;
          if (!tableExists) {
            logger.info("Radar tables not found, creating them...");
            
            // Create tables using raw SQL
            await client.unsafe(`
              CREATE TABLE IF NOT EXISTS radar_technologies (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                slug VARCHAR(255) NOT NULL UNIQUE,
                description TEXT NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
              );
            `);
            
            await client.unsafe(`
              CREATE TABLE IF NOT EXISTS radar_positions (
                id SERIAL PRIMARY KEY,
                "technologyId" INTEGER NOT NULL REFERENCES radar_technologies(id) ON DELETE CASCADE,
                date TIMESTAMP NOT NULL,
                "maturityScore" INTEGER NOT NULL CHECK ("maturityScore" >= 0 AND "maturityScore" <= 100),
                "impactScore" INTEGER NOT NULL CHECK ("impactScore" >= 0 AND "impactScore" <= 100),
                definition TEXT NOT NULL,
                "useCases" TEXT NOT NULL,
                "maturityLevel" VARCHAR(50) NOT NULL,
                "maturityJustification" TEXT NOT NULL,
                "impactBusiness" TEXT NOT NULL,
                "adoptionBarriers" TEXT NOT NULL,
                recommendations TEXT NOT NULL,
                "aiGeneratedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
              );
            `);
            
            await client.unsafe(`
              CREATE INDEX IF NOT EXISTS idx_radar_positions_technology_date 
              ON radar_positions("technologyId", date DESC);
            `);
            
            // Create ai_news_subscribers table
            await client.unsafe(`
              CREATE TABLE IF NOT EXISTS ai_news_subscribers (
                id SERIAL PRIMARY KEY,
                email VARCHAR(320) NOT NULL UNIQUE,
                source VARCHAR(100) DEFAULT 'ai-trend-radar' NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
              );
            `);
            
            await client.end();
            logger.info("Radar tables created successfully");
          } else {
            await client.end();
          }
        }
      } catch (error) {
        logger.error("Failed to initialize radar tables:", error);
      }
      
      // Seed radar technologies
      try {
        const { seedRadarTechnologies } = await import("../routers/radar");
        await seedRadarTechnologies();
      } catch (error) {
        logger.error("Failed to seed radar technologies:", error);
      }
    } catch (error) {
      logger.error("Failed to seed loaders:", error);
    }
    
    // Setup daily radar refresh cron job
    setupRadarDailyRefresh();
  });
}

// Setup daily refresh for radar (runs at 2 AM UTC daily)
function setupRadarDailyRefresh() {
  const refreshRadar = async () => {
    try {
      const { appRouter } = await import("../routers");
      const { createContext } = await import("./context");
      const mockReq = { headers: {}, cookies: {} } as any;
      const mockRes = { setHeader: () => {}, cookie: () => {} } as any;
      const context = await createContext({ req: mockReq, res: mockRes });
      const caller = appRouter.createCaller(context);
      await caller.radar.refreshDaily();
      logger.info("Radar daily refresh completed successfully");
    } catch (error) {
      logger.error("Radar daily refresh failed:", error);
    }
  };
  
  // Calculate milliseconds until next 2 AM UTC
  const now = new Date();
  const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  const nextRefresh = new Date(utcNow);
  nextRefresh.setUTCHours(2, 0, 0, 0);
  if (nextRefresh <= utcNow) {
    nextRefresh.setUTCDate(nextRefresh.getUTCDate() + 1);
  }
  
  const msUntilRefresh = nextRefresh.getTime() - utcNow.getTime();
  
  // Schedule first refresh
  setTimeout(() => {
    refreshRadar();
    // Then refresh every 24 hours
    setInterval(refreshRadar, 24 * 60 * 60 * 1000);
  }, msUntilRefresh);
  
  logger.info(`Radar daily refresh scheduled for ${nextRefresh.toISOString()}`);
}

startServer().catch(console.error);
