import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePatientStore } from '@/stores/patient-store';

import { SoapNoteTab } from './soap-note-tab';
import { TreatmentAlgorithmTab } from './treatment-algorithm-tab';
import { PromptConfigTab } from './prompt-config-tab';
import { fetchSoapNote } from '@/services/soap';
import { fetchSoapNotePrompt, saveSoapNotePrompt } from '@/services/prompts';

interface AIAnalysisProps {
  patientId?: string;
}

export function AIAnalysis({ patientId }: AIAnalysisProps) {
  const [soapNote, setSoapNote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [promptText, setPromptText] = useState('');
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  // Get selected patient from store
  const selectedPatient = usePatientStore(state => state.selectedPatient());

  const loadSoapNote = async () => {
    setIsLoading(true);
    // In a real app, we would pass the patientId to fetch data for a specific patient
    const note = await fetchSoapNote();
    
    // If we have a selected patient, customize the SOAP note with patient info
    if (selectedPatient) {
      // This is a simplified example - in a real app, you'd have more sophisticated personalization
      let personalizedNote = note
        .replace(/Patient Name/g, selectedPatient.name)
        .replace(/\b\d{1,2} years old\b/g, `${selectedPatient.age} years old`)
        .replace(/\bChief Complaint: .+\b/g, `Chief Complaint: ${selectedPatient.condition}`);
      
      personalizedNote = personalizedNote;
      setSoapNote(personalizedNote);
    } else {
      setSoapNote(note);
    }
    
    setIsLoading(false);
  };

  const loadDefaultPrompt = async () => {
    setIsLoadingPrompt(true);
    try {
      const prompt = await fetchSoapNotePrompt();
      setPromptText(prompt);
    } catch (error) {
      setPromptText("");
      toast({
        title: "Warning",
        description: "Using fallback prompt configuration. Could not load from server.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsLoadingPrompt(false);
    }
  };

  const handleSavePrompt = async () => {
    setIsSaving(true);
    try {
      await saveSoapNotePrompt(promptText);
      toast({
        title: "Prompt Saved",
        description: "Your prompt configuration has been updated successfully.",
        duration: 3000
      });
      loadSoapNote();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save prompt configuration.",
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
    loadDefaultPrompt();
  }, [patientId, selectedPatient]);

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Analysis {selectedPatient ? `for ${selectedPatient.name}` : ''}
          {selectedPatient?.risk === 'critical' && (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full ml-2">
              High Risk Patient
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="soap" className="h-[calc(100vh-15rem)]">
          <TabsList className="mb-4">
            <TabsTrigger value="soap">SOAP Note</TabsTrigger>
            <TabsTrigger value="raw">Raw Analysis</TabsTrigger>
            <TabsTrigger value="algorithm">Treatment Algorithm</TabsTrigger>
            <TabsTrigger value="insurance">Insurance Notes</TabsTrigger>
            <TabsTrigger value="prompt">Prompt Config</TabsTrigger>
          </TabsList>

          <TabsContent value="soap" className="h-[calc(100%-3rem)]">
            <SoapNoteTab isLoading={isLoading} soapNote={soapNote} />
          </TabsContent>
          
          <TabsContent value="algorithm" className="h-[calc(100%-3rem)]">
            <TreatmentAlgorithmTab />
          </TabsContent>

          <TabsContent value="prompt" className="h-[calc(100%-3rem)]">
            <PromptConfigTab 
              isLoadingPrompt={isLoadingPrompt}
              isSaving={isSaving}
              promptText={promptText}
              onPromptChange={setPromptText}
              onSavePrompt={handleSavePrompt}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
