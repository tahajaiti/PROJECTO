import { useCallback, useState } from "react";
import { Project } from "../../types";
import ProjectModal from "./ProjectModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import useConfirmStore from "../../stores/confirmStore";
import { useNavigate } from "react-router-dom";
import ProjectView from "./ProjectView";


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
        className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors cursor-pointer">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-white font-medium">{project.title}</h3>
            {project.description && (
              <p className="text-zinc-400 text-sm mt-1">{project.description}</p>
            )}
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <FaEdit className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="text-zinc-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
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