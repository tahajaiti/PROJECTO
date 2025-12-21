import { useCallback, useState } from "react";
import { Task } from "../../types";
import { FaEdit, FaTrash, FaClock, FaCalendar, FaCheck } from "react-icons/fa";
import useConfirmStore from "../../stores/confirmStore";
import { formatDate } from "../../util/date.util";
import TaskModal from "./TaskModal";
import TaskView from "./TaskView";

interface TaskCardProps {
    task: Task;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}

const TaskCard = ({ task, onDelete, onToggle }: TaskCardProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const showConfirm = useConfirmStore((state) => state.showModal);

    const handleDelete = useCallback(() => {
        showConfirm(
            `This will permanently delete "${task.title}". This action cannot be undone.`,
            () => onDelete(task.id),
            "DELETE_TASK"
        );
    }, [showConfirm, task.id, task.title, onDelete]);

    const handleToggle = useCallback(() => {
        onToggle(task.id);
    }, [onToggle, task.id]);

    const handleOpenEdit = useCallback(() => {
        setIsViewOpen(false);
        setIsEditModalOpen(true);
    }, []);

    const isOverdue = !task.completed && new Date(task.dueDate) < new Date();

    return (
        <>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-all group">
                <div className="flex items-start gap-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggle();
                        }}
                        className={`mt-0.5 w-5 h-5 rounded border shrink-0 flex items-center justify-center transition-all cursor-pointer ${task.completed
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-zinc-600 hover:border-zinc-500"
                            }`}
                    >
                        {task.completed && <FaCheck className="w-3 h-3" />}
                    </button>

                    <div
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => setIsViewOpen(true)}
                    >
                        <h3
                            className={`font-medium truncate transition-colors ${task.completed ? "text-zinc-500 line-through" : "text-white group-hover:text-blue-400"
                                }`}
                        >
                            {task.title}
                        </h3>

                        {task.description && (
                            <p
                                className={`text-sm mt-1 line-clamp-2 ${task.completed ? "text-zinc-600" : "text-zinc-400"
                                    }`}
                            >
                                {task.description}
                            </p>
                        )}

                        <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                                <FaClock className="w-3 h-3" />
                                <span>{formatDate(task.createdAt)}</span>
                            </div>

                            <div
                                className={`flex items-center gap-1.5 text-xs ${isOverdue ? "text-red-500 font-medium" : "text-zinc-500"
                                    }`}
                            >
                                <FaCalendar className="w-3 h-3" />
                                <span>{formatDate(task.dueDate)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditModalOpen(true);
                            }}
                            className="text-zinc-400 hover:text-white transition-colors p-1 cursor-pointer"
                            title="Edit"
                        >
                            <FaEdit className="w-4 h-4" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete();
                            }}
                            className="text-zinc-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            title="Delete"
                        >
                            <FaTrash className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <TaskModal
                projectId={task.projectId}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                task={task}
            />

            <TaskView
                isOpen={isViewOpen}
                onClose={() => setIsViewOpen(false)}
                task={task}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
            />
        </>
    );
};

export default TaskCard;