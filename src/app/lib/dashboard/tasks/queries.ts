import "server-only";

import { BACKEND_URL } from "@/app/lib/api";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

function getCookieHeader(cookieStore: Awaited<ReturnType<typeof cookies>>) {
    return cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");
}

export async function getTasks() {
    const cookieStore = await cookies();

    const response = await fetch(`${BACKEND_URL}/api/v1/todos`, {
        method: "GET",
        headers: {
            Cookie: getCookieHeader(cookieStore)
        },
        cache: "no-store"
    });

    if (!response.ok)
        throw new Error(`Failed to load tasks: ${response.status}`);

    const data = await response.json();

    return data;
}
