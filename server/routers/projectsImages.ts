import { router, adminProcedure } from "../_core/trpc";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";

const PROJECTS_IMAGES_DIR = path.resolve(process.cwd(), "client", "public", "projects");

// Ensure directory exists
async function ensureProjectsDir() {
  if (!existsSync(PROJECTS_IMAGES_DIR)) {
    await fs.mkdir(PROJECTS_IMAGES_DIR, { recursive: true });
  }
}

export const projectsImagesRouter = router({
  // List all project images
  list: adminProcedure.query(async () => {
    await ensureProjectsDir();
    
    try {
      const files = await fs.readdir(PROJECTS_IMAGES_DIR);
      const imageFiles = files.filter(
        (file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      );
      
      const imagesWithStats = await Promise.all(
        imageFiles.map(async (file) => {
          const filePath = path.join(PROJECTS_IMAGES_DIR, file);
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

