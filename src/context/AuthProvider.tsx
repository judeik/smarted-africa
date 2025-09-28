// src/context/AuthProvider.tsx
// Provides auth state + API integration with backend cookies

import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./authTypes";

const API_BASE = import.meta.env.VITE_BACKEND_URL; // ✅ from .env

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  //  Check existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/session`, {
          credentials: "include", // send cookies with request
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Session check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login user
  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // cookie-based auth
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    setUser(data.user);
  };

  // Signup user
  const signup = async (data: { name: string; email: string; password: string }) => {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Signup failed");
    const result = await res.json();
    setUser(result.user);
  };

  // Logout user
  const logout = async () => {
    await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
