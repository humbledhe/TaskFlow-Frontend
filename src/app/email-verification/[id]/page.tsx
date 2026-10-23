"use client";

import VerificationCodeInput from "@/app/components/email-verification/verification-code-input";
import AppLogo from "@/app/components/home/app-logo";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EmailVerificationPage() {
    const [error, setError] = useState("");

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        async function receiveVerificationCode() {
            try {
                setError("");

                const response = await fetch(
                    `/api/auth/email-verification/${encodeURIComponent(id)}`
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.detail ?? "Failed.");
                    return;
                }
            } catch (error) {
                console.error("Email verification request failed:", error);
                setError("An unexpected error occurred.");
            }
        }

        void receiveVerificationCode();
    }, []);

    async function handleComplete(code: string) {
        try {
            const response = await fetch(
                `/api/auth/email-verification/${encodeURIComponent(id)}`,
                {
                    method: "PATCH",
                    body: JSON.stringify({ code })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.detail ?? "Failed.");
                return;
            }
        } catch (error) {
            console.error("Email verification failed:", error);
            setError("An unexpected error occurred.");
        }
    }

    return (
        <div className="bg-[#F5F6F8] h-dvh px-12">
            <div className="bg-white p-8 mt-30 rounded-lg">
                <AppLogo />

                <h2 className="mt-12 mb-3 font-bold text-2xl">
                    Verify your email
                </h2>

                <p className="text-[#D1D5DB] text-sm mb-6 font-semibold">
                    Enter the 6 digit code we sent to your email.
                </p>

                <VerificationCodeInput onComplete={handleComplete} />

                <button
                    className="bg-[#0B6B67] text-white w-full mt-4 py-2 rounded-md text-xs"
                    disabled
                >
                    Verify
                </button>

                <p className="text-[#D1D5DB] text-xs mt-6">
                    Code expired or missing?{" "}
                    <span className="text-[#0B6B67] underline font-semibold">
                        Send new code
                    </span>
                </p>
            </div>
        </div>
    );
}
