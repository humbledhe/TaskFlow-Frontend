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

    let title = formData.get("title");
    let priority = formData.get("priority");
    const status = formData.get("status");
    const dueDate = formData.get("dueDate");

    if (
        typeof title !== "string" ||
        typeof priority !== "string" ||
        typeof status !== "string" ||
        typeof dueDate !== "string" ||
        !title ||
        !priority ||
        !status ||
        !dueDate
    ) {
        return { error: "failed", success: false };
    }

    title = title.trim();
    priority = priority.toLowerCase();

    const response = await fetch(`${BACKEND_URL}/api/v1/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: getCookieHeader(cookieStore)
        },
        body: JSON.stringify({ title, priority, status, dueDate }),
        cache: "no-store"
    });

    console.log(await response.json());
    console.log(response);

    if (response.ok) {
        return {
            error: null,
            success: true
        };
    }

    if (!response.ok) throw new Error("Failed to create tasks");

    return;
}
