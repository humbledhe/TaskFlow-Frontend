import { BACKEND_URL } from "@/app/lib/api";

import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
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

    const backendForm = new URLSearchParams({
        username: email,
        password
    });

    const backendResponse = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: backendForm,
        cache: "no-store"
    });

    if (backendResponse.status === 401) {
        return NextResponse.json(
            {
                detail: "Incorrect email or password check your details and try again"
            },
            { status: 401 }
        );
    }

    if (!backendResponse.ok)
        throw new Error(`Failed to sign in ${backendResponse.status}`);

    const responseBody = await backendResponse.text();

    const response = new NextResponse(responseBody, {
        status: backendResponse.status,
        headers: {
            "Content-Type":
                backendResponse.headers.get("Content-Type") ??
                "application/json"
        }
    });

    // Forward each Set-Cookie headers from backend
    // This requires a runtime that preserves multiple Set-Cookie headers
    const cookies = backendResponse.headers.getSetCookie();

    for (const cookie of cookies) {
        response.headers.append("Set-Cookie", cookie);
    }

    return response;
}
