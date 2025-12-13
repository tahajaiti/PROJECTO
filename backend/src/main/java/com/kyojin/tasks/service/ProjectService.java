package com.kyojin.tasks.service;

import com.kyojin.tasks.dto.request.CreateProjectRequest;
import com.kyojin.tasks.dto.filter.ProjectFilterDTO;
import com.kyojin.tasks.dto.request.UpdateProjectRequest;
import com.kyojin.tasks.dto.response.ProjectDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProjectService {

    ProjectDTO create(CreateProjectRequest request, Long userId);

    Page<ProjectDTO> getAll(ProjectFilterDTO filter, Pageable pageable, Long userId);

    ProjectDTO getById(Long projectId, Long userId);

    ProjectDTO update(Long projectId, UpdateProjectRequest request, Long userId);

    void delete(Long projectId, Long userId);
}
