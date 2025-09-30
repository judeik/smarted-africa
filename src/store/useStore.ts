<<<<<<< HEAD
/**
 * src/store/useStore.ts
 * Minimal Zustand store for user session & UI state.
 * - Keep store small and focused
 * - Persist selected safe state to localStorage if needed (beware PII)
 */

import create from "zustand";

type User = { id: string; name: string; role: string } | null;

type State = {
  user: User;
  setUser: (u: User) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

const useStore = create<State>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  mobileMenuOpen: false,
=======
// src/store/useStore.ts
// 🔹 Global store using Zustand with strict TypeScript typing

import { create } from "zustand";

// Define your store state shape
type State = {
  user: string | null; // you can replace `string` with a proper User type later
  mobileMenuOpen: boolean;
  setUser: (u: string | null) => void;
  setMobileMenuOpen: (open: boolean) => void;
};

// Create the store with strong typing
const useStore = create<State>((set) => ({
  user: null,
  mobileMenuOpen: false,
  setUser: (u) => set({ user: u }),
>>>>>>> jude
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));

export default useStore;
