import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export const fileTypes = v.union(
  v.literal("mp4"),
  v.literal("png")
);
export default defineSchema({
  videos: defineTable({
    description: v.string(),
    id: v.id("_storage"),
    type: fileTypes,
    userId: v.string(),
    name: v.string(),
  }).index("by_userId", ['userId']),
});