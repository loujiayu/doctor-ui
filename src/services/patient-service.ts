import { get, post, ApiResponse } from '@/services/api';
import { ApiPatient } from '@/stores/patient-store';

const API_BASE_URL = 'http://localhost:5000';

export const patientService = {
  async getPatients(): Promise<ApiPatient[]> {
    try {
      // In a real app, this would fetch from your actual API endpoint
      const response = await get<ApiPatient[]>(`${API_BASE_URL}/patients`);

      if (!response.success) {
        throw new Error(`Failed to fetch patients`);
      }
      
      return response.data || [];
    } catch (error) {
      console.error('Error fetching patients:', error);
      // For demo purposes, when API fails, return mock data
      return getMockPatients();
    }
  },
};

// Temporary mock data function until real API is integrated
function getMockPatients(): ApiPatient[] {
  return [
    {
      "created_at": "2025-02-18T05:48:13.291833",
      "email": "loujiayu7@gmail.com",
      "full_name": "Jiayu Lou",
      "metadata": {
        "Age": 30,
        "Condition": "No condition mentioned",
        "LastVisit": "1900-01-01",
        "Risk": "Low"
      },
      "patient_id": 1,
      "updated_at": "2025-02-27T07:27:42.642451"
    },
    {
      "created_at": "2025-02-26T15:54:40.525523",
      "email": "drcwsandor@gmail.com",
      "full_name": "Charles Sandor",
      "metadata": null,
      "patient_id": 3,
      "updated_at": "2025-02-26T15:54:40.525527"
    },
    {
      "created_at": "2025-02-20T13:32:24.486696",
      "email": "machine0005@gmail.com",
      "full_name": "Machine favorite",
      "metadata": null,
      "patient_id": 2,
      "updated_at": "2025-02-20T13:32:24.486696"
    }
  ];
}
