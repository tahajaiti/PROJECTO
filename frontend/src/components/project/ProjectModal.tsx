import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Project } from "../../types";
import { useCreateProject, useUpdateProject } from "../../hooks/useProject";
import { FaTimes } from "react-icons/fa";

const projectSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
    description: z.string().max(500, "Description is too long").optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project?: Project | null;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
    const isEditing = !!project;

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
    });

    const createProject = useCreateProject();
    const updateProject = useUpdateProject();

    const isPending = createProject.isPending || updateProject.isPending;
    const error = isEditing ? updateProject.error : createProject.error;

    useEffect(() => {
        if (isOpen && project) {
            reset({
                title: project.title,
                description: project.description || "",
            });
        } else if (isOpen) {
            reset({ title: "", description: "" });
        }
    }, [isOpen, project, reset]);

    const onSubmit = async (data: ProjectFormData) => {
        try {
            if (isEditing && project.id) {
                await updateProject.mutateAsync({ id: project.id, request: data });
            } else {
                await createProject.mutateAsync(data);
            }
            handleClose();
        } catch (err) {
            console.error("Failed to save project:", err);
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

            <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-md p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">
                        {isEditing ? "Edit Project" : "Create Project"}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-sm">
                        {error.message || "An error occurred. Please try again."}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                            Name
                        </label>
                        <input
                            type="text"
                            {...register("title")}
                            className={`w-full px-4 py-2.5 bg-zinc-800/50 border rounded-lg focus:outline-none focus:ring-2 transition-all placeholder:text-zinc-500 ${errors.title
                                ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                : "border-zinc-700 focus:ring-blue-500/50 focus:border-blue-500"
                                }`}
                            placeholder="Project title"
                        />
                        {errors.title && (
                            <p className="text-red-400 text-sm mt-1.5">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                            Description
                        </label>
                        <textarea
                            {...register("description")}
                            rows={3}
                            className={`w-full px-4 py-2.5 bg-zinc-800/50 border rounded-lg focus:outline-none focus:ring-2 transition-all placeholder:text-zinc-500 resize-none ${errors.description
                                ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                : "border-zinc-700 focus:ring-blue-500/50 focus:border-blue-500"
                                }`}
                            placeholder="Project description (optional)"
                        />
                        {errors.description && (
                            <p className="text-red-400 text-sm mt-1.5">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-2.5 text-sm rounded-lg text-zinc-300 bg-zinc-700 hover:bg-red-600 transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 px-4 py-2.5 text-sm bg-blue-600 rounded-lg font-medium hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isPending ? (isEditing ? "Saving..." : "Creating...") : (isEditing ? "Save" : "Create")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectModal;