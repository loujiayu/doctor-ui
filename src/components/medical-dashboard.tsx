'use client';

import { DashboardHeader } from '@/components/medical-dashboard/dashboard-header';
import { ReviewActions } from '@/components/medical-dashboard/review-actions';
import { AIAnalysis } from '@/components/medical-dashboard/ai-analysis';
import { DeviceData } from '@/components/medical-dashboard/device-data';
import { ChatbotInteraction } from '@/components/medical-dashboard/chatbot-interaction';
import { AIInsight } from '@/components/medical-dashboard/ai-insight';

export function MedicalDashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <DashboardHeader />
        
        <ReviewActions />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AIAnalysis />

          <div className="space-y-6">
            <DeviceData />
            <ChatbotInteraction />
            <AIInsight />
          </div>
        </div>
      </div>
    </div>
  );
}