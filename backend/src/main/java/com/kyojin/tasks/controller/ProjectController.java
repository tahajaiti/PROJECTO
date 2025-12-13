package com.kyojin.tasks.controller;

import com.kyojin.tasks.core.annotation.AuthUser;
import com.kyojin.tasks.dto.request.CreateProjectRequest;
import com.kyojin.tasks.dto.request.ProjectFilterDTO;
import com.kyojin.tasks.dto.request.UpdateProjectRequest;
import com.kyojin.tasks.dto.response.ProjectDTO;
import com.kyojin.tasks.security.UserPrincipal;
import com.kyojin.tasks.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@Valid @RequestBody CreateProjectRequest request,
                                                    @AuthUser UserPrincipal userPrincipal) {
        var dto = projectService.create(request, userPrincipal.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @GetMapping
    public ResponseEntity<Page<ProjectDTO>> getAll(
            @AuthUser UserPrincipal userPrincipal,
            ProjectFilterDTO filter,
            Pageable pageable
    ) {
        Page<ProjectDTO> projects = projectService.getAll(filter, pageable, userPrincipal.getId());
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getById(
            @PathVariable Long id,
            @AuthUser UserPrincipal userPrincipal
    ) {
        ProjectDTO project = projectService.getById(id, userPrincipal.getId());
        return ResponseEntity.ok(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProjectRequest request,
            @AuthUser UserPrincipal userPrincipal
    ) {
        ProjectDTO updatedProject = projectService.update(id, request, userPrincipal.getId());
        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @AuthUser UserPrincipal userPrincipal
    ) {
        projectService.delete(id, userPrincipal.getId());
        return ResponseEntity.noContent().build();
    }
}
