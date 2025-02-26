'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      const success = await logout();
      if (success) {
        toast({
          title: "Logged out",
          description: "You have been successfully logged out",
        });
        router.push('/');
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white p-2 shadow-lg">
          <img 
            src="https://raw.githubusercontent.com/stackblitz/stackblitz-icons/main/files/vicki-ai-logo.png" 
            alt="Vicki.AI"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-white">Vicki.AI</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-white/80">
          {user?.name || 'Dr. Charles Sandors'}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/80 hover:text-white hover:bg-white/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
