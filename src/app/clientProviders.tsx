"use client";

import Eruda from "@/app/eruda";

export default function ClientProviders({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Eruda />
            {children}
        </>
    );
}
