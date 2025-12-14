import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";

type UserNoToken = Omit<User, "token">;

interface AuthState {
  user: UserNoToken | null;
  token: string | null;
  isAuthenticated: boolean;

  setAuth: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user) => {
        const {token, ...userWithoutToken} = user;
        set({ user: userWithoutToken, token, isAuthenticated: true });
      },

      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: "auth" }
  )
);
