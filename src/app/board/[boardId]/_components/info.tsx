"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { api } from "../../../../../convex/_generated/api";
import { Actions } from "@/components/actions";
import { Button } from "@/components/ui/button";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useRenameModal } from "@/store/use-rename-modal";

interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5"></div>;
};

export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go To Boards" side="bottom" sideOffset={10}>
        <Button asChild className="px-2" variant="board">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Board logo"
              width={40}
              height={40}
              // className="mr-2"
            />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant="board"
          className="text-base font-normal px-2"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions 
        id={data._id}
        title={data.title}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
              <Button size="icon" variant="board">
                <Menu />
              </Button>
          </Hint>
        </div>

      </Actions>
    </div>
  );
};

// Info.Skeleton = function InfoSkeleton() {
/**
 * if we use the statement upon and marked the InfoSkeleton as a client component,
 * we need to mark the loading component(which have imported the InfoSkeleton component) as a client component as well
 * but since we are not using the statement below, we don't need to mark the loading component as a client component
 *
 * and the same as the toolbar and participants components
 */
export const InfoSkeleton = () => {
  return (
    <div
      className="absolute top-2 left-2 bg-white rounded px-1.5 h-12 
      flex items-center shadow-md w-[300px]"
    />
  );
};
