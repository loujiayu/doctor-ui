import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, FileText, Code, AlertTriangle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePatientStore } from '@/stores/patient-store';
import { useAuthStore } from '@/stores/auth-store';
import { Badge } from '@/components/ui/badge';

import { SoapNoteTab } from './soap-note-tab';
import { TreatmentAlgorithmTab } from './treatment-algorithm-tab';
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
  const [isLoading, setIsLoading] = useState(true);
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
        <Tabs defaultValue="soap" className="h-[calc(100vh-15rem)]">
          <TabsList className="mb-6 h-11 bg-gray-100 p-1 border border-gray-200 shadow-sm rounded-lg">
            <TabsTrigger 
              value="soap" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-800 data-[state=active]:shadow-sm data-[state=active]:font-medium text-gray-700 rounded-md"
            >
              <FileText className="h-4 w-4" />
              SOAP Note
            </TabsTrigger>
            <TabsTrigger 
              value="raw" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-800 data-[state=active]:shadow-sm data-[state=active]:font-medium text-gray-700 rounded-md"
            >
              <Code className="h-4 w-4" />
              Raw Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="prompt" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-800 data-[state=active]:shadow-sm data-[state=active]:font-medium text-gray-700 rounded-md"
            >
              <Brain className="h-4 w-4" />
              Prompt Config
            </TabsTrigger>
          </TabsList>

          <TabsContent value="soap" className="h-[calc(100%-3.75rem)]">
            <SoapNoteTab isLoading={isLoading} soapNote={soapNote} />
          </TabsContent>
          
          <TabsContent value="algorithm" className="h-[calc(100%-3.75rem)]">
            <TreatmentAlgorithmTab />
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
