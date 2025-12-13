package com.kyojin.tasks.mapper;

import com.kyojin.tasks.dto.response.UserDTO;
import com.kyojin.tasks.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toDTO(User user, String token);
}