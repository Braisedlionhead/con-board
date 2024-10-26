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

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized-Forbidden", { status: 403 });
    // return new Response("Unauthorized", { status: 401 });
  }

  const userInfo = {
    name: user.firstName,
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
