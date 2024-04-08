import { mutation, query } from "./_generated/server";

import { ConvexError, v } from "convex/values"



export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});



export const createVideo = mutation({
  args: {
    storageId: v.id("_storage"),
    title: v.string(),
    userId: v.string(),
    description: v.string()
  },
  handler: async (ctx, args) => {
    // throw new Error('u aint got acces ma dawg');
    const identity = await ctx.auth.getUserIdentity();
    console.log(args)
    if (identity) console.log(identity)
    if (!identity) { throw new ConvexError("you must be logged in") }
    await ctx.db.insert("videos", {
      id: args.storageId,
      userId: args.userId,
      title: args.title,
      description: args.description,

    }).then(res => {
      console.log('success', res)
    });
  },
});



export const listVideos = query({
  args: {
    userId: v.string(),
    query: v.optional(v.string()),

  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    let videos = []
    let isEmpty = false
    // console.log(args)
    if (identity) {
      videos = await ctx.db.query("videos").withIndex("by_userId", (q) => { return q.eq("userId", args.userId) }).collect();
      if (videos.length == 0) isEmpty = true
      // console.log(identity)

    }

    // if (identity == undefined) { throw new ConvexError("you must be logged in") }
    let query = args.query
    if (query?.length > 0) {
      query = query.toString().toLowerCase().trim()
      videos = videos.filter((file) =>
        file.title.toLowerCase().includes(query)
      );
    }


    return Promise.all(
      videos.map(async (vid) => ({
        ...vid,
        // If the message is an "image" its `body` is an `Id<"_storage">`
        ...{ url: await ctx.storage.getUrl(vid.id) }

      })),
    );
  }
}

)


export const deleteVideo = mutation({
  args: {
    vidId: v.id('videos'),
    vidStrgId: v.id('_storage'),

  },

  async handler(ctx, args) {
    // throw new ConvexError("you must be logged in")

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) { throw new ConvexError("you must be logged in") }
    const vid = await ctx.db.get(args.vidId);
    if (!vid) {
      throw new ConvexError("Vid doesnt exist.")

    }



    await ctx.db.delete(args.vidId)
    await ctx.storage.delete(args.vidStrgId)

  }



})


























// export const createVideo = mutation({
//   args: {
//     id: v.string(),
//     userId: v.string(),
//     name: v.string(),
//     description: v.string(),

//   },
//   async handler(ctx, args) {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) { throw new ConvexError("you must be logged in") }
//     await ctx.db.insert("videos", {
//       id: args.id,
//       userId: args.userId,
//       name: args.name,
//       description: args.description,

//     }).then((res) => {
//       console.log("success", res)
//     }
//     )
//   }
// })
