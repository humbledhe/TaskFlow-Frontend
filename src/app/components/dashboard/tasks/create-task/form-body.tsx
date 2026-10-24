"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Priority = "Low" | "Medium" | "High";

type Status = "To do" | "In progress" | "Done";

export default function FormBody() {
    const [priority, setPriority] = useState<Priority>("Medium");
    const [status, setStatus] = useState<Status>("To do");
    const [dueDate, setDueDate] = useState("");

    const priorities: Priority[] = ["Low", "Medium", "High"];
    const statuses: Status[] = ["To do", "In progress", "Done"];

    const handlePriorityChange = (value: Priority) => setPriority(value);
    const handleStatusChange = (value: Status) => setStatus(value);

    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isLoading) return;

        try {
            setError("");
            setIsLoading(true);

            const formData = new FormData();

            formData.set("title", title);
            formData.set("priority", priority);
            formData.set("status", status);
            formData.set("dueDate", dueDate);

            const response = await fetch("/api/auth/dashboard/tasks", {
                method: "POST",
                body: formData,
                cache: "no-store"
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.detail ?? "Failed to create task");
                return;
            }

            setTitle("");
            setPriority("Medium");
            setStatus("To do");
            setDueDate("");

            router.replace("/dashboard");
        } catch (error) {
            console.error("Failed to create task:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
            <div className="shrink-0">
                <label className="text-sm font-semibold mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    className="w-full mb-6 rounded-lg bg-white border text-xs border-2 border-[#0B6B67] px-2 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-[#D1D5DB]"
                    placeholder="What needs doing"
                    name="title"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    type="text"
                    required
                />

                <label className="text-sm font-semibold mb-2">Priority</label>

                <div className="flex justify-between text-xs gap-2 font-medium mb-6">
                    {priorities.map(level => (
                        <button
                            key={level}
                            type="button"
                            onClick={() => handlePriorityChange(level)}
                            aria-pressed={priority == level}
                            className={`border border-[#D1D5DB] transition-colors w-full py-2 px-4 rounded-lg ${priority == level ? "bg-[#0B6B67] text-white" : "bg-white"}`}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                <label className="text-sm font-semibold mb-2">Status</label>

                <div className="flex justify-between text-xs gap-2 font-medium mb-6">
                    {statuses.map(level => (
                        <button
                            key={level}
                            type="button"
                            onClick={() => handleStatusChange(level)}
                            aria-pressed={status == level}
                            className={`border border-[#D1D5DB] transition-colors w-full py-2 px-4 rounded-lg ${status == level ? "bg-[#0B6B67] text-white" : "bg-white"}`}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                <label className="text-sm font-semibold mb-2">Due date</label>
                <div>
                    <input
                        className="w-full mb-6 rounded-lg bg-white border text-xs border px-2 py-3 outline-none border-[#D1D5DB]"
                        type="date"
                        name="dueDate"
                        value={dueDate}
                        onChange={event => setDueDate(event.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="mt-auto shrink-0 pt-4">
                {!isLoading ? (
                    <button
                        className="w-full bg-[#0B6B67] text-white py-2 rounded-lg font-semibold text-sm"
                        type="submit"
                    >
                        Create task
                    </button>
                ) : (
                    <button
                        className="w-full text-[#9CA3AF] py-2 rounded-lg bg-white font-semibold text-sm"
                        type="button"
                        disabled
                    >
                        Creating task...
                    </button>
                )}
            </div>
        </form>
    );
}
