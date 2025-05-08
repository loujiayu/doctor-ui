import { get, post, ApiResponse } from '@/services/api';
import { API_BASE_URL } from '@/config/api';

export interface DoctorPatientNote {
  doctorId: number;
  patientId: number;
  metadata: {
    note: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export async function getDoctorPatientNote(doctorId: number, patientId: number): Promise<string | undefined> {
  try {
    const response = await get<DoctorPatientNote>(`${API_BASE_URL}/doctorpatientassociation/details/${doctorId}/${patientId}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch doctor-patient note');
    }

    return response.data?.metadata?.note;
  } catch (error) {
    console.error('Error fetching doctor-patient note:', error);
    throw error;
  }
}

export async function saveDoctorPatientNote(note: DoctorPatientNote): Promise<DoctorPatientNote> {
  try {
    const response = await post<DoctorPatientNote>(`${API_BASE_URL}/doctorpatientassociation/associate/${note.doctorId}/${note.patientId}`, note);
    if (!response.success) {
      throw new Error(response.error || 'Failed to save doctor-patient note');
    }
    return response.data!;
  } catch (error) {
    console.error('Error saving doctor-patient note:', error);
    throw error;
  }
}