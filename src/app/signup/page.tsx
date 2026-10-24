"use client";

import AppLogo from "@/app/components/home/app-logo";

import { useState, useActionState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inputStyles =
    "w-full rounded-lg border border-gray-300 px-2 py-1 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

interface User {
    email: string;
    publicId: string;
    isVerified: boolean;
    createdAt: string;
}

interface UserResponse {
    data: User;
}

type SignupState = {
    error: string | null;
};

const initialState: SignupState = {
    error: null
};

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const [state, formAction, isPending] = useActionState(
        async (previousState: SignupState, formData: FormData) => {
            previousState.error = null;

            const response = await fetch("/api/auth/signup", {
                method: "POST",
                body: formData,
                cache: "no-store"
            });

            console.log(response);

            const result = await response.json();

            if (response.status == 409) {
                return {
                    error: result.detail
                };
            }

            const id = result.data.publicId;

            router.replace(`/email-verification/${id}`);

            return { error: null };
        },
        initialState
    );

    return (
        <section className="px-12 pt-40 h-dvh bg-[#F5F6F8]">
            <Link href="/">
                <AppLogo />
            </Link>

            <header>
                <h1 className="mb-14 text-center font-bold">
                    Create an account
                </h1>

                <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        state.error ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                >
                    <div className="overflow-hidden">
                        <div className="mb-8 flex items-center gap-2 rounded-lg border border-[#F3D1D1] bg-[#FEF2F2] px-2 py-3">
                            <IoCloseCircle
                                size={18}
                                className="shrink-0 text-red-500"
                            />

                            <p className="text-xs text-red-500">
                                {state.error}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <form className="flex flex-col gap-6" action={formAction}>
                    <div className="flex flex-col text-xs gap-2">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className={inputStyles}
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col text-xs gap-2">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className={inputStyles}
                            onChange={event => setPassword(event.target.value)}
                            required
                        />
                    </div>

                    <div>
                        {!isPending ? (
                            <button
                                type="submit"
                                className="w-full bg-[#0B6B67] text-white py-1 rounded-lg text-sm"
                            >
                                Sign up
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="w-full bg-white text-[#D1D5DB] py-1 rounded-lg text-sm"
                            >
                                Creating account...
                            </button>
                        )}
                    </div>
                </form>
            </main>

            <footer className="mt-4">
                <span className="text-xs text-[#D1D5DB] ">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#0B6B67] underline">
                        Log in
                    </Link>
                </span>
            </footer>
        </section>
    );
}
