export const config = {
  api: {
    url: import.meta.env.VITE_API_URL || '/api',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },
  auth: {
    tokenKey: import.meta.env.VITE_TOKEN_KEY || "token",
  },
} as const;
