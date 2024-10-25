"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "../../liveblocks.config";

interface RoomProps {
  children: ReactNode;
  roomId: string;
//   fallback: ReactNode; //what i'm seeing is that the fallback is typed as a ReactNode
  fallback: NonNullable<ReactNode> | null;
};

export const Room = ({
  children,
  roomId,
  fallback,
}: RoomProps) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
