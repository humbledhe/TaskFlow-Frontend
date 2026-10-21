import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_TASKFLOW_BACKEND_BASE_URL;

if (!API_URL) {
    throw new Error("TASKFLOW_BACKEND_BASE_URL is undefined");
}

export async function getUserTasks() {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");

    const response = await fetch(`${API_URL}/api/v1/todos`, {
        method: "GET",
        headers: {
            Cookie: cookieHeader
        },
        cache: "no-store"
    });

    if (!response.ok) {
        console.log("Status:", response.status);
        console.log("Response:", await response.clone().text());
    }

    const data: TasksResponse = await response.json();

    return data;
}
