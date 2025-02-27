import { get, post, ApiResponse } from '@/services/api';
import { API_BASE_URL } from '@/config/api';

interface LoginStatusResponse {
  logged_in: boolean;
  user_id?: string;
}

interface AuthResult {
  success: boolean;
  isLoggedIn?: boolean;
  userId?: string;
  error?: string;
}

/**
 * Check if the user is currently logged in
 */
export async function checkLoginStatus(): Promise<AuthResult> {
  try {
    const response = await get<LoginStatusResponse>(`${API_BASE_URL}/loginstatus`, true);
    
    if (!response.success) {
      return {
        success: false,
        error: response.error
      };
    }
    
    return {
      success: true,
      isLoggedIn: response.data?.logged_in || false,
      userId: response.data?.user_id
    };
  } catch (error) {
    console.error('Error checking login status:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Log out the user
 */
export async function logout(): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await get(`${API_BASE_URL}/logout`);
    
    return { 
      success: response.success,
      error: response.error
    };
  } catch (error) {
    console.error('Error during logout:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get the Google SSO URL
 */
export function getGoogleSSOUrl(callbackUrl: string): string {
  return `${API_BASE_URL}/login/google/doctor?cb=${encodeURIComponent(callbackUrl)}`;
}
