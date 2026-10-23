import { getUserTasks } from "@/app/lib/tasks/user-tasks";
import TaskCard from "../home/task-card";

export default async function Tasks() {
    const userTasks = await getUserTasks();

    if (userTasks.data.length === 0) {
        return <p>You do not have any tasks</p>;
    }

    return (
        <div>
            {userTasks.data.map(userTask => (
                <TaskCard
                    key={userTask.publicId}
                    title={userTask.title}
                    priority={userTask.priority}
                />
            ))}
        </div>
    );
}
