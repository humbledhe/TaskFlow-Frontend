import Header from "@/app/components/dashboard/header";
import TaskView from "@/app/components/dashboard/task-view";
import { getTasks } from "@/app/lib/dashboard/tasks/queries";

import { FaPlus } from "react-icons/fa";
import { RiTodoLine } from "react-icons/ri";

import { Suspense } from "react";
import Link from "next/link";

export default function DashboardPage() {
    const tasks = getTasks();

    return (
        <div className="min-h-dvh bg-[#F5F6F8]">
            <header>
                <Header />
            </header>

            <main>
                <section className="p-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-medium text-[#101727]">
                            My Tasks
                        </h1>
                    </div>

                    <Suspense
                        fallback={
                            <div className="rounded-lg mt-6 bg-white text-center p-8">
                                <p className="text-sm text-gray-500">
                                    Loading tasks...
                                </p>
                            </div>
                        }
                    >
                        <TaskView tasks={tasks} />
                    </Suspense>
                </section>
            </main>

            <footer>
                <Link
                    href="/dashboard/tasks/create-task"
                    aria-label="Create a new task"
                    className="fixed bottom-10 right-6 flex items-center justify-center rounded-full bg-[#0B6B67] p-5 text-white shadow-lg transition hover:bg-[#095753]"
                >
                    <FaPlus size={20} />
                </Link>
            </footer>
        </div>
    );
}
