import { describe, it, expect } from "vitest";
import { getAllLoaders } from "./loaders";

describe("Loaders API", () => {
  it("should return loaders from database", async () => {
    const loaders = await getAllLoaders();
    
    console.log("Loaders returned:", JSON.stringify(loaders, null, 2));
    
    expect(loaders).toBeDefined();
    expect(Array.isArray(loaders)).toBe(true);
    
    if (loaders.length > 0) {
      const firstLoader = loaders[0];
      expect(firstLoader).toHaveProperty("id");
      expect(firstLoader).toHaveProperty("name");
      expect(firstLoader).toHaveProperty("cssCode");
      expect(firstLoader).toHaveProperty("isActive");
      expect(firstLoader).toHaveProperty("displayOrder");
    }
  });
});
