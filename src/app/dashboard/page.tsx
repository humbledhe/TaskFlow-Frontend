"use client";

import Header from "@/app/components/dashboard/header";
import TaskCard from "@/app/components/home/task-card";

import { FaPlus } from "react-icons/fa";
import { RiTodoLine } from "react-icons/ri";

import { useEffect, useState } from "react";
import Link from "next/link";

export interface UserTask {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate: string;
    publicId: string;
    isCompleted: boolean;
    createdAt: string;
    updateAt: string | null;
}

export interface TasksResponse {
    data: UserTask[];
}

export default function DashboardPage() {
    const [userTasks, setUserTasks] = useState<TasksResponse>({
        data: []
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    async function getUserTasks(): Promise<TasksResponse> {
        const response = await fetch("/api/auth/dashboard/tasks", {
            method: "GET",
            cache: "no-store"
        });

        const data: unknown = await response.json();

        if (!response.ok) {
            const message =
                typeof data === "object" &&
                data !== null &&
                "detail" in data &&
                typeof data.detail === "string"
                    ? data.detail
                    : "Failed to fetch tasks.";

            throw new Error(message);
        }

        return data as TasksResponse;
    }

    async function loadTasks() {
        try {
            setIsLoading(true);
            setError("");

            const result = await getUserTasks();

            setUserTasks(result);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred."
            );
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        void loadTasks();
    }, []);

    const filteredTasks = userTasks.data.filter(task =>
        task.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    const isTaskEmpty = userTasks.data.length === 0;

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

                        {!isLoading && !error && !isTaskEmpty && (
                            <span className="text-sm text-gray-500">
                                {userTasks.data.length}{" "}
                                {userTasks.data.length === 1 ? "task" : "tasks"}
                            </span>
                        )}
                    </div>

                    {isLoading ? (
                        <div
                            className="mt-6 rounded-lg bg-white p-8 text-center"
                            role="status"
                        >
                            <p className="text-sm text-gray-500">
                                Loading your tasks...
                            </p>
                        </div>
                    ) : error ? (
                        <div
                            className="mt-6 rounded-lg bg-white p-6"
                            role="alert"
                        >
                            <p className="text-sm text-red-600">{error}</p>

                            <button
                                type="button"
                                onClick={() => void loadTasks()}
                                className="mt-4 rounded-lg bg-[#0B6B67] px-4 py-2 text-sm text-white"
                            >
                                Try again
                            </button>
                        </div>
                    ) : isTaskEmpty ? (
                        <div className="mt-6 flex flex-col items-center gap-5 rounded-lg bg-white py-12 font-semibold">
                            <RiTodoLine size={50} className="text-[#0B6B67]" />

                            <h2>No tasks yet</h2>

                            <p className="px-4 text-center text-sm font-normal text-[#9CA3AF]">
                                Create your first task to start tracking your
                                work.
                            </p>

                            <Link
                                href="/dashboard/tasks/create-task"
                                className="rounded-lg bg-[#0B6B67] px-6 py-2 text-sm text-white transition hover:bg-[#095753]"
                            >
                                Create your first task
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="mt-6">
                                <input
                                    type="search"
                                    placeholder="Search tasks"
                                    value={searchQuery}
                                    onChange={event =>
                                        setSearchQuery(event.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-[#0B6B67] focus:ring-2 focus:ring-[#0B6B67]/10 placeholder:text-[#9CA3AF]"
                                />
                            </div>

                            <div className="mt-5 flex flex-col gap-3">
                                {filteredTasks.length > 0 ? (
                                    filteredTasks.map(userTask => (
                                        <TaskCard
                                            key={userTask.publicId}
                                            title={userTask.title}
                                            priority={userTask.priority}
                                        />
                                    ))
                                ) : (
                                    <div className="rounded-lg bg-white px-4 py-8 text-center">
                                        <p className="text-sm text-gray-500">
                                            No tasks match "{searchQuery}".
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </section>
            </main>

            {!isLoading && !error && (
                <footer>
                    <Link
                        href="/dashboard/tasks/create-task"
                        aria-label="Create a new task"
                        className="fixed bottom-10 right-6 flex items-center justify-center rounded-full bg-[#0B6B67] p-5 text-white shadow-lg transition hover:bg-[#095753]"
                    >
                        <FaPlus size={20} />
                    </Link>
                </footer>
            )}
        </div>
    );
}
