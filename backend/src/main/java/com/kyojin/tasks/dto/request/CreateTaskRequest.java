package com.kyojin.tasks.dto.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateTaskRequest {

    @NotBlank(message = "Task title is required")
    private String title;

    private String description;

    @FutureOrPresent(message = "Due date must be in the future or present")
    private LocalDateTime dueDate;
}
