package com.kyojin.tasks.service;

import com.kyojin.tasks.dto.request.LoginRequest;
import com.kyojin.tasks.dto.response.UserDTO;

public interface AuthService {

    UserDTO login(LoginRequest request);
}
