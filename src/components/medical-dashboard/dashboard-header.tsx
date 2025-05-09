'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { usePatientStore } from '@/stores/patient-store';
import { format, parseISO } from 'date-fns';

interface DashboardHeaderProps {
  patientId?: string;
}

export function DashboardHeader({ patientId }: DashboardHeaderProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuthStore();
  
  // Get selected patient from the store
  const selectedPatient = usePatientStore(state => state.selectedPatient());
  
  const patientName = selectedPatient ? selectedPatient.name : 'Select Patient';

  // Generate risk score element
  const getRiskScoreElement = () => {
    if (!selectedPatient) return null;
    
    const { risk } = selectedPatient;
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800',
    };
    
    return (
      <div className={`text-xs px-2 py-1 rounded-full inline-flex items-center ${colors[risk]} ml-2`}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)}
      </div>
    );
  };
  
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white p-2.5 shadow-lg">
          <img 
            src="/doctor-logo.webp" 
            alt="Doctor UI"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Vicki.AI</h1>
          {selectedPatient && (
            <div>
              <p className="text-sm font-medium text-blue-200 flex items-center">
                Patient: {patientName} • {selectedPatient.age} years • {selectedPatient.condition}
                {getRiskScoreElement()}
              </p>
              <p className="text-xs text-blue-200/70 mt-0.5">
                Last visit: {format(parseISO(selectedPatient.lastVisit), 'MMMM d, yyyy')}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-white/80">{user?.name || 'Doctor'}</span>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/80 hover:text-white hover:bg-white/10"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
