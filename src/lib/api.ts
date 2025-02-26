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

export async function fetchSoapNote() {
  try {
    // Simulate API call with delay
    const response = await fetch('https://doctormt-85352025976.us-central1.run.app');
    const data = await response.text();
    return JSON.parse(data).message;
  } catch (error) {
    console.error('Error fetching SOAP note:', error);
    return mockSoapNote;
  }
}

export async function fetchDefaultPrompt() {
  try {
    const response = await fetch('https://prompts-85352025976.us-central1.run.app?key=soapnote');
    if (!response.ok) throw new Error('Failed to fetch prompt');
    const data = await response.text();
    return JSON.parse(data).content;
  } catch (error) {
    console.error('Error fetching default prompt:', error);
    return "";
  }
}

export async function savePrompt(promptText: string) {
  const response = await fetch('https://prompts-85352025976.us-central1.run.app?key=soapnote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: promptText
    }),
  });
  
  if (!response.ok) throw new Error('Failed to save prompt');
  return true;
}
