import { get, post, ApiResponse } from '@/services/api';
import { API_BASE_URL } from '@/config/api';

interface DvxAnalysisApiResponse {
  content: DifferentialDiagnosis[];
}

// Define the structure for a single differential diagnosis item
export interface DifferentialDiagnosis {
  condition: string;
  risk: 'Critical' | 'Moderate' | 'Low';
  confidence: number;
  steps: string;
}

/**
 * Fetch the DVX differential diagnosis analysis
 * @param patientId The ID of the patient
 * @returns Array of differential diagnoses
 */
export async function fetchDvxAnalysis(patientId: string): Promise<DifferentialDiagnosis[]> {
  try {
    const response = await post<DvxAnalysisApiResponse>(`${API_BASE_URL}/patients/${patientId}/dvx`);
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch DVX analysis');
    }
    
    // The content comes as a JSON string that we need to parse
    // It contains an array of differential diagnoses
    try {
      // Parse the response content directly into the typed array
      const differentialDiagnoses: DifferentialDiagnosis[] = response.data.content;
      
      // Return the parsed array directly
      return differentialDiagnoses;
    } catch (error) {
      console.error('Error parsing DVX analysis response:', error);
      throw new Error('Invalid DVX analysis data format');
    }
  } catch (error) {
    console.error('Error fetching DVX analysis:', error);
    throw error;
  }
}
