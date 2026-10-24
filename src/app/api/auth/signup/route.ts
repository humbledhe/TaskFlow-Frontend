import { BACKEND_URL } from "@/app/lib/api";

import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const formData = await request.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        !email ||
        !password
    ) {
        return NextResponse.json(
            { detail: "Email and password are required" },
            { status: 400 }
        );
    }

    const backendForm = JSON.stringify({ email, password });

    const backendResponse = await fetch(`${BACKEND_URL}/api/v1/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: backendForm,
        cache: "no-store"
    });

    if (backendResponse.status == 409) {
        return NextResponse.json(
            { detail: "Email already exists. Login" },
            { status: 409 }
        );
    }

    if (!backendResponse.ok) {
        throw new Error("Something went wrong");
    }

    const responseBody = await backendResponse.text();

    const response = new NextResponse(responseBody, {
        status: backendResponse.status,
        headers: {
            "Content-Type":
                backendResponse.headers.get("Content-Type") ??
                "application/json"
        }
    });

    console.log(response);

    return response;
}
