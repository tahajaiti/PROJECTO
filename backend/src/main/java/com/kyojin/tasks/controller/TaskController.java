package com.kyojin.tasks.controller;

import com.kyojin.tasks.core.annotation.AuthUser;
import com.kyojin.tasks.dto.filter.TaskFilterDTO;
import com.kyojin.tasks.dto.request.CreateTaskRequest;
import com.kyojin.tasks.dto.request.UpdateTaskRequest;
import com.kyojin.tasks.dto.response.TaskDTO;
import com.kyojin.tasks.security.UserPrincipal;
import com.kyojin.tasks.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/projects/{projectId}/tasks")
    public ResponseEntity<TaskDTO> create(
            @PathVariable Long projectId,
            @Valid @RequestBody CreateTaskRequest request,
            @AuthUser UserPrincipal userPrincipal
    ) {
        TaskDTO task = taskService.create(projectId, request, userPrincipal.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @GetMapping("/projects/{projectId}/tasks")
    public ResponseEntity<Page<TaskDTO>> getAll(
            @PathVariable Long projectId,
            @AuthUser UserPrincipal userPrincipal,
            TaskFilterDTO filter,
            Pageable pageable
    ) {
        Page<TaskDTO> tasks = taskService.getAll(projectId, filter, pageable, userPrincipal.getId());
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/tasks/{id}")
    public ResponseEntity<TaskDTO> getById(
            @PathVariable Long id,
            @AuthUser UserPrincipal userPrincipal
    ) {
        TaskDTO task = taskService.getById(id, userPrincipal.getId());
        return ResponseEntity.ok(task);
    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<TaskDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateTaskRequest request,
            @AuthUser UserPrincipal userPrincipal
    ) {
        TaskDTO updatedTask = taskService.update(id, request, userPrincipal.getId());
        return ResponseEntity.ok(updatedTask);
    }

    @PatchMapping("/tasks/{id}/status")
    public ResponseEntity<TaskDTO> toggleStatus(
            @PathVariable Long id,
            @AuthUser UserPrincipal userPrincipal
    ) {
        TaskDTO updatedTask = taskService.toggleStatus(id, userPrincipal.getId());
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @AuthUser UserPrincipal userPrincipal
    ) {
        taskService.delete(id, userPrincipal.getId());
        return ResponseEntity.noContent().build();
    }
}