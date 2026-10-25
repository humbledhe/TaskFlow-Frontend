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

    const title = formData.get("title");
    const priority = formData.get("priority");
    const status = formData.get("status");
    const dueDate = formData.get("dueDate");

    const response = await fetch(`${BACKEND_URL}/api/v1/todos`, {
        method: "POST",
        headers: {
            Cookie: getCookieHeader(cookieStore)
        },
        body: JSON.stringify({ title, priority, status, dueDate }),
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
