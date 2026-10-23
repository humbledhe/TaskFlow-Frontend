"use client";

import AppLogo from "@/app/components/home/app-logo";

import { useState, type FormEvent } from "react";
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

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        try {
            const formData = new FormData();

            formData.set("email", email);
            formData.set("password", password);

            const response = await fetch("/api/auth/signup", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                return;
            }

            const responseData: UserResponse = await response.json();

            const id = responseData.data.publicId;

            router.replace(`/email-verification/${id}`);
        } catch {
            setError("Unable to connect. Please try again.");
        }
    }

    return (
        <section className="px-12 pt-40 h-dvh bg-[#F5F6F8]">
            <Link href="/">
                <AppLogo />
            </Link>

            <header>
                <h1 className="mb-14 text-center font-bold">
                    Create an account
                </h1>
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
                            sign up
                        </button>
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
