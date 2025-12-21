import { CreateTaskRequest, Page, Task, TaskFilter } from "../../types";
import { toSearchParams } from "../../util/params.util";
import api from "../client";

const getAll = async (projectId: number, filter: TaskFilter = {}, page = 0, size = 10) => {
    const params = toSearchParams({
        page,
        size,
        ...filter,
    });

    const { data } = await api.get<Page<Task>>(`/v1/projects/${projectId}/tasks`, { params });

    return data;
};

const getById = async (id: number) => {
    const { data } = await api.get<Task>(`/v1/tasks/${id}`);
    return data;
};

const create = async (projectId: number, request: CreateTaskRequest) => {
    const { data } = await api.post<Task>(`/v1/projects/${projectId}/tasks`, request);
    return data;
};

const update = async (id: number, request: Partial<CreateTaskRequest>) => {
    const { data } = await api.put<Task>(`/v1/tasks/${id}`, request);
    return data;
};

const remove = async (id: number) => {
    await api.delete(`/v1/tasks/${id}`);
};

const toggleStatus = async (id: number) => {
    const { data } = await api.patch<Task>(`/v1/tasks/${id}/status`);
    return data;
};

export const taskService = {
    getAll,
    getById,
    create,
    update,
    remove,
    toggleStatus,
};
