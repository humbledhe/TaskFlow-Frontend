"use client";

import { useEffect } from "react";

export default function Eruda() {
    useEffect(() => {
        if (process.env.NODE_ENV !== "development") return;

        async function initEruda() {
            const eruda = (await import("eruda")).default;

            if (!eruda._isInit) {
                eruda.init();
            }
        }

        initEruda();
    }, []);

    return null;
}
