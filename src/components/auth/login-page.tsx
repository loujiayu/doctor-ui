'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getGoogleSSOUrl } from '@/services/auth';
import { useAuthStore } from '@/stores/auth-store';

export function LoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [origin, setOrigin] = useState('');
  const { toast } = useToast();

  // Get the current origin for the callback URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      // Get Google SSO URL with the current origin as callback
      const googleSSOUrl = getGoogleSSOUrl(origin);
      window.location.href = googleSSOUrl;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-6">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-white rounded-full p-3 shadow-lg mb-4">
            <img 
              src="https://raw.githubusercontent.com/stackblitz/stackblitz-icons/main/files/vicki-ai-logo.png" 
              alt="Vicki.AI"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white">Vicki.AI</h1>
          <p className="text-blue-200 mt-2">Medical Dashboard Access</p>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign in to continue</CardTitle>
            <CardDescription>Access your medical dashboard</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-white text-black hover:bg-gray-100 border border-gray-200" 
              variant="outline"
              onClick={handleLogin}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <img src="https://www.google.com/favicon.ico" alt="Google" className="mr-2 h-4 w-4" />
              )}
              Continue with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
