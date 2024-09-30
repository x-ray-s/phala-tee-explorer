// import {
//     Menubar,
//     MenubarContent,
//     MenubarItem,
//     MenubarMenu,
//     MenubarSeparator,
//     MenubarShortcut,
//     MenubarTrigger,
// } from "@/components/ui/menubar"
import { Input } from "@/components/ui/input"
import React from "react";
import { useLocation } from "wouter";
export function Nav() {
    const [, navigate] = useLocation();
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            const appId = e.currentTarget.value;
            navigate(`/${appId}`);
        }
    }
    return <div className="container mx-auto px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="font-bold">Phala TEE Explorer</div>
            {/* <nav className="flex items-center gap-4 text-sm">
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/docs">Home</a>
            </nav> */}
        </div>
        <div>
            <Input type="text" className="search" placeholder="Search App ID" onKeyDown={handleKeyDown} />
        </div>
    </div>

}