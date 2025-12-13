package com.kyojin.tasks.service.impl;

import com.kyojin.tasks.dto.request.LoginRequest;
import com.kyojin.tasks.dto.response.UserDTO;
import com.kyojin.tasks.entity.User;
import com.kyojin.tasks.core.exception.NotFoundException;
import com.kyojin.tasks.core.exception.UnauthorizedException;
import com.kyojin.tasks.mapper.UserMapper;
import com.kyojin.tasks.repository.UserRepository;
import com.kyojin.tasks.security.JwtUtil;
import com.kyojin.tasks.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDTO login(LoginRequest request) {

        final String principal = request.getEmail();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(principal, request.getPassword())
            );

            String token = jwtUtil.generateJwt(authentication);

            User user = userRepository.findByEmail(principal)
                    .orElseThrow(() -> {
                        log.error("Authenticated user not found in database: {}", principal);
                        return new NotFoundException("User not found after successful authentication");
                    });

            log.info("User '{}' logged in successfully", principal);

            return userMapper.toDTO(user, token);

        } catch (BadCredentialsException e) {
            log.error("Invalid credentials for user: {}", principal);
            throw new UnauthorizedException("Invalid username or password");
        }
    }

}
