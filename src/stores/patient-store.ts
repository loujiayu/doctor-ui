import { create } from 'zustand';
import { parseISO } from 'date-fns';

// Sort options - remove 'name' from the type
export type SortField = 'age' | 'lastVisit' | 'riskScore';
export type SortOrder = 'asc' | 'desc';

// Patient info interface
export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  appointmentTime: string;
  image?: string;
  // New fields
  lastVisit: string;
  riskScore: {
    value: number;  // 0-100
    level: 'low' | 'medium' | 'high' | 'critical';
    trend: 'improving' | 'stable' | 'worsening';
  };
}

// Mock patient data
export const patientData: Record<string, Patient> = {
  '1': { 
    id: '1', 
    name: 'Sarah Johnson', 
    age: 45, 
    condition: 'Hypertension',
    appointmentTime: '9:00 AM',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastVisit: '2023-12-15',
    riskScore: {
      value: 65,
      level: 'medium',
      trend: 'stable'
    }
  },
  '2': { 
    id: '2', 
    name: 'Michael Chen', 
    age: 32, 
    condition: 'Lower Back Pain',
    appointmentTime: '9:30 AM',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastVisit: '2024-01-20',
    riskScore: {
      value: 25,
      level: 'low',
      trend: 'improving'
    }
  },
  '3': { 
    id: '3', 
    name: 'Robert Smith', 
    age: 67, 
    condition: 'Diabetes, Type 2',
    appointmentTime: '10:15 AM',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    lastVisit: '2024-01-05',
    riskScore: {
      value: 88,
      level: 'high',
      trend: 'worsening'
    }
  },
  '4': { 
    id: '4', 
    name: 'Emily Wilson', 
    age: 28, 
    condition: 'Migraine',
    appointmentTime: '11:00 AM',
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
    lastVisit: '2023-11-30',
    riskScore: {
      value: 20,
      level: 'low',
      trend: 'stable'
    }
  },
  '5': { 
    id: '5', 
    name: 'James Rodriguez', 
    age: 55, 
    condition: 'Arthritis',
    appointmentTime: '1:30 PM',
    image: 'https://randomuser.me/api/portraits/men/72.jpg',
    lastVisit: '2023-12-28',
    riskScore: {
      value: 45,
      level: 'medium',
      trend: 'improving'
    }
  },
  '6': { 
    id: '6', 
    name: 'Sophia Lee', 
    age: 38, 
    condition: 'Anxiety Disorder',
    appointmentTime: '2:15 PM',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    lastVisit: '2024-02-01',
    riskScore: {
      value: 30,
      level: 'low',
      trend: 'stable'
    }
  },
  '7': { 
    id: '7', 
    name: 'David Garcia', 
    age: 61, 
    condition: 'COPD',
    appointmentTime: '3:00 PM',
    image: 'https://randomuser.me/api/portraits/men/40.jpg',
    lastVisit: '2024-01-10',
    riskScore: {
      value: 95,
      level: 'critical',
      trend: 'worsening'
    }
  },
};

// All patients array for convenience
export const patientsArray = Object.values(patientData);

// Patient store interface
interface PatientStore {
  // State
  selectedPatientId: string | null;
  patients: Record<string, Patient>;
  searchTerm: string;
  isLoading: boolean;
  sortField: SortField;
  sortOrder: SortOrder;
  
  // Actions
  selectPatient: (patientId: string) => void;
  clearSelectedPatient: () => void;
  setSearchTerm: (term: string) => void;
  setLoading: (isLoading: boolean) => void;
  setSorting: (field: SortField, order?: SortOrder) => void;
  
  // Derived state
  filteredPatients: () => Patient[];
  selectedPatient: () => Patient | null;
}

// Create the patient store
export const usePatientStore = create<PatientStore>((set, get) => ({
  // Initial state
  selectedPatientId: null,
  patients: patientData,
  searchTerm: '',
  isLoading: false,
  sortField: 'lastVisit',
  sortOrder: 'desc',
  
  // Actions
  selectPatient: (patientId) => set({ selectedPatientId: patientId }),
  clearSelectedPatient: () => set({ selectedPatientId: null }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setLoading: (isLoading) => set({ isLoading }),
  setSorting: (field, order) => {
    // If clicking on the same field, toggle order
    if (field === get().sortField && !order) {
      set({ 
        sortField: field, 
        sortOrder: get().sortOrder === 'asc' ? 'desc' : 'asc' 
      });
    } else {
      // Otherwise, set the new field and order (or default to asc)
      set({ 
        sortField: field, 
        sortOrder: order || 'asc' 
      });
    }
  },
  
  // Derived state (getters)
  filteredPatients: () => {
    const { patients, searchTerm, sortField, sortOrder } = get();
    const term = searchTerm.toLowerCase();
    
    // Filter patients based on search term
    let result = Object.values(patients);
    
    if (term) {
      result = result.filter(
        patient => 
          patient.name.toLowerCase().includes(term) ||
          patient.condition.toLowerCase().includes(term)
      );
    }
    
    // Sort patients based on selected sort field and order
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'age':
          comparison = a.age - b.age;
          break;
        case 'lastVisit':
          comparison = parseISO(a.lastVisit).getTime() - parseISO(b.lastVisit).getTime();
          break;
        case 'riskScore':
          comparison = a.riskScore.value - b.riskScore.value;
          break;
        default:
          comparison = 0;
      }
      
      // Reverse the comparison if the sort order is descending
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return result;
  },
  
  selectedPatient: () => {
    const { selectedPatientId, patients } = get();
    if (!selectedPatientId) return null;
    return patients[selectedPatientId] || null;
  }
}));
