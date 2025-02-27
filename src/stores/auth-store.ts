import { create } from 'zustand';
import { checkLoginStatus, logout as apiLogout } from '@/services/auth';
import { persist } from 'zustand/middleware';
import { getDoctorById } from '@/services/doctors';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  sso_provider?: string;
  created_at?: string;
  updated_at?: string;
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
          
          if (result.success && result.isLoggedIn && result.userId) {
            // Fetch the doctor profile using the doctor ID from login status
            const doctorResponse = await getDoctorById(result.userId);
            
            if (doctorResponse.success && doctorResponse.data) {
              // Map the doctor data to user structure
              const doctor = doctorResponse.data;
              const user: User = {
                id: doctor.doctor_id.toString(),
                name: doctor.full_name,
                email: doctor.email,
                role: 'doctor',
                sso_provider: doctor.sso_provider,
                created_at: doctor.created_at,
                updated_at: doctor.updated_at
              };
              
              set({ 
                isAuthenticated: true, 
                user,
                isLoading: false 
              });
              return true;
            } else {
              throw new Error(doctorResponse.error || 'Failed to fetch doctor data');
            }
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
