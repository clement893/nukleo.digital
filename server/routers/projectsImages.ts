import { router, adminProcedure, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";

const PROJECTS_IMAGES_DIR = path.resolve(process.cwd(), "client", "public", "projects");
const DIST_PROJECTS_IMAGES_DIR = path.resolve(process.cwd(), "dist", "public", "projects");

// Ensure directory exists
async function ensureProjectsDir() {
  if (!existsSync(PROJECTS_IMAGES_DIR)) {
    await fs.mkdir(PROJECTS_IMAGES_DIR, { recursive: true });
  }
  // Also ensure dist directory in production
  if (process.env.NODE_ENV === "production" && !existsSync(DIST_PROJECTS_IMAGES_DIR)) {
    await fs.mkdir(DIST_PROJECTS_IMAGES_DIR, { recursive: true });
  }
}

// Helper function to list images (shared between public and admin)
async function listImages() {
  await ensureProjectsDir();
  
  try {
    // Get files from both directories and merge them
    const filesSet = new Set<string>();
    
    // Read from upload directory
    if (existsSync(PROJECTS_IMAGES_DIR)) {
      try {
        const files = await fs.readdir(PROJECTS_IMAGES_DIR);
        files.forEach(file => filesSet.add(file));
      } catch (error) {
        console.error("[ProjectsImages] Error reading upload directory:", error);
      }
    }
    
    // In production, also read from dist directory
    if (process.env.NODE_ENV === "production" && existsSync(DIST_PROJECTS_IMAGES_DIR)) {
      try {
        const distFiles = await fs.readdir(DIST_PROJECTS_IMAGES_DIR);
        distFiles.forEach(file => filesSet.add(file));
      } catch (error) {
        console.error("[ProjectsImages] Error reading dist directory:", error);
      }
    }
    
    const imageFiles = Array.from(filesSet).filter(
      (file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    
    const imagesWithStats = await Promise.all(
      imageFiles.map(async (file) => {
        // Try upload directory first, then dist
        let filePath = path.join(PROJECTS_IMAGES_DIR, file);
        if (!existsSync(filePath) && process.env.NODE_ENV === "production") {
          filePath = path.join(DIST_PROJECTS_IMAGES_DIR, file);
        }
        
        const stats = await fs.stat(filePath);
        return {
          name: file,
          size: stats.size,
          modified: stats.mtime,
          url: `/projects/${file}`,
        };
      })
    );
    
    return imagesWithStats.sort((a, b) => 
      b.modified.getTime() - a.modified.getTime()
    );
  } catch (error) {
    console.error("[ProjectsImages] Error listing images:", error);
    return [];
  }
}

export const projectsImagesRouter = router({
  // List all project images (public - for the projects page)
  list: publicProcedure.query(async () => {
    return await listImages();
  }),
  
  // List all project images (admin - same as public but requires auth)
  listAdmin: adminProcedure.query(async () => {
    return await listImages();
  }),

  // Delete an image
  delete: adminProcedure
    .input(z.object({ filename: z.string() }))
    .mutation(async ({ input }) => {
      await ensureProjectsDir();
      
      const filePath = path.join(PROJECTS_IMAGES_DIR, input.filename);
      
      // Security: ensure the file is within the projects directory
      const resolvedPath = path.resolve(filePath);
      const resolvedDir = path.resolve(PROJECTS_IMAGES_DIR);
      
      if (!resolvedPath.startsWith(resolvedDir)) {
        throw new Error("Invalid file path");
      }
      
      try {
        await fs.unlink(filePath);
        return { success: true };
      } catch (error) {
        console.error("[ProjectsImages] Error deleting image:", error);
        throw new Error("Failed to delete image");
      }
    }),

  // Get upload URL (for client-side upload)
  getUploadUrl: adminProcedure.query(() => {
    return {
      url: "/api/admin/projects-images/upload",
    };
  }),
});

