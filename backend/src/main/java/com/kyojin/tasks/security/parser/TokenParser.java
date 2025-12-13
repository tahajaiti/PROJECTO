package com.kyojin.tasks.security.parser;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;

public interface TokenParser {
    Optional<String> parse(HttpServletRequest request);
}