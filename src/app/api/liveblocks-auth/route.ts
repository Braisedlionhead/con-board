import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
  // `${process.env.NEXT_PUBLIC_CONVEX_URL}`,
);

// backend??
const liveblocks = new Liveblocks({
  // secret: process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY ?? "",
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  const authorization = await auth();
  // const authorization = await auth().getToken();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });

  console.log("AUTH_INFO", {
    room,
    board,
    boardOrgId: board?.orgId,
    userOrgId: authorization.orgId,
  });

  /**
   * there're some issues with the authorization here
   * when the uer switch to another organization the authorization.orgId will not match the board.orgId even if the user is the owner of the board 
   * 
   * e.g. the user is the owner of A and B, when the user switches to B and tries to access a board in A, the board.orgId which is A will not match the authorization.orgId which is B
   */
  if (board?.orgId !== authorization.orgId) {
    // return new Response("Unauthorized-Forbidden", { status: 403 });
    return new Response("Unauthorized", { status: 401 });
  }

  const userInfo = {
    name: user.firstName??"uuuuuuuuuu",
    picture: user.imageUrl,
  };

  console.log({ userInfo });

  const session = liveblocks.prepareSession(
    user.id,
    { userInfo } // the original statement here was { userInfo }
  );

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  // const { body, status } = await session.authorize();

  console.log({ status, body }, "ALLOWED");
  return new Response(body, { status });
}
