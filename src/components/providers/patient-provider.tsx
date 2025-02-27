'use client';

import { useEffect } from 'react';
import { usePatientStore } from '@/stores/patient-store';

interface PatientProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that initializes patient data fetching
 * Can be placed at the app's root to ensure data is loaded once
 */
export function PatientProvider({ children }: PatientProviderProps) {
  const { fetchPatients, isLoading } = usePatientStore();
  
  // Fetch patients on initial load
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);
  
  return <>{children}</>;
}
