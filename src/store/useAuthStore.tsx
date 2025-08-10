import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "admin" | "user"

export interface User {
    name?: string;
    email: string;
    token: string;
    role: Role;
}

interface AuthState {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: User) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'auth-storage', 
        }
    )
);