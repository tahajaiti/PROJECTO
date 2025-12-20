import { useCallback, useState } from "react";
import { Project } from "../../types";
import ProjectModal from "./ProjectModal";
import { FaEdit, FaTrash, FaClock } from "react-icons/fa";
import useConfirmStore from "../../stores/confirmStore";
import { useNavigate } from "react-router-dom";
import ProjectView from "./ProjectView";
import { formatDate } from "../../util/date.util";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
}

const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const showConfirm = useConfirmStore((state) => state.showModal);

  const handleDelete = useCallback(() => {
    showConfirm(
      `This will permanently delete "${project.title}". This action cannot be undone.`,
      () => onDelete(project.id),
      "DELETE_PROJECT"
    );
  }, [showConfirm, project.id, project.title, onDelete]);

  const handleOpenProject = useCallback((projectId: number) => {
    navigate(`/projects/${projectId}`);
  }, [navigate]);

  return (
    <>
      <div
        onClick={() => setIsViewModalOpen(true)}
        className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate">{project.title}</h3>
            {project.description && (
              <p className="text-zinc-400 text-sm mt-1 line-clamp-2">
                {project.description}
              </p>
            )}
            <div className="flex items-center gap-1.5 mt-3 text-zinc-500 text-xs">
              <FaClock className="w-3 h-3" />
              <span>{formatDate(project.createdAt)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="text-zinc-400 hover:text-white transition-colors p-1"
            >
              <FaEdit className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="text-zinc-400 hover:text-red-500 transition-colors p-1"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={project}
      />

      <ProjectView
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onOpen={handleOpenProject}
        project={project}
      />
    </>
  );
};

export default ProjectCard;