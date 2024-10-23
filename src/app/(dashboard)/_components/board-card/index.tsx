"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Actions } from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "../../../../../convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { Overlay } from "./overlay";
import { Footer } from "./footer";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { Id } from "../../../../../convex/_generated/dataModel";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  /**
   * both useAuch from @clerk/nextjs and useConvex from convex/react are available
   */
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;
  // what the hell is this??
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  /**
   * useMutation from convex/react is also available
   * but in this case, we have to manually handle the pending state
   */
  // const handleFavorite = useMutation(api.board.favorite);
  // const handleUnfavorite = useMutation(api.board.unfavorite);
  // const toggleFavorite = () => {
  //   if (isFavorite) {
  //     handleUnfavorite({id: id as Id<"boards"> }).catch(() => toast.error("Failed to unfavorite"));
  //   } else {
  //     handleFavorite({ id: id as Id<"boards">, orgId }).catch(() => toast.error("Failed to favorite"));
  //   }
  // };

  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavorite
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      // we don't need a success message for this, because it's going to be immediately shown to the user
      onUnfavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
    } else {
      onFavorite({ id, orgId }).catch(() => toast.error("Failed to favorite"));
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-fill" // objectFit="fill"??
          />
          <Overlay />
          <Actions
            id={id}
            title={title}
            side="right"
            // sideOffset={10}
          >
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal
                className="text-white opacity-75
                    hover:opacity-100 transition-opacity"
              />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg  overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
