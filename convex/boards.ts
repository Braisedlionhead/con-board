import { v } from "convex/values";

import { query } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    // add await here or the identity.subject inside the boardsWithFavoriteRelation function will get some errors
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized!");
    }

    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

    const boardsWithFavoriteRelation = boards.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((favorite) => {
          return {
            ...board,
            isFavorite: !!favorite,
          };
        });
    });

    const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation);
    return boardsWithFavoriteBoolean;
  },
});
