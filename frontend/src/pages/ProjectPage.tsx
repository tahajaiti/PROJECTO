import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import { useTasks, useDeleteTask, useToggleTaskStatus } from "../hooks/useTask";
import { useTaskParams } from "../hooks/useTaskParams";

import TaskModal from "../components/task/TaskModal";
import TaskColumn from "../components/task/TaskColumn";
import ProjectStats from "../components/project/ProjectStats";
import ProjectHeader from "../components/project/ProjectHeader";
import TaskFilters from "../components/task/TaskFilters";

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { appliedFilters, setAppliedFilters, apiFilterParams, showCompleted } = useTaskParams();

  const { data: project, isLoading: isProjectLoading } = useProject(projectId);

  const { data: pendingData, isLoading: isPending } = useTasks(
    projectId,
    { ...apiFilterParams, completed: false },
    0, 50
  );

  const { data: completedData, isLoading: isCompletedLoading } = useTasks(
    projectId,
    { ...apiFilterParams, completed: true },
    0, 50
  );

  const { mutate: deleteTask } = useDeleteTask(projectId);
  const { mutate: toggleTask } = useToggleTaskStatus(projectId);

  const isLoading = isProjectLoading || isPending || (showCompleted && isCompletedLoading);

  if (isLoading && !project) return <div className="p-12 text-center text-zinc-500">Loading...</div>;
  if (!project) return <div className="p-12 text-center text-zinc-500">Project not found</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <ProjectHeader
          title={project.title}
          description={project.description}
          onAddTask={() => setIsModalOpen(true)}
        />
        <ProjectStats
          totalTasks={project.totalTasks}
          completedTasks={project.completedTasks}
          progressPercentage={project.progressPercentage}
        />
      </div>

      <TaskFilters
        appliedFilters={appliedFilters}
        onApply={setAppliedFilters}
      />

      <div className={`grid gap-6 ${showCompleted ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        <TaskColumn
          title="To Do"
          tasks={pendingData?.content ?? []}
          emptyMessage="No tasks found"
          onDelete={deleteTask}
          onToggle={toggleTask}
        />

        {showCompleted && (
          <TaskColumn
            title="Completed"
            tasks={completedData?.content ?? []}
            emptyMessage="No completed tasks found"
            onDelete={deleteTask}
            onToggle={toggleTask}
          />
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectId={projectId}
      />
    </div>
  );
};

export default ProjectPage;