import { LoginRequest, User } from "../../types";
import api from "../client";

export const authService = {
  login: (data: LoginRequest) => api.post<User>("/v1/auth/login", data),
};