import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface PromptConfigTabProps {
  isLoadingPrompt: boolean;
  isSaving: boolean;
  soapPromptText: string;
  dvxPromptText: string;
  onSoapPromptChange: (text: string) => void;
  onDvxPromptChange: (text: string) => void;
  onSavePrompt: (type: 'soap' | 'dvx') => void;
}

export function PromptConfigTab({
  isLoadingPrompt,
  isSaving,
  soapPromptText,
  dvxPromptText,
  onSoapPromptChange,
  onDvxPromptChange,
  onSavePrompt
}: PromptConfigTabProps) {
  const [activePromptType, setActivePromptType] = useState<'soap' | 'dvx'>('soap');

  if (isLoadingPrompt) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading prompt configurations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="soap" onValueChange={(value) => setActivePromptType(value as 'soap' | 'dvx')}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="soap">SOAP Note Prompt</TabsTrigger>
            <TabsTrigger value="dvx">AI DVX Analysis Prompt</TabsTrigger>
          </TabsList>
          <Button
            onClick={() => onSavePrompt(activePromptType)}
            size="sm"
            className="flex items-center gap-2"
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>

        <TabsContent value="soap">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Customize the AI prompt used to generate SOAP notes for patient records.
                </p>
                <Textarea
                  value={soapPromptText}
                  onChange={(e) => onSoapPromptChange(e.target.value)}
                  className="h-[calc(100vh-28rem)] font-mono text-sm resize-none"
                  placeholder="Enter your SOAP note prompt configuration here..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dvx">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Customize the AI prompt used to generate DVX analysis insights for patients.
                </p>
                <Textarea
                  value={dvxPromptText}
                  onChange={(e) => onDvxPromptChange(e.target.value)}
                  className="h-[calc(100vh-28rem)] font-mono text-sm resize-none"
                  placeholder="Enter your AI DVX analysis prompt configuration here..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
