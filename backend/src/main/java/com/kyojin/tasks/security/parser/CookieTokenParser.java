package com.kyojin.tasks.security.parser;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Optional;

@Component
@ConditionalOnProperty(name = "app.jwt.parser", havingValue = "cookie", matchIfMissing = false)
public class CookieTokenParser implements TokenParser {

    @Value("${app.jwt.cookie-name:jwt-token}")
    private String cookieName;

    @Override
    public Optional<String> parse(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            return Optional.empty();
        }

        return Arrays.stream(cookies)
                .filter(cookie -> cookieName.equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst();
    }
}