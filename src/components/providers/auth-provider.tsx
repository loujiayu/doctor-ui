'use client';

import { useEffect, ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface AuthProviderProps {
  children: ReactNode;
}

// List of paths that don't require authentication
const publicPaths = ['/login', '/signup', '/forgot-password'];

export function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const isPublicPath = publicPaths.includes(pathname);
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  useEffect(() => {
    // Only redirect after the initial check is done
    if (!isLoading) {
      // If on a public path but already logged in, redirect to home
      if (isPublicPath && isAuthenticated) {
        router.replace('/');
      }
      // If on a protected path but not logged in, redirect to login
      else if (!isPublicPath && !isAuthenticated && pathname !== '/') {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, isLoading, isPublicPath, pathname, router]);
  
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
  
  return <>{children}</>;
}
