"use client";

import AppLogo from "@/app/components/appLogo";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const inputStyles =
    "w-full rounded-lg border border-gray-300 px-2 py-1 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const API_URL = process.env.NEXT_PUBLIC_TASKFLOW_BACKEND_BASE_URL;

if (!API_URL) {
    throw new Error("TASKFLOW_BACKEND_BASE_URL is undefined");
}

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        try {
            const response = await fetch(`${API_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    username: email,
                    password: password
                }),
                credentials: "include"
            });

            const data = await response.json();

            if (!response.ok) {
                setError(
                    typeof data.message === "string"
                        ? data.message
                        : "Unable to sign in. Check your credentials"
                );

                return;
            }

            router.replace("/dashboard");
            router.refresh();
        } catch (error) {
            console.error("Request failed:", error);
        }
    }

    return (
        <section className="px-12 pt-40 min-h-screen bg-[#F5F6F8]">
            <Link href="/">
                <AppLogo />
            </Link>
            <header>
                <h1 className="mb-14 text-center font-bold mt-2">Log in</h1>
            </header>

            <main>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-[#0B6B67] text-white py-1 rounded-lg text-sm"
                        >
                            Log in
                        </button>
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
