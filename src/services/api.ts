// Base API utility functions for fetch requests

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function get<T>(url: string, includeCredentials = true): Promise<ApiResponse<T>> {
  try {
    const options: RequestInit = {
      method: 'GET',
      credentials: includeCredentials ? 'include' : 'same-origin',
    };
    
    const response = await fetch(url, options);
    
    if (!response.ok) {
      return {
        success: false,
        error: `API error: ${response.status}`,
      };
    }
    
    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function post<T, U = any>(url: string, body: U): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      return {
        success: false,
        error: `API error: ${response.status}`,
      };
    }
    
    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Mock data for fallback
export const mockSoapNote = `
# Patient Visit Note

## Subjective
- Chief Complaint: Persistent headaches for past 2 weeks
- Location: Bilateral temporal region
- Severity: 7/10 on pain scale
- Quality: Throbbing, pressure-like
- Timing: Worse in mornings
- Associated Symptoms: 
  - Light sensitivity
  - Mild nausea
  - Disrupted sleep patterns

## Objective
- Vital Signs:
  - BP: 128/82
  - HR: 78
  - Temp: 98.6°F
  - RR: 16
- Physical Examination:
  - Alert and oriented x3
  - No focal neurological deficits
  - Mild tenderness to palpation in temporal regions
  - Normal pupillary response
  - No meningeal signs

## Assessment
1. Chronic Tension Headache (Primary)
2. Sleep Disorder - Unspecified
3. Possible Migraine Component

## Plan
1. Medications:
   - Start Amitriptyline 10mg qhs
   - Continue PRN NSAIDs
2. Diagnostics:
   - Sleep study referral
   - Headache diary
3. Follow-up:
   - Return in 2 weeks
   - Sooner if symptoms worsen
4. Patient Education:
   - Sleep hygiene discussed
   - Stress management techniques
   - Dietary trigger avoidance
`;
