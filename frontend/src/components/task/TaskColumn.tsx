import { Task } from "../../types";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
    title: string;
    tasks: Task[];
    emptyMessage: string;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}

const TaskColumn = ({ title, tasks, emptyMessage, onDelete, onToggle }: TaskColumnProps) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">{title}</h2>
                <span className="text-sm text-zinc-500">{tasks.length} tasks</span>
            </div>

            {tasks.length === 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-center">
                    <p className="text-zinc-500">{emptyMessage}</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={onDelete}
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
export default TaskColumn;