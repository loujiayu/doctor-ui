import { get, post, ApiResponse } from '@/services/api';

interface PromptResponse {
  content: string;
}

interface PromptSaveRequest {
  prompt: string;
}

// Endpoint base for prompts
const PROMPTS_API = 'https://prompts-85352025976.us-central1.run.app';

/**
 * Fetch the default SOAP note prompt
 */
export async function fetchSoapNotePrompt(): Promise<string> {
  try {
    const response = await get<PromptResponse>(`${PROMPTS_API}?key=soapnote`);
    
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
 */
export async function saveSoapNotePrompt(promptText: string): Promise<boolean> {
  try {
    const payload: PromptSaveRequest = {
      prompt: promptText
    };
    
    const response = await post<{}, PromptSaveRequest>(
      `${PROMPTS_API}?key=soapnote`, 
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
 * Fetch prompt by key
 */
export async function fetchPromptByKey(key: string): Promise<string> {
  try {
    const response = await get<PromptResponse>(`${PROMPTS_API}?key=${key}`);
    
    if (!response.success || !response.data) {
      throw new Error(response.error || `Failed to fetch ${key} prompt`);
    }
    
    return response.data.content;
  } catch (error) {
    console.error(`Error fetching ${key} prompt:`, error);
    return "";
  }
}

/**
 * Save prompt by key
 */
export async function savePromptByKey(key: string, promptText: string): Promise<boolean> {
  try {
    const payload: PromptSaveRequest = {
      prompt: promptText
    };
    
    const response = await post<{}, PromptSaveRequest>(
      `${PROMPTS_API}?key=${key}`, 
      payload
    );
    
    if (!response.success) {
      throw new Error(response.error || `Failed to save ${key} prompt`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error saving ${key} prompt:`, error);
    throw error;
  }
}
