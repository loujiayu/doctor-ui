'use client';

import { useState, useEffect } from 'react';
import { MedicalDashboard } from '@/components/medical-dashboard';
import { LoginPage } from '@/components/auth/login-page';
import { Loader2 } from 'lucide-react';
import { checkLoginStatus } from '@/services/auth';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // Show login page or dashboard based on auth state
  return isAuthenticated ? <MedicalDashboard /> : <LoginPage />;
}