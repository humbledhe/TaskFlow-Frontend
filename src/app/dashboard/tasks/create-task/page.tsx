import FormBody from "@/app/components/dashboard/tasks/create-task/form-body";

import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";

export default function CreateTaskPage() {
    return (
        <section className="flex h-dvh flex-col bg-[#F5F6F8]">
            <header className="mb-6 flex shrink-0 items-center gap-6 bg-white p-6">
                <link href="/dashboard" replace>
                    <IoChevronBack size={24} />
                </link>
                <h2 className="font-bold">New Task</h2>
            </header>

            <main className="flex min-h-0 flex-1 flex-col p-6 pt-0">
                <FormBody />
            </main>
            <footer>
                <link href="/dashboard" replace>
                    <button className="w-full mt-4 text-sm pb-6">Cancel</button>
                </link>
            </footer>
        </section>
    );
}
