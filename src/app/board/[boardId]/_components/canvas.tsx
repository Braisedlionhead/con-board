"use client";

import { useRouter } from "next/navigation";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";


interface CanvasProps {
  boardId: string;
}

export const Canvas = ({
  boardId,
}: CanvasProps) => {
  const router = useRouter();

  return (
    <main
      // className="h-full w-full relative bg-neutral-100 touch-none"
      className="h-full w-full bg-neutral-100 touch-none"
    >
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};
