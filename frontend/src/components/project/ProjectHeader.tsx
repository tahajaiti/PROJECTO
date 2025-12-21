import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ProjectHeaderProps {
    title: string;
    description?: string;
    onAddTask: () => void;
}

const ProjectHeader = ({ title, description, onAddTask }: ProjectHeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-4">
            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
                <FaArrowLeft className="w-4 h-4" />
                <span>Back to Projects</span>
            </button>

            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-white">{title}</h1>
                    {description && (
                        <p className="text-zinc-400 mt-1">{description}</p>
                    )}
                </div>
                <button
                    onClick={onAddTask}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
                >
                    <FaPlus className="w-3 h-3" />
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default ProjectHeader;