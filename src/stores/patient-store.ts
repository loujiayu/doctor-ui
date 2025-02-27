import { create } from 'zustand';
import { parseISO } from 'date-fns';
import { patientService } from '@/services/patient-service';

// Sort options
export type SortField = 'age' | 'lastVisit' | 'risk';
export type SortOrder = 'asc' | 'desc';

// Risk level type
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

// Patient info interface
export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  appointmentTime: string;
  image?: string;
  lastVisit: string;
  risk: RiskLevel; // Simplified risk field
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
    risk: 'medium'
  },
  '2': { 
    id: '2', 
    name: 'Michael Chen', 
    age: 32, 
    condition: 'Lower Back Pain',
    appointmentTime: '9:30 AM',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastVisit: '2024-01-20',
    risk: 'low'
  },
  '3': { 
    id: '3', 
    name: 'Robert Smith', 
    age: 67, 
    condition: 'Diabetes, Type 2',
    appointmentTime: '10:15 AM',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    lastVisit: '2024-01-05',
    risk: 'high'
  },
  '4': { 
    id: '4', 
    name: 'Emily Wilson', 
    age: 28, 
    condition: 'Migraine',
    appointmentTime: '11:00 AM',
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
    lastVisit: '2023-11-30',
    risk: 'low'
  },
  '5': { 
    id: '5', 
    name: 'James Rodriguez', 
    age: 55, 
    condition: 'Arthritis',
    appointmentTime: '1:30 PM',
    image: 'https://randomuser.me/api/portraits/men/72.jpg',
    lastVisit: '2023-12-28',
    risk: 'medium'
  },
  '6': { 
    id: '6', 
    name: 'Sophia Lee', 
    age: 38, 
    condition: 'Anxiety Disorder',
    appointmentTime: '2:15 PM',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    lastVisit: '2024-02-01',
    risk: 'low'
  },
  '7': { 
    id: '7', 
    name: 'David Garcia', 
    age: 61, 
    condition: 'COPD',
    appointmentTime: '3:00 PM',
    image: 'https://randomuser.me/api/portraits/men/40.jpg',
    lastVisit: '2024-01-10',
    risk: 'critical'
  },
};

// All patients array for convenience
export const patientsArray = Object.values(patientData);

// Define API Patient type to match the service return type
export interface ApiPatient {
  patient_id: number;
  full_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  metadata: {
    Age?: number;
    Condition?: string;
    LastVisit?: string;
    Risk?: string;
  } | null;
}

// Helper to convert API patient format to store format
function convertApiPatientToStoreFormat(apiPatient: ApiPatient): Patient {
  const riskLevel = getRiskLevelFromApiRisk(apiPatient.metadata?.Risk);
  
  return {
    id: apiPatient.patient_id.toString(),
    name: apiPatient.full_name,
    age: apiPatient.metadata?.Age || 0,
    condition: apiPatient.metadata?.Condition || 'No condition specified',
    appointmentTime: 'TBD', // API doesn't provide this yet
    lastVisit: apiPatient.metadata?.LastVisit || apiPatient.created_at.split('T')[0],
    image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
    risk: riskLevel
  };
}

// Helper to convert API risk string to our RiskLevel type
function getRiskLevelFromApiRisk(risk?: string): RiskLevel {
  if (!risk) return 'low';
  
  const lowerRisk = risk.toLowerCase();
  if (lowerRisk === 'critical' || lowerRisk === 'high' || lowerRisk === 'medium' || lowerRisk === 'low') {
    return lowerRisk as RiskLevel;
  }
  return 'low'; // Default
}

// Map risk levels to numeric values for sorting
function getRiskValue(risk: RiskLevel): number {
  switch(risk) {
    case 'critical': return 4;
    case 'high': return 3;
    case 'medium': return 2;
    case 'low': return 1;
    default: return 0;
  }
}

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
  fetchPatients: () => Promise<void>; // New action to fetch patients
  
  // Derived state
  filteredPatients: () => Patient[];
  selectedPatient: () => Patient | null;
}

// Create the patient store
export const usePatientStore = create<PatientStore>((set, get) => ({
  // Initial state
  selectedPatientId: null,
  patients: patientData, // Start with mock data
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
  
  // New action to fetch patients from API
  fetchPatients: async () => {
    set({ isLoading: true });
    try {
      const apiPatients = await patientService.getPatients();
      
      // Convert API patients to store format and create record
      const patientRecord: Record<string, Patient> = {};
      apiPatients.forEach(apiPatient => {
        const storePatient = convertApiPatientToStoreFormat(apiPatient);
        patientRecord[storePatient.id] = storePatient;
      });
      
      // Update store with fetched patients
      set({ 
        patients: patientRecord,
        isLoading: false
      });
    } catch (error) {
      console.error('Failed to fetch patients:', error);
      set({ isLoading: false });
      // Keep existing mock data on error
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
        case 'risk':
          comparison = getRiskValue(a.risk) - getRiskValue(b.risk);
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
