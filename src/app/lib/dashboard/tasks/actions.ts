"use server";

import { BACKEND_URL } from "@/app/lib/api";
import { cookies } from "next/headers";

function getCookieHeader(cookieStore: Awaited<ReturnType<typeof cookies>>) {
    return cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");
}

export async function createTasks(formData: FormData) {
    const cookieStore = await cookies();

    const response = await fetch("/api/auth/dashboard/tasks", {
        method: "POST",
        headers: {
            Cookie: getCookieHeader(cookieStore)
        },
        body: formData,
        cache: "no-store"
    });

    if (response.ok) {
        return {
            error: null,
            success: true
        };
    }

    if (!response.ok) throw new Error("Failed to create tasks");

    return;
}
