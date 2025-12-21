export interface Task {
  id: number;

  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  projectId: number;

  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
    title: string;
    description?: string;
    dueDate: string;
}

export interface UpdateTaskRequest {
    title?: string;
    description?: string;
    dueDate?: string;
    completed?: boolean;
}

export interface TaskFilter {
    query?: string;
    completed?: boolean;
    dueDateFrom?: string;
    dueDateTo?: string;
}