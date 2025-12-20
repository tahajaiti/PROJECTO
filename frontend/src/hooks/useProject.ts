import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../api/services/project.service";
import { CreateProjectRequest, ProjectFilter, UpdateProjectRequest } from "../types";

export const useProjects = (filter?: ProjectFilter, page = 0, size = 10) => {
  return useQuery({
    queryKey: ["projects", filter, page, size],
    queryFn: () => projectService.getAll(filter, page, size),
  });
};

export const useProject = (id: number) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => projectService.getById(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateProjectRequest) => projectService.create(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: UpdateProjectRequest }) => projectService.update(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => projectService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
