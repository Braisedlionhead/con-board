import { v } from "convex/values";

import { mutation } from "./_generated/server";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized!");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    console.log(identity, "ORGINAL IDENTITY");
    console.log(identity.name, "NAME");
    console.log(randomImage, "TEST");

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!, // the test case may forget to set the username
      imageUrl: randomImage,
    });
    return board;
  },
});

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity;

    if (!identity) {
      throw new Error("Unauthorized!");
    }

    // TODO: Later check to delete favorite relations as well.

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized!");
    }

    const title = args.title.trim();

    if (!title) {
      throw new Error("Title is required!");
    }

    if (title.length > 60) {
      throw new Error("Title cannot be longer than 60 characters!");
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

// actually, it add a board to the user's favorite list
export const favorite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized!");
    }

    /**
     * we're only fetching one so we can just use get instead of query
     * because we established the id is of the boards schema, we can just simply pass args.id
     */
    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found!");
    }

    const userId = identity.subject;


    //
    console.log(userId,"USER ID");

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", board._id).eq("orgId", args.orgId)
      )
      .unique();

    // if the user has already favorited the board, we should throw an error??(maybe a notification is better)
    if (existingFavorite) {
      throw new Error("Board already favorited!");
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    // actually, the return value is not necessary
    return board;
  },
});

export const unfavorite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized!");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found!");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      // technically since board can only exist inside of a specific organization. so maybe we don't need to check the orgId
      // TODO: check if orgId needed
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Favorite board not found!");
    }

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});
