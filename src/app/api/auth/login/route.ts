import { BACKEND_URL } from "@/app/lib/api";

import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
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

        const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                username: email,
                password
            }),
            cache: "no-store"
        });

        const data = await response.json();

        const nextResponse = NextResponse.json(data, {
            status: response.status
        });

        // Forward each Set-Cookie headers from backend
        // This requires a runtime that preserves multiple Set-Cookie headers
        const cookies = response.headers.getSetCookie();

        for (const cookie of cookies) {
            nextResponse.headers.append("Set-Cookie", cookie);
        }

        return nextResponse;
    } catch {}
}
