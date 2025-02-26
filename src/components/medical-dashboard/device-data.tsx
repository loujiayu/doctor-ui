import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';

interface DeviceDataProps {
  patientId?: string;
}

export function DeviceData({ patientId }: DeviceDataProps) {
  // In a real app, we would fetch device data for the specific patient
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Device Data
        </CardTitle>
        <CardDescription>
          {patientId ? `Data from patient #${patientId}'s wearable devices` : 'No patient selected'}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Device data content */}
      </CardContent>
    </Card>
  );
}
