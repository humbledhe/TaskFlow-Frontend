import "server-only";

import { BACKEND_URL } from "@/app/lib/api";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

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

function getCookieHeader(
    cookieStore: Awaited<ReturnType<typeof cookies>>
): string {
    return cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");
}

export async function GET(): Promise<NextResponse> {
    try {
        const cookieStore = await cookies();

        const backendResponse = await fetch(`${BACKEND_URL}/api/v1/todos`, {
            method: "GET",
            headers: {
                Cookie: getCookieHeader(cookieStore)
            },
            cache: "no-store",
            signal: AbortSignal.timeout(10_000)
        });

        const responseBody = await backendResponse.text();

        return new NextResponse(responseBody, {
            status: backendResponse.status,
            headers: {
                "Content-Type":
                    backendResponse.headers.get("Content-Type") ??
                    "application/json"
            }
        });
    } catch (error) {
        console.error("Failed to fetch tasks:", error);

        return NextResponse.json(
            { detail: "Unable to fetch tasks. Please try again." },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const formData = await request.formData();

        const title = formData.get("title");
        const priority = formData.get("priority");
        const status = formData.get("status");
        const dueDate = formData.get("dueDate");

        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof priority !== "string" ||
            !["Low", "Medium", "High"].includes(priority) ||
            typeof status !== "string" ||
            !["To do", "In progress", "Done"].includes(status) ||
            typeof dueDate !== "string"
        ) {
            return NextResponse.json(
                { detail: "Invalid task data." },
                { status: 422 }
            );
        }

        const cookieStore = await cookies();

        const backendResponse = await fetch(`${BACKEND_URL}/api/v1/todos`, {
            method: "POST",
            headers: {
                Cookie: getCookieHeader(cookieStore),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title.trim(),
                priority: priority.toLowerCase(),
                status,
                dueDate
            }),
            cache: "no-store",
            signal: AbortSignal.timeout(10_000)
        });

        const responseBody = await backendResponse.text();

        return new NextResponse(responseBody, {
            status: backendResponse.status,
            headers: {
                "Content-Type":
                    backendResponse.headers.get("Content-Type") ??
                    "application/json"
            }
        });
    } catch (error) {
        console.error("Failed to create task:", error);

        return NextResponse.json(
            { detail: "Unable to create task. Please try again." },
            { status: 500 }
        );
    }
}
