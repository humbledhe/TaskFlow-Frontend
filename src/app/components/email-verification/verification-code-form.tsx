"use client";

import { IoCloseCircle } from "react-icons/io5";

import { useActionState, useRef, useState } from "react";
import { OTPInput, SlotProps } from "input-otp";
import { useRouter } from "next/navigation";

import { verifyAccountAction } from "@/app/lib/auth/email-verification/actions";

interface VerificationCodeInputProps {
    id: string;
}

export interface VerificationState {
    error: string | null;
    success: boolean;
}

export const initialState: VerificationState = {
    error: null,
    success: false
};

export default function VerificationCodeForm({
    id
}: VerificationCodeInputProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [code, setCode] = useState("");

    const action = verifyAccountAction.bind(null, id);

    const [state, formAction, isPending] = useActionState(action, initialState);

    const router = useRouter();

    if (state.success) router.replace("/login");

    return (
        <form ref={formRef} action={formAction}>
            <OTPInput
                name="code"
                maxLength={6}
                value={code}
                onChange={setCode}
                onComplete={() => {
                    formRef.current?.requestSubmit();
                }}
                containerClassName="flex items-center gap-3"
                render={({ slots }) => (
                    <>
                        {slots.map((slot, index) => (
                            <Slot key={index} {...slot} />
                        ))}
                    </>
                )}
            />

            <div
                className={`mt-4 grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    state.error ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="mb-8 flex items-center gap-2 rounded-lg border border-[#F3D1D1] bg-[#FEF2F2] px-2 py-3">
                        <IoCloseCircle
                            size={18}
                            className="shrink-0 text-red-500"
                        />

                        <p className="text-xs text-red-500">{state.error}</p>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending || code.length !== 6}
                className="mt-4 w-full rounded-md bg-[#0B6B67] py-2 text-xs text-white disabled:bg-[#D1D5DB]"
            >
                {isPending ? "Verifying..." : "Verify"}
            </button>
        </form>
    );
}

function Slot({ char, isActive, hasFakeCaret }: SlotProps) {
    return (
        <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#D1D5DB] text-lg font-semibold">
            {char}

            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-px animate-[caret-blink_1s_step-end_infinite] bg-blue-600" />
                </div>
            )}
        </div>
    );
}
