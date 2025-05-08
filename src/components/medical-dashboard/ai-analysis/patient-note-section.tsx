import React from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface PatientNoteSectionProps {
  note: string;
  onChange: (note: string) => void;
  onSave: () => Promise<void>;
  isLoading?: boolean;
  isSaving?: boolean;
}

export function PatientNoteSection({ note, onChange, onSave, isLoading = false, isSaving = false }: PatientNoteSectionProps) {
  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-1.5 rounded-md shadow-sm border border-green-200">
            <MessageSquare className="h-4 w-4 text-green-700" />
          </div>
          <h3 className="font-bold text-gray-800">Note to Patient</h3>
        </div>
        <Button 
          onClick={onSave}
          size="sm"
          disabled={isLoading || isSaving}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : 'Save Note'}
        </Button>
      </div>
      <Textarea
        value={note}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter notes about patient communication here..."
        className="w-full min-h-[100px] p-3 text-gray-800"
        disabled={isLoading}
      />
    </div>
  );
}