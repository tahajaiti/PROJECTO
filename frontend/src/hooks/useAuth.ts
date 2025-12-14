import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import { authService } from "../api/services/auth.service";
import { LoginRequest } from "../types";


export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: ({ data }) => {
      setAuth(data);
    },
  });
};
