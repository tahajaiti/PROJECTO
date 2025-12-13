package com.kyojin.tasks.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProjectRequest {

    @Size(min = 3, max = 50, message = "Title must be between 3 and 50 characters")
    private String title;

    private String description;
}