export interface Project {
  id: number;
  
  title: string;
  description?: string;

  userId: number;

  totalTasks: number;
  completedTasks: number;
  progressPercentage: number;

  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  title: string;
  description?: string;
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
}

export interface ProjectFilter {
  query?: string;
}