"use client";

import { useRouter } from "next/navigation";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

// import { useSelf } from "../../../../../liveblocks.config"
import  { useSelf } from "@liveblocks/react/suspense";

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {


  return (
    <main
      // className="h-full w-full relative bg-neutral-100 touch-none"
      className="h-full w-full bg-neutral-100 touch-none"
    >
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  );
};
