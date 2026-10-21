import { getUserTasks } from "@/app/lib/userTasks";
import TaskCard from "@/app/components/taskCard";

export default async function Tasks() {
    const userTasks = await getUserTasks();

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
