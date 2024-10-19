'use client';

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
// the useRouter hook in the next/router is used in pages routing not the app routing
import { useRouter } from "next/navigation";

import {
    ChangeEvent,
    useEffect,
    useState,
} from "react";

import { Input } from "@/components/ui/input";

export const SearchInput = () => {

    const router = useRouter();
    const [value, setValue] = useState("");

    /**
     * the returned array contains the debounced value and the setDebouncedValue function
     * the first value is the debounced value
     */
    const [ debouncedValue ] = useDebounceValue(value, 500);
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: "/",
            query: {
                search: debouncedValue,
                // search: debouncedValue.toString()
            },
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [debouncedValue, router]);

    return (
        <div className="w-full relative">
            <Search 
            className="absolute top-1/2 left-3 transform -translate-y-1/2 
            text-muted-foreground h4 w-4"
            />
            {/* 516 is just a random value */}
            <Input 
                className="w-full max-w-[516px] pl-9"
                placeholder={"Search boards"}
                onChange={handleChange}
                value={value}
            />
        </div>
    )
}