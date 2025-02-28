import { get, post, ApiResponse } from '@/services/api';
import { API_BASE_URL } from '@/config/api';

interface PromptResponse {
  content: string;
}

interface PromptSaveRequest {
  prompt: string;
}

// Default DVX prompt for fallbacks
const DEFAULT_DVX_PROMPT = `You are an advanced AI medical analysis system called DVX (Differential Diagnosis AI). Analyze the following patient data and provide comprehensive clinical insights:

Patient: [PATIENT_NAME]
Age: [PATIENT_AGE]
Condition: [CONDITION]
Vitals: [VITALS]
Test Results: [TEST_RESULTS]
Device Data: [DEVICE_DATA]

Your analysis should include:
1. Pattern Recognition: Identify subtle patterns in the data that might be clinically relevant.
2. Expanded Differential Diagnoses: List potential diagnoses with confidence percentages.
3. Treatment Considerations: Suggest evidence-based treatment approaches.
4. Risk Stratification: Assess patient risk levels and recommend monitoring parameters.

Present your analysis in a structured, professional format suitable for healthcare providers.`;

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

/**
 * Fetch the DVX analysis prompt for a user
 * @param userId The ID of the user (doctor)
 */
export async function fetchDvxAnalysisPrompt(userId: number): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // In a real implementation, this would be an API call
    // For now, we'll check localStorage or return default
    const saved = localStorage.getItem(`dvx-prompt-${userId}`);
    return saved || DEFAULT_DVX_PROMPT;
  } catch (error) {
    console.error('Error fetching DVX analysis prompt:', error);
    return DEFAULT_DVX_PROMPT;
  }
}

/**
 * Save a modified DVX analysis prompt
 * @param userId The ID of the user (doctor)
 * @param promptText The prompt text to save
 */
export async function saveDvxAnalysisPrompt(userId: number, promptText: string): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // In a real implementation, this would be an API call
    localStorage.setItem(`dvx-prompt-${userId}`, promptText);
    return true;
  } catch (error) {
    console.error('Error saving DVX analysis prompt:', error);
    throw error;
  }
}
