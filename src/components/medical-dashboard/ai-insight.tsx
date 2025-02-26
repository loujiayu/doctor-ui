import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Brain, ChevronDown } from 'lucide-react';

export function AIInsight() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="bg-card rounded-lg shadow-md">
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <h3 className="font-semibold">AI Insight</h3>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 space-y-3">
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-sm text-blue-800 font-semibold mb-1">Pattern Recognition Insights:</p>
            <ul className="text-sm text-blue-800 list-disc pl-4 space-y-1">
              <li>Correlation between disrupted sleep patterns and recent device data shows a 43% decrease in deep sleep over the past month, suggesting potential underlying sleep disorder.</li>
              <li>Subtle trend in morning vs. evening BP readings indicates possible masked hypertension despite normal office readings.</li>
              <li>Heart rate variability analysis reveals autonomic dysfunction patterns commonly missed in standard evaluations.</li>
            </ul>
          </div>
          
          <div className="bg-amber-50 p-3 rounded-md">
            <p className="text-sm text-amber-800 font-semibold mb-1">Expanded Differential Diagnoses:</p>
            <ul className="text-sm text-amber-800 list-disc pl-4 space-y-1">
              <li>Primary: Chronic migraine with aura (87% probability based on symptom clustering)</li>
              <li>Secondary: Sleep apnea with morning headaches (72% correlation)</li>
              <li>Tertiary: Subclinical thyroid dysfunction (65% probability based on multi-system analysis)</li>
              <li>Quaternary: Early presentation of autoimmune condition (43% probability)</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-3 rounded-md">
            <p className="text-sm text-purple-800 font-semibold mb-1">AI-Detected Patterns:</p>
            <ul className="text-sm text-purple-800 list-disc pl-4 space-y-1">
              <li>Temporal relationship between headache onset and barometric pressure changes (last 90 days)</li>
              <li>Subtle cognitive performance decline during headache episodes (based on digital interaction patterns)</li>
              <li>Micronutrient deficiency signature in recent lab trends</li>
            </ul>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}