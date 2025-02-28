import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SoapNoteTabProps {
  isLoading: boolean;
  soapNote: string | null;
}

export function SoapNoteTab({ isLoading, soapNote }: SoapNoteTabProps) {
  const handleCopy = () => {
    if (soapNote) {
      navigator.clipboard.writeText(soapNote);
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
  
  // Function to style different sections of the SOAP note
  const formatSoapNote = (note: string) => {
    if (!note) return null;
    
    // Split the note into sections
    const sections = note.split(/\n(?=S:|O:|A:|P:)/g);
    
    return sections.map((section, index) => {
      let sectionTitle = '';
      let content = section;
      let bgColor = 'bg-white';
      let textColor = 'text-gray-800';
      let borderColor = 'border-gray-200';
      
      if (section.startsWith('S:')) {
        sectionTitle = 'Subjective';
        bgColor = 'bg-blue-50';
        borderColor = 'border-blue-200';
        content = section.replace('S:', '').trim();
      } else if (section.startsWith('O:')) {
        sectionTitle = 'Objective';
        bgColor = 'bg-green-50';
        borderColor = 'border-green-200';
        content = section.replace('O:', '').trim();
      } else if (section.startsWith('A:')) {
        sectionTitle = 'Assessment';
        bgColor = 'bg-amber-50';
        borderColor = 'border-amber-200';
        content = section.replace('A:', '').trim();
      } else if (section.startsWith('P:')) {
        sectionTitle = 'Plan';
        bgColor = 'bg-purple-50';
        borderColor = 'border-purple-200';
        content = section.replace('P:', '').trim();
      }
      
      return (
        <div key={index} className={`mb-4 border rounded-lg ${bgColor} ${borderColor} shadow-sm`}>
          {sectionTitle && (
            <div className={`px-4 py-2 border-b ${borderColor} font-semibold ${textColor}`}>
              {sectionTitle}
            </div>
          )}
          <div className="p-4 whitespace-pre-wrap text-gray-700">
            {content}
          </div>
        </div>
      );
    });
  };
  
  return (
    <div className="h-full">
      <div className="flex justify-end mb-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopy}
          className="bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800"
        >
          <Copy className="h-3.5 w-3.5 mr-1" />
          Copy to clipboard
        </Button>
      </div>
      <div className="overflow-auto h-[calc(100%-2rem)] px-1">
        {soapNote ? (
          <div className="space-y-4">
            {formatSoapNote(soapNote)}
          </div>
        ) : (
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4 text-amber-800">
              No SOAP note generated yet. Please select a patient.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
