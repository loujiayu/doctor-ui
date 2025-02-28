import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, FileText, Code, AlertTriangle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePatientStore } from '@/stores/patient-store';
import { useAuthStore } from '@/stores/auth-store';
import { Badge } from '@/components/ui/badge';

import { SoapNoteTab } from './soap-note-tab';
import { DvxAnalysisTab } from './dvx-analysis-tab';
import { PromptConfigTab } from './prompt-config-tab';
import { fetchSoapNote } from '@/services/soap';
import { 
  fetchSoapNotePrompt, 
  saveSoapNotePrompt, 
  fetchDvxAnalysisPrompt,
  saveDvxAnalysisPrompt
} from '@/services/prompts';

interface AIAnalysisProps {
  patientId?: string;
}

export function AIAnalysis({ patientId }: AIAnalysisProps) {
  const [soapNote, setSoapNote] = useState<string | null>(null);
  const [dvxAnalysis, setDvxAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDvx, setIsLoadingDvx] = useState(true);
  const [soapPromptText, setSoapPromptText] = useState('');
  const [dvxPromptText, setDvxPromptText] = useState('');
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const { toast } = useToast();
  
  // Get selected patient from store
  const selectedPatient = usePatientStore(state => state.selectedPatient());
  // Get current authenticated user
  const user = useAuthStore(state => state.user);
  const userId = user ? parseInt(user.id) : 1; // Convert string ID to number, default to 1 if not available

  const loadSoapNote = async () => {
    setIsLoading(true);
    // Pass the selected patient to fetch data for a specific patient
    const note = await fetchSoapNote(selectedPatient);
    
    // If we have a selected patient, customize the SOAP note with patient info
    if (selectedPatient) {
      // This is a simplified example - in a real app, you'd have more sophisticated personalization
      let personalizedNote = note
        .replace(/Patient Name/g, selectedPatient.name)
        .replace(/\b\d{1,2} years old\b/g, `${selectedPatient.age} years old`)
        .replace(/\bChief Complaint: .+\b/g, `Chief Complaint: ${selectedPatient.condition}`);
      
      setSoapNote(personalizedNote);
    } else {
      setSoapNote(note);
    }
    
    setIsLoading(false);
  };

  const loadDvxAnalysis = async () => {
    setIsLoadingDvx(true);
    try {
      // Simulate API call for DVX analysis
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // For the table-based DVX analysis, we'll return structured data rather than markdown
      if (selectedPatient) {
        // Generate sample differential diagnoses based on condition
        let differentials = [];
        
        if (selectedPatient.condition.includes("chest")) {
          differentials = [
            { condition: "Acute Coronary Syndrome", risk: "High", confidence: 78, steps: "Immediate ECG, cardiac enzymes, consider aspirin" },
            { condition: "Pulmonary Embolism", risk: "High", confidence: 65, steps: "D-dimer, chest CT if indicated" },
            { condition: "Musculoskeletal Pain", risk: "Low", confidence: 45, steps: "Physical examination, NSAIDs if appropriate" },
            { condition: "Anxiety-induced Chest Pain", risk: "Low", confidence: 35, steps: "Assess psychological factors, consider anxiety management" }
          ];
        } else if (selectedPatient.condition.includes("head")) {
          differentials = [
            { condition: "Tension Headache", risk: "Low", confidence: 72, steps: "Analgesics, stress management education" },
            { condition: "Migraine", risk: "Medium", confidence: 68, steps: "Triptans if confirmed, preventive therapy if recurrent" },
            { condition: "Sinusitis", risk: "Low", confidence: 41, steps: "Nasal decongestants, consider antibiotics if bacterial" },
            { condition: "Intracranial Hypertension", risk: "High", confidence: 22, steps: "Neurological exam, consider imaging if concerning features" }
          ];
        } else {
          differentials = [
            { condition: "Primary diagnosis", risk: selectedPatient.risk === 'critical' ? "High" : "Medium", confidence: 82, steps: "Targeted treatment based on confirmation" },
            { condition: "Secondary diagnosis", risk: "Medium", confidence: 65, steps: "Additional testing to confirm" },
            { condition: "Tertiary diagnosis", risk: "Low", confidence: 43, steps: "Monitor for evolving symptoms" }
          ];
        }
        
        setDvxAnalysis(JSON.stringify(differentials));
      } else {
        setDvxAnalysis(null);
      }
    } catch (error) {
      console.error("Error loading DVX analysis:", error);
      setDvxAnalysis(null);
    } finally {
      setIsLoadingDvx(false);
    }
  };

  const loadPrompts = async () => {
    setIsLoadingPrompt(true);
    try {
      // Load both prompts in parallel
      const [soapPrompt, dvxPrompt] = await Promise.all([
        fetchSoapNotePrompt(userId),
        fetchDvxAnalysisPrompt(userId)
      ]);
      
      setSoapPromptText(soapPrompt);
      setDvxPromptText(dvxPrompt);
    } catch (error) {
      setSoapPromptText("");
      setDvxPromptText("");
      toast({
        title: "Warning",
        description: "Using fallback prompt configurations. Could not load from server.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsLoadingPrompt(false);
    }
  };

  const handleSavePrompt = async (type: 'soap' | 'dvx') => {
    setIsSaving(true);
    try {
      if (type === 'soap') {
        await saveSoapNotePrompt(userId, soapPromptText);
        toast({
          title: "SOAP Prompt Saved",
          description: "Your SOAP note prompt configuration has been updated successfully.",
          duration: 3000
        });
        loadSoapNote();
      } else {
        await saveDvxAnalysisPrompt(userId, dvxPromptText);
        toast({
          title: "DVX Prompt Saved",
          description: "Your AI DVX analysis prompt configuration has been updated successfully.",
          duration: 3000
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to save ${type === 'soap' ? 'SOAP note' : 'DVX analysis'} prompt configuration.`,
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Re-fetch data when patientId changes
  useEffect(() => {
    loadSoapNote();
    loadDvxAnalysis();
    loadPrompts();
  }, [patientId, selectedPatient]);

  return (
    <Card className="md:col-span-2 border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
      <CardHeader className="pb-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <CardTitle className="flex items-center gap-2 text-gray-900 font-bold">
              <div className="bg-blue-100 p-1.5 rounded-md shadow-sm border border-blue-200">
                <Brain className="h-5 w-5 text-blue-700" />
              </div>
              AI Analysis
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium border border-blue-200">
                <Sparkles className="h-3 w-3 inline mr-0.5" />
                GPT-4
              </span>
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1 font-medium">
              AI-powered clinical documentation and decision support
            </CardDescription>
          </div>
          
          {selectedPatient && (
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-gray-100 text-gray-800 border-gray-300 shadow-sm font-medium text-sm py-1">
                Patient: {selectedPatient.name}
              </Badge>
              {selectedPatient.risk === 'critical' && (
                <Badge className="bg-red-100 text-red-700 border-red-300 shadow-sm font-medium text-sm py-1">
                  <AlertTriangle className="h-3 w-3 mr-1 stroke-[2.5]" />
                  High Risk Patient
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6 px-5">
        <Tabs defaultValue="analysis" className="h-[calc(100vh-15rem)]">
          <TabsList className="mb-6 h-11 bg-gray-100 p-1 border border-gray-200 shadow-sm rounded-lg">
            <TabsTrigger 
              value="analysis" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-800 data-[state=active]:shadow-sm data-[state=active]:font-medium text-gray-700 rounded-md"
            >
              <Brain className="h-4 w-4" />
              Clinical Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="prompt" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-800 data-[state=active]:shadow-sm data-[state=active]:font-medium text-gray-700 rounded-md"
            >
              <Code className="h-4 w-4" />
              Prompt Config
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="h-[calc(100%-3.75rem)]">
            <div className="flex flex-col h-full gap-6">
              {/* DVX Analysis - Now above SOAP Note */}
              <div className="flex flex-col h-1/2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-purple-100 p-1.5 rounded-md shadow-sm border border-purple-200">
                    <Brain className="h-4 w-4 text-purple-700" />
                  </div>
                  <h3 className="font-bold text-gray-800">DVX Analysis</h3>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium border border-purple-200">
                    Differential Diagnosis AI
                  </span>
                </div>
                <div className="flex-grow min-h-0 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <DvxAnalysisTab isLoading={isLoadingDvx} dvxAnalysis={dvxAnalysis} />
                </div>
              </div>
              
              {/* SOAP Note - Now below DVX Analysis */}
              <div className="flex flex-col h-1/2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-100 p-1.5 rounded-md shadow-sm border border-blue-200">
                    <FileText className="h-4 w-4 text-blue-700" />
                  </div>
                  <h3 className="font-bold text-gray-800">SOAP Note</h3>
                </div>
                <div className="flex-grow min-h-0 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <SoapNoteTab isLoading={isLoading} soapNote={soapNote} />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="prompt" className="h-[calc(100%-3.75rem)]">
            <PromptConfigTab 
              isLoadingPrompt={isLoadingPrompt}
              isSaving={isSaving}
              soapPromptText={soapPromptText}
              dvxPromptText={dvxPromptText}
              onSoapPromptChange={setSoapPromptText}
              onDvxPromptChange={setDvxPromptText}
              onSavePrompt={handleSavePrompt}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
