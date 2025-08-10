import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isSidebarOpen: false,
      setIsSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
);

export default useSidebarStore;
