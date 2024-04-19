import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export const fileTypes = v.union(
  v.literal("mp4"),
  v.literal("mkv")
);



export default defineSchema({
  videos: defineTable({
    description: v.string(),
    id: v.string(),
    type: v.optional(fileTypes),
    userId: v.string(),
    title: v.string(),
    topics: v.optional(v.array(v.string())),
    character: v.string()
  }).index("by_userId", ['userId']),
});







