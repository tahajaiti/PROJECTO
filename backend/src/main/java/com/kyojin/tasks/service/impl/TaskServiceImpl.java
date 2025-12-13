package com.kyojin.tasks.service.impl;

import com.kyojin.tasks.core.exception.NotFoundException;
import com.kyojin.tasks.dto.filter.TaskFilterDTO;
import com.kyojin.tasks.dto.request.CreateTaskRequest;
import com.kyojin.tasks.dto.request.UpdateTaskRequest;
import com.kyojin.tasks.dto.response.TaskDTO;
import com.kyojin.tasks.entity.Project;
import com.kyojin.tasks.entity.Task;
import com.kyojin.tasks.mapper.TaskMapper;
import com.kyojin.tasks.repository.ProjectRepository;
import com.kyojin.tasks.repository.TaskRepository;
import com.kyojin.tasks.repository.spec.TaskSpecification;
import com.kyojin.tasks.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final TaskMapper taskMapper;

    @Override
    @Transactional
    public TaskDTO create(Long projectId, CreateTaskRequest request, Long userId) {
        log.info("Creating task for project ID: {} by user ID: {}", projectId, userId);

        Project project = projectRepository.findByIdAndUserId(projectId, userId)
                .orElseThrow(() -> new NotFoundException("Project not found or access denied"));

        Task task = taskMapper.toEntity(request);
        task.setProject(project);

        Task savedTask = taskRepository.save(task);

        log.info("Task created successfully with ID: {}", savedTask.getId());
        return taskMapper.toDTO(savedTask);
    }

    @Override
    public Page<TaskDTO> getAll(Long projectId, TaskFilterDTO filter, Pageable pageable, Long userId) {
        log.debug("Fetching tasks for project ID: {}", projectId);

        Specification<Task> spec = TaskSpecification.getSpec(projectId, userId, filter);

        return taskRepository.findAll(spec, pageable)
                .map(taskMapper::toDTO);
    }

    @Override
    public TaskDTO getById(Long taskId, Long userId) {
        Task task = findTaskOrThrow(taskId, userId);
        return taskMapper.toDTO(task);
    }

    @Override
    @Transactional
    public TaskDTO update(Long taskId, UpdateTaskRequest request, Long userId) {
        log.info("Updating task ID: {}", taskId);

        Task task = findTaskOrThrow(taskId, userId);

        taskMapper.updateTaskFromRequest(request, task);

        return taskMapper.toDTO(taskRepository.save(task));
    }

    @Override
    @Transactional
    public TaskDTO toggleStatus(Long taskId, Long userId) {
        log.info("Toggling status for task ID: {}", taskId);

        Task task = findTaskOrThrow(taskId, userId);

        task.setCompleted(!task.isCompleted());

        return taskMapper.toDTO(taskRepository.save(task));
    }

    @Override
    @Transactional
    public void delete(Long taskId, Long userId) {
        log.info("Deleting task ID: {}", taskId);

        Task task = findTaskOrThrow(taskId, userId);

        taskRepository.delete(task);
    }

    private Task findTaskOrThrow(Long taskId, Long userId) {
        return taskRepository.findByIdAndProjectUserId(taskId, userId)
                .orElseThrow(() -> {
                    log.error("Task ID: {} not found or does not belong to user ID: {}", taskId, userId);
                    return new NotFoundException("Task not found or access denied");
                });
    }
}