'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { checkLoginStatus, logout as logoutService, getGoogleSSOUrl } from '@/services/auth-service';

export function useAuth() {
  const { user, isAuthenticated, isLoading, error } = useAuthStore();
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);
  
  // Check login status on mount
  useEffect(() => {
    const verifyAuth = async () => {
      setLoading(true);
      await checkLoginStatus();
      setLoading(false);
    };
    
    verifyAuth();
  }, [setLoading]);

  // Redirect to Google SSO
  const loginWithGoogle = () => {
    const origin = window.location.origin;
    const ssoUrl = getGoogleSSOUrl(origin);
    window.location.href = ssoUrl;
  };

  // Logout user
  const logout = async () => {
    setLoading(true);
    const result = await logoutService();
    setLoading(false);
    return result.success;
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    loginWithGoogle,
    logout,
    clearError: () => setError(null)
  };
}
