package com.kyojin.tasks.mapper;

import com.kyojin.tasks.dto.request.CreateTaskRequest;
import com.kyojin.tasks.dto.request.UpdateTaskRequest;
import com.kyojin.tasks.dto.response.TaskDTO;
import com.kyojin.tasks.entity.Task;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    @Mapping(target = "projectId", source = "project.id")
    TaskDTO toDTO(Task task);

    Task toEntity(CreateTaskRequest request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateTaskFromRequest(UpdateTaskRequest request, @MappingTarget Task task);
}