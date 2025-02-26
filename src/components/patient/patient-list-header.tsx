'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { useState } from 'react';

export function PatientListHeader() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuthStore();
  
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
    <div className="flex items-center justify-between w-full mb-6">
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
          <p className="text-sm font-medium text-blue-200">Patient Dashboard</p>
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
