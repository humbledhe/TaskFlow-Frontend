"use server";

import { BACKEND_URL } from "@/app/lib/api";
import { VerificationState } from "@/app/components/email-verification/verification-code-form";

export async function getVerificationCode(id: string) {
    const response = await fetch(
        `${BACKEND_URL}/api/v1/email_verifications/send-verification-code/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-store"
        }
    );

    if (!response.ok) throw new Error("Something went wrong.");

    const result = await response.json();

    return result;
}

export async function verifyAccount(id: string, code: string) {
    const response = await fetch(
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

    if (!response.ok) throw new Error("Something went wrong.");

    const result = await response.json();

    return result;
}

export async function verifyAccountAction(
    id: string,
    prevState: VerificationState,
    formData: FormData
): Promise<VerificationState> {
    prevState.error = null;

    const code = formData.get("code");

    if (typeof code !== "string" || code.length !== 6) {
        return {
            error: "Enter a valid 6-digit code.",
            success: false
        };
    }

    try {
        await verifyAccount(id, code);

        return {
            error: null,
            success: true
        };
    } catch {
        return {
            error: "Verification failed. Please try again.",
            success: false
        };
    }
}
