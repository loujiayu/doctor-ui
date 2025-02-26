'use client';

import { ReviewActions } from '@/components/medical-dashboard/review-actions';
import { AIAnalysis } from '@/components/medical-dashboard/ai-analysis';
import { DeviceData } from '@/components/medical-dashboard/device-data';
import { ChatbotInteraction } from '@/components/medical-dashboard/chatbot-interaction';
import { AIInsight } from '@/components/medical-dashboard/ai-insight';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { AppHeader } from '@/components/layout/app-header';
import { usePatientStore } from '@/stores/patient-store';
import { format, parseISO } from 'date-fns';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface MedicalDashboardProps {
  patientId: string;
  onBack: () => void;
}

export function MedicalDashboard({ patientId, onBack }: MedicalDashboardProps) {
  // Get selected patient from store
  const selectedPatient = usePatientStore(state => state.selectedPatient());

  // Generate risk score element for patient info
  const PatientInfo = () => {
    if (!selectedPatient) return null;
    
    const { riskScore } = selectedPatient;
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800',
    };
    
    const getTrendIcon = () => {
      switch (riskScore.trend) {
        case 'improving': return <ArrowDown className="h-3 w-3 ml-1 text-green-600" />;
        case 'worsening': return <ArrowUp className="h-3 w-3 ml-1 text-red-600" />;
        case 'stable': return <Minus className="h-3 w-3 ml-1 text-gray-600" />;
        default: return null;
      }
    };
    
    return (
      <>
        <p className="text-sm font-medium text-blue-200 flex items-center">
          Patient: {selectedPatient.name} • {selectedPatient.age} years • {selectedPatient.condition}
          <span className={`text-xs px-2 py-1 rounded-full inline-flex items-center ${colors[riskScore.level]} ml-2`}>
            {riskScore.value}% {riskScore.level.charAt(0).toUpperCase() + riskScore.level.slice(1)}
            {getTrendIcon()}
          </span>
        </p>
        <p className="text-xs text-blue-200/70 mt-0.5">
          Last visit: {format(parseISO(selectedPatient.lastVisit), 'MMMM d, yyyy')}
        </p>
      </>
    );
  };

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
          <AppHeader>
            <PatientInfo />
          </AppHeader>
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