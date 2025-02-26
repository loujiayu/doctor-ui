'use client';

import { useEffect } from 'react';
import { MedicalDashboard } from '@/components/medical-dashboard';
import { LoginPage } from '@/components/auth/login-page';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading indicator while checking auth state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Checking login status...</p>
        </div>
      </div>
    );
  }

  // Show login page or dashboard based on auth state
  return isAuthenticated ? <MedicalDashboard /> : <LoginPage />;
}