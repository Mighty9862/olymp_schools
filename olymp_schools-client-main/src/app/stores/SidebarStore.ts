import { create } from "zustand";

interface SidebarState {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  toggleCollapsed: () => void;
}

export const useSidebarStore = create<SidebarState>()((set, get) => ({
  isCollapsed: true,
  setIsCollapsed: (value) => set({ isCollapsed: value }),
  toggleCollapsed: () => set({ isCollapsed: !get().isCollapsed }),
}));
