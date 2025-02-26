'use client';

import { useEffect } from 'react';
import { MedicalDashboard } from '@/components/medical-dashboard';
import { LoginPage } from '@/components/auth/login-page';
import { PatientList } from '@/components/patient/patient-list';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { usePatientStore } from '@/stores/patient-store';

export default function Home() {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const { selectedPatientId, clearSelectedPatient } = usePatientStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  const handleBackToPatientList = () => {
    clearSelectedPatient();
  };
  
  // Show loading indicator while checking auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="bg-white/10 rounded-full p-3 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 animate-spin text-white" />
        </div>
      </div>
    );
  }

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <LoginPage />;
  }
  
  // If authenticated but no patient selected, show patient list
  if (!selectedPatientId) {
    return <PatientList />;
  }
  
  // If authenticated and patient selected, show medical dashboard
  return <MedicalDashboard patientId={selectedPatientId} onBack={handleBackToPatientList} />;
}