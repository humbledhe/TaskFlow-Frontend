"use client";

import VerificationCodeForm from "@/app/components/email-verification/verification-code-form";
import {
    getVerificationCode,
    verifyAccount
} from "@/app/lib/dashboard/tasks/actions";
import AppLogo from "@/app/components/home/app-logo";

import { useEffect, useActionState } from "react";
import { useParams } from "next/navigation";
import { IoCloseCircle } from "react-icons/io5";

interface VerificationState {
    error: string | null;
}

const initialState: VerificationState = {
    error: null
};

export default function EmailVerificationPage() {
    const { id } = useParams<{ id: string }>();

    const code = async () => await getVerificationCode(id);

    useEffect(() => {
        void code();
    }, [id]);

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

                <VerificationCodeForm id={id} />

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
