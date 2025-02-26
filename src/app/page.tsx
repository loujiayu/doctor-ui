'use client';

import { useState, useEffect } from 'react';
import { MedicalDashboard } from '@/components/medical-dashboard';
import { LoginPage } from '@/components/auth/login-page';
import { PatientList } from '@/components/patient/patient-list';
import { Loader2 } from 'lucide-react';
import { checkLoginStatus } from '@/services/auth';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const result = await checkLoginStatus();
        setIsAuthenticated(!!(result.success && result.isLoggedIn));
      } catch (error) {
        console.error('Failed to verify authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    verifyAuth();
  }, []);
  
  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
  };
  
  const handleBackToPatientList = () => {
    setSelectedPatientId(null);
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
    return <PatientList onPatientSelect={handlePatientSelect} />;
  }
  
  // If authenticated and patient selected, show medical dashboard
  return <MedicalDashboard patientId={selectedPatientId} onBack={handleBackToPatientList} />;
}