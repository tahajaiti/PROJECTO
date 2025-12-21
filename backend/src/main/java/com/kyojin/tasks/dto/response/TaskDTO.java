package com.kyojin.tasks.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private LocalDateTime dueDate;
    private Long projectId;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}