import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ReviewActions() {
  const { toast } = useToast();

  const handleVote = (type: 'up' | 'down' | 'more') => {
    const messages = {
      up: 'Analysis approved and sent to patient',
      down: 'Analysis rejected - requires revision',
      more: 'Requested additional patient data'
    };
    toast({
      title: 'Review Status Updated',
      description: messages[type],
      duration: 3000
    });
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardContent className="py-4">
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-primary hover:text-white"
            onClick={() => handleVote('up')}
          >
            <ThumbsUp className="h-4 w-4" />
            Approve Analysis
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-destructive hover:text-white"
            onClick={() => handleVote('down')}
          >
            <ThumbsDown className="h-4 w-4" />
            Reject Analysis
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-secondary hover:text-foreground"
            onClick={() => handleVote('more')}
          >
            <AlertCircle className="h-4 w-4" />
            Need More Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
