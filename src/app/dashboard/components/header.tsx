"use client";

import AppLogo from "@/app/components/appLogo";
import Sidebar from "./sidebar";

import { LuMenu } from "react-icons/lu";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <section className="flex gap-6 items-center bg-white p-6">
                <button onClick={() => setIsOpen(true)}>
                    <LuMenu size={28} />
                </button>
                <AppLogo />
            </section>

            {isOpen && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
    );
}
