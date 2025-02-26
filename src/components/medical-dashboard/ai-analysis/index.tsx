import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { SoapNoteTab } from './soap-note-tab';
import { TreatmentAlgorithmTab } from './treatment-algorithm-tab';
import { PromptConfigTab } from './prompt-config-tab';
import { fetchSoapNote, fetchDefaultPrompt, savePrompt } from '@/lib/api';

export function AIAnalysis() {
  const [soapNote, setSoapNote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [promptText, setPromptText] = useState('');
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const loadSoapNote = async () => {
    setIsLoading(true);
    const note = await fetchSoapNote();
    setSoapNote(note);
    setIsLoading(false);
  };

  const loadDefaultPrompt = async () => {
    setIsLoadingPrompt(true);
    try {
      const prompt = await fetchDefaultPrompt();
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
      await savePrompt(promptText);
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

  useEffect(() => {
    loadSoapNote();
    loadDefaultPrompt();
  }, []);

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Analysis
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
