import { memo, useCallback } from "react";
import { Project } from "../../types";
import { FaArrowRight, FaBatteryHalf, FaCheckCircle, FaTasks, FaTimes } from "react-icons/fa";

interface ProjectViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: (projectId: number) => void;
  project: Project;
}

const ProjectView = memo(({ isOpen, onClose, onOpen, project }: ProjectViewModalProps) => {
  const totalTasks = project.totalTasks;
  const completedTasks = project.completedTasks;
  const percentage = project.progressPercentage;

  const handleOutsideClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleOpen = useCallback(() => {
    onOpen(project.id);
    onClose();
  }, [onOpen, project.id, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-lg mx-4 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-white text-lg font-medium">Project Details</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-1"
            aria-label="Close modal"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-white text-xl font-semibold">{project.title}</h3>
            {project.description && (
              <p className="text-zinc-400 mt-2">{project.description}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-zinc-400 mb-1">
                <FaTasks className="w-4 h-4" />
                <span className="text-sm">Total</span>
              </div>
              <p className="text-white text-2xl font-semibold">{totalTasks}</p>
            </div>

            <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-zinc-400 mb-1">
                <FaCheckCircle className="w-4 h-4" />
                <span className="text-sm">Done</span>
              </div>
              <p className="text-white text-2xl font-semibold">{completedTasks}</p>
            </div>

            <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-zinc-400 mb-1">
                <FaBatteryHalf className="w-4 h-4" />
                <span className="text-sm">Progress</span>
              </div>
              <p className="text-white text-2xl font-semibold">{percentage}%</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Completion</span>
              <span className="text-white">{completedTasks}/{totalTasks} tasks</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleOpen}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Open Project
            <FaArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
});

export default ProjectView