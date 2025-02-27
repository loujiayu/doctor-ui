import { get } from './api';

export interface Doctor {
  doctor_id: number;
  full_name: string;
  email: string;
  sso_provider: string;
  created_at: string;
  updated_at: string;
}

export async function getDoctorById(id: string) {
  return get<Doctor>(`http://localhost:5000/doctors/${id}`);
}
