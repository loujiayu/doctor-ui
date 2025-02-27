import { get, post, ApiResponse } from '@/services/api';

interface PromptResponse {
  content: string;
}

interface PromptSaveRequest {
  prompt: string;
}

// Endpoint base for prompts
const API_BASE_URL = 'http://localhost:5000';

/**
 * Fetch the default SOAP note prompt
 * @param userId The ID of the user (doctor)
 */
export async function fetchSoapNotePrompt(userId: number): Promise<string> {
  try {
    const response = await get<PromptResponse>(
      `${API_BASE_URL}/prompt/${userId}?user_type=doctor&prompt_blob=soap`
    );
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch prompt');
    }
    
    return response.data.content;
  } catch (error) {
    console.error('Error fetching SOAP note prompt:', error);
    return "";
  }
}

/**
 * Save a modified SOAP note prompt
 * @param userId The ID of the user (doctor)
 * @param promptText The prompt text to save
 */
export async function saveSoapNotePrompt(userId: number, promptText: string): Promise<boolean> {
  try {
    const payload: PromptSaveRequest = {
      prompt: promptText
    };
    
    const response = await post<{}, PromptSaveRequest>(
      `${API_BASE_URL}/prompt/${userId}?user_type=doctor&prompt_blob=soap`, 
      payload
    );
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to save prompt');
    }
    
    return true;
  } catch (error) {
    console.error('Error saving SOAP note prompt:', error);
    throw error;
  }
}
