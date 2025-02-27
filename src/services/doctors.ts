import { get } from './api';
import { API_BASE_URL } from '@/config/api';

export interface Doctor {
  doctor_id: number;
  full_name: string;
  email: string;
  sso_provider: string;
  created_at: string;
  updated_at: string;
}

export async function getDoctorById(id: string) {
  return get<Doctor>(`${API_BASE_URL}/doctors/${id}`);
}
