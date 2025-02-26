import { useAuthStore } from '@/stores/auth-store';

interface LoginStatusResponse {
  logged_in: boolean;
  user_id: string;
}

const API_BASE_URL = 'http://localhost:5000';

// Default user data when only user_id is available
const DEFAULT_USER_DATA = {
  name: 'Dr. Charles Sandors',
  email: 'doctor@hospital.org',
  provider: 'google'
};

// Check login status
export async function checkLoginStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/loginstatus`, {
      credentials: 'include', // Important for cookies
    });
    
    if (!response.ok) {
      return { 
        success: false, 
        error: `Failed with status: ${response.status}` 
      };
    }
    
    const data: LoginStatusResponse = await response.json();
    
    if (data.logged_in) {
      // Use the user_id if provided, but use default values for missing fields
      useAuthStore.getState().login({
        id: data.user_id,
      });
      
      return { 
        success: true, 
        isLoggedIn: true,
        user: {
          id: data.user_id,
        }
      };
    } else {
      useAuthStore.getState().logout();
      return { success: true, isLoggedIn: false };
    }
  } catch (error) {
    useAuthStore.getState().setError(error instanceof Error ? error.message : 'Unknown error');
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Process logout
export async function logout() {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    
    useAuthStore.getState().logout();
    return { success: response.ok };
  } catch (error) {
    useAuthStore.getState().setError(error instanceof Error ? error.message : 'Unknown error');
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Get Google SSO URL
export function getGoogleSSOUrl(callbackUrl: string): string {
  return `${API_BASE_URL}/login/google/doctor?cb=${encodeURIComponent(callbackUrl)}`;
}
