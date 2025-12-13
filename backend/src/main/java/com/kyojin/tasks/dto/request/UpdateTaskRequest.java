package com.kyojin.tasks.dto.request;

import jakarta.validation.constraints.FutureOrPresent;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UpdateTaskRequest {

    private String title;

    private String description;

    @FutureOrPresent(message = "Due date must be in the future or present")
    private LocalDateTime dueDate;

    private Boolean completed;
}