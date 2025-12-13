package com.kyojin.tasks.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginRequest {

    @NotBlank(message = "Email cannot be empty")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    private String password;
}