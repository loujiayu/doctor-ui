import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export function DeviceData() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Device Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Heart Rate</span>
            <span className="text-sm font-medium">78 bpm</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Sleep Quality</span>
            <span className="text-sm font-medium">6.5 hrs</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Steps</span>
            <span className="text-sm font-medium">5,234</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
