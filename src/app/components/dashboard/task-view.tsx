"use client";
import TaskCard from "../home/task-card";

import { RiTodoLine } from "react-icons/ri";
import { useState, use } from "react";
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

export default function TaskView({ tasks }: { tasks: Promise<TasksResponse> }) {
    // const filteredTasks = userTasks.data.filter(task =>
    //     task.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    // );

    const userTasks = use(tasks);

    const [searchQuery, setSearchQuery] = useState("");

    const isEmpty = userTasks.data.length === 0;

    return (
        <>
            {!isEmpty ? (
                <>
                    <div className="mt-6">
                        <input
                            type="search"
                            placeholder="Search tasks"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-[#0B6B67] focus:ring-2 focus:ring-[#0B6B67]/10 placeholder:text-[#9CA3AF]"
                        />
                    </div>

                    <div className="mt-5 flex flex-col gap-3">
                        {userTasks.data.map(userTask => (
                            <TaskCard
                                key={userTask.publicId}
                                title={userTask.title}
                                priority={userTask.priority}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="mt-6 flex flex-col items-center gap-5 rounded-lg bg-white py-12 font-semibold">
                    <RiTodoLine size={50} className="text-[#0B6B67]" />

                    <h2>No tasks yet</h2>

                    <p className="px-4 text-center text-sm font-normal text-[#9CA3AF]">
                        Create your first task to start tracking your work.
                    </p>

                    <Link
                        href="/dashboard/tasks/create-task"
                        className="rounded-lg bg-[#0B6B67] px-6 py-2 text-sm text-white transition hover:bg-[#095753]"
                    >
                        Create your first task
                    </Link>
                </div>
            )}
        </>
    );
}
