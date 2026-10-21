type TaskCardProps = {
    title: string;
    priority: string;
};

export default function TaskCard({ title, priority }: TaskCardProps) {
    const changePriorityColors =
        priority == "high"
            ? "bg-[#FEE4E3] text-[#A94442]"
            : priority === "medium"
              ? "bg-[#FEF3C7] text-[#92400E]"
              : "bg-[#DBEAFE] text-[#1E40AF]";

    return (
        <section className="bg-white mt-2 w-full border border-[#E5E7EB] py-3 rounded-lg mb-2 pl-3">
            <div className="flex justify-between items-center pb-2 text-sm">
                <div className="flex items-center font-medium text-[#101727]">
                    <input
                        type="checkbox"
                        className="peer border border-[#9CA3AF] mr-2"
                    />
                    <label className="peer-checked:line-through peer-checked:text-[#E5E7EB]">
                        {title}
                    </label>
                </div>
            </div>

            <span
                className={`text-xs rounded-full  px-3 py-1 ${changePriorityColors}`}
            >
                {priority}
            </span>
        </section>
    );
}
