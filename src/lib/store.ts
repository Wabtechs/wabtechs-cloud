import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Organization } from '@/lib/types';

interface AuthState {
  user: User | null;
  organization: Organization | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setOrganization: (org: Organization | null) => void;
  setLoading: (loading: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      organization: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setOrganization: (organization) => set({ organization }),
      setLoading: (isLoading) => set({ isLoading }),
      clear: () => set({ user: null, organization: null, isLoading: false }),
    }),
    {
      name: 'wabtechs-auth',
      partialize: (state) => ({
        user: state.user,
        organization: state.organization,
      }),
    }
  )
);

interface UIState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleSidebarCollapsed: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: 'wabtechs-ui',
    }
  )
);

interface NotificationState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  incrementUnread: () => void;
  decrementUnread: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (unreadCount) => set({ unreadCount }),
  incrementUnread: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
  decrementUnread: () => set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) })),
}));
