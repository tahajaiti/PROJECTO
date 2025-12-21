export const config = {
  api: {
    url: import.meta.env.VITE_API_URL || '/api',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  }
} as const;
