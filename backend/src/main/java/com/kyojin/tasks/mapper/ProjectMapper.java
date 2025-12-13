package com.kyojin.tasks.mapper;

import com.kyojin.tasks.dto.request.CreateProjectRequest;
import com.kyojin.tasks.dto.request.UpdateProjectRequest;
import com.kyojin.tasks.dto.response.ProjectDTO;
import com.kyojin.tasks.entity.Project;
import com.kyojin.tasks.entity.Task;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "totalTasks", ignore = true)
    @Mapping(target = "completedTasks", ignore = true)
    @Mapping(target = "progressPercentage", ignore = true)
    ProjectDTO toDTO(Project project);

    Project toEntity(CreateProjectRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProjectFromRequest(UpdateProjectRequest request, @MappingTarget Project project);

    @AfterMapping
    default void calculateProgress(Project project, @MappingTarget ProjectDTO dto) {
        List<Task> tasks = project.getTasks();

        if (tasks == null || tasks.isEmpty()) {
            dto.setTotalTasks(0);
            dto.setCompletedTasks(0);
            dto.setProgressPercentage(0.0);
            return;
        }

        int total = tasks.size();

        int completed = (int) tasks.stream()
                .filter(Task::isCompleted)
                .count();

        double percentage = ((double) completed / total) * 100;

        dto.setTotalTasks(total);
        dto.setCompletedTasks(completed);
        dto.setProgressPercentage(percentage);
    }
}