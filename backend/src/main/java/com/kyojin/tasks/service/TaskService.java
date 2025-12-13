package com.kyojin.tasks.service;

import com.kyojin.tasks.dto.filter.TaskFilterDTO;
import com.kyojin.tasks.dto.request.CreateTaskRequest;
import com.kyojin.tasks.dto.request.UpdateTaskRequest;
import com.kyojin.tasks.dto.response.TaskDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {

    TaskDTO create(Long projectId, CreateTaskRequest request, Long userId);

    Page<TaskDTO> getAll(Long projectId, TaskFilterDTO filter, Pageable pageable, Long userId);

    TaskDTO getById(Long taskId, Long userId);

    TaskDTO update(Long taskId, UpdateTaskRequest request, Long userId);

    TaskDTO toggleStatus(Long taskId, Long userId);

    void delete(Long taskId, Long userId);
}