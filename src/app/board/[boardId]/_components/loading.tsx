import { Loader } from "lucide-react";

import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";

export const Loading = () => {
  return (
    <main
      className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center"
    //   className="h-full w-full bg-neutral-100 touch-none"
    >
      <Loader className="h-6 w-6 to-muted-foreground animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
};
