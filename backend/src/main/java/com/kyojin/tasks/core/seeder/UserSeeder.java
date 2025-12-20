package com.kyojin.tasks.core.seeder;

import com.kyojin.tasks.entity.User;
import com.kyojin.tasks.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User user = new User();
            user.setName("Taha Jaiti");
            user.setEmail("taha@admin.com");
            user.setPassword(passwordEncoder.encode("password123"));

            User user2 = new User();
            user2.setName("Taha two");
            user2.setEmail("taha2@admin.com");
            user2.setPassword(passwordEncoder.encode("password123"));


            userRepository.save(user);
            userRepository.save(user2);

            log.info("User Seeder: Default user created successfully.");
        }
    }
}