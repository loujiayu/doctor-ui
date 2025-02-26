'use client';

import { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  provider?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check login status from the endpoint
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/loginstatus', {
          credentials: 'include', // Important for cookies
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.loggedIn) {
            setIsAuthenticated(true);
            setUser({
              name: data.name || 'Dr. Charles Sandors',
              email: data.email || 'doctor@example.com',
              provider: data.provider || 'google'
            });
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          console.error('Failed to check login status');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLoginStatus();
  }, []);

  const logout = async () => {
    try {
      await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    logout
  };
}
