/**
 * @wabtechs/sdk — Auth store (Zustand).
 *
 * Fournit l'état d'authentification global pour les applications.
 */

import { create } from 'zustand';
import { AuthClient, setToken } from './client';
import type { MeResponse } from './schemas';

export interface AuthState {
  token: string | null;
  me: MeResponse | null;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  fetchMe: () => Promise<{ success: boolean; error?: string }>;
  setToken: (token: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  me: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const result = await AuthClient.login({ email, password });
      if (result.success && result.data) {
        set({ token: result.data.token, isLoading: false });
        await get().fetchMe();
        return { success: true };
      }
      set({ error: result.error || 'Échec de la connexion', isLoading: false });
      return { success: false, error: result.error };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inattendue';
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await AuthClient.logout();
      set({ token: null, me: null, isLoading: false });
      return { success: true };
    } catch (err: unknown) {
      set({ token: null, me: null, isLoading: false });
      return { success: true };
    }
  },

  fetchMe: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await AuthClient.me();
      if (result.success && result.data) {
        set({ me: result.data, isLoading: false });
        return { success: true };
      }
      set({ error: result.error || 'Impossible de charger le profil', isLoading: false });
      return { success: false, error: result.error };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur inattendue';
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  setToken: (token) => {
    setToken(token);
    set({ token });
  },

  clearError: () => set({ error: null }),
}));
