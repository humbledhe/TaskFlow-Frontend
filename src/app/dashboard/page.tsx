import Header from "@/app/components/dashboard/header";
import Tasks from "@/app/components/dashboard/tasks";

import { FaPlus } from "react-icons/fa";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <>
            <header>
                <Header />
            </header>

            <main>
                <section className="p-6 bg-[#F5F6F8] h-dvh">
                    <h1 className="text-[#101727] font-medium text-xl">
                        My Tasks
                    </h1>

                    <div className="mt-6 text-sm">
                        <input
                            type="search"
                            placeholder="Search tasks"
                            className="w-full rounded-lg bg-white border border-gray-300 px-2 py-1 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-[#D1D5DB]"
                        />
                    </div>
                    <Tasks />
                </section>
            </main>
            <footer>
                <Link href="/dashboard/tasks/create-task">
                    <button className="fixed right-10 bottom-10 border bg-[#0B6B67] p-5 rounded-full">
                        <FaPlus size={20} />
                    </button>
                </Link>
            </footer>
        </>
    );
}
