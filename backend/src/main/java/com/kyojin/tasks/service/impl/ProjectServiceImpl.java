package com.kyojin.tasks.service.impl;

import com.kyojin.tasks.core.exception.NotFoundException;
import com.kyojin.tasks.dto.request.CreateProjectRequest;
import com.kyojin.tasks.dto.request.ProjectFilterDTO;
import com.kyojin.tasks.dto.request.UpdateProjectRequest;
import com.kyojin.tasks.dto.response.ProjectDTO;
import com.kyojin.tasks.entity.Project;
import com.kyojin.tasks.entity.User;
import com.kyojin.tasks.mapper.ProjectMapper;
import com.kyojin.tasks.repository.ProjectRepository;
import com.kyojin.tasks.repository.UserRepository;
import com.kyojin.tasks.repository.spec.ProjectSpecification;
import com.kyojin.tasks.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final ProjectMapper projectMapper;

    @Override
    @Transactional
    public ProjectDTO create(CreateProjectRequest request, Long userId) {
        log.info("Request received to create project for user ID: {}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("Attempted to create project for non-existent user ID: {}", userId);
                    return new NotFoundException("User not found");
                });

        Project project = projectMapper.toEntity(request);
        project.setUser(user);

        Project savedProject = projectRepository.save(project);

        log.info("Project created successfully with ID: {}", savedProject.getId());
        return projectMapper.toDTO(savedProject);
    }

    @Override
    public Page<ProjectDTO> getAll(ProjectFilterDTO filter, Pageable pageable, Long userId) {
        log.debug("Fetching projects for user ID: {} with filter: {}", userId, filter);

        Specification<Project> spec = ProjectSpecification.getSpec(filter, userId);
        Page<Project> projectPage = projectRepository.findAll(spec, pageable);

        return projectPage.map(projectMapper::toDTO);
    }

    @Override
    public ProjectDTO getById(Long projectId, Long userId) {
        log.debug("Fetching project ID: {} for user ID: {}", projectId, userId);

        Project project = findProjectOrThrow(projectId, userId);

        return projectMapper.toDTO(project);
    }

    @Override
    @Transactional
    public ProjectDTO update(Long projectId, UpdateProjectRequest request, Long userId) {
        log.info("Updating project ID: {} for user ID: {}", projectId, userId);

        Project project = findProjectOrThrow(projectId, userId);

        projectMapper.updateProjectFromRequest(request, project);

        Project updatedProject = projectRepository.save(project);

        log.info("Project ID: {} updated successfully", projectId);
        return projectMapper.toDTO(updatedProject);
    }

    @Override
    @Transactional
    public void delete(Long projectId, Long userId) {
        log.info("Request to delete project ID: {} for user ID: {}", projectId, userId);

        Project project = findProjectOrThrow(projectId, userId);

        projectRepository.delete(project);
        log.info("Project ID: {} deleted successfully", projectId);
    }

    private Project findProjectOrThrow(Long projectId, Long userId) {
        return projectRepository.findByIdAndUserId(projectId, userId)
                .orElseThrow(() -> {
                    log.error("Project ID: {} not found or does not belong to user ID: {}", projectId, userId);
                    return new NotFoundException("Project not found or access denied");
                });
    }
}