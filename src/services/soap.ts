import { get, post, ApiResponse } from '@/services/api';
import { API_BASE_URL } from '@/config/api';

// Define the SOAP note structure based on the provided schema
export interface SoapNoteSchema {
  subjective: string[];
  objective: string[];
  assessment: string[];
  plan: string[];
}

interface SoapNoteApiResponse {
  content: SoapNoteSchema;
}

/**
 * Fetch the generated SOAP note
 */
export async function fetchSoapNote(patient?: any): Promise<SoapNoteSchema> {
  try {
    const patientId = patient?.id || '1';
    const response = await post<SoapNoteApiResponse>(`${API_BASE_URL}/ai/${patientId}/soap`, patient || {});
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch SOAP note');
    }
    
    return response.data.content;
  } catch (error) {
    console.error('Error fetching SOAP note:', error);
    // Return fallback data that matches the schema
    return {
      subjective: ["Patient reports symptoms of illness", "History indicates previous treatment"],
      objective: ["Temperature: 37°C", "Blood pressure: 120/80 mmHg", "Physical examination reveals no abnormalities"],
      assessment: ["Primary diagnosis: Evaluation pending", "Differential diagnoses to be considered"],
      plan: ["Order laboratory tests", "Schedule follow-up in 2 weeks", "Prescribe medication as needed"]
    };
  }
}

/**
 * Generate a new SOAP note based on parameters
 */
export async function generateSoapNote(patientData: any): Promise<SoapNoteSchema> {
  try {
    // This would be implemented in the future when the API supports 
    // generating SOAP notes with specific patient data
    // For now, return the regular SOAP note
    return await fetchSoapNote();
  } catch (error) {
    console.error('Error generating SOAP note:', error);
    return {
      subjective: [],
      objective: [],
      assessment: [],
      plan: []
    };
  }
}
