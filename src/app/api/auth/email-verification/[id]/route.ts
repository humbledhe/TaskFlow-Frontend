import { BACKEND_URL } from "@/app/lib/api";

import { NextResponse, type NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const backendResponse = await fetch(
            `${BACKEND_URL}/api/v1/email_verifications/send-verification-code/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store"
            }
        );

        if (!backendResponse.ok) {
            return NextResponse.json(
                { detail: "Failed" },
                { status: backendResponse.status }
            );
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

        return response;
    } catch (error) {
        console.error("Email verification API error:", error);

        return NextResponse.json(
            { detail: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { code } = await request.json();

        console.log(code);

        const backendResponse = await fetch(
            `${BACKEND_URL}/api/v1/email_verifications/verify-email-otp/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code }),
                cache: "no-store"
            }
        );

        if (!backendResponse.ok) {
            return NextResponse.json(
                { detail: "Failed" },
                { status: backendResponse.status }
            );
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

        return response;
    } catch (error) {
        console.error("Email verification API error:", error);

        return NextResponse.json(
            { detail: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}
