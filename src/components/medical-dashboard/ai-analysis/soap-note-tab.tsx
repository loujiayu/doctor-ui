import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SoapNoteSchema } from '@/services/soap';

interface SoapNoteTabProps {
  isLoading: boolean;
  soapNote: SoapNoteSchema | null;
}

export function SoapNoteTab({ isLoading, soapNote }: SoapNoteTabProps) {
  const handleCopy = () => {
    if (soapNote) {
      // Convert the structured SOAP note to text for copying
      const sections = [
        'Subjective:\n' + soapNote.subjective.map(item => `• ${item}`).join('\n'),
        'Objective:\n' + soapNote.objective.map(item => `• ${item}`).join('\n'),
        'Assessment:\n' + soapNote.assessment.map(item => `• ${item}`).join('\n'),
        'Plan:\n' + soapNote.plan.map(item => `• ${item}`).join('\n')
      ];
      navigator.clipboard.writeText(sections.join('\n\n'));
    }
  };
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-gray-600 font-medium">Generating SOAP note...</p>
        </div>
      </div>
    );
  }
  
  if (!soapNote || 
      (soapNote.subjective.length === 0 && 
       soapNote.objective.length === 0 && 
       soapNote.assessment.length === 0 && 
       soapNote.plan.length === 0)) {
    return (
      <Card className="border-amber-200 bg-amber-50 h-full">
        <CardContent className="p-4 text-amber-800 flex items-center justify-center h-full">
          <div className="text-center">
            <p className="font-medium">No SOAP note data available</p>
            <p className="text-sm mt-1">Please select a patient to generate a note.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end p-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs bg-white" 
          onClick={handleCopy}
        >
          <Copy className="h-3.5 w-3.5 mr-1.5" />
          Copy Note
        </Button>
      </div>
      
      <div className="overflow-auto flex-1 px-1">
        <div className="grid grid-cols-1 gap-4 pb-4">
          {/* Subjective Section */}
          <div className="border rounded-lg bg-blue-50 border-blue-200 shadow-sm">
            <div className="px-4 py-2 border-b border-blue-200 font-semibold text-gray-800 flex items-center">
              <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
              Subjective
            </div>
            <div className="p-4 text-gray-700">
              <ul className="list-disc pl-5 space-y-1.5">
                {soapNote.subjective.map((item, idx) => (
                  <li key={`subjective-${idx}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Objective Section */}
          <div className="border rounded-lg bg-green-50 border-green-200 shadow-sm">
            <div className="px-4 py-2 border-b border-green-200 font-semibold text-gray-800 flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              Objective
            </div>
            <div className="p-4 text-gray-700">
              <ul className="list-disc pl-5 space-y-1.5">
                {soapNote.objective.map((item, idx) => (
                  <li key={`objective-${idx}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Assessment Section */}
          <div className="border rounded-lg bg-amber-50 border-amber-200 shadow-sm">
            <div className="px-4 py-2 border-b border-amber-200 font-semibold text-gray-800 flex items-center">
              <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
              Assessment
            </div>
            <div className="p-4 text-gray-700">
              <ul className="list-disc pl-5 space-y-1.5">
                {soapNote.assessment.map((item, idx) => (
                  <li key={`assessment-${idx}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Plan Section */}
          <div className="border rounded-lg bg-purple-50 border-purple-200 shadow-sm">
            <div className="px-4 py-2 border-b border-purple-200 font-semibold text-gray-800 flex items-center">
              <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
              Plan
            </div>
            <div className="p-4 text-gray-700">
              <ul className="list-disc pl-5 space-y-1.5">
                {soapNote.plan.map((item, idx) => (
                  <li key={`plan-${idx}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
