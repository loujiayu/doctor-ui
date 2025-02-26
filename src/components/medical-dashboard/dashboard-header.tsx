'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { logout } from '@/services/auth';

// Mock patient data - in a real app would come from an API
const patients = {
  '1': { name: 'Sarah Johnson', age: 45, condition: 'Hypertension' },
  '2': { name: 'Michael Chen', age: 32, condition: 'Lower Back Pain' },
  '3': { name: 'Robert Smith', age: 67, condition: 'Diabetes, Type 2' },
  '4': { name: 'Emily Wilson', age: 28, condition: 'Migraine' },
  '5': { name: 'James Rodriguez', age: 55, condition: 'Arthritis' },
  '6': { name: 'Sophia Lee', age: 38, condition: 'Anxiety Disorder' },
  '7': { name: 'David Garcia', age: 61, condition: 'COPD' },
};

interface DashboardHeaderProps {
  patientId?: string;
}

export function DashboardHeader({ patientId }: DashboardHeaderProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const patientName = patientId && patients[patientId] 
    ? patients[patientId].name 
    : 'Select Patient';
  
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const result = await logout();
      if (result.success) {
        toast({
          title: "Logged out",
          description: "You have been successfully logged out",
        });
        router.push('/');
      } else {
        throw new Error(result.error || "Logout failed");
      }
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
        <div className="w-12 h-12 rounded-full bg-white p-2 shadow-lg">
          <img 
            src="https://raw.githubusercontent.com/stackblitz/stackblitz-icons/main/files/vicki-ai-logo.png" 
            alt="Vicki.AI"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Vicki.AI</h1>
          {patientId && <p className="text-sm font-medium text-blue-200">Patient: {patientName}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-white/80">Dr. Charles Sandors</span>
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
