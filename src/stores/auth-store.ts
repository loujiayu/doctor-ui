import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name?: string;
  email?: string;
  provider?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      login: (user) => set({ user, isAuthenticated: true, error: null }),
      logout: () => set({ user: null, isAuthenticated: false })
    }),
    {
      name: 'auth-storage', // unique name for localStorage
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
