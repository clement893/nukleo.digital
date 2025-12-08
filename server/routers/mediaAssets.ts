import { router, publicProcedure } from "../_core/trpc";
import { getAllMediaAssets } from "../db";

export const mediaAssetsRouter = router({
  list: publicProcedure.query(async () => {
    return await getAllMediaAssets();
  }),
});
