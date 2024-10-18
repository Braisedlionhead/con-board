'use client';
import { UserButton } from '@clerk/nextjs'

export const Navbar = () => {
    return (
        <div className="flex items-center gap-x-4 p-5 bg-green-200">
            <div className='hidden lg:flex lg:flex-1 bg-yellow-600 lg:hover:bg-transparent'>
                {/* TODO : Add Search */}
                Search: ...
            </div>
            <div className=''>
                <UserButton />
            </div>
        </div>
    );
}