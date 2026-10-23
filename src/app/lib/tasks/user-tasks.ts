import "server-only";

import { BACKEND_URL } from "@/app/lib/api";
import { cookies } from "next/headers";

export interface UserTask {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate: string;
    publicId: string;
    isCompleted: boolean;
    createdAt: string;
    updateAt: string | null;
}

export interface TasksResponse {
    data: UserTask[];
}

export async function getUserTasks(): Promise<TasksResponse> {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");

    const response = await fetch(`${BACKEND_URL}/api/v1/todos`, {
        method: "GET",
        headers: {
            Cookie: cookieHeader
        },
        cache: "no-store",
        signal: AbortSignal.timeout(10_000)
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch tasks. HTTP ${response.status}`);
    }

    return (await response.json()) as TasksResponse;
}
