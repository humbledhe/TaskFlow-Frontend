"use client";

import FormBody from "@/app/components/dashboard/tasks/create-task/form-body";

import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function CreateTaskPage() {
    const router = useRouter();

    return (
        <section className="flex h-dvh flex-col bg-[#F5F6F8]">
            <header className="mb-6 flex shrink-0 items-center gap-6 bg-white p-6">
                <button onClick={() => router.back()}>
                    <IoChevronBack size={24} />
                </button>
                <h2 className="font-bold">New Task</h2>
            </header>

            <main className="flex min-h-0 flex-1 flex-col p-6 pt-0">
                <FormBody />
            </main>
            <footer>
                <button
                    className="w-full mt-4 text-sm pb-6"
                    onClick={() => router.back()}
                >
                    Cancel
                </button>
            </footer>
        </section>
    );
}
