import { get, post, ApiResponse } from '@/services/api';

interface SoapNoteResponse {
  content: string;
}

// Endpoint for SOAP note generation
const API_BASE_URL = 'http://localhost:5000';

/**
 * Fetch the generated SOAP note
 */
export async function fetchSoapNote(patient?: any): Promise<string> {
  try {
    const patientId = patient?.id || '1';
    const response = await post<SoapNoteResponse>(`${API_BASE_URL}/patients/${patientId}/soap`, patient || {});
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch SOAP note');
    }
    
    return response.data.content;
  } catch (error) {
    console.error('Error fetching SOAP note:', error);
    // Return the mock data as fallback
    return "";
  }
}

/**
 * Generate a new SOAP note based on parameters
 */
export async function generateSoapNote(patientData: any): Promise<string> {
  try {
    // This would be implemented in the future when the API supports 
    // generating SOAP notes with specific patient data
    // For now, return the regular SOAP note
    return await fetchSoapNote();
  } catch (error) {
    console.error('Error generating SOAP note:', error);
    return "";
  }
}
