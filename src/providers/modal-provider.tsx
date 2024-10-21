"use client ";
/**
 * use client doesn't mean client-side rendering, it just means that it's not a server component
 * and server component is not the same thing as server-side rendering
 * components which are marked as use client are still server-side rendered they're just not server components
 */

import { useEffect, useState } from "react";

import { RenameModal } from "@/components/modals/rename-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  /**
   * this will ensure that the component is only ever rendered on the server side
   */

  /**
   * this will ensure that whatever i return here  will only be visible completely on the client
   */


  useEffect(() => {
    setIsMounted(true);
  }, []);

  // this cannot be shown on the server side otherwise it's going to cause a hydration error(some cryptic hydration errors)
  if (!isMounted) return null;

  return (
    <>
      <RenameModal />
    </>
  );
};
