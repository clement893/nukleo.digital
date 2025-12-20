import { router, publicProcedure } from "../_core/trpc";
import { getAllMediaAssets } from "../db";

export const mediaAssetsRouter = router({
  list: publicProcedure.query(async () => {
    try {
      return await getAllMediaAssets();
    } catch (error) {
      console.error("[MediaAssets] Error fetching media assets:", error);
      return []; // Return empty array on error
    }
  }),
});
