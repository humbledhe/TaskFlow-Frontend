"use client";

import AppLogo from "../home/app-logo";

import { LuX } from "react-icons/lu";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
    return (
        <aside
            className={`fixed p-6 left-0 top-0 h-screen transition-transform duration-300 bg-white w-74 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="flex justify-between items-center">
                <AppLogo />
                <button onClick={() => setIsOpen(!isOpen)}>
                    <LuX size={28} />
                </button>
            </div>
            <nav className="mt-12">
                <ul className="list-none">
                    <li>All tasks</li>
                    <li>In progress</li>
                    <li>Completed</li>
                </ul>
            </nav>
        </aside>
    );
}
