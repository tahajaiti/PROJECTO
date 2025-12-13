package com.kyojin.tasks.security.parser;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Component
@ConditionalOnProperty(name = "app.jwt.parser", havingValue = "bearer", matchIfMissing = true)
public class BearerTokenParser implements TokenParser {

    @Override
    public Optional<String> parse(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            return Optional.of(header.substring(7));
        }

        return Optional.empty();
    }
}