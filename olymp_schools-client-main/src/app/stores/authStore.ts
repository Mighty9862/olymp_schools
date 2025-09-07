import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  id: number;
  email: string;
  role: string;
}

interface AuthStore {
  token: string | null;
  isAuthenticated: boolean;
  userData: UserData | null;
  setToken: (token: string) => void;
  setUserData: (userData: UserData) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      userData: null,
      setToken: (token) => set({ token, isAuthenticated: true }),
      setUserData: (userData) => set({ userData }),
      clearToken: () =>
        set({ token: null, isAuthenticated: false, userData: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
