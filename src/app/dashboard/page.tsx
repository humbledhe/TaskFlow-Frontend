import TaskListCard from "@/app/components/taskListCard";
import Header from "@/app/dashboard/components/header";
import Tasks from "@/app/dashboard/components/tasks";

import { FaPlus } from "react-icons/fa";

const inputStyles =
    "w-full rounded-lg bg-white border border-gray-300 px-2 py-1 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-[#D1D5DB]";

export default function DashboardPage() {
    return (
        <>
            <header>
                <Header />
            </header>

            <main>
                <section className="p-6 bg-[#F5F6F8] min-h-screen">
                    <h1 className="text-[#101727] font-medium text-xl">
                        My Tasks
                    </h1>

                    <div className="mt-6 text-sm">
                        <input
                            type="search"
                            placeholder="Search tasks"
                            className={inputStyles}
                        />
                    </div>
                    <Tasks />
                </section>
            </main>
            <footer>
                <button className="fixed right-10 bottom-10 border bg-[#0B6B67] p-5 rounded-full">
                    <FaPlus size={20} />
                </button>
            </footer>
        </>
        // <section classNae="px-8 pt-8 bg-[#F5F6F8] min-h-screen">
        //     <div className="flex justify-between">
        //         <h1 className="text-[#101727] font-medium">My Tasks</h1>
        //         <button classNam
        // sectioe="bg-[#0B6B67] text-white">New Tasks</button>
        //     </div>

        //     <TaskListCard />

        //     <div className="flex justify-between">
        //         <button className="text-[#101727] font-semibold">
        //             Previous
        //         </button>
        //         <span className="text-[#D1D5DB] font-semibold">Page 1</span>
        //         <button className="text-[#101727] font-semibold">Next</button>
        //     </div>
        // </section>
    );
}
