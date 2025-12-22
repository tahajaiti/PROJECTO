import { CreateProjectRequest, Page, Project, ProjectFilter, UpdateProjectRequest } from "../../types";
import { toSearchParams } from "../../util/params.util";
import api from "../client";

const getAll = async (filter?: ProjectFilter, page = 0, size = 10) => {
  const params = toSearchParams({
    page,
    size,
    sort: "createdAt,DESC",
    ...filter,
  });

  const { data } = await api.get<Page<Project>>(`/v1/projects?${params}`);
  return data;
};

const getById = async (id: number) => {
  const { data } = await api.get<Project>(`/v1/projects/${id}`);
  return data;
};

const create = async (request: CreateProjectRequest) => {
  const { data } = await api.post<Project>("/v1/projects", request);
  return data;
};

const update = async (id: number, request: UpdateProjectRequest) => {
  const { data } = await api.put<Project>(`/v1/projects/${id}`, request);
  return data;
};

const remove = async (id: number) => {
  await api.delete(`/v1/projects/${id}`);
};

export const projectService = {
    getAll,
    getById,
    create,
    update,
    remove,
}
