import { create } from 'zustand';
import { checkLoginStatus, logout as apiLogout } from '@/services/auth';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  // State
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
  
  // Actions
  checkAuth: () => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
}

// Mock user data - in a real app this would come from the API
const mockUser: User = {
  id: 'doctor-123',
  name: 'Dr. Charles Sandors',
  email: 'charles.sandors@example.com',
  role: 'doctor',
  avatar: '/avatars/doctor.png',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      isLoading: true,
      user: null,
      error: null,
      
      // Actions
      checkAuth: async () => {
        set({ isLoading: true, error: null });
        try {
          const result = await checkLoginStatus();
          
          if (result.success && result.isLoggedIn) {
            // In a real app, you would fetch the user profile here
            // For now, we'll use the mock user data
            set({ 
              isAuthenticated: true, 
              user: mockUser,
              isLoading: false 
            });
            return true;
          } else {
            set({ 
              isAuthenticated: false, 
              user: null, 
              isLoading: false,
              error: result.error || null
            });
            return false;
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          set({ 
            isAuthenticated: false, 
            user: null, 
            isLoading: false,
            error: error instanceof Error ? error.message : 'Authentication check failed'
          });
          return false;
        }
      },
      
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          const result = await apiLogout();
          if (result.success) {
            set({ isAuthenticated: false, user: null, isLoading: false });
          } else {
            throw new Error(result.error || 'Logout failed');
          }
        } catch (error) {
          console.error('Logout error:', error);
          set({ 
            isLoading: false,
            error: error instanceof Error ? error.message : 'Logout failed'
          });
          throw error;
        }
      },
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'auth-storage',
      // Only store authentication state, not loading or error states
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        user: state.user
      }),
    }
  )
);
