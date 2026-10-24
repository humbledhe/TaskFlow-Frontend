"use client";

import AppLogo from "@/app/components/home/app-logo";
import { IoCloseCircle } from "react-icons/io5";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useActionState } from "react";

const inputStyles =
    "w-full rounded-lg border border-gray-300 px-2 py-1 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

type LoginState = {
    error: string | null;
};

const initialState: LoginState = {
    error: null
};

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const [state, formAction, isPending] = useActionState(
        async (
            previousState: LoginState,
            formData: FormData
        ): Promise<LoginState> => {
            previousState.error = null;

            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: formData,
                cache: "no-store"
            });

            const result = await response.json();

            if (response.status === 401) {
                return {
                    error: result.detail
                };
            }

            router.replace("dashboard");

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
                <h1 className="mb-14 text-center font-bold mt-2">Log in</h1>

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
                                Log in
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="w-full bg-white text-[#D1D5DB] py-1 rounded-lg text-sm"
                            >
                                Please wait...
                            </button>
                        )}
                    </div>
                </form>
            </main>

            <footer className="mt-4">
                <span className="text-xs text-[#D1D5DB] ">
                    No account?{" "}
                    <Link href="/signup" className="text-[#0B6B67] underline">
                        Create one
                    </Link>
                </span>
            </footer>
        </section>
    );
}
