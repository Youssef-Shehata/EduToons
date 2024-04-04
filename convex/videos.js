import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values"



export const createVideo = mutation({
  args: {
    id: v.string(),
    userId: v.string(),

    name: v.string(),
    description: v.string(),

  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) { throw new ConvexError("you must be logged in") }
    await ctx.db.insert("videos", {
      id: args.id,
      userId: args.userId,
      name: args.name,
      description: args.description,

    }).then((res) => {
      console.log("success", res)
    }
    )
  }
})



export const listVideos = query({
  args: {
    userId: v.string(),
    query: v.optional(v.string()),

  },
  async handler(ctx, args) {
    // const identity = await ctx.auth.getUserIdentity();
    // if (!identity) { throw new ConvexError("you must be logged in") }
    let videos = await ctx.db.query("videos").withIndex("by_userId", (q) => { return q.eq("userId", args.userId) }).collect();
    // if (query) {
    //   query = query.toString().toLowerCase()
    //   videos = videos.filter((file) =>
    //     file.name.toLowerCase().includes(query)
    //   );
    // }
    return videos;
  }
}

)
