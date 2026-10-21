export type Task = {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate: string;
    publicId: string;
    isCompleted: boolean;
    createdAt: string;
    updateAt: string | null;
};

export type TasksResponse = {
    data: Task[];
};
