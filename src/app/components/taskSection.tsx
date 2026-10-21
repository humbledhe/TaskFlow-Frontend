import TaskCard from "./taskCard";

const tasks = [
    {
        title: "Draft API error-handling notes",
        priority: "high"
    },
    {
        title: "Review pull requests",
        priority: "medium"
    },
    {
        title: "Plan next weeks study blocks",
        priority: "low"
    }
];

export default function TaskSection() {
    return (
        <section>
            {tasks.map(task => (
                <TaskCard
                    key={task.title}
                    title={task.title}
                    priority={task.priority}
                    date={task.date}
                />
            ))}
        </section>
    );
}
