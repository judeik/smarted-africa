// src/api/authService.ts
export const API_URL = import.meta.env.VITE_BACKEND_URL;

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const res = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include', // include cookies
  });
  return res.json();
};

export const refreshToken = async () => {
  const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // include HTTP-only cookie
  });
  return res.json();
};

export const logout = async () => {
  const res = await fetch(`${API_URL}/api/v1/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  return res.json();
};
