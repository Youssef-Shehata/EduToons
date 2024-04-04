import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values"



export const createVideo = mutation({
  args: {
    id: v.string(),
    name: v.string(),
    description: v.string(),

  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) { throw new ConvexError("you must be logged in") }
    await ctx.db.insert("videos", {
      id: args.id,
      name: args.name,
      description: args.description,

    }).then((res) => {
      console.log("success", res)
    }
    )
  }
})



export const listVideos = mutation({
  args: {},
  async handler() {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) { throw new ConvexError("you must be logged in") }

    return ctx.db.query("videos").collect();
  }
})
