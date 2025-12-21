import { memo, useCallback } from "react";
import { Task } from "../../types";
import {
    FaCalendarAlt,
    FaClock,
    FaCheckCircle,
    FaRegCircle,
    FaPen,
    FaTrash,
    FaExclamationTriangle,
    FaProjectDiagram,
    FaHistory,
    FaTimes,
} from "react-icons/fa";
import {
    format,
    formatDistanceToNow,
    differenceInDays,
    isPast,
    isToday,
    isTomorrow,
} from "date-fns";

interface TaskViewProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
}

const TaskView = memo(({ isOpen, onClose, task, onEdit, onDelete }: TaskViewProps) => {
    const dueDate = new Date(task.dueDate);
    const createdDate = new Date(task.createdAt);
    const updatedDate = new Date(task.updatedAt);

    const isOverdue = !task.completed && isPast(dueDate) && !isToday(dueDate);
    const taskAgeDays = differenceInDays(new Date(), createdDate);

    const handleOutsideClick = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        },
        [onClose]
    );

    const handleEdit = useCallback(() => {
        onEdit();
        onClose();
    }, [onEdit, onClose]);

    const handleDelete = useCallback(() => {
        onDelete();
    }, [onDelete]);

    if (!isOpen) return null;

    const getStatusColor = () => {
        if (task.completed) return "text-green-400 bg-green-400/10";
        if (isOverdue) return "text-red-400 bg-red-400/10";
        return "text-amber-400 bg-amber-400/10";
    };

    const getStatusText = () => {
        if (task.completed) return "Completed";
        if (isOverdue) return "Overdue";
        return "Pending";
    };

    const getStatusIcon = () => {
        if (task.completed) return <FaCheckCircle className="w-4 h-4" />;
        if (isOverdue) return <FaExclamationTriangle className="w-4 h-4" />;
        return <FaRegCircle className="w-4 h-4" />;
    };

    const getDueDateText = () => {
        if (task.completed) return "Completed";
        if (isToday(dueDate)) return "Due today";
        if (isTomorrow(dueDate)) return "Due tomorrow";
        if (isOverdue) {
            return formatDistanceToNow(dueDate, { addSuffix: true }).replace("ago", "overdue");
        }
        return formatDistanceToNow(dueDate, { addSuffix: true }).replace("in ", "") + " left";
    };

    const getTaskAgeText = () => {
        if (taskAgeDays === 0) return "Created today";
        return formatDistanceToNow(createdDate, { addSuffix: true });
    };

    const formatFullDate = (date: Date) => format(date, "MMM d, yyyy");
    const formatDateTime = (date: Date) => format(date, "MMM d, yyyy 'at' h:mm a");

    return (
        <div
            onClick={handleOutsideClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-lg mx-4 shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                    <h2 className="text-white text-lg font-medium">Task Details</h2>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-white transition-colors p-1 cursor-pointer"
                    >
                        <FaTimes className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-white text-xl font-semibold">{task.title}</h3>
                            <span className={`flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap ${getStatusColor()}`}>
                                {getStatusIcon()}
                                {getStatusText()}
                            </span>
                        </div>
                        {task.description ? (
                            <p className="text-zinc-400 mt-2 whitespace-pre-wrap">{task.description}</p>
                        ) : (
                            <p className="text-zinc-500 italic mt-2">No description provided</p>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-zinc-800/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-zinc-400 mb-1">
                                <FaCalendarAlt className="w-4 h-4" />
                                <span className="text-sm">Due Date</span>
                            </div>
                            <p className={`text-lg font-semibold ${isOverdue ? "text-red-400" : "text-white"}`}>
                                {formatFullDate(dueDate)}
                            </p>
                        </div>

                        <div className="bg-zinc-800/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-zinc-400 mb-1">
                                <FaClock className="w-4 h-4" />
                                <span className="text-sm">Time Left</span>
                            </div>
                            <p className={`text-lg font-semibold ${isOverdue ? "text-red-400" : task.completed ? "text-green-400" : "text-white"}`}>
                                {getDueDateText()}
                            </p>
                        </div>

                        <div className="bg-zinc-800/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-zinc-400 mb-1">
                                <FaProjectDiagram className="w-4 h-4" />
                                <span className="text-sm">Project ID</span>
                            </div>
                            <p className="text-white text-lg font-semibold">#{task.projectId}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Timeline</h4>
                        <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <FaClock className="w-3.5 h-3.5" />
                                    <span className="text-sm">Created</span>
                                </div>
                                <span className="text-white text-sm">{formatDateTime(createdDate)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <FaHistory className="w-3.5 h-3.5" />
                                    <span className="text-sm">Last Updated</span>
                                </div>
                                <span className="text-white text-sm">{formatDateTime(updatedDate)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <FaCalendarAlt className="w-3.5 h-3.5" />
                                    <span className="text-sm">Task Age</span>
                                </div>
                                <span className="text-white text-sm">{getTaskAgeText()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-3 p-4 border-t border-zinc-800">
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg text-red-400 hover:bg-red-400/10 transition-all cursor-pointer"
                    >
                        <FaTrash className="w-3.5 h-3.5" />
                        Delete
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm rounded-lg text-zinc-300 hover:bg-zinc-800 transition-all cursor-pointer"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleEdit}
                            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all cursor-pointer"
                        >
                            <FaPen className="w-3 h-3" />
                            Edit Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default TaskView;