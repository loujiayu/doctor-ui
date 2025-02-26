'use client';

import { DashboardHeader } from '@/components/medical-dashboard/dashboard-header';
import { ReviewActions } from '@/components/medical-dashboard/review-actions';
import { AIAnalysis } from '@/components/medical-dashboard/ai-analysis';
import { DeviceData } from '@/components/medical-dashboard/device-data';
import { ChatbotInteraction } from '@/components/medical-dashboard/chatbot-interaction';
import { AIInsight } from '@/components/medical-dashboard/ai-insight';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface MedicalDashboardProps {
  patientId: string;
  onBack: () => void;
}

export function MedicalDashboard({ patientId, onBack }: MedicalDashboardProps) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white/70 hover:text-white"
            onClick={onBack}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Patients
          </Button>
          <DashboardHeader patientId={patientId} />
        </div>
        
        <ReviewActions />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AIAnalysis patientId={patientId} />

          <div className="space-y-6">
            <DeviceData patientId={patientId} />
            <ChatbotInteraction />
            <AIInsight />
          </div>
        </div>
      </div>
    </div>
  );
}