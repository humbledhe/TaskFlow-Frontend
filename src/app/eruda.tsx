"use client";

import { useEffect } from "react";

let erudaInitialized = false;

export default function Eruda() {
    useEffect(() => {
        if (process.env.NODE_ENV !== "development") return;
        if (erudaInitialized) return;

        async function initEruda() {
            const eruda = (await import("eruda")).default;

            if (erudaInitialized) return;

            eruda.init();
            erudaInitialized = true;
        }

        void initEruda();
    }, []);

    return null;
}
