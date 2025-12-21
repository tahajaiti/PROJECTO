import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../api/services/task.service";
import { CreateTaskRequest, UpdateTaskRequest, TaskFilter } from "../types";

export const useTasks = (projectId: number, filter?: TaskFilter, page = 0, size = 10) => {
  return useQuery({
    queryKey: ["tasks", projectId, filter, page, size],
    queryFn: () => taskService.getAll(projectId, filter, page, size),
    enabled: !!projectId,
  });
};

export const useTask = (id: number) => {
  return useQuery({
    queryKey: ["tasks", "detail", id],
    queryFn: () => taskService.getById(id),
    enabled: !!id,
  });
};

export const useCreateTask = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateTaskRequest) => taskService.create(projectId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
      queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
    },
  });
};

export const useUpdateTask = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: UpdateTaskRequest }) => taskService.update(id, request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks", "detail", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
    },
  });
};

export const useDeleteTask = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => taskService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
    },
  });
};

export const useToggleTaskStatus = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => taskService.toggleStatus(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks", "detail", id] });
      queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
    },
  });
};


