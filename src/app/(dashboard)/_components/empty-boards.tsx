'use client';

import Image from "next/image";
// import { useMutation } from "convex/react";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";

import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";

export const EmptyBoards = () => {

    const { organization } = useOrganization();

    // const create = useMutation(api.board.create);
    /**
     * change to the custom hook useApiMutation
     */
    const { mutate, pending } = useApiMutation(api.board.create);

    // const onClick =() => {
    //     if (!organization) return;
    //     create({
    //         orgId: organization.id,
    //         title: "Untitled"
    //     });
    // }
    const onClick =() => {
        if (!organization) return;
        mutate({
            orgId: organization.id,
            title: "Untitled"
        })
        .then((id) => {
            toast.success("Board created");
            // TODO: redirect to the board/{id}
        })
        .catch(()=> toast.error("Failed to create board"));
    }

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image 
                src="/note.svg"
                alt="Empty"
                height={110}
                width={110}
            />
            <h2 className="text-2xl font-semibold mt-6">
                No results found!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try searching for something else
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create a new board
                </Button>
            </div>
        </div>
    )
}