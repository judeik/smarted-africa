// src/context/authTypes.ts
// 🔹 Shared types for authentication

// A user in SmartEd Africa system
export type User = {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "parent" | "admin";
};

// The shape of the authentication context
export type AuthContextType = {
  user: User | null; // logged-in user info
  loading: boolean; // true while checking session
  isAuthenticated: boolean; // derived from user != null
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};
