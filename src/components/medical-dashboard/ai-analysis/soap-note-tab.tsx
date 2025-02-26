import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface SoapNoteTabProps {
  isLoading: boolean;
  soapNote: string | null;
}

export function SoapNoteTab({ isLoading, soapNote }: SoapNoteTabProps) {
  return (
    <ScrollArea className="h-full rounded-md border p-4">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading SOAP note...</p>
          </div>
        </div>
      ) : (
        <article className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {soapNote || ''}
          </ReactMarkdown>
        </article>
      )}
    </ScrollArea>
  );
}
