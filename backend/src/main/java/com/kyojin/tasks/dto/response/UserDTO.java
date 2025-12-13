package com.kyojin.tasks.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;

    private String name;

    private String email;

    private String token;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}