import { get, ApiResponse } from '@/services/api';

interface SoapNoteResponse {
  message: string;
}

// Endpoint for SOAP note generation
const SOAPNOTE_API = 'https://doctormt-85352025976.us-central1.run.app';

/**
 * Fetch the generated SOAP note
 */
export async function fetchSoapNote(): Promise<string> {
  try {
    const response = await get<SoapNoteResponse>(SOAPNOTE_API);
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch SOAP note');
    }
    
    return response.data.message;
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
