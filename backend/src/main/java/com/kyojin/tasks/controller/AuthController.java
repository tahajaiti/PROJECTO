package com.kyojin.tasks.controller;

import com.kyojin.tasks.dto.request.LoginRequest;
import com.kyojin.tasks.dto.response.UserDTO;
import com.kyojin.tasks.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequest request) {
        UserDTO responseDTO = authService.login(request);
        return ResponseEntity.ok(responseDTO);
    }
}
