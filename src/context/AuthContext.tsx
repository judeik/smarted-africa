// src/context/AuthContext.ts
// Context object only (no component here)

import { createContext } from "react";
import type { AuthContextType } from "./authTypes";

// Context defaults to undefined until wrapped in <AuthProvider>
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
