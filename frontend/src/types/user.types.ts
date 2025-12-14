export interface User {
  id: number;

  name: string;
  email: string;
  password: string;
  
  token: string;

  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
