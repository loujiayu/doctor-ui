import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save } from 'lucide-react';

interface PromptConfigTabProps {
  isLoadingPrompt: boolean;
  isSaving: boolean;
  promptText: string;
  onPromptChange: (text: string) => void;
  onSavePrompt: () => void;
}

export function PromptConfigTab({ 
  isLoadingPrompt, 
  isSaving, 
  promptText, 
  onPromptChange, 
  onSavePrompt 
}: PromptConfigTabProps) {
  return (
    <>
      {isLoadingPrompt ? (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading prompt configuration...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Prompt Editor</h3>
            <Button
              onClick={onSavePrompt}
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
          <Textarea
            value={promptText}
            onChange={(e) => onPromptChange(e.target.value)}
            className="h-[calc(100vh-22rem)] font-mono text-sm resize-none"
            placeholder="Enter your prompt configuration here..."
          />
        </div>
      )}
    </>
  );
}
