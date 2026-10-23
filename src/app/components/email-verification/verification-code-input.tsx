"use client";

import { useState } from "react";
import { OTPInput, SlotProps } from "input-otp";

interface VerificationCodeInputProps {
    onComplete: (code: string) => void;
}

export default function VerificationCodeInput({
    onComplete
}: VerificationCodeInputProps) {
    const [code, setCode] = useState("");

    return (
        <OTPInput
            maxLength={6}
            value={code}
            onChange={setCode}
            onComplete={onComplete}
            containerClassName="flex items-center gap-3"
            render={({ slots }) => (
                <>
                    {slots.map((slot, index) => (
                        <Slot key={index} {...slot} />
                    ))}
                </>
            )}
        />
    );
}

function Slot({ char, isActive, hasFakeCaret }: SlotProps) {
    return (
        <div
            className={`relative flex h-10 w-10 items-center justify-center border rounded-lg font-semibold text-lg ${isActive ? "border-blue-300" : "border-[#D1D5DB]"}`}
        >
            {char}

            {hasFakeCaret && (
                <div className="absolute items-center justify-center insert-0 pointer-events-none flex">
                    <div className="h-4 animate-[caret-blink_1s_step-end_infinite] bg-blue-600 w-px"></div>
                </div>
            )}
        </div>
    );
}
