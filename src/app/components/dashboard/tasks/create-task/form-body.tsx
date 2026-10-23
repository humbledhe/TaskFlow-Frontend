"use client";

import { useState } from "react";

type Priority = {
    priority: "Low" | "Medium" | "High";
};

type Status = {
    status: "To do" | "In progress" | "Done";
};

export default function FormBody() {
    const [priority, setPriority] = useState<Priority>("Medium");
    const [status, setStatus] = useState<Status>("To do");
    const [dueDate, setDueDate] = useState("");

    const priorities: Priority[] = ["Low", "Medium", "High"];
    const statusLevel: Status[] = ["To do", "In progress", "Done"];
    return (
        <form className="flex min-h-0 flex-1 flex-col">
            <div className="shrink-0">
                <label className="text-sm font-semibold mb-2">Title</label>
                <input
                    className="w-full mb-6 rounded-lg bg-white border text-xs border-2 border-[#0B6B67] px-2 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-[#D1D5DB]"
                    placeholder="What needs doing"
                />

                <label className="text-sm font-semibold mb-2">Priority</label>

                <div className="flex justify-between text-xs gap-2 font-medium mb-6">
                    {priorities.map(level => (
                        <button
                            key={level}
                            type="button"
                            onClick={() => setPriority(level)}
                            aria-pressed={priority == level}
                            className={`border border-[#D1D5DB] transition-colors w-full py-2 px-4 rounded-lg ${priority == level ? "bg-[#0B6B67] text-white" : "bg-white"}`}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                <label className="text-sm font-semibold mb-2">Status</label>

                <div className="flex justify-between text-xs gap-2 font-medium mb-6">
                    {statusLevel.map(level => (
                        <button
                            key={level}
                            type="button"
                            onClick={() => setStatus(level)}
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
                    />
                </div>
            </div>

            <div className="mt-auto shrink-0 pt-4">
                <button
                    className="w-full bg-[#0B6B67] text-white py-2 rounded-lg font-semibold text-sm"
                    type="submit"
                >
                    Create task
                </button>
            </div>
        </form>
    );
}
