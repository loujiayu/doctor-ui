import { create } from 'zustand';
import { getDoctorById } from '@/services/doctors';
import type { Doctor } from '@/services/doctors';

interface DoctorState {
  // State
  currentDoctor: Doctor | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchDoctorById: (id: string) => Promise<void>;
  resetDoctor: () => void;
}

export const useDoctorStore = create<DoctorState>()((set) => ({
  // Initial state
  currentDoctor: null,
  isLoading: false,
  error: null,
  
  // Actions
  fetchDoctorById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await getDoctorById(id);
      
      if (response.success && response.data) {
        set({ 
          currentDoctor: response.data,
          isLoading: false 
        });
      } else {
        set({ 
          error: response.error || 'Failed to fetch doctor data',
          isLoading: false
        });
      }
    } catch (error) {
      console.error('Failed to fetch doctor:', error);
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch doctor data'
      });
    }
  },
  
  resetDoctor: () => set({ currentDoctor: null, error: null }),
}));
