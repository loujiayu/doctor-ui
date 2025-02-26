import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ChatbotInteraction() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Chatbot Interaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] rounded-md border p-4">
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                P
              </div>
              <div className="flex-1">
                <p className="text-sm">I've been having these headaches...</p>
                <span className="text-xs text-muted-foreground">10:30 AM</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-shrink-0 w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                AI
              </div>
              <div className="flex-1">
                <p className="text-sm">Can you describe the pain intensity?</p>
                <span className="text-xs text-muted-foreground">10:31 AM</span>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
