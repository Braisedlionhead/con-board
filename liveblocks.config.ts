import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// 创建 Liveblocks 客户端
const client = createClient({
  publicApiKey:
    "pk_dev_hfr62MMjcSJZDJbTGEiJElbkdszRd3TBylJDimDIYm0Vf1bCniuyvd-YSVw1xq3S",
    
});

// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      // Example, real-time cursor coordinates
      // cursor: { x: number; y: number };
    };

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      // Example, a conflict-free list
      // animals: LiveList<string>;
    };

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: {
        // Example properties, for useSelf, useUser, useOthers, etc.
        // name: string;
        // avatar: string;
      };
    };

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: {};
    // Example has two events, using a union
    // | { type: "PLAY" }
    // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      // Example, attaching coordinates to a thread
      // x: number;
      // y: number;
    };

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {
      // Example, rooms with a title and url
      // title: string;
      // url: string;
    };
  }
}

// 使用新版的 Liveblocks 类型
export const {
  RoomProvider,
  useMyPresence,
  useStorage,
  // 其他 hooks...
} = createRoomContext<
  Liveblocks["Presence"],
  Liveblocks["Storage"],
  Liveblocks["UserMeta"],
  Liveblocks["RoomEvent"],
  Liveblocks["ThreadMetadata"]
>(client);

export {};