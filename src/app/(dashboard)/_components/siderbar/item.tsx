'use client';

import Image from "next/image";
import {
    useOrganization,
    useOrganizationList,
} from "@clerk/nextjs"

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";

interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
};

export const Item = ({
    id, 
    name,
    imageUrl,
}: ItemProps) =>{

    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();
    
    const isActive = organization?.id === id;

    const onClick = () => {
        if(!isActive) return;

        // setActive({ organization: id});
        /**
         * the editor or may be one plugin always shows the error below if i use the statement above
         * Cannot invoke an object which is possibly 'undefined'.ts(2722)
         * so i will use the statement below
         */
        if(setActive) setActive({ organization: id});
    }

    return (
        <div className="aspect-square relative">
                <Hint 
                    label={name}
                    side="right"
                    align="start"
                    sideOffset={18}
                >
                <Image 
                fill
                alt={name}
                src={imageUrl}
                onClick={onClick}
                className={cn(
                    "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                    isActive && "opacity-100"                
                )}
            />
        </Hint>
        </div>
    )

}