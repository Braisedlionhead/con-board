import { Loader } from "lucide-react";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

export const Loading = () => {
  return (
    <main
      className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center"
    //   className="h-full w-full bg-neutral-100 touch-none"
    >
      <Loader className="h-6 w-6 to-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  );
};
